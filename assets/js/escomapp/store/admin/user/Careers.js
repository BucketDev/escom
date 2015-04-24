Ext.define('EscomApp.store.admin.user.Careers', {
    extend      : 'Ext.data.Store',
    model       : 'EscomApp.model.admin.user.Career',
    pageSize    : escom.NUM_PAGINAS,
    proxy: {
        type: 'ajax',
        api: {
            read    : 'app/usuario/getcareers'
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