Ext.define('EscomApp.view.admin.user.WizardWindow', {
    extend  : 'EscomApp.view.window.WizardWindow',
    xtype   : 'admin.user.wizardwindow',

    onShow  : function(){
        this.callParent();

        Ext.each(this.form.getForm().getFields().items, function(item, index){
            if(item.xtype.search('combo') > 0){
                if(item.getStore().getCount() === 0){
                    item.getStore().load();
                }
            }
        }, this);
    }
});