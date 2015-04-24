Ext.define('EscomApp.view.tracking.request.GridPanel', {
    extend  : 'Ext.grid.Panel',
    store   : 'tracking.request.Requests',
    xtype   : 'tracking.request.grid',
    permisos        : {},
    loadOnRender    : true,

    initComponent: function(){
        Ext.apply(this, {
            features: [{
                ftype: 'grouping',
                groupHeaderTpl: 'Documento: {name} ({children.length})'
            }],
            columns: this.buildColumns(),
            dockedItems: this.buildDockedItems()
        });

        this.callParent();

        this.relayEvents(this.getStore(), ['load']);

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
        var columns = [{
            xtype: 'rownumberer',
            tdCls: 'rownumberer-vertical-middle'
        },{
            text        : escom.lang.tracking.grid.requester,
            dataIndex   : 'nombre',
            xtype       : 'templatecolumn',
            tpl         : '<img src="{foto}"> <b>{nombre}</b>',
            flex        : 3
        },{
            text        : escom.lang.tracking.grid.status,
            dataIndex   : 'estatus',
            xtype       : 'templatecolumn',
            tpl         : '<b>{estatus}</b>',
            flex        : 1
        },{
            xtype       : 'templatecolumn',
            text        : escom.lang.tracking.grid.deliverytime,
            dataIndex   : 'fecha_solicitud',
            flex        : 2,
            tpl         : new Ext.XTemplate(
                '<div style="color: #f0ad4e">' +
                    '<img src="assets/img/16/date_next.png"> <strong>Del: </strong>{[this.getDate(values)]}<br>' +
                    '<img src="assets/img/16/date_previous.png"> <strong>Al: </strong>{[this.getDeliveryDate(values)]}' +
                    '</div>',
                {
                    getDate : function(values){
                        return Ext.Date.format(values.fecha_solicitud, escom.datePatterns.LongDate)
                    },
                    getDeliveryDate: function(values){
                        var deliveryDate = Ext.Date.add(values.fecha_solicitud, Ext.Date.DAY, values.tiempo_minimo);
                        return Ext.Date.format(deliveryDate, escom.datePatterns.LongDate)
                    }
                })
        }];
        if(this.permisos.editar_seguimiento_solicitudes){
            columns.push({
                xtype   : 'actioncolumn',
                width   : 40,
                items   : [{
                    icon: 'assets/img/16/draw_eraser.png',
                    handler : function(grid, rowIndex, colIndex){
                        var selectionModel = grid.getSelectionModel(),
                            record;
                        selectionModel.select(rowIndex);
                        record = selectionModel.getLastSelected();
                        Ext.Msg.alert('Action','You\'re going to edit: ' + record.get('nombre'));
                    }
                }]
            });
        }
        return columns;
    },

    buildDockedItems: function(){
        return [{
            xtype   : 'pagingtoolbar',
            dock    : 'bottom',
            store   : this.getStore(),
            displayInfo: true
        }]
    }
});