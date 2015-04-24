Ext.define('EscomApp.view.admin.user.GridPanelSearch', {
    extend  : 'Ext.grid.Panel',
    store   : 'admin.user.Users',
    requires: 'Ext.ux.form.SearchField',
    xtype   : 'admin.user.gridsearch',
    permisos: {},
    loadOnRender    : true,
    plugins: [{
        ptype       : 'rowexpander',
        rowBodyTpl  : new Ext.XTemplate(
            '<div class="admin_user_container">' +
                '<ul class="admin_user_column column_photo">' +
                    '<li><img src="{foto}" width="50px"></li>' +
                '</ul>' +
                '<ul class="admin_user_column column_personal">' +
                    '<li><strong>CURP: </strong>{curp}</li>' +
                    '<li><strong>' + escom.lang.user.grid.age + ': </strong>{edad} años</li>' +
                    '<li><strong>' + escom.lang.user.grid.mail + ': </strong>{correo}</li>' +
                '</ul>' +
                '<div class="admin_user_column column_academic">' +
                    '<div><strong>' + escom.lang.user.grid.career + ': </strong>{carrera}</div>' +
                    '<div>' +
                        '<div><strong>' + escom.lang.user.grid.plan + ': </strong>{plan}</div>' +
                        '<div><strong>' + escom.lang.user.grid.period + ': </strong>{periodo_ingreso}</div>' +
                    '</div>' +
                    '<div>' +
                        '<div><strong>' + escom.lang.user.grid.semester + ': </strong><span class="badge">{semestre}</span></div>' +
                        '<div><strong>' + escom.lang.user.grid.shift + ': </strong>' +
                            '<tpl if="this.sinTurno(turno)">' +
                                '<em>Sin turno</em>' +
                            '<tpl elseif="turno == 0">' +
                                'Matutino' +
                            '<tpl else>' +
                                'Vespertino' +
                            '</tpl>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>',
            {
                sinTurno    : function(turno){
                    return Ext.isEmpty(turno) && turno !== 0;
                }
            }/*,{
         formatChange: function(v){
         var color = v >= 0 ? 'green' : 'red';
         return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
         }
         }*/)
    }],

    initComponent: function(){
        this.store = Ext.create('EscomApp.store.admin.user.Users');
        Ext.apply(this, {
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
            xtype: 'rownumberer'
        },{
            text    : escom.lang.user.grid.enrollment,
            dataIndex   : 'boleta',
            xtype   : 'templatecolumn',
            align   : 'center',
            tpl         : new Ext.XTemplate(
                '<tpl if="this.sinBoleta(boleta)">' +
                '<em>Sin boleta</em>' +
                '<tpl else>' +
                '{boleta}' +
                '</tpl>',
                {
                    sinBoleta    : function(boleta){
                        return Ext.isEmpty(boleta) || boleta === 0;
                    }
                }),
            flex    : 1
        },{
            text    : escom.lang.user.grid.name,
            dataIndex   : 'usuario_k',
            xtype   : 'templatecolumn',
            tpl     : '<b>{nombre} {apellido_paterno} {apellido_materno}</b>',
            flex    : 2
        },{
            text    : escom.lang.user.grid.role,
            dataIndex   : 'rol',
            xtype   : 'templatecolumn',
            tpl     : '<div class="admin_user_column_role">{rol}</div>',
            flex    : 1
        },{
            text    : escom.lang.user.grid.gender,
            dataIndex   : 'genero',
            align   : 'center',
            xtype   : 'templatecolumn',
            tpl     :
                '<tpl if="genero == 0">' +
                    '<img src="assets/img/16/user_student.png"> <b>Hombre</b>' +
                '<tpl else>' +
                    '<img src="assets/img/16/user_student_female.png"> <b>Mujer</b>' +
                '</tpl>',
            flex    : 1
        }];
        return columns;
    },

    buildDockedItems: function(){
        return [this.getPagingToolbar(),{
            xtype   : 'toolbar',
            dock    : 'top',
            layout  : {
                type    : 'hbox',
                align   : 'stretch',
                pack    : 'center'
            },
            items   : this.getToolbar()
        }]
    },

    getPagingToolbar    : function(){
        return {
            xtype   : 'pagingtoolbar',
            dock    : 'bottom',
            store   : this.getStore(),
            displayInfo: true
        };
    },

    getToolbar  : function(){
        return ['->',{
            flex    : 1,
            xtype   : 'searchfield',
            store   : this.store,
            emptyText   : escom.lang.form.search
        }];
    }
});