Ext.define('EscomApp.model.tracking.request.history.History',{
    extend  : 'Ext.data.Model',
    idProperty  : 'historial_seguimiento_k',
    fields      : [
        {name: 'historial_seguimiento_k',   type: 'int'},
        {name: 'seguimiento_k',         type: 'int'},
        {name: 'estatus_anterior_k',    type: 'int'},
        {name: 'estatus_anterior',      type: 'string'},
        {name: 'estatus_actual_k',      type: 'int'},
        {name: 'estatus_actual',        type: 'string'},
        {name: 'usuario_modificacion_k',type: 'int'},
        {name: 'foto',                  type: 'string'},
        {name: 'usuario_modificacion',  type: 'string'},
        {name: 'timestamp_modificacion',type: 'date', dateFormat: 'Y-m-d H:i:s'}
    ]
});