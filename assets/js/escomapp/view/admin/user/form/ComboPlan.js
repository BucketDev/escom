Ext.define('EscomApp.view.admin.user.form.ComboPlan', {
    extend      : 'Ext.form.field.ComboBox',
    xtype       : 'admin.user.form.comboplan',
    store       : 'admin.user.Plans',
    displayField: 'nombre',
    valueField  : 'plan_k',
    editable    : false
});