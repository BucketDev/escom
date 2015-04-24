Ext.define('EscomApp.model.admin.role.Role', {
    extend      : 'Ext.data.Model',
    idProperty  : 'rol_k',
    fields      : [
        {name   : 'rol_k',      type : 'int'},
        {name   : 'nombre',     type : 'string'},
        {name   : 'categoria_k',type : 'int'}
    ]
});