Ext.define('EscomApp.controller.tracking.Requests', {
    extend  : 'Ext.app.Controller',
    models  : [
        'tracking.request.Request',
        'tracking.request.category.Category',
        'tracking.request.history.History'
    ],
    stores  : [
        'tracking.request.Requests',
        'tracking.request.category.Categories',
        'tracking.request.history.Histories'
    ],
    views   : [
        'tracking.request.GridPanel',
        'tracking.request.category.GridPanel',
        'tracking.request.history.GridPanel',
        'tracking.request.Panel'
    ],
    permisos    : {},
    params      : [{
        category: 'date',
        keys    : []
    },{
        category : 'status',
        keys    : []
    },{
        category : 'document',
        keys    : []
    }],

    init: function(){
        this.control({
            '#maintabs #requestspanel #trackinggrid'    : {
                itemclick: function(grid, record){
                    if(!this.gridHistory.collapsed){
                        this.historyExpanded(record);
                    } else {
                        this.gridHistory.expand();
                    }
                },
                load    : function(){
                    this.gridTracking.getSelectionModel().deselectAll();
                    this.gridHistory.body.mask('Selecciona un registro de seguimiento');
                }
            },
            '#maintabs #requestspanel #panelcategories > grid'    : {
                filterselected   : this.filterTrackings
            },
            '#maintabs #requestspanel #gridhistory'  :{
                expand  : function(){
                    var selModel = this.gridTracking.getSelectionModel();
                    if(!selModel.hasSelection()){
                        this.gridHistory.body.mask('Selecciona un registro de seguimiento');
                    } else {
                        this.historyExpanded(selModel.getSelection()[0]);
                    }
                }
            }
        });
    },

    onLaunch: function(){
        this.panel = Ext.ComponentQuery.query('#maintabs #requestspanel')[0];
        this.gridTracking = Ext.ComponentQuery.query('#maintabs #requestspanel #trackinggrid')[0];
        this.gridHistory = Ext.ComponentQuery.query('#maintabs #requestspanel #gridhistory')[0];
    },

    addContent  : function(){
        this.container.add({
            xtype   : 'tracking.request.panel',
            border  : false,
            itemId  : 'requestspanel',
            permisos    : this.permisos
        });
    },

    filterTrackings : function(params){
        var store = this.gridTracking.getStore();
        Ext.each(this.params, function(filter){
            if(params.category == filter.category){
                filter.keys = params.keys;
            }
        });
        store.getProxy().extraParams = {params: Ext.encode(this.params)};
        //Restart store paging params
        store.currentPage = 1;
        store.load();
    },

    historyExpanded : function(record){
        this.gridHistory.body.unmask();
        this.gridHistory.getStore().load({
            scope   : this,
            params  : {
                seguimiento_k    : record.data.seguimiento_k
            }
        });
    }
});