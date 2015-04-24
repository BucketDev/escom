Ext.define('EscomApp.view.window.WizardWindow', {
    extend  : 'EscomApp.view.window.ModalWindow',
    xtype   : 'wizardwindow',
    requires: 'Ext.ux.statusbar.StatusBar',
    itemId  : 'wizardwindow',
    minWidth: 390,
    hasSave : true,
    hasCancel   : true,
    defaultText : 'Ingresa los datos...',

    initComponent   : function(){

        this.sb = Ext.create('Ext.ux.StatusBar', {
            dock        : 'bottom',
            defaultText : this.defaultText,
            busyText    : escom.lang.form.saving,
            statusAlign : 'right'
        });

        if(Ext.isEmpty(this.form)){
            throw ("El componente WizardWindow debe contener un formulario Wizard");
        }

        Ext.apply(this, {
            items   : this.form,
            //buttons : this.buildButtons(),
            dockedItems : [{
                xtype:'toolbar',
                dock: 'bottom',
                buttonAlign:'right',
                items: this.buildButtons()
            }, this.sb]
        });

        this.callSuper();
    },

    buildButtons    : function(){
        var buttons = ['->'];

        if(this.hasCancel){
            buttons.push({
                text    : escom.lang.form.cancel,
                iconCls : 'cancel',
                scope   : this,
                handler : this.destroy
            });
        }

        buttons.push({
            text    : escom.lang.form.previous,
            iconCls : 'arrow_left',
            scope   : this,
            handler : this.navigate,
            action  : 'prev',
            disabled: true
        },{
            text    : escom.lang.form.next,
            iconCls : 'arrow_right',
            iconAlign   : 'right',
            scope   : this,
            action  : 'next',
            handler : this.navigate
        });

        if(this.hasSave){
            buttons.push({
                text    : escom.lang.form.save,
                iconCls : 'save_as',
                scope   : this,
                action  : 'save',
                handler : this.onSave
            });
        }
        return  buttons;
    },

    onRender    : function(){
        this.callParent();

        this.next = Ext.ComponentQuery.query('#' + this.itemId + ' button[action=next]')[0];
        this.previous = Ext.ComponentQuery.query('#' + this.itemId + ' button[action=prev]')[0];
        this.save = Ext.ComponentQuery.query('#' + this.itemId + ' button[action=save]')[0];
    },

    navigate  : function(button){
        var layout = this.form.getLayout();

        layout[button.action]();
        this.previous.setDisabled(!layout.getPrev());
        this.next.setDisabled(!layout.getNext());
    },

    onSave  : function(button){
        if(this.form.getForm().isValid()){
            this.form.body.mask();
            this.sb.showBusy();
            this.form.save();
        } else {
            this.sb.setStatus({
                text    : escom.lang.form.validate,
                iconCls : 'x-status-error',
                clear   : {
                    anim    : false
                }
            });
        }
    }

});