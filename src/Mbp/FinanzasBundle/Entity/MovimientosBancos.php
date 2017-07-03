<?php

namespace Mbp\FinanzasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * MovimientosBancos
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Mbp\FinanzasBundle\Entity\MovimientosBancosRepository")
 */
class MovimientosBancos
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
     * @var \DateTime
     *
     * @ORM\Column(name="fechaMovimiento", type="datetime")
     */
    private $fechaMovimiento;
	
	/**
	 * @ORM\ManyToMany(targetEntity="DetalleMovimientosBancos", cascade={"persist"})
	 * @ORM\JoinTable(name="MovimientoBanco_Detalle",
	 * 	joinColumns={ @ORM\JoinColumn(name = "Movimiento_id", referencedColumnName="id") }),
	 *  inverseJoinColumns={@JoinColumn(name="Detalle_id", referencedColumnName="id", unique=true)})
	 * )
	 * */
	 private $detallesMovimientos;
	 
	 /**
	  * @ORM\ManyToOne(targetEntity="Bancos")
	  * @ORM\JoinColumn(name="Banco_id", referencedColumnName="id")
	  * */
	 private $banco;
	 
	 /**
	  * @ORM\ManyToOne(targetEntity="ConceptosBanco")
	  * @ORM\JoinColumn(name="Concepto_id", referencedColumnName="id")
	  * */
	 private $conceptoMovimiento;


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
     * Set fechaMovimiento
     *
     * @param \DateTime $fechaMovimiento
     *
     * @return MovimientosBancos
     */
    public function setFechaMovimiento($fechaMovimiento)
    {
        $this->fechaMovimiento = $fechaMovimiento;

        return $this;
    }

    /**
     * Get fechaMovimiento
     *
     * @return \DateTime
     */
    public function getFechaMovimiento()
    {
        return $this->fechaMovimiento;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->detallesMovimientos = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add detallesMovimiento
     *
     * @param \Mbp\FinanzasBundle\Entity\DetalleMovimientosBancos $detallesMovimiento
     *
     * @return MovimientosBancos
     */
    public function addDetallesMovimiento(\Mbp\FinanzasBundle\Entity\DetalleMovimientosBancos $detallesMovimiento)
    {
        $this->detallesMovimientos[] = $detallesMovimiento;

        return $this;
    }

    /**
     * Remove detallesMovimiento
     *
     * @param \Mbp\FinanzasBundle\Entity\DetalleMovimientosBancos $detallesMovimiento
     */
    public function removeDetallesMovimiento(\Mbp\FinanzasBundle\Entity\DetalleMovimientosBancos $detallesMovimiento)
    {
        $this->detallesMovimientos->removeElement($detallesMovimiento);
    }

    /**
     * Get detallesMovimientos
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getDetallesMovimientos()
    {
        return $this->detallesMovimientos;
    }

    /**
     * Set banco
     *
     * @param \Mbp\FinanzasBundle\Entity\Bancos $banco
     *
     * @return MovimientosBancos
     */
    public function setBanco(\Mbp\FinanzasBundle\Entity\Bancos $banco = null)
    {
        $this->banco = $banco;

        return $this;
    }

    /**
     * Get banco
     *
     * @return \Mbp\FinanzasBundle\Entity\Bancos
     */
    public function getBanco()
    {
        return $this->banco;
    }

    /**
     * Set conceptoMovimiento
     *
     * @param \Mbp\FinanzasBundle\Entity\ConceptosBanco $conceptoMovimiento
     *
     * @return MovimientosBancos
     */
    public function setConceptoMovimiento(\Mbp\FinanzasBundle\Entity\ConceptosBanco $conceptoMovimiento = null)
    {
        $this->conceptoMovimiento = $conceptoMovimiento;

        return $this;
    }

    /**
     * Get conceptoMovimiento
     *
     * @return \Mbp\FinanzasBundle\Entity\ConceptosBanco
     */
    public function getConceptoMovimiento()
    {
        return $this->conceptoMovimiento;
    }
}