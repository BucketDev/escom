Ext.define('EscomApp.view.admin.submodules.tree.Panel', {
    extend		: 'Ext.tree.Panel',
    viewConfig  : {
        loadMask    : true
    },
    xtype		: 'admin.submodules.tree.panel',
    icon        : 'assets/img/16/module.png',
    title       : escom.lang.admin.panelsubmodules.title,
    store		: 'admin.Submodules',
    useArrows   : true,
    /*
     If your TreeStore does not have a RootNode and you set this property to "false"
     it will implicitely create a the root node and expand it which will trigger the store load.
     */
    rootVisible	: false,
    border		: false
});