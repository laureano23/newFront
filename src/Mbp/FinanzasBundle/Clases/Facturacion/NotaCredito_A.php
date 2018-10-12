<?php

namespace Mbp\FinanzasBundle\Clases\Facturacion;
use Mbp\FinanzasBundle\Clases\Facturacion\ComprobanteVenta;
use Mbp\FinanzasBundle\Clases\Facturacion\DetalleVentas;

class NotaCredito_A extends ComprobanteVenta{
    private $repoFactura;
    private $faeleService;
    private $CUITCliente;
    private $montoPercepcionIIBB;
    private $IVA;
    private $porcentajePercepcionIIBB;
    private $descuento;
    private $facturasAsociadas;

    public function __construct($numero, $tipoCambio, $fechaEmision, $total,
        $moneda, $cliente, $fechaVencimiento, $puntoVenta,
        $detallesVenta, $domicilio, $partido, $digitoVerificador,
        $provincia, $CAE, $condicionImpositiva, $localidad, $repoFactura, $CUITCliente, $montoPercepcionIIBB,
        $IVA, $porcentajePercepcionIIBB, $faeleService, $descuento, $facturasAsociadas){

        parent::__construct($numero, $tipoCambio, $fechaEmision, $total,
        $moneda, $cliente, $fechaVencimiento, $puntoVenta,
        $detallesVenta, $domicilio, $partido, $digitoVerificador,
        $provincia, $CAE, $condicionImpositiva, $localidad);

        $this->repoFactura=$repoFactura;
        $this->CUITCliente=$CUITCliente;
        $this->montoPercepcionIIBB=$montoPercepcionIIBB;
        $this->IVA=$IVA;
        $this->porcentajePercepcionIIBB=$porcentajePercepcionIIBB;
        $this->faeleService=$faeleService;
        $this->descuento=$descuento;
        $this->facturasAsociadas=$facturasAsociadas;
    }
}