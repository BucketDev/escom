Ext.define('EscomApp.view.admin.activities.PanelActivities',{
    extend  : 'Ext.panel.Panel',
    xtype   : 'admin.activities.panelactivities',
    layout  : 'accordion',
    title   : escom.lang.admin.panelactivities.title,
    icon    : 'assets/img/16/helmet.png',

    initComponent: function(){
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function(){
        return  [{
            xtype   : 'admin.submodules.tree.panel',
            itemId  : 'treeactivities',
            border  : false
        },{
            xtype   : 'admin.activities.panelresumen',
            border  : false,
            height  : 300
        }];
    }
});