Ext.define('EscomApp.store.admin.user.Plans', {
    extend      : 'Ext.data.Store',
    model       : 'EscomApp.model.admin.user.Plan',
    pageSize    : escom.NUM_PAGINAS,
    proxy: {
        type: 'ajax',
        api: {
            read    : 'app/usuario/getplans'
        },
        reader: {
            root    : 'data',
            type    : 'json'
        },
        actionMethods: {
            read: 'POST'
        }
    },
    listeners   : {
        scope       : this,
        beforeload  : function(store, operaton){
            //console.log(operaton);
        }
    }
});