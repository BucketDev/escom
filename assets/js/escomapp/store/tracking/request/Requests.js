Ext.define('EscomApp.store.tracking.request.Requests', {
    extend      : 'Ext.data.Store',
    model       : 'EscomApp.model.tracking.request.Request',
    groupField  : 'documento',
    pageSize    : escom.NUM_PAGINAS,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'serverside/create.php',
            read    : 'app/seguimiento/getseguimientos',
            update  : 'serverside/save.php',
            destroy : 'serverside/remove.php'
        },
        reader: {
            root    : 'data',
            type    : 'json',
            totalProperty: 'total'
        },
        writer: {
            type        : 'json',
            allowSingle : false
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