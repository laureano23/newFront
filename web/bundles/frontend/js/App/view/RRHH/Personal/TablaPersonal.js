Ext.define('MetApp.view.RRHH.Personal.TablaPersonal', {
	extend: 'Ext.form.Panel',
	modal: true,	
	width: 900,
	height: 420,
	layout: 'border',
	border: false,
	itemId: 'personalTabla',
	alias: 'widget.personalTabla',	
	autoShow: true,
	defaults: {
		border: false,
		frame: false
	},
	
	initComponent: function(){
		var me = this;
		var autz = MetApp.app.getController('Security.Autorizaciones');
		autz.authorization(MetApp.User);
				
		var items = [
			{
				xtype: 'combobox',
				forceSelection: true,
				name: 'sindicato',
				allowBlank: false,
				itemId: 'comboSindicato',
				store: 'MetApp.store.Personal.SindicatosStore',
				displayField: 'sindicato',
				valueField: 'idSindicato',
				fieldLabel: 'Sindicato',
				disabledCls: 'myDisabledClass',
				disabled: true
			},
			{
				xtype: 'combobox',
				forceSelection: true,
				queryMode: 'local',
				name: 'categoria',
				allowBlank: false,
				itemId: 'comboCategoria',
				store: 'MetApp.store.Personal.CategoriasStore',
				displayField: 'categoria',
				valueField: 'idCategoria',
				fieldLabel: 'Categoria',
				disabledCls: 'myDisabledClass',
				disabled: true
			},
			{
				xtype: 'datefield',
				format: 'd/m/Y',
				name: 'fechaIngreso',
				allowBlank: false,
				fieldLabel: 'Fecha ingreso',
				disabledCls: 'myDisabledClass',
				disabled: true
			},
			{
				xtype: 'datefield',
				format: 'd/m/Y',
				name: 'fechaEgreso',
				fieldLabel: 'Fecha egreso',
				disabledCls: 'myDisabledClass',
				disabled: true
			},
			{
				xtype: 'datefield',
				format: 'd/m/Y',
				name: 'fechaNacimiento',
				fieldLabel: 'Fecha nacimiento',
				disabledCls: 'myDisabledClass',
				disabled: true,
				allowBlank: false
			},
			{
				xtype: 'textfield',
				name: 'tarea',
				labelWidth: 150,
				fieldLabel: 'Tarea desempeñada',
				disabledCls: 'myDisabledClass',
				disabled: true
			},
			{
				xtype: 'combobox',
				name: 'sector',
				allowBlank: false,
				itemId: 'comboSector',
				store: 'MetApp.store.Produccion.Programacion.SectoresStore',
				displayField: 'descripcion',
				valueField: 'id',
				fieldLabel: 'Sector',
				disabledCls: 'myDisabledClass',
				disabled: true
			},
			{
	            xtype: 'radiogroup',
	            disabledCls: 'myDisabledClass',
				disabled: true,
	            fieldLabel: 'Periodo',
	            defaultType: 'radiofield',
	            layout: 'hbox',
	            items: [
		            {
		            	xtype: 'radiofield',
						name: 'periodo',
						boxLabel: 'Quincenal',
						inputValue: '0',		//EMPLEADO QUINCENAL
						checked: true,
						margin: '0 5 0 0',
						allowBlank: false
					},
					{
						xtype: 'radiofield',
						inputValue: '1',		//EMPLEADO MENSUAL
						name: 'periodo',
						boxLabel: 'Mensual'
					}
	            ]
	       	},
			{
				xtype: 'numberfield',	
				name: 'salario',
				itemId: 'oficial',								
				fieldLabel: 'Oficial',
				disabledCls: 'myDisabledClass',
				disabled: true,
			},
			{
				xtype: 'numberfield',
				name: 'compensatorio',
				require: {role1:true},
				itemId: 'compensatorio',
				fieldLabel: 'Compensatorio',
				disabledCls: 'myDisabledClass',
				disabled: true,
				decimalSeparator: '.'
			},	
			{
				xtype: 'numberfield',
				name: 'cuil',
				itemId: 'cuil',
				fieldLabel: 'CUIL N°',
				disabledCls: 'myDisabledClass',
				disabled: true,
				allowBlank: false
			},
			{
				xtype: 'textfield',
				labelWidth: 170,
				name: 'tipoContratacion',
				itemId: 'tipoContratacion',
				fieldLabel: 'Tipo de contratacion',
				disabledCls: 'myDisabledClass',
				disabled: true,
			},
			{
				xtype: 'container',
				layout: 'hbox',
				items: [
					{
						xtype: 'checkbox',
						margin: '0 5 0 0',
						name: 'antiguedad',
						itemId: 'antiguedad',
						fieldLabel: 'Antiguedad',
						disabledCls: 'myDisabledClass',
						disabled: true,
						checked: true,
						uncheckedValue: 0,
						value: 1
					},
					{
						xtype: 'numberfield',
						width: 200,
						fieldLabel: 'Porcentaje',
						name: 'antPorcentaje',
						itemId: 'antPorcentaje',
						disabledCls: 'myDisabledClass',
						disabled: true,
					}
				]
			}
		]
		
	
		me.items = [{
			xtype: 'form',
			//require: {role1:true},
			region: 'center',
			itemId: 'formPersonal',
			frame: false,
			border: false,
			layout: 'hbox',
			items: [
				{
					xtype: 'container',
					frame: false,
					margins: '5 5 5 5',
					flex: 1,
					items: [
						{
							xtype: 'container',
							layout: 'hbox',
							defaults: {
								disabledCls: 'myDisabledClass',
							},
							items: [
								{
									xtype: 'numberfield',
									itemId: 'idP',
									name: 'idP',
									hidden: true
								},
								{
									xtype: 'textfield',	
									name: 'nombre',	
									itemId: 'nombre',									
									disabled: true,
									fieldLabel: 'Nombre',
									name: 'nombre',
									allowBlank: false,
									width: 400
								},
								{
									xtype: 'button',
									action: 'buscaEmp',
									itemId: 'buscaEmp',
									iconCls: 'search',
									height: 25,
									width: 30,
									margin: '0 5 0 5'
								},		
							]	
						},															
						{
							xtype: 'fieldset',
							defaults: {
								disabledCls: 'myDisabledClass',
								disabled: true
							},
							itemId: 'fieldSetDir',
							title: 'Domicilio',
							collapsible: true,
							collapsed: false,
							items: [
								{
									xtype: 'textfield',
									fieldLabel: 'Direccion',
									width: 400,
									name: 'direccion',
									allowBlank: false,
								},
								{
									xtype: 'combobox',
									name: 'provincia',
									itemId: 'comboProv',
									store: 'MetApp.store.Personal.ProvinciasStore',
									displayField: 'nombre',
									forceSelection: true,
									queryMode: 'local',
									valueField: 'idProvincia',
									typeAhead: true,							
									minChars: 1,
									fieldLabel: 'Provincia',
									width: 400
								},
								{
									xtype: 'combobox',
									forceSelection: true,
									queryMode: 'local',
									name: 'departamento',
									itemId: 'comboPartido',
									store: 'MetApp.store.Personal.PartidosStore',
									displayField: 'nombre',
									valueField: 'idPartido',
									typeAhead: true,
									minChars: 1,
									fieldLabel: 'Partido',
									width: 400
								},
								{
									xtype: 'combobox',
									forceSelection: true,
									queryMode: 'local',
									name: 'localidad',
									itemId: 'comboLocalidad',
									store: 'MetApp.store.Personal.LocalidadesStore',
									displayField: 'nombre',
									valueField: 'idLocalidad',
									fieldLabel: 'Localidad',
									typeAhead: true,
									minChars: 1,
									width: 400
								},
							]
						}, //EOF DOMICILIO FIELDSET								
						{
							xtype: 'textfield',
							name: 'telefonos',
							fieldLabel: 'Telefonos',
							disabledCls: 'myDisabledClass',
							disabled: true,
							allowBlank: false
							
						},
						{
							xtype: 'textfield',
							name: 'cPostal',
							fieldLabel: 'Cod. Postal',
							disabledCls: 'myDisabledClass',
							disabled: true
						},
						{
							xtype: 'container',
							layout: 'hbox',
							defaults: {
								disabledCls: 'myDisabledClass',
								disabled: true
							},
							items: [
								{
									xtype: 'combobox',
									name: 'documentoTipo',
									allowBlank: false,
									width: 200,
									margin: '0 5 0 0',
									fieldLabel: 'Documento',
									store: Ext.create('Ext.data.Store', {
									    fields: ['tipo'],
									    data : [
									        {'tipo': 'DNI'},
									        {'tipo': 'LC'},
									    ]
									}),
									queryMode: 'local',
									displayField: 'tipo'
								},
								{
									xtype: 'textfield',
									name: 'documentoNum',
									allowBlank: false,
									fieldLabel: 'N°',
									labelWidth: 20
								}
							]
						},
						{
							xtype: 'combobox',
							name: 'estado',
							fieldLabel: 'Estado',
							margin: '5 0 0 0',
							store: Ext.create('Ext.data.Store',{
								fields: ['estado'],
								data: [
									{ 'estado': 'Soltero/a' },
									{ 'estado': 'Casado/a' },
									{ 'estado': 'Divorciado/a' },
									{ 'estado': 'Union de hecho' },
									{ 'estado': 'Viudo/a' },
								]
							}),
							queryMode: 'local',
							displayField: 'estado',
							disabledCls: 'myDisabledClass',
							disabled: true
						},
						{
							xtype: 'textfield',
							margin: '5 0 0 0',
							name: 'nacionalidad',
							itemId: 'nacionalidad',
							fieldLabel: 'Nacionalidad',
							disabledCls: 'myDisabledClass',
							disabled: true,
							allowBlank: false
						},
						{
							xtype: 'textfield',
							width: 400,
							margin: '5 0 0 0',
							name: 'obraSocial',
							itemId: 'obraSocial',
							fieldLabel: 'Obra Social',
							disabledCls: 'myDisabledClass',
							disabled: true,
							msgTarget: 'qtip',
							emptyText: 'Complete segun registro nacional de OS'
						}							
					]
				}, //EOF CONTAINER DATOS PERSONALAS
				{
					xtype: 'container',					
					margins: '5 5 1 5',
					flex: 1,
					layout: 'vbox',
					items: autz.getAuthorizedElements(items),
				},// EOF DATOS DE SUELDO						
			]
		}];
		
		me.callParent(arguments); 
	},
});