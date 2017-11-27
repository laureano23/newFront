Ext.define('MetApp.view.Proveedores.FormasPagoView',{
	extend: 'Ext.window.Window',
	width: 490,
	modal: true,
	layout: 'anchor',
	alias: 'widget.FormasPagoView',
	itemId: 'FormasPagoView',
	autoShow: true,
	title: 'Tabla de Formas de Pago',
	
	initComponent: function(){		
		var me = this;
		var botonera = Ext.create('MetApp.resources.ux.BtnABMC');
		botonera.queryById('btnReset').hide();
		
		Ext.applyIf(me, {
			items: [
				{
					xtype: 'form',
					anchorSize: '100%',	
					border: false,
					margin: '5 5 5 5',
					defaults: {
						readOnly: true,
						disabledCls: 'myDisabledClass'
					},
					items: [
						{
							xtype: 'numberfield',
							itemId: 'id',
							fieldLabel: 'Id',
							name: 'id',
							hidden: true
						},						
						{
							xtype: 'textfield',
							name: 'formaPago',
							itemId: 'formaPago',
							fieldLabel: 'Forma de Pago',
							width: 450
						},
						{
							xtype: 'combobox',
							name: 'conceptoBancario',
							itemId: 'conceptoBancario',
							fieldLabel: 'Concepto bancario',
							store: 'MetApp.store.Bancos.ConceptosBancoStore',
							displayField: 'concepto',
							valueField: 'id',
							width: 450
						},
						{
							xtype: 'grid',
							height: 200,
							margin: '0 0 5 0',
							store: 'MetApp.store.Finanzas.TiposPagoStore',
							disabled: false,
							columns: [
								{ text: 'Id', dataIndex: 'id' },
								{ text: 'Concepto', dataIndex: 'descripcion', flex: 1 },
								{ text: 'Concepto bancario', dataIndex: 'conceptoBancario', flex: 1, hidden: true }
							],
							width: 450
						},
						botonera
					]
				}
			]
		});
	this.callParent();
	},
});


