Ext.define('EscomApp.model.tracking.request.Request', {
    extend      : 'Ext.data.Model',
    idProperty  : 'seguimiento_k',
    fields      : [
        {name: 'seguimiento_k', type: 'int'},
        {name: 'documento_k',   type: 'int'},
        {name: 'estatus_k',     type: 'int'},
        {name: 'tiempo_minimo',     type: 'int'},
        {name: 'documento',     type: 'string'},
        {name: 'estatus',       type: 'string'},
        {name: 'nombre',        type: 'string'},
        {name: 'foto',          type: 'string'},
        {name: 'fecha_solicitud',   type: 'date',   dateFormat: 'Y-m-d H:i:s'}
    ]
});