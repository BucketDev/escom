Ext.define('EscomApp.controller.admin.Main', {
    extend  : 'Ext.app.Controller',
    models  : ['admin.Submodule'],
    stores  : ['admin.Submodules'],
    views   : [
        'admin.Viewport',
        'admin.Panel',
        'admin.activities.PanelActivities',
        'admin.activities.PanelResumen',

        'admin.submodules.tree.Panel',

        'window.ModalWindow',
        'form.WizardForm',
        'window.WizardWindow'
    ],

    init: function(){
        this.control({
            'panel button[action=logout]'   : {
                click   : function(){
                    Ext.Msg.wait(escom.lang.admin.logout, escom.lang.window.waiting);

                    escom.post('login', 'logout', {
                        success : function(response){
                            //Ext.MessageBox.hide();
                            location.reload();
                        }
                    });
                }
            },
            '#treeactivities' : {
                itemclick   : function(view, record){
                    //Si es un submodulo
                    if(record.data.submodulo_k > 0){
                        this.openModule(record.data);
                    } else {
                        record.isExpanded() ? record.collapse() : record.expand();
                    }
                }
            }
        });
    },

    onLaunch: function(){
        Ext.create('EscomApp.view.admin.Viewport');

        this.mainTabs = Ext.ComponentQuery.query('#maintabs')[0];
    },

    openModule: function(submodulo){

        Ext.Msg.wait(escom.lang.window.waiting);

        Ext.require(submodulo.controlador, function(){
            //Verify if the controller of the menuoption has been loaded before
            var controller = this.application.controllers.get(submodulo.controlador);

            //If the controller isn't found in the collection of controllers of this.application
            if(!controller){

                escom.post('app/usuario', 'getpermisos', {
                    scope   : this,
                    params  : {
                        submodulo_k : submodulo.submodulo_k
                    },
                    success : function(response){
                        var permisos = {};
                        if(!Ext.isEmpty(response.responseText)){
                            Ext.each(Ext.decode(response.responseText).data, function(permiso){
                                permisos[permiso.accion] = permiso.accion;
                            });
                        }
                        //Create an instance of this controller
                        controller = Ext.create(submodulo.controlador, {
                            id      : submodulo.controlador,
                            permisos : permisos,
                            application: this.application
                        });
                        //create a container
                        controller.container = this.createContainer(submodulo);
                        //add this container to the maintab, just adds a tab
                        this.mainTabs.add(controller.container);

                        //method in the controller
                        controller.addContent();

                        //Adds the controller to the collection of controllers of this.application
                        this.application.controllers.add(controller);

                        //initialize the controller
                        controller.init();

                        //method in the controller
                        controller.onLaunch(this.application);

                        this.showTabSubmodule(controller);

                        //hide the loading message
                        Ext.Msg.hide();
                    }
                }, this);
                //if it exists
            } else {
                //asks for the controller if it has been destroyed
                if (controller.container.isDestroyed) {
                    //create a container
                    controller.container = this.createContainer(submodulo);
                    //add this container to the maintab, just adds a tab
                    this.mainTabs.add(controller.container);

                    //method in the controller
                    controller.addContent();

                    //initialize the controller
                    controller.init();

                    //method in the controller
                    controller.onLaunch(this.application);
                }
                this.showTabSubmodule(controller);

                Ext.Msg.hide();
            }

        }, this);

    },

    showTabSubmodule    : function(controller){
        //show the hidden by default maintab
        this.mainTabs.show();
        //active the recently created tab, controller.container == tab
        this.mainTabs.setActiveTab(controller.container);
    },


    createContainer: function(submodulo){
        return Ext.widget({
            xtype   : 'container',
            title   : submodulo.text,
            iconCls : submodulo.iconCls,
            layout  : 'fit',
            closable    : true
        });
    }
});