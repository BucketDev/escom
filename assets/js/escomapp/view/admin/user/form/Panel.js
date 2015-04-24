Ext.define('EscomApp.view.admin.user.form.Panel', {
    extend  : 'EscomApp.view.form.WizardForm',
    xtype   : 'admin.user.form.panel',
    isAdd   : false,

    buildItems: function () {
        var items = [
            {
                xtype: 'fieldset',
                title: '<img src="assets/img/16/user_batman.png"> ' + escom.lang.user.form.personaldata,
                layout: 'fit',
                items: {
                    /*Item 1, Personal*/
                    xtype: 'form',
                    border: false,
                    defaultType: 'textfield',
                    defaults: {
                        msgTarget: 'side',
                        allowBlank: true,
                        anchor: "100%",
                        labelWidth: 110,
                        hideLabel: this.isAdd
                    },
                    items: [
                        {
                            fieldLabel: escom.lang.user.form.name,
                            emptyText: escom.lang.user.form.name,
                            allowBlank: false,
                            name: 'nombre'
                        },
                        {
                            fieldLabel: escom.lang.user.form.lastname,
                            emptyText: escom.lang.user.form.lastname,
                            name: 'apellido_paterno'
                        },
                        {
                            fieldLabel: escom.lang.user.form.secondlastname,
                            emptyText: escom.lang.user.form.secondlastname,
                            name: 'apellido_materno'
                        },
                        {
                            fieldLabel  : 'CURP',
                            emptyText   : 'CURP',
                            name        : 'curp',
                            vtype       : 'curp'
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: escom.lang.user.form.age,
                            labelWidth: 110,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    msgTarget: 'side',
                                    emptyText: escom.lang.user.form.age,
                                    name: 'edad',
                                    allowBlank: false,
                                    flex: 1
                                },
                                {
                                    xtype: 'label',
                                    text: escom.lang.user.form.years,
                                    margin: '0 0 0 5',
                                    width: 30
                                }
                            ]
                        },
                        {
                            xtype: 'admin.user.form.combogender',
                            fieldLabel: escom.lang.user.form.gender,
                            emptyText: escom.lang.user.form.gender,
                            allowBlank: false,
                            name: 'genero'
                        }
                    ]
                }
            },
            {
                xtype: 'fieldset',
                title: '<img src="assets/img/16/user_student.png"> ' + escom.lang.user.form.academicdata,
                layout: 'fit',
                items: {
                    /*Item 2, Scholar*/
                    xtype: 'form',
                    name: 'academicdata',
                    border: false,
                    defaultType: 'textfield',
                    defaults: {
                        msgTarget: 'side',
                        allowBlank: true,
                        anchor: "100%",
                        labelWidth: 110,
                        hideLabel: this.isAdd
                    },
                    items: [
                        {
                            xtype: 'admin.user.form.combocareer',
                            fieldLabel: escom.lang.user.form.career,
                            emptyText: escom.lang.user.form.career,
                            name: 'carrera_k'
                        },
                        {
                            xtype: 'admin.user.form.comboplan',
                            fieldLabel: escom.lang.user.form.plan,
                            emptyText: escom.lang.user.form.plan,
                            name: 'plan_k'
                        },
                        {
                            fieldLabel: escom.lang.user.form.period,
                            emptyText: escom.lang.user.form.period,
                            xtype: 'numberfield',
                            name: 'periodo_ingreso',
                            vtype: 'period'
                        },
                        {
                            fieldLabel: escom.lang.user.form.semester,
                            emptyText: escom.lang.user.form.semester,
                            minValue: 1,
                            maxValue: 8,
                            xtype: 'numberfield',
                            name: 'semestre'
                        },
                        {
                            xtype: 'admin.user.form.comboshift',
                            fieldLabel: escom.lang.user.form.shift,
                            emptyText: escom.lang.user.form.shift,
                            name: 'turno'
                        },
                        {
                            fieldLabel: escom.lang.user.form.enrollment,
                            emptyText: escom.lang.user.form.enrollment,
                            xtype: 'numberfield',
                            name: 'boleta',
                            vtype: 'enrollment'
                        }
                    ]
                }
            }];
        if(this.isAdd){
            items.push({
                xtype: 'fieldset',
                title: '<img src="assets/img/16/computer.png"> ' + escom.lang.user.form.platformdata,
                layout: 'fit',
                items: {
                    /*Item 3, Platform*/
                    xtype: 'form',
                    name: 'platformdata',
                    border: false,
                    defaultType: 'textfield',
                    defaults: {
                        msgTarget: 'side',
                        allowBlank: true,
                        anchor: "100%",
                        labelWidth: 110,
                        hideLabel: this.isAdd
                    },
                    items: [
                        {
                            fieldLabel: escom.lang.user.form.mail,
                            emptyText: escom.lang.user.form.mail,
                            allowBlank: false,
                            name: 'correo',
                            vtype: 'email'
                        },
                        {
                            fieldLabel: escom.lang.user.form.user,
                            emptyText: escom.lang.user.form.user,
                            allowBlank: false,
                            name: 'usuario'
                        },
                        {
                            fieldLabel: escom.lang.user.form.password,
                            emptyText: escom.lang.user.form.password,
                            inputType: 'password',
                            name: 'password',
                            allowBlank: false,
                            submitValue: false
                        },
                        {
                            fieldLabel: escom.lang.user.form.repassword,
                            emptyText: escom.lang.user.form.repassword,
                            inputType: 'password',
                            name: 'repassword',
                            allowBlank: false,
                            submitValue: false,
                            validateOnChange: true,
                            validator: function(value){
                                var passValue = Ext.ComponentQuery.query('textfield[name="password"]')[0].getValue();
                                if(passValue !== value){
                                    return "Las contraseñas no coinciden";
                                }
                                return true;
                            }
                        },
                        {
                            xtype: 'admin.role.form.comborole',
                            fieldLabel: escom.lang.user.form.role,
                            emptyText: escom.lang.user.form.role,
                            allowBlank: false,
                            name: 'rol_k'
                        },
                        {
                            fieldLabel: escom.lang.user.form.photo,
                            emptyText: escom.lang.user.form.photo,
                            allowBlank: true,
                            buttonText: escom.lang.user.form.upload,
                            xtype: 'filefield',
                            clearOnSubmit: false,
                            hideLabel: true,
                            name: 'foto'
                        }
                    ]
                }
            });
        }
        return items;
    },

    save: function () {
        var params = {};

        if(!this.isAdd) {
           params.usuario_k = this.record.usuario_k;
        } else {
            var contrasena = hex_sha1(this.down('textfield[name="password"]').getValue());
            params = {
                contrasena: contrasena,
                hasFoto: this.down('filefield').getValue() ? true : false
            };
        }

        this.getForm().submit({
            url: !this.isAdd ? 'app/usuario/edituser' : 'app/usuario/adduser',
            submitEmptyText: false,
            scope: this,
            params: params,
            success: function () {
                this.up().close();
            },
            failure: function (form, action) {
                escom.alert(escom.lang.window.failtitle, action.result.msg, 'error');
                this.body.unmask();
                this.up().sb.clearStatus({useDefaults: true});

            }
        });
    }
});