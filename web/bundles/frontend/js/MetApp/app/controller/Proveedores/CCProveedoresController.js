Ext.define('MetApp.controller.Proveedores.CCProveedoresController',{
	extend: 'Ext.app.Controller',
	requires: [
		'MetApp.resources.ux.ParametersSingleton'
	],
	stores: [
		'MetApp.store.Finanzas.BancosStore',
		'MetApp.store.Proveedores.PagoProveedoresStore',
		'MetApp.store.Proveedores.CCProveedoresStore',
		'MetApp.store.Proveedores.GridChequeTercerosStore',
		'MetApp.store.Proveedores.GridImputaFcStore'
	],
	views: [
		'MetApp.view.CCProveedores.CCProveedores',
		'MetApp.view.CCProveedores.FacturaProveedor',
		'MetApp.view.CCProveedores.PagoProveedores',
		'MetApp.view.CCProveedores.ChequeTerceros',
	],
	refs:[
		{
			ref:'CCProveedores',
			selector: 'CCProveedores'
		},
		{
			ref: 'ProveedoresSearchGrid',
			selector: 'ProveedoresSearchGrid'
		},
		{
			ref: 'PagoProveedores',
			selector: 'PagoProveedores'
		}
	],
	
	init: function(){
		var me = this;
		me.control({
			'#tbCCProveedores': {
				click: this.AddCCProveedoresTb
			},
			'CCProveedores button[itemId=buscaProveedor]': {
				click: this.BuscaProveedor
			},
			'CCProveedores button[itemId=nuevaFc]': {
				click: this.NuevaFactura
			},
			'CCProveedores actioncolumn[itemId=detalle]': {
				click: this.ReporteDetallePago
			},
			'CCProveedores actioncolumn[itemId=eliminar]': {
				click: this.EliminarOrdenPago
			},
			'CCProveedores actioncolumn[itemId=imputado]': {
				click: this.ReportePagoFc
			},			
			'CCProveedores actioncolumn[itemId=editarComp]': {
				click: this.EditarComp
			},
			'CCProveedores button[itemId=nuevoPago]': {
				click: this.NuevoPago
			},
		});
	},
	
	AddCCProveedoresTb: function(btn){
		var me = this;
		var win = Ext.widget('CCProveedores');
		var grid = win.down('grid');
		var model = grid.getView();
		var selectionModel = grid.getSelectionModel();
		var store = grid.getStore();
		var row;
		store.loadData([], false);
		store.on('load', function(st, rec, succ){
			if(succ == true){
				row = selectionModel.select(0);	
				grid.getView().scrollBy(0, 999999, true);					
			}
		});
		
		model.on('highlightitem', function(view, node){
			var domEl = new Ext.dom.Element(node);
			selectionModel.deselectAll();
			selectionModel.select(domEl.dom.rowIndex);			
		});
		
		win.queryById('buscaProveedor').focus('', 20);
	},
	
	BuscaProveedor: function(btn){
		var cc = btn.up('window');
		var me = this;
		var win = Ext.widget('ProveedoresSearchGrid');
		var grid = win.down('grid');
		
		grid.getStore().load();
		
		win.down('button').on('click', function(btn){
			var selection = win.down('grid').getSelectionModel().getSelection()[0];
			var form = cc.down('form');
			form.loadRecord(selection);
			win.close();
			cc.queryById('btnCnt').setDisabled(false);
			
			var storeCC = cc.down('grid').getStore();
			var proxy = storeCC.getProxy();
			
			proxy.setExtraParam('idProv', form.queryById('id').getValue());
			storeCC.load();
		});
	},
	
	NuevaFactura: function(btn){
		var me = this;
		var win = Ext.widget('FacturaProveedor');
		var comboTipoGasto = win.queryById('tipoGasto');		
		var store = comboTipoGasto.getStore();
		
		win.queryById('fechaEmision').focus(10, true);
		store.load({
			callback: function(records, operation, success) {
			    var ccProv = me.getCCProveedores();
				var idTipoGasto = ccProv.queryById('tipoGasto').getValue();								
				comboTipoGasto.select(idTipoGasto);				
		    }
		});
	},
		
	NuevoPago: function(btn){
		var win = Ext.widget('PagoProveedores');
		var grid = win.queryById('gridPP');
		var store = grid.getStore();
		var txtTotalAPagar = win.queryById('totalAPagar');
		
		store.removeAll();
		
		store.on('datachanged', function(st){			
			txtTotalAPagar.setValue(0);
			var totalAPagar = txtTotalAPagar.getValue();
			store.each(function(rec){
				totalAPagar = totalAPagar + rec.data.importe;
			});	
			txtTotalAPagar.setValue(totalAPagar);
		})
	},
	
	ReporteDetallePago: function(btn){
		var win = btn.up('window');
		var grid = win.down('grid');
		var selection = grid.getSelectionModel().getSelection()[0];
		var data = selection.getData();
		var idProv = win.queryById('id').getValue();
		
		var myMask = new Ext.LoadMask(win, {msg:"Cargando..."});
		myMask.show();
		
		Ext.Ajax.request({
			url: Routing.generate('mbp_proveedores_reporteDetallePago'),
			
			params: {
				idProv: idProv,
				idOp: data.idOP
			},
			
			success: function(resp){
				var jsonResp = Ext.JSON.decode(resp.responseText);
				var ruta = Routing.generate('mbp_proveedores_verReporteDetallePago');
				if(jsonResp.success == true){
					window.open(ruta, 'location=yes,height=800,width=1200,scrollbars=yes,status=yes');
					myMask.hide();	
				}
			}
		});
	},
	
	EliminarOrdenPago: function(btn){
		var win = btn.up('window');
		var grid = win.down('grid');
		var store = grid.getStore();
		var selection = grid.getSelectionModel().getSelection()[0];
		var proxy = store.getProxy();
		
		proxy.setExtraParam(Ext.JSON.encode(selection.getData()));
		Ext.Msg.show({
		     title:'Atencion!',
		     msg: 'Desea eliminar el comprobante?',
		     buttons: Ext.Msg.YESNO,
		     icon: Ext.Msg.QUESTION,
		     fn: function(btn){
		     	if(btn=="yes"){
		     		store.remove(selection);	
		     	}
		     }
		});		
	},
	
	ReportePagoFc: function(btn){
		var win = btn.up('window');
		var grid = win.down('grid');
		var selection = grid.getSelectionModel().getSelection()[0];
		var proveedorId = win.queryById('id').getValue();
		
		var myMask = new Ext.LoadMask(win, {msg:"Cargando..."});
		myMask.show();
		Ext.Ajax.request({
			url: Routing.generate('mbp_proveedores_reporteImputacionAfc'),
			params: {
				idF: selection.data.idF,
				proveedorId: proveedorId
			},
			success: function(resp){
				var jsonResp = Ext.JSON.decode(resp.responseText);
				var ruta = Routing.generate('mbp_proveedores_verReporteImputacionFc');
				if(jsonResp.success == true){
					window.open(ruta, 'location=yes,height=800,width=1200,scrollbars=yes,status=yes');
					myMask.hide();	
				}
			}
		})
	},
	
	
	/*
	 *NO SE PUEDE EDITAR LA OP, SOLO PUEDEN MODIFICARSE IMPUTACIONES A FC
	 */
	EditarComp: function(btn){		
		var me = this;
		var winCC = this.getCCProveedores();
		var selection = winCC.down('grid').getSelectionModel().getSelection()[0];
		var win;
		var storeValores;
		var storeFCAplicadas;
		var idOP;
		var txtTotalAPagar;
		var txtIdOP;
		var idF;
		
		
		if(selection.data.idF > 0){
			win = Ext.widget('FacturaProveedor');
			var comboTipoGasto = win.queryById('tipoGasto');		
			var store = comboTipoGasto.getStore();
			store.load();
			idF = selection.data.idF;
			Ext.Ajax.request({
				url: Routing.generate('mbp_proveedores_buscarFc'),
				params: {
					idFc: idF,
				},
				success: function(resp){
					var jsonResp = Ext.JSON.decode(resp.responseText);
					var form = win.down('form');
					var model = Ext.create('MetApp.model.Proveedores.FacturaProveedoresModel');
					model.set(jsonResp.data[0]);
					form.loadRecord(model);
				}
			});
			
		}else{
			win = Ext.widget('PagoProveedores');
			storeValores = win.queryById('gridPP').getStore();
			storeFCAplicadas = win.queryById('gridImputaFc').getStore();
			idOP = selection.data.idOP;
			txtTotalAPagar = win.queryById('totalAPagar');
			txtIdOP = win.queryById('idOP');
			win.queryById('btnEdit').setDisabled(true); //ANULO EL BOTON DE EDICION,
			
			Ext.Ajax.request({
				url: Routing.generate('mbp_proveedores_listar_oredenPago_valores'),
				params: {
					idOP: idOP,
				},
				success: function(resp){
					var jsonResp = Ext.JSON.decode(resp.responseText);
					storeValores.loadRawData(jsonResp);
					txtIdOP.setValue(jsonResp.idOP);
				}
			});
			
			storeValores.on('datachanged', function(st){			
				txtTotalAPagar.setValue(0);
				var totalAPagar = txtTotalAPagar.getValue();
				storeValores.each(function(rec){
					totalAPagar = totalAPagar + rec.data.importe;
				});	
				txtTotalAPagar.setValue(totalAPagar);
			})
		}
	},
})




































