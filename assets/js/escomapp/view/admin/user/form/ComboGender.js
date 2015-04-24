Ext.define('EscomApp.view.admin.user.form.ComboGender', {
    extend      : 'Ext.form.field.ComboBox',
    xtype       : 'admin.user.form.combogender',
    queryMode   : 'local',
    store       : Ext.create('Ext.data.Store', {
        fields      : ['gender_k', 'gender'],
        data        : [
            {gender_k: 0, gender: escom.lang.user.form.combo.male},
            {gender_k: 1, gender: escom.lang.user.form.combo.female}
        ]
    }),
    displayField: 'gender',
    valueField  : 'gender_k',
    editable    : false
});