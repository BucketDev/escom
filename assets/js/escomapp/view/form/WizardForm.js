Ext.define('EscomApp.view.form.WizardForm', {
    extend  : 'Ext.form.Panel',
    border  : false,
    record  : {},
    layout  : 'card',
    activeItem  : 0,
    bodyPadding : '5 10',
    trackResetOnLoad    : true,

    initComponent   : function(){
        Ext.apply(this, {
            items   : this.buildItems()
        });
        this.callParent();

        if(!Ext.isEmpty(this.record)){
            this.getForm().loadRecord(this.record);
        }
    },

    save    : Ext.emptyFn
});