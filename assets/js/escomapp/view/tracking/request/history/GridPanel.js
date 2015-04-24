Ext.define('EscomApp.view.tracking.request.history.GridPanel', {
    extend  : 'Ext.grid.Panel',
    store   : 'tracking.request.history.Histories',
    xtype   : 'tracking.request.history.grid',
    permisos        : {},
    loadOnRender    : false,

    initComponent: function(){
        Ext.apply(this, {
            columns     : this.buildColumns()
        });

        this.callParent();

        if(this.loadOnRender){
            this.on({
                scope:this,
                render: function(){
                    this.getStore().load();
                }
            });
        }
    },

    buildColumns: function(){
        return [{
            xtype: 'rownumberer'
        },{
            text        : escom.lang.tracking.history.grid.responsible,
            dataIndex   : 'usuario_modificacion_k',
            xtype       : 'templatecolumn',
            tpl         : '<img src="{foto}"> <b>{usuario_modificacion}</b>',
            flex        : 2
        },{
            text        : escom.lang.tracking.history.grid.laststatus,
            dataIndex   : 'estatus_anterior',
            xtype       : 'templatecolumn',
            tpl         : '<b>{estatus_anterior}</b>',
            flex        : 1
        },{
            text        : escom.lang.tracking.history.grid.newstatus,
            dataIndex   : 'estatus_actual',
            xtype       : 'templatecolumn',
            tpl         : '<b>{estatus_actual}</b>',
            flex        : 1
        },{
            text        : escom.lang.tracking.history.grid.dotime,
            dataIndex   : 'timestamp_modificacion',
            xtype       : 'templatecolumn',
            tpl         : '<img src="assets/img/16/date.png"> ' +
                '{[Ext.Date.format(values.timestamp_modificacion, escom.datePatterns.LongDate)]}',
            flex        : 2
        }]
    }
});