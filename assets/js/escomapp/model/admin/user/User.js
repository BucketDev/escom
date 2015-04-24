Ext.define('EscomApp.model.admin.user.User', {
    extend      : 'Ext.data.Model',
    idProperty  : 'usuario_k',
    fields      : [
        {name: 'usuario_k',         type: 'int'},
        {name: 'rol_k',             type: 'int'},
        {name: 'rol',               type: 'string'},
        {name: 'usuario',           type: 'string'},
        {name: 'nombre',            type: 'string'},
        {name: 'apellido_paterno',  type: 'string'},
        {name: 'apellido_materno',  type: 'string'},
        {name: 'foto',              type: 'string'},
        {name: 'curp',              type: 'string'},
        {name: 'genero',            type: 'int'},
        {name: 'edad',              type: 'int'},
        {name: 'correo',            type: 'string'},
        {name: 'boleta',            type: 'int',    useNull: true},
        {name: 'carrera_k',         type: 'int',    useNull: true},
        {name: 'carrera',           type: 'string'},
        {name: 'plan_k',            type: 'int',    useNull: true},
        {name: 'plan',              type: 'string'},
        {name: 'periodo_ingreso',   type: 'string'},
        {name: 'semestre',          type: 'int',    useNull: true},
        {name: 'turno',             type: 'int',    useNull: true},
        {name: 'timestamp_creacion',type: 'date',   dateFormat:'Y-m-d H:i:s'},
        {name: 'usuario_creacion_k',type: 'int'}
    ]
});