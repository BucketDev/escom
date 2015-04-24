Ext.define('EscomApp.store.tracking.request.category.Categories', {
    extend      : 'Ext.data.Store',
    model       : 'EscomApp.model.tracking.request.category.Category',
    pageSize    : escom.NUM_PAGINAS,
    proxy: {
        type: 'ajax',
        url         : '',
        reader: {
            root    : 'data',
            type    : 'json'
        },
        writer: {
            type        : 'json',
            allowSingle : false
        },
        actionMethods: {
            read: 'POST'
        }
    }
});