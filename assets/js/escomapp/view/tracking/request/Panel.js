Ext.define('EscomApp.view.tracking.request.Panel',{
    extend  : 'Ext.panel.Panel',
    xtype   : 'tracking.request.panel',
    layout  : 'border',
    permisos    : {},

    initComponent: function(){
        this.items = this.buildItems();
        this.callParent();
    },

    buildItems: function(){
        return  [{
            xtype   : 'container',
            layout  : 'border',
            region  : 'center',
            defaults: {
                permisos    : this.permisos
            },
            items   : [{
                region  : 'center',
                xtype   :  'tracking.request.grid',
                itemId  : 'trackinggrid'
            },{
                xtype   : 'tracking.request.history.grid',
                itemId  : 'gridhistory',
                iconCls : 'clock_history_frame',
                title   : escom.lang.tracking.history.title,
                region  : 'south',
                height  : 230,
                collapsible     : true,
                collapsed       : true,
                titleCollapse   : true,
                border          : false
            }]
        },{
            xtype   : 'panel',
            region  : 'east',
            border  : false,
            iconCls : 'categories',
            itemId  : 'panelcategories',
            width   : 250,
            title   : escom.lang.tracking.requests.title,
            collapsible     : true,
            titleCollapse   : true,
            split           : true,
            minWidth        : 200,
            maxWidth        : 300,
            layout  : {
                type    : 'vbox',
                align   : 'stretch'
            },
            items   : [{
                xtype   : 'tracking.request.category.grid',
                border  : false,
                title   : escom.lang.tracking.requests.periods,
                flex    : 1,
                modeSelection   : 'single'
            },{
                xtype   : 'tracking.request.category.grid',
                title   : escom.lang.tracking.requests.status,
                url     : 'app/seguimiento/getbystatus',
                category: 'status',
                border  : false,
                flex    : 1
            },{
                xtype   : 'tracking.request.category.grid',
                title   : escom.lang.tracking.requests.documents,
                url     : 'app/seguimiento/getbydocuments',
                category: 'document',
                border  : false,
                flex    : 1
            }]
        }];
    }
});