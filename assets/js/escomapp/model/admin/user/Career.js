Ext.define('EscomApp.model.admin.user.Career', {
    extend      : 'Ext.data.Model',
    idProperty  : 'carrera_k',
    fields      : [
        {name   : 'carrera_k',  type : 'int'},
        {name   : 'nombre',    type : 'string'}
    ]
});