Ext.define('EscomApp.view.tracking.request.category.GridPanel', {
    extend  : 'Ext.grid.Panel',
    xtype   : 'tracking.request.category.grid',
    url     : 'app/seguimiento/getbytime',
    category: 'date',
    hideHeaders     : true,
    modeSelection   : 'simple',

    initComponent: function(){

        Ext.apply(this, {
            store   : Ext.create('EscomApp.store.tracking.request.category.Categories'),
            columns : this.buildColumns(),
            selModel: Ext.create('Ext.selection.CheckboxModel', {
                allowDeselect   : false,
                mode            : this.modeSelection
            })
        });

        this.callParent();

        this.addEvents('filterselected');

        this.getStore().getProxy().url = this.url;

        this.on({
            scope:this,
            render: function(){
                this.getStore().load();
            }
        });

        this.getSelectionModel().on({
            scope   : this,
            select  : this.loadParams,
            deselect: function(selModel){
                //Se omite la deselección del primer grid, ya que causa un error con la seleccón simple,
                //al llamarse dos veces
                if(this.modeSelection !== 'single'){
                    this.loadParams(selModel);
                }
            }
        })
    },

    buildColumns: function(){
        return [{
            text        : escom.lang.tracking.grid.requester,
            dataIndex   : 'nombre',
            xtype       : 'templatecolumn',
            tpl         : '<b>{nombre}</b>',
            flex        : 1
        },{
            xtype   : 'templatecolumn',
            tpl     : '<span class="badge {[values.valor > 0 ? \'badge-success\' : \'\' ]}">{valor}</span>',
            width   : 40
        }]
    },

    loadParams  : function(selModel){
        var filters = selModel.getSelection(),
            params  = {
                category    : this.category,
                keys      : []
            };

        Ext.each(filters, function(filter){
            params.keys.push(filter.data.llave_k);
        }, this);
        this.fireEvent('filterselected', params);
    }
});