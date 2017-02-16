Ext.define('MetApp.model.Compras.OrdenCompraModel',{
	extend: 'Ext.data.Model',
	idProperty: 'idOc',
	fields: [
		{ name: 'idOc', type: 'int' },
		{ name: 'id', type: 'int' },
		{ name: 'codigo', type: 'string' },
		{ name: 'descripcion', type: 'string'},
		{ name: 'cant', type: 'int' },
		{ name: 'unidad', type: 'string' },
		{ name: 'precio', type: 'float' },
		{ name: 'costo', type: 'float' },
		{ name: 'moneda', type: 'string' },
		{ name: 'iva', type: 'float' },
		{ name: 'entrega', type: 'datetime' },
		{ name: 'actCosto', type: 'bool', defaultValue: 1 },
		{ name: 'observaciones', type: 'string'},
		{ name: 'descuentoGral', type: 'float' },	
	]
});
