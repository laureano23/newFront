Ext.define('MetApp.controller.Produccion.Programacion.ProgramacionController', {
	extend: 'Ext.app.Controller',
	
	views: [
		'Produccion.Programacion.Programacion',
		'Produccion.Programacion.FormProgramacion',
		'MetApp.view.Compras.PedidosInternosView',
		'MetApp.view.Articulos.ArticuloSearchGrd'
	],
	
	stores: [
		'Produccion.Programacion.ProgramacionStore',
		'Produccion.Programacion.FormulaMoStore',
		'MetApp.store.Produccion.OrdenesTrabajo.OTStore',
		'MetApp.store.Produccion.OrdenesTrabajo.OTStoreEmisor'
	],
	
	refs: [
		{
			ref: 'winProg',
			selector: '#tablaProgramacion'	
		}
	],
	
	init: function(){
		var me = this;
		me.control({
			'#programarPedidos': {
				click: this.TablaProgramacion
			},
			'programacion button[itemId=programar]': {
				click: this.NuevaOT
			},
			'programacion actioncolumn[itemId=formula]': {
				click: this.DetalleFormula
			},
			'programacion button[itemId=solicitarMat]': {
				click: this.PedidoInterno
			},
			'programacion button[itemId=actualizar]': {
				click: this.ActualizarProgramacion
			},
			'programacion actioncolumn[itemId=otImprimir]': {
				click: this.ImprimirOt
			},
			'programacion actioncolumn[itemId=otEliminar]': {
				click: this.EliminarOT
			},
			'programacion grid[itemId=gridMisPedidos]': {
				gridcellchanging: this.CambiarFechaEntrega
			},
			'PedidosInternosView button[itemId=insertar]': {
				click: this.InsertarArticulo
			},
			'PedidosInternosView button[itemId=guardar]': {
				click: this.GuardarPedidoMat
			},
			'PedidosInternosView actioncolumn[itemId=editar]': {
				click: this.EditarItem
			},
			'PedidosInternosView actioncolumn[itemId=eliminar]': {
				click: this.EliminarItem
			},						
		});
	},	
	
	CambiarFechaEntrega: function(field){
		console.log(field);
		Ext.Ajax.request({
			url: Routing.generate(''),
			
			params: {
				fecha: ''
			}
		})
	},
	
	
	TablaProgramacion: function(){
		var programacionWin = Ext.widget('programacion');
		
		//GRILLA DE MIS PENDIENTES
		var grid = programacionWin.queryById('gridMisPendientes');
		var store = grid.getStore();
		
		//GRILLA DE MIS PEDIDOS A OTRAS AREAS
		var grid = programacionWin.queryById('gridMisPedidos');
		var storePedidos = grid.getStore();
		
		Ext.Ajax.request({
			url: Routing.generate('mbp_produccion_ListarOrdenesProg'),
						
			success: function(resp){
				var jsonResp = Ext.JSON.decode(resp.responseText);
				store.loadRawData(jsonResp.data);
			},
			
			failure: function(resp){
				
			}
		})
		
		Ext.Ajax.request({
			url: Routing.generate('mbp_produccion_ListarOrdenesProgEmisor'),
					
			success: function(resp){
				var jsonResp = Ext.JSON.decode(resp.responseText);
				storePedidos.loadRawData(jsonResp.data);
			},
			
			failure: function(resp){
				
			}
		})
		
		
		//SI HAY ALGUN CAMBIO EN LA GRILLA HACEMOS LA LLAMADA AL SERVER
		store.on('update', function(st, rec, op){
			st.suspendEvents();
			Ext.Ajax.request({
				url: Routing.generate('mbp_produccion_ActualizarEstadoOt'),
				
				params: {
					data: Ext.JSON.encode(rec.data)
				},
						
				success: function(resp){
					console.log(resp);
					st.resumeEvents();
				},
				
				failure: function(resp){
					
				}
			})	
		});
		
		programacionWin.on('close', function(){
			store.clearListeners();
		});
		
	},
	
	NuevaOT: function(btn){
		Ext.widget('NuevaOTView');
	},
	
	DetalleFormula: function(grid, colIndex, rowIndex){
		var selection = grid.getStore().getAt(rowIndex);
		var win = grid.up('window');
		var form = win.down('form');
		
		var myMask = new Ext.LoadMask(win, {msg:"Cargando..."});
		myMask.show();
		
		Ext.Ajax.request({
			url: Routing.generate('mbp_articulos_DBF_verEstructura'),
			
			params: {
				codigo: selection.data.codigo
			},
			
			success: function(resp){				
				jsonResp = Ext.JSON.decode(resp.responseText);
				console.log(jsonResp);
				Ext.Msg.show({
	    			title: 'Formula',
	    			msg: jsonResp.data,
	    			buttons: Ext.Msg.OK,
	    			icon: Ext.Msg.INFO
	    		});
	    		
	    		myMask.hide();
			},
			
			failure: function(resp){
				myMask.hide();
			}
		});
	},
	
	PedidoInterno: function(btn){
		var pedidoInterno = Ext.widget('PedidosInternosView');
		
		pedidoInterno.queryById('btnCodigo').on('click', function(){
			var winSearch = Ext.widget('winarticulosearch');
			
			winSearch.down('button').on('click', function(){
				var grid = winSearch.down('grid');
				var sel = grid.getSelectionModel().getSelection()[0];
				
				var formArt = pedidoInterno.queryById('formaArt');
				formArt.loadRecord(sel);
				
				winSearch.close();
				pedidoInterno.queryById('cantidad').focus('', 10);
			});
		});
	},
	
	InsertarArticulo: function(btn){
		var win = btn.up('window');
		var values = win.queryById('formaArt').getForm().getValues();
		
		var model = Ext.create('MetApp.model.Compras.OrdenCompraModel');
		model.set(values);
		
		var store = win.down('grid').getStore();
		store.add(model);
		
		win.queryById('formaArt').getForm().reset();
	},
	
	GuardarPedidoMat: function(btn){
		var win = btn.up('window');
		
		var store = win.down('grid').getStore();
		
		var data = new Array();
		var i =0;
		
		store.each(function(rec){
			data[i] = rec.getData();
			i++;	
		});
		
		console.log(data);
		var jsonData = Ext.JSON.encode(data);
		Ext.Ajax.request({
			url: Routing.generate('mbp_pedidosInternos_nuevoPedido'),
			
			params: {
				articulos: jsonData,				
			},
			
			success: function(resp){
				var jsonResp = Ext.JSON.decode(resp.responseText);
				if(jsonResp.success == true){
					store.removeAll();
				}
			},
			
			failure: function(resp){
				
			}
		});
	},
	
	EditarItem: function(grid, colIndex, rowIndex){
		var selection = grid.getStore().getAt(rowIndex);
		var win = grid.up('window');
		var form = win.queryById('formaArt');
		
		form.loadRecord(selection);
		var store = grid.getStore();
		store.remove(selection);
	},
	
	EliminarItem: function(grid, colIndex, rowIndex){
		var selection = grid.getStore().getAt(rowIndex);
		var win = grid.up('window');
		
		Ext.Msg.show({
			title: 'Atencion',
			msg: 'Desea remover el articulo?',
			buttons: Ext.Msg.YESNO,
			fn: function(btn){
				if(btn == "yes"){
					var store = grid.getStore();
					store.remove(selection);			
				}
			}
		});
	},

	ImprimirOt: function(grid, colIndex, rowIndex){
		var selection = grid.getStore().getAt(rowIndex);
		var win = grid.up('window');
		var myMask = new Ext.LoadMask(win, {msg:"Cargando..."});
		myMask.show();


		Ext.Ajax.request({
			url: Routing.generate('mbp_produccion_generarOt'),
			
			params: {
				ot: selection.data.otNum
			},
			
			success: function(resp){
				var jResp = Ext.JSON.decode(resp.responseText);
				if(jResp.success == true){
					var ruta = Routing.generate('mbp_produccion_verOt');
					window.open(ruta, 'location=yes,height=800,width=1200,scrollbars=yes,status=yes');		
				}
				myMask.hide();
			},
			
			failure: function(resp){
				myMask.hide();
			}
		})
	},
	
	ActualizarProgramacion: function(btn){
		var programacionWin=btn.up('window');
		
		//GRILLA DE MIS PENDIENTES
		var grid = programacionWin.queryById('gridMisPendientes');
		var store = grid.getStore();
		
		//GRILLA DE MIS PEDIDOS A OTRAS AREAS
		var grid = programacionWin.queryById('gridMisPedidos');
		var storePedidos = grid.getStore();
		
		Ext.Ajax.request({
			url: Routing.generate('mbp_produccion_ListarOrdenesProg'),
						
			success: function(resp){
				var jsonResp = Ext.JSON.decode(resp.responseText);
				store.loadRawData(jsonResp.data);
			},
			
			failure: function(resp){
				
			}
		})
		
		Ext.Ajax.request({
			url: Routing.generate('mbp_produccion_ListarOrdenesProgEmisor'),
					
			success: function(resp){
				var jsonResp = Ext.JSON.decode(resp.responseText);
				storePedidos.loadRawData(jsonResp.data);
			},
			
			failure: function(resp){
				
			}
		})
	},
	
	EliminarOT: function(grid, colIndex, rowIndex){
		Ext.Msg.show({
			title: 'Atencion ',
			msg: "Esta por borrar una OT, desea continuar?",
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.ALERT,
			fn:function(btn){
				if(btn == 'yes'){
					var store = grid.getStore();
					var selection = store.getAt(rowIndex);
					var win = grid.up('window');
					var myMask = new Ext.LoadMask(win, {msg:"Cargando..."});
					myMask.show();
							
					Ext.Ajax.request({
						url: Routing.generate('mbp_produccion_eliminarOT'),
						
						params: {
							ot: selection.data.otNum
						},
						
						success: function(resp){
							Ext.Msg.show({
				    			title: 'Formula',
				    			msg: "La OT fué eliminada correctamente",
				    			buttons: Ext.Msg.OK,
				    			icon: Ext.Msg.INFO
				    		});
				    		
				    		myMask.hide();
				    		store.remove(selection);
						},
						
						failure: function(resp){
							
						}
					})
				}
			}
		});		
	}
});










