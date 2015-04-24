Ext.define('EscomApp.controller.admin.Users', {
    extend  : 'Ext.app.Controller',
    models  : [
        'admin.user.User',
        'admin.user.Career',
        'admin.user.Plan',
        'admin.role.Role'/*,
        'admin.tracking.categories.Category',
        'admin.tracking.history.History'*/
    ],
    stores  : [
        'admin.user.Users',
        'admin.user.Careers',
        'admin.user.Plans',
        'admin.role.Roles'/*,
        'admin.tracking.categories.Categories',
        'admin.tracking.history.Histories'*/
    ],
    views   : [
        'admin.user.GridPanel',
        'admin.user.form.ComboCareer',
        'admin.user.form.ComboPlan',
        'admin.user.form.ComboShift',
        'admin.user.form.ComboGender',
        'admin.role.form.ComboRole',
        'admin.user.form.Panel',
        'admin.user.WizardWindow'
    ],

    refs: [{
        ref: 'gridUsers',
        selector: '#maintabs #usersgrid'
    },{
        ref: 'academicForm',
        selector: '#userswizard fieldset form[name=academicdata]'
    },{
        ref: 'fieldFoto',
        selector: 'filefield[name=foto]'
    }],

    init: function(){
        this.control({
            '#userswizard'   : {
                close   : function(){
                    this.getGridUsers().getStore().load();
                },
                show    : function(){
                    if(!Ext.isEmpty(this.getFieldFoto())){
                        Ext.create('Ext.tip.ToolTip', {
                            target: this.getFieldFoto().el,
                            renderTo: Ext.getBody(),
                            showDelay: 0,
                            anchor: 'left',
                            html: escom.lang.user.form.tooltip.maxsize
                        });
                    }
                }
            },
            'panel combo[name=rol_k]'  : {
                select  : function(combo, records){
                    var isAcademico = records[0].data.categoria_k,
                        fields = this.getAcademicForm().getForm().getFields().items;
                    Ext.each(fields, function(item){
                        item.allowBlank = isAcademico == 2 ? false : true;//rol academico
                    }, this);
                }
            }
        });
    },

    onLaunch: function(){

    },

    addContent  : function(){
        this.container.add({
            xtype   : 'admin.user.grid',
            border  : false,
            itemId  : 'usersgrid',
            permisos    : this.permisos
        });
    }
});