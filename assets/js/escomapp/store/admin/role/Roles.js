Ext.define('EscomApp.store.admin.role.Roles', {
    extend      : 'Ext.data.Store',
    model       : 'EscomApp.model.admin.role.Role',
    pageSize    : escom.NUM_PAGINAS,
    proxy: {
        type: 'ajax',
        api: {
            read    : 'app/rol/getroles'
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