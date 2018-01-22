Ext.define('MetApp.controller.Articulos.RemitosController',{
	extend: 'Ext.app.Controller',	
	views: [
		'Articulos.Stock.Remitos.ArticulosOrdenCompraView',
		'Articulos.Stock.Remitos.RemitoClienteView',		
		'Clientes.SearchGridClientes',
		'Articulos.WinArticuloSearch',
		'Articulos.Stock.Remitos.RemitosListadoView',
		'Produccion.Pedidos.PedidosPendientesView'
		],
	stores: [
		'Articulos.RemitosPendientesStore'
	],
	
	init: function(){
		var me = this;
		me.control({
			'#remitoCliente': {
				click: this.RemitoClienteView
			},
			'RemitoClienteView button[itemId=buscarOrigen]': {
				click: this.BuscarOrigen
			},
			'RemitoClienteView button[itemId=buscaArt]': {
				click: this.BuscarArticulo
			},
			'RemitoClienteView textfield[itemId=oc]': {
				specialkey: this.BuscarOC
			},
			'RemitoClienteView button[itemId=insertarItem]': {
				click: this.InsertarItem
			},
			'RemitoClienteView button[itemId=editarItem]': {
				click: this.EditarItem
			},
			'RemitoClienteView button[itemId=borrarItem]': {
				click: this.BorrarItem
			},
			'RemitoClienteView button[itemId=guardarRemito]': {
				click: this.GuardarRemito
			},
			'RemitoClienteView textfield[itemId=pedidoNum]': {
				focus: this.VerPedidos
			},
			'viewport menuitem[itemId=verRemitos]': {
				click: this.VerRemitos
			},
			'RemitosListadoView actioncolumn[itemId=verRemito]': {
				click: this.VerRemito
			},
		});
	},
	
	VerPedidos: function(btn){
		var winRemito = btn.up('window');
		var cliente = winRemito.queryById('idOrigen').getValue();
		var codigo = winRemito.queryById('codigo').getValue();
		if(cliente == "" || codigo == ""){
			Ext.Msg.show({
				title: 'Ateción',
				msg: 'Debe ingresar cliente y código de articulo',
				buttons: Ext.Msg.OK,
     			icon: Ext.Msg.ALERT
			})
			return;
		}
		
		var win = Ext.widget('PedidosPendientesView');
		var grid = win.down('grid');
		var store = grid.getStore();
		
		if(cliente != ""){
			store.getProxy().setExtraParam('cliente', cliente);
			store.getProxy().setExtraParam('codigo', codigo);		
		}
		
		store.load();
		
		var btn = win.queryById('insert');
		btn.on('click', function(btn){
			var sel = grid.getSelectionModel().getSelection()[0];
			winRemito.queryById('pedidoNum').setValue(sel.data.idDetalle);
			win.close();
			
			console.log(sel);
		});
	},
	
	VerRemito: function(grid, colIndex, rowIndex){
		var store = grid.getStore();
		var selection = store.getAt(rowIndex);
		var win = grid.up('window');
		
		var myMask = new Ext.LoadMask(win, {msg:"Cargando..."});
		myMask.show();	
		Ext.Ajax.request({
			url: Routing.generate('mbp_articulos_imprimirRemitoCliente'),
			
			params: {
				idRemito: selection.data.id
			},
			
			success: function(resp){
				var jsonResp = Ext.JSON.decode(resp.responseText);
				myMask.hide();
				if(jsonResp.success == true){
					var ruta = Routing.generate('mbp_articulos_verRemitoCliente');
    				window.open(ruta, 'location=yes,height=800,width=1200,scrollbars=yes,status=yes');	
				}								
			},
			
			failure: function(resp){
				myMask.hide();
			}
		});						
	
	},
	
	VerRemitos: function(btn){
		console.log(btn);
		var view = Ext.widget('RemitosListadoView');
		var store = view.down('grid').getStore();
		
		Ext.Ajax.request({
			url: Routing.generate('mbp_articulos_listarRemitos'),
			
			params: {
				
			},
			
			success: function(resp){
				console.log(resp);
				var jsonResp = Ext.JSON.decode(resp.responseText);
				store.loadRawData(jsonResp.data);
			}
		})
	},
	
	RemitoClienteView: function(btn){
		Ext.widget('RemitoClienteView');
	},

	BuscarOrigen: function(btn){
		var win = btn.up('window');
		
		var origen = win.queryById('origen').getValue();
		
		var fuente;
		if(origen.origen == "proveedor"){
			fuente = Ext.widget('ProveedoresSearchGrid');
			fuente.down('grid').getStore().load();
		}else{
			fuente = Ext.widget('clientesSearchGrid');
			fuente.down('grid').getStore().load();	
		}
		
		fuente.down('button').on('click', function(btn){
			var selection = fuente.down('grid').getSelectionModel().getSelection()[0];
			win.queryById('idOrigen').setValue(selection.data.id);
			win.queryById('fuente').setValue(selection.data.rsocial);
			fuente.close();
			
			win.queryById('buscaArt').focus('', 10);
		});
	},

	BuscarArticulo: function(btn){
		var winRemito = btn.up('window');
		var winArt = Ext.widget('winarticulosearch');
		var grid = winArt.down('grid');

		winArt.queryById('insertArt').on('click', function(){
			var selection = grid.getSelectionModel().getSelection();
			selection = selection[0];

			winRemito.queryById('codigo').setValue(selection.data.codigo);
			winRemito.queryById('descripcion').setValue(selection.data.descripcion);
			winRemito.queryById('unidad').setValue(selection.data.unidad);

			winArt.close();
			winRemito.queryById('cantidad').focus('', 20);
		});
	},


	BuscarOC: function(txt, ev){
		if (ev.getKey() != ev.ENTER) {
            return;
        }

        var winRemito = txt.up('window');
        var winPendientes = Ext.widget('ArticulosOrdenCompraView');
        var grid = winPendientes.down('grid');

        Ext.Ajax.request({
        	url: Routing.generate('mbp_produccion_pedidos_articulo_cliente'),

        	params: {
        		idCliente: winRemito.queryById('idCliente').getValue(),
        		codigo: winRemito.queryById('codigo').getValue(),
        	},

        	success: function(resp){
        		grid.getStore().loadRawData(resp);

        		winPendientes.queryById('ingresaOC').on('click', function(){
		        	
		        	var selection = grid.getSelectionModel().getSelection();
		        	selection = selection[0];

		        	winRemito.queryById('oc').setValue(selection.data.oc);
		        	winRemito.queryById('pedidoNum').setValue(selection.data.pedidoNum);

		        	winPendientes.close();
		        });
        	}
        });     
	},

	InsertarItem: function(btn){
		var winRemito = btn.up('window');
		var grid = winRemito.down('grid');
		var form = winRemito.down('form');
		var values = form.getForm().getValues();

		if(form.isValid()){
			grid.getStore().add(values);
			form.getForm().reset();
		}	

	},

	EditarItem: function(btn)
	{
		var winRemito = btn.up('window');
		var grid = winRemito.down('grid');
		var form = winRemito.down('form');
		var selection = grid.getSelectionModel().getSelection();
		selection = selection[0];
		
		form.loadRecord(selection);
		grid.getStore().remove(selection);
	},

	BorrarItem: function(btn){
		var winRemito = btn.up('window');
		var grid = winRemito.down('grid');
		var selection = grid.getSelectionModel().getSelection();
		selection = selection[0];

		grid.getStore().remove(selection);
	},

	GuardarRemito: function(btn){
		var winRemito = btn.up('window');
		var grid = winRemito.down('grid');
		var store = grid.getStore();
		var data = [];
		var myMask = new Ext.LoadMask(winRemito, {msg:"Cargando..."});

		store.each(function(rec){
			data.push(rec.data);
		});
		
		var origen = winRemito.queryById('origen').getValue();
		
		if(data == ""){
			Ext.Msg.show({
				title: 'Atención',
				msg: 'No hay artículos en la grilla',
				icon: Ext.Msg.INFO,
				buttons: Ext.Msg.OK,
			});
			
			return;
		}
		
		myMask.show();
		Ext.Ajax.request({
			url: Routing.generate('mbp_articulos_generarRemitoCliente'),

			params: {
				items: Ext.JSON.encode(data),
				clienteId: winRemito.queryById('idOrigen').getValue(),
				origen: origen.origen == "proveedor" ? "proveedor" : "cliente"
			},

			success: function(resp){
				var jsonResp = Ext.JSON.decode(resp.responseText);
				myMask.hide();
				if(jsonResp.success == true){
					store.removeAll();
					myMask.show();
					Ext.Ajax.request({
						url: Routing.generate('mbp_articulos_imprimirRemitoCliente'),
						
						params: {
							idRemito: jsonResp.idRemito
						},
						
						success: function(resp){
							var jsonResp = Ext.JSON.decode(resp.responseText);
							myMask.hide();
							if(jsonResp.success == true){
								var ruta = Routing.generate('mbp_articulos_verRemitoCliente');
			    				window.open(ruta, 'location=yes,height=800,width=1200,scrollbars=yes,status=yes');	
							}								
						},
						
						failure: function(resp){
							myMask.hide();
						}
					});						
				}	
			},

			failure: function(resp){				
				var response = Ext.JSON.decode(resp.responseText);
				myMask.hide();
				if(!response.tipo) return;
				var errors='';
				for(var key in response.errors){
					errors += key + ": " + response.errors[key];
				}
				Ext.Msg.show({		 			
	    			title: 'Error al crear remito',
	    			msg: errors,
	    			buttons: Ext.Msg.OK,
	    			icon: Ext.Msg.WARNING
    			});
			}
		});
	}
});











