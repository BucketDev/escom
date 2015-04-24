Ext.define('EscomApp.model.tracking.request.category.Category',{
    extend  : 'Ext.data.Model',
    idProperty  : 'llave_k',
    fields      : [
        {name: 'llave_k',   type: 'int'},
        {name: 'nombre',    type: 'string'},
        {name: 'valor',     type: 'int'}
    ]
});