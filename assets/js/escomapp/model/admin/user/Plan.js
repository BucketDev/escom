Ext.define('EscomApp.model.admin.user.Plan', {
    extend      : 'Ext.data.Model',
    idProperty  : 'plan_k',
    fields      : [
        {name   : 'plan_k',     type : 'int'},
        {name   : 'nombre',     type : 'string'}
    ]
});