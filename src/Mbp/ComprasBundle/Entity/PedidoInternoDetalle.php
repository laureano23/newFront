<?php

namespace Mbp\ComprasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PedidoInternoDetalle
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Mbp\ComprasBundle\Entity\PedidoInternoDetalleRepository")
 */
class PedidoInternoDetalle
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
     * @var string
     *
     * @ORM\Column(name="descripcion", type="string", length=255)
     */
    private $descripcion;

    /**
     * @var string
     *
     * @ORM\Column(name="cantidad", type="decimal")
     */
    private $cantidad;

    /**
     * @var string
     *
     * @ORM\Column(name="unidad", type="string", length=50)
     */
    private $unidad;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="entrega", type="date")
     */
    private $entrega;

    /**
     * @var boolean
     *
     * @ORM\Column(name="inactivo", type="boolean")
     */
    private $inactivo=0;

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
     * Set descripcion
     *
     * @param string $descripcion
     *
     * @return PedidoInternoDetalle
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
     * Set cantidad
     *
     * @param string $cantidad
     *
     * @return PedidoInternoDetalle
     */
    public function setCantidad($cantidad)
    {
        $this->cantidad = $cantidad;

        return $this;
    }

    /**
     * Get cantidad
     *
     * @return string
     */
    public function getCantidad()
    {
        return $this->cantidad;
    }

    /**
     * Set unidad
     *
     * @param string $unidad
     *
     * @return PedidoInternoDetalle
     */
    public function setUnidad($unidad)
    {
        $this->unidad = $unidad;

        return $this;
    }

    /**
     * Get unidad
     *
     * @return string
     */
    public function getUnidad()
    {
        return $this->unidad;
    }

    /**
     * Set entrega
     *
     * @param \DateTime $entrega
     *
     * @return PedidoInternoDetalle
     */
    public function setEntrega($entrega)
    {
        $this->entrega = $entrega;

        return $this;
    }

    /**
     * Get entrega
     *
     * @return \DateTime
     */
    public function getEntrega()
    {
        return $this->entrega;
    }

    /**
     * Set inactivo
     *
     * @param boolean $inactivo
     *
     * @return PedidoInternoDetalle
     */
    public function setInactivo($inactivo)
    {
        $this->inactivo = $inactivo;

        return $this;
    }

    /**
     * Get inactivo
     *
     * @return boolean
     */
    public function getInactivo()
    {
        return $this->inactivo;
    }
}