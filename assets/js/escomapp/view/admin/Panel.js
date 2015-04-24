Ext.define('EscomApp.view.admin.Panel',{
    extend  : 'Ext.panel.Panel',
    xtype   : 'admin.panel',
    layout  : 'border',
    border  : false,

    initComponent: function(){
        this.items = this.buildItems();
        this.dockedItems = this.buildDockedItems();
        this.callParent();
    },

    buildItems: function(){
        return  [{
            xtype   : 'tabpanel',
            itemId  : 'maintabs',
            region  : 'center',
            border  : false
        },{
            xtype   : 'admin.activities.panelactivities',
            region  : 'west',
            split   : true,
            width   : 280,
            collapsible     : true,
            titleCollapse   : true,
            minWidth        : 200,
            maxWidth        : 350
        }];
    },

    buildDockedItems: function(){
        var nombreSesion = escom.lang.admin.weolcome + ' ' + EscomApp.datos.nombre + ' ' +
            EscomApp.datos.apellido_paterno + '!';
        return [{
            xtype   : 'toolbar',
            dock    : 'top',
            items   : ['->', nombreSesion, {
                icon    : 'assets/img/16/user_batman.png',
                text    : escom.lang.admin.myprofile
            },{
                action  : 'logout',
                icon    : 'assets/img/16/door_out.png',
                text    : escom.lang.admin.closesesion
            }]
        },{
            xtype   : 'toolbar',
            dock    : 'bottom',
            items   : ['->',escom.lang.login.toolbar +
                ' <a href="https://twitter.com/RodrigoLoyJar" target="_blank">@RodrigoLoyJar</a>', '|', 'ESCOM', '|',
                '© Copyright 2014','->']
        }];
    }
});