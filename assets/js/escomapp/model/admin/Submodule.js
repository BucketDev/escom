Ext.define('EscomApp.model.admin.Submodule', {
    extend      : 'Ext.data.Model',
    fields      : [
        {name: 'modulo_k',      type: 'int'},
        {name: 'submodulo_k',   type: 'int'},
        {name: 'text',          type: 'string', mapping: 'nombre'},
        {name: 'descripcion',   type: 'string'},
        {name: 'controlador',   type: 'string'},
        {name: 'iconCls',       type: 'string', mapping: 'icono'}
    ]
});