Ext.define('EscomApp.view.admin.user.GridPanel', {
    extend  : 'EscomApp.view.admin.user.GridPanelSearch',
    xtype   : 'admin.user.grid',
    permisos: {},

    /**
     * @override
     */
    getToolbar  : function(){
        var toolbar = EscomApp.view.admin.user.GridPanel.superclass.getToolbar.apply(this, arguments);
        if(this.permisos.agregar_admin_usuarios){
            toolbar.splice(0,0,{
                iconCls : 'user_add32',
                scale   : 'large',
                menu    : [{
                    action  : 'adduser',
                    text    : escom.lang.user.toolbar.adduser,
                    iconCls : 'user_add',
                    scope   : this,
                    handler : Ext.Function.bind(this.showWindow, this, [null], false)
                },{
                    action  : 'addfromfile',
                    text    : escom.lang.user.toolbar.addfromfile,
                    iconCls : 'excel_imports'
                }]
            });
        }
        return toolbar;
    },

    /**
     * @override
     */
    buildColumns  : function(){
        var columns = EscomApp.view.admin.user.GridPanel.superclass.buildColumns.apply(this, arguments);

        if(this.permisos.editar_admin_usuarios){
            columns.push({
                xtype   : 'actioncolumn',
                width   : 30,
                items   : [{
                    icon    : 'assets/img/16/pencil.png',
                    scope   : this,
                    handler : function(grid, rowIndex, colIndex){
                        var selModel = grid.getSelectionModel();

                        selModel.select(rowIndex);
                        this.showWindow(selModel.getLastSelected());
                    }
                }]
            });
        }
        if(this.permisos.eliminar_admin_usuarios){
            columns.push({
                xtype   : 'actioncolumn',
                width   : 30,
                items   : [{
                    icon    : 'assets/img/16/cross.png',
                    handler : function(grid, rowIndex, colIndex){
                    }
                }]
            });
        }
        return columns;
    },

    showWindow   : function(record){

        var title   = Ext.isEmpty(record) ? escom.lang.user.form.addtitle : escom.lang.user.form.edittitle,
            iconCls = Ext.isEmpty(record) ? 'user_add' : 'user_edit',
            win = Ext.create('EscomApp.view.admin.user.WizardWindow', {
                minHeight: 330,
                itemId  : 'userswizard',
                defaultText : escom.lang.user.form.filldata,
                title   : title,
                iconCls : iconCls,
                form    : Ext.create('EscomApp.view.admin.user.form.Panel', {
                    record  : record,
                    isAdd   : Ext.isEmpty(record)
                })
            });
        win.show();
    }
});