Ext.define('EscomApp.store.tracking.request.history.Histories', {
    extend      : 'Ext.data.Store',
    model       : 'EscomApp.model.tracking.request.history.History',
    pageSize    : escom.NUM_PAGINAS,
    proxy: {
        type: 'ajax',
        url         : 'app/seguimiento/gethistoricoseguimientos',
        reader: {
            root    : 'data',
            type    : 'json'
        },
        actionMethods: {
            read: 'POST'
        }
    }
});