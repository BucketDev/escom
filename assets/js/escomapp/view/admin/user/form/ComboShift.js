Ext.define('EscomApp.view.admin.user.form.ComboShift', {
    extend      : 'Ext.form.field.ComboBox',
    fieldLabel  : 'Choose State',
    xtype       : 'admin.user.form.comboshift',
    allowBlank  : true,
    editable    : false,
    store       : Ext.create('Ext.data.Store', {
        fields: ['id', 'nombre'],
        data : [
            {id:0, "nombre": escom.lang.user.form.combo.morningshift},
            {id:1, "nombre": escom.lang.user.form.combo.afternoonshift}
        ]
    }),
    queryMode   : 'local',
    displayField: 'nombre',
    valueField  : 'id'
});