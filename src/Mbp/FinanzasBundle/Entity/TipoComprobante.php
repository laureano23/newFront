<?php

namespace Mbp\FinanzasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TipoComprobante
 *
 * @ORM\Table()
 * @ORM\Entity
 */
class TipoComprobante
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var boolean
     *
     * @ORM\Column(name="esFactura", type="boolean")
     */
    private $esFactura;

    /**
     * @var boolean
     *
     * @ORM\Column(name="esNotaCredito", type="boolean")
     */
    private $esNotaCredito;

    /**
     * @var boolean
     *
     * @ORM\Column(name="esNotaDebito", type="boolean")
     */
    private $esNotaDebito;
	
	/**
     * @var boolean
     *
     * @ORM\Column(name="esBalance", type="boolean")
     */
    private $esBalance;

    /**
     * @var string
     *
     * @ORM\Column(name="descripcion", type="string", length=255)
     */
    private $descripcion;
	


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set esFactura
     *
     * @param boolean $esFactura
     *
     * @return TipoComprobante
     */
    public function setEsFactura($esFactura)
    {
        $this->esFactura = $esFactura;

        return $this;
    }

    /**
     * Get esFactura
     *
     * @return boolean
     */
    public function getEsFactura()
    {
        return $this->esFactura;
    }

    /**
     * Set esNotaCredito
     *
     * @param boolean $esNotaCredito
     *
     * @return TipoComprobante
     */
    public function setEsNotaCredito($esNotaCredito)
    {
        $this->esNotaCredito = $esNotaCredito;

        return $this;
    }

    /**
     * Get esNotaCredito
     *
     * @return boolean
     */
    public function getEsNotaCredito()
    {
        return $this->esNotaCredito;
    }

    /**
     * Set esNotaDebito
     *
     * @param boolean $esNotaDebito
     *
     * @return TipoComprobante
     */
    public function setEsNotaDebito($esNotaDebito)
    {
        $this->esNotaDebito = $esNotaDebito;

        return $this;
    }

    /**
     * Get esNotaDebito
     *
     * @return boolean
     */
    public function getEsNotaDebito()
    {
        return $this->esNotaDebito;
    }

    /**
     * Set descripcion
     *
     * @param string $descripcion
     *
     * @return TipoComprobante
     */
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;

        return $this;
    }

    /**
     * Get descripcion
     *
     * @return string
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * Set esBalance
     *
     * @param boolean $esBalance
     *
     * @return TipoComprobante
     */
    public function setEsBalance($esBalance)
    {
        $this->esBalance = $esBalance;

        return $this;
    }

    /**
     * Get esBalance
     *
     * @return boolean
     */
    public function getEsBalance()
    {
        return $this->esBalance;
    }
}
