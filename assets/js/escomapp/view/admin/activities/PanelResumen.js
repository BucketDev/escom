Ext.define('EscomApp.view.admin.activities.PanelResumen',{
    extend  : 'Ext.panel.Panel',
    xtype   : 'admin.activities.panelresumen',
    title   : escom.lang.admin.panelresumen.title,
    icon    : 'assets/img/16/to_do_list_cheked_all.png',

    initComponent: function(){
        //this.items = this.buildItems();
        this.callParent();
    }
});