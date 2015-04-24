Ext.define('EscomApp.store.admin.Submodules', {
    autoLoad    : true,
    extend	    : 'Ext.data.TreeStore',
    model       : 'EscomApp.model.admin.Submodule',
    proxy: {
        type: 'ajax',
        url : 'app/submodulo/getsubmodules',
        reader: {
            root: 'data',
            type: 'json'
        },
        actionMethods: {
            read: 'POST'
        }
    },
    listeners: {
        beforeload: function(store, operation){
            var modulo_k = operation.node.get("modulo_k");
            operation.params.modulo_k = modulo_k;
        }
    }
});