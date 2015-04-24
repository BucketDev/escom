Ext.define('EscomApp.view.admin.role.form.ComboRole', {
    extend      : 'Ext.form.field.ComboBox',
    xtype       : 'admin.role.form.comborole',
    store       : 'admin.role.Roles',
    displayField: 'nombre',
    valueField  : 'rol_k',
    editable    : false
});