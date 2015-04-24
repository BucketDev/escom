Ext.define('EscomApp.view.admin.user.form.ComboCareer', {
    extend      : 'Ext.form.field.ComboBox',
    xtype       : 'admin.user.form.combocareer',
    store       : 'admin.user.Careers',
    displayField: 'nombre',
    valueField  : 'carrera_k',
    editable    : false
});