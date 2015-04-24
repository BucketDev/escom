Ext.define('EscomApp.store.admin.user.Users', {
    extend      : 'Ext.data.Store',
    model       : 'EscomApp.model.admin.user.User',
    pageSize    : escom.NUM_PAGINAS,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'serverside/create.php',
            read    : 'app/usuario/getusuarios',
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