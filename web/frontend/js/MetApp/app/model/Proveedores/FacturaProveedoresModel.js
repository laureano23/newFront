Ext.define('MetApp.model.Proveedores.FacturaProveedoresModel',{
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'idF', type: 'int'},
		{name: 'idProv', type: 'int'},
		{name: 'fechaCarga', type: 'datetime'},
		{name: 'fechaEmision', type: 'datetime'},
		{name: 'tipo', type: 'string'},
		{name: 'sucursal', type: 'int'},
		{name: 'numFc', type: 'int'},
		{name: 'neto', type: 'float'},
		{name: 'netoNoGrabado', type: 'float'},
		{name: 'iva21', type: 'float'},
		{name: 'iva27', type: 'float'},
		{name: 'iva10_5', type: 'float'},
		{name: 'perIva5', type: 'float'},
		{name: 'perIva3', type: 'float'},
		{name: 'iibbCf', type: 'float'},
		{name: 'iibbBsas', type: 'float'},
		{name: 'iibbOtras', type: 'float'},
		{name: 'vencimientoFc', type: 'int'},
		{name: 'vencimiento', type: 'datetime'},
		{name: 'concepto', type: 'string'},
		{name: 'debe', type: 'float'},
		{name: 'haber', type: 'float'},
		{name: 'aplicado', type: 'float'},
		{name: 'pendiente', type: 'float'},
		{name: 'aplicar', type: 'float'},
		{name: 'valorImputado', type: 'float'},
		{name: 'totalFc', type: 'float'},
		{name: 'valorAplicado', type: 'float'},
		{name: 'tipoGasto', type: 'int'},
		{name: 'observaciones', type: 'string'},
		{name: 'esBalance', type: 'bool'},
	]
});
