Ext.define('EscomApp.view.login.form.Form', {
    extend      : 'Ext.form.Panel',
    alias       : 'widget.login.form',
    layout      : 'anchor',
    defaultType : 'textfield',
    height      : 'auto',
    title       : escom.lang.login.form.title,
    icon        : 'assets/img/16/application_form.png',
    border      : false,
    defaults    : {
        msgTarget   : 'side',
        allowBlank  : false,
        anchor      : "100%",
        height      : 35,
        hideLabel   : true
    },

    initComponent   : function(){
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems  : function(){
        return [{
            emptyText   : escom.lang.login.form.user,
            name        : 'user',
            //value       : 'rodrigo',
            allowBlank  : false
        },{
            emptyText   : escom.lang.login.form.pasword,
            //value       : 'robalon',
            inputType   : 'password',
            name        : 'password',
            allowBlank  : false
        },{
            xtype   : 'button',
            action  : 'login',
            text    : escom.lang.login.form.login,
            formBind: true
        },{
            xtype   : 'container',
            action  : 'login',
            html    : '<a href="#">He olvidado mi contraseña</a>'
        }];
    }
});