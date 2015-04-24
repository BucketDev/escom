Ext.define('EscomApp.controller.login.Login', {
    extend: 'Ext.app.Controller',
    //models: ['clients.Client'],
    //stores: ['clients.Clients'],

    views: [
        'login.Viewport',
        'login.form.Form',
        'login.Panel'
    ],

    init: function(){
        this.control({
            'form textfield[name=password]':{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        this.doLogin();
                    }
                }
            },
            'form button[action=clear]':{
                click   : function(){
                    this.formLogin.getForm().reset();
                    this.formLogin.child(':focusable').focus();
                }
            },
            'form button[action=login]':{
                click   : this.doLogin
            }
        });
    },

    doLogin: function(){
        Ext.Msg.wait(escom.lang.login.loging, escom.lang.window.waiting);


        var params = this.formLogin.getForm().getValues();

        params.password = hex_sha1(params.password);

        escom.post('login', 'authenticate', {
            params  : params,
            success : function(response){
                //Ext.MessageBox.hide();

                var decoded_response = Ext.decode(response.responseText);
                if(decoded_response.success){
                    window.location.href = "admin";
                } else {
                    //crear tooltips o mensajes
                }

            }
        });
    },

    onLaunch: function(){
        Ext.create('EscomApp.view.login.Viewport');

        this.formLogin = Ext.ComponentQuery.query('form')[0];
        //this.formLogin.child(':focusable').focus();
    }
});