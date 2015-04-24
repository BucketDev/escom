Ext.define('EscomApp.view.login.Panel',{
    extend  : 'Ext.panel.Panel',
    alias   : 'widget.login.panel',
    layout  : 'fit',
    border  : false,

    initComponent: function(){
        this.items = this.buildItems();
        this.dockedItems = this.buildDockedItems();
        this.callParent();
    },

    buildItems: function(){
        return  {
            xtype   : 'container',
            border  : false,
            layout  : 'border',
            items   :[{
                xtype   : 'panel',
                title   : escom.lang.login.addpaneltitle,
                region  : 'center',
                bodyCls : 'login_background',
                html    : escom.lang.login.addpanelbody
            },{
                bodyPadding : '70 40',
                xtype   : 'login.form',
                region  : 'east',
                icon    : 'assets/img/16/door_in.png',
                title   : escom.lang.login.title,
                width   : 300
            }]
        }
    },

    buildDockedItems: function(){
        return [{
            xtype   : 'toolbar',
            dock    : 'bottom',
            items   : ['->',escom.lang.login.toolbar +
                ' <a href="https://twitter.com/RodrigoLoyJar" target="_blank">@RodrigoLoyJar</a>', '|', 'ESCOM', '|',
                '© Copyright 2014','->']
        }];
    }
});