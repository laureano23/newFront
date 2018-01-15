<?php

namespace Mbp\FinanzasBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Facturas
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Mbp\FinanzasBundle\Entity\FacturasRepository")
 */
class Facturas
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
     * @ORM\Column(name="fecha", type="datetime")
	 * @Assert\NotNull() 
     */
    private $fecha;
	
	/**
	 * @ORM\Column(name="concepto", type="string", length=25)
	 * @Assert\NotNull()
	 */
	private $concepto;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="vencimiento", type="date")
	 * @Assert\NotNull()
	 * @Assert\Date()
     */
    private $vencimiento;
	
	/**
	 * @ORM\ManyToOne(targetEntity="Mbp\ClientesBundle\Entity\Cliente")
	 * @ORM\JoinColumn(name="clienteId", referencedColumnName="idCliente", nullable=false)
	 */
	private $clienteId;
	
	/**
	 * @ORM\ManyToMany(targetEntity="FacturaDetalle", cascade={"remove"})
	 * @ORM\JoinTable(name="factura_detallesFacturas",
	 *  joinColumns={ @ORM\JoinColumn(name = "factura_id", referencedColumnName="id") }),
	 *  inverseJoinColumns={@JoinColumn(name="detallesFacturas_id", referencedColumnName="id", unique=true)}
	 * )
	 */
	private $facturaDetalleId;
	
	/**
	 * @ORM\Column(name="ptoVta", type="smallint")	  
	 * @Assert\NotNull()
	 */
	private $ptoVta;

    /**
     * @ORM\Column(name="fcNro", type="integer")    
     * @Assert\NotNull()
     */
    private $fcNro;
	
	/**
	 * @ORM\Column(name="tipo", type="smallint")	  
	 * @Assert\NotNull()
	 * @Assert\Range(
     *      min = 1,
     *      max = 100,
     * )
	 */
	private $tipo;
	
	/**
	 * @ORM\Column(name="cae", type="bigint", nullable=false)	
	 * @Assert\NotNull()  
	 */
	private $cae;
	
	/**
     * @var \DateTime
     *
     * @ORM\Column(name="vtoCae", type="date")
	 * @Assert\Date()  
     */
    private $vtoCae;
    
	/**
     * @var \Decimal
     *
     * @ORM\Column(name="dtoTotal", type="decimal", precision=4, scale=2)
	 * @Assert\Range(
     *      min = 0,
     *      max = 99
	 * )
     */
    private $dtoTotal=0;
	
	/**
     * @var \Decimal
     *
     * @ORM\Column(name="porcentajeIIBB", type="decimal", precision=4, scale=2)
     */
    private $porcentajeIIBB=0;
	
	/**
     * @var \Decimal
     *
     * @ORM\Column(name="perIIBB", type="decimal", precision=9, scale=2)
     */
    private $perIIBB=0;
	
	/**
     * @var \Decimal
     *
     * @ORM\Column(name="iva21", type="decimal", precision=9, scale=2)
     */
    private $iva21=0;

    /**
     * @var \Decimal
     *
     * @ORM\Column(name="total", type="decimal", precision=11, scale=2)
     */
    private $total=0;

    /**
     * @ORM\Column(name="rSocial", type="string", length=250)
     * @Assert\NotNull()
     */
    private $rSocial;

    /**
     * @ORM\Column(name="domicilio", type="string", length=250)
     * @Assert\NotNull()
     */
    private $domicilio;

    /**
     * @ORM\Column(name="departamento", type="string", length=250, nullable=true)
     * @Assert\NotNull()
     */
    private $departamento;

    /**
     * @ORM\Column(name="cuit", type="string", length=12)
     * @Assert\NotNull()
     */
    private $cuit;

    /**
     * @ORM\Column(name="ivaCond", type="string", length=250)
     * @Assert\NotNull()
     */
    private $ivaCond;

    /**
     * @ORM\Column(name="condVta", type="string", length=250, nullable=true)
     * @Assert\NotNull()
     */
    private $condVta;


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
     * Set fecha
     *
     * @param \DateTime $fecha
     *
     * @return Facturas
     */
    public function setFecha($fecha)
    {
        $this->fecha = $fecha;

        return $this;
    }

    /**
     * Get fecha
     *
     * @return \DateTime
     */
    public function getFecha()
    {
        return $this->fecha;
    }

    /**
     * Set vencimiento
     *
     * @param \DateTime $vencimiento
     *
     * @return Facturas
     */
    public function setVencimiento($vencimiento)
    {
        $this->vencimiento = $vencimiento;

        return $this;
    }

    /**
     * Get vencimiento
     *
     * @return \DateTime
     */
    public function getVencimiento()
    {
        return $this->vencimiento;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->facturaDetalleId = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set concepto
     *
     * @param string $concepto
     *
     * @return Facturas
     */
    public function setConcepto($concepto)
    {
        $this->concepto = $concepto;

        return $this;
    }

    /**
     * Get concepto
     *
     * @return string
     */
    public function getConcepto()
    {
        return $this->concepto;
    }

    /**
     * Set clienteId
     *
     * @param \Mbp\ClientesBundle\Entity\Cliente $clienteId
     *
     * @return Facturas
     */
    public function setClienteId(\Mbp\ClientesBundle\Entity\Cliente $clienteId = null)
    {
        $this->clienteId = $clienteId;

        return $this;
    }

    /**
     * Get clienteId
     *
     * @return \Mbp\ClientesBundle\Entity\Cliente
     */
    public function getClienteId()
    {
        return $this->clienteId;
    }

    /**
     * Add facturaDetalleId
     *
     * @param \Mbp\FinanzasBundle\Entity\FacturaDetalle $facturaDetalleId
     *
     * @return Facturas
     */
    public function addFacturaDetalleId(\Mbp\FinanzasBundle\Entity\FacturaDetalle $facturaDetalleId)
    {
        $this->facturaDetalleId[] = $facturaDetalleId;

        return $this;
    }

    /**
     * Remove facturaDetalleId
     *
     * @param \Mbp\FinanzasBundle\Entity\FacturaDetalle $facturaDetalleId
     */
    public function removeFacturaDetalleId(\Mbp\FinanzasBundle\Entity\FacturaDetalle $facturaDetalleId)
    {
        $this->facturaDetalleId->removeElement($facturaDetalleId);
    }

    /**
     * Get facturaDetalleId
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFacturaDetalleId()
    {
        return $this->facturaDetalleId;
    }

    /**
     * Set tipo
     *
     * @param string $tipo
     *
     * @return Facturas
     */
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;

        return $this;
    }

    /**
     * Get tipo
     *
     * @return string
     */
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * Set cae
     *
     * @param integer $cae
     *
     * @return Facturas
     */
    public function setCae($cae)
    {
        $this->cae = $cae;

        return $this;
    }

    /**
     * Get cae
     *
     * @return integer
     */
    public function getCae()
    {
        return $this->cae;
    }

    /**
     * Set vtoCae
     *
     * @param \DateTime $vtoCae
     *
     * @return Facturas
     */
    public function setVtoCae($vtoCae)
    {
        $this->vtoCae = $vtoCae;

        return $this;
    }

    /**
     * Get vtoCae
     *
     * @return \DateTime
     */
    public function getVtoCae()
    {
        return $this->vtoCae;
    }

    /**
     * Set ptoVta
     *
     * @param integer $ptoVta
     *
     * @return Facturas
     */
    public function setPtoVta($ptoVta)
    {
        $this->ptoVta = $ptoVta;

        return $this;
    }

    /**
     * Get ptoVta
     *
     * @return integer
     */
    public function getPtoVta()
    {
        return $this->ptoVta;
    }

    /**
     * Set dtoTotal
     *
     * @param string $dtoTotal
     *
     * @return Facturas
     */
    public function setDtoTotal($dtoTotal)
    {
        $this->dtoTotal = $dtoTotal;

        return $this;
    }

    /**
     * Get dtoTotal
     *
     * @return string
     */
    public function getDtoTotal()
    {
        return $this->dtoTotal;
    }

    /**
     * Set perIIBB
     *
     * @param string $perIIBB
     *
     * @return Facturas
     */
    public function setPerIIBB($perIIBB)
    {
        $this->perIIBB = $perIIBB;

        return $this;
    }

    /**
     * Get perIIBB
     *
     * @return string
     */
    public function getPerIIBB()
    {
        return $this->perIIBB;
    }

    /**
     * Set iva21
     *
     * @param string $iva21
     *
     * @return Facturas
     */
    public function setIva21($iva21)
    {
        $this->iva21 = $iva21;

        return $this;
    }

    /**
     * Get iva21
     *
     * @return string
     */
    public function getIva21()
    {
        return $this->iva21;
    }

    /**
     * Set rSocial
     *
     * @param string $rSocial
     *
     * @return Facturas
     */
    public function setRSocial($rSocial)
    {
        $this->rSocial = $rSocial;

        return $this;
    }

    /**
     * Get rSocial
     *
     * @return string
     */
    public function getRSocial()
    {
        return $this->rSocial;
    }

    /**
     * Set domicilio
     *
     * @param string $domicilio
     *
     * @return Facturas
     */
    public function setDomicilio($domicilio)
    {
        $this->domicilio = $domicilio;

        return $this;
    }

    /**
     * Get domicilio
     *
     * @return string
     */
    public function getDomicilio()
    {
        return $this->domicilio;
    }

   
    /**
     * Set cuit
     *
     * @param string $cuit
     *
     * @return Facturas
     */
    public function setCuit($cuit)
    {
        $this->cuit = $cuit;

        return $this;
    }

    /**
     * Get cuit
     *
     * @return string
     */
    public function getCuit()
    {
        return $this->cuit;
    }

    /**
     * Set ivaCond
     *
     * @param string $ivaCond
     *
     * @return Facturas
     */
    public function setIvaCond($ivaCond)
    {
        $this->ivaCond = $ivaCond;

        return $this;
    }

    /**
     * Get ivaCond
     *
     * @return string
     */
    public function getIvaCond()
    {
        return $this->ivaCond;
    }

    /**
     * Set condVta
     *
     * @param string $condVta
     *
     * @return Facturas
     */
    public function setCondVta($condVta)
    {
        $this->condVta = $condVta;

        return $this;
    }

    /**
     * Get condVta
     *
     * @return string
     */
    public function getCondVta()
    {
        return $this->condVta;
    }

   
    /**
     * Set fcNro
     *
     * @param integer $fcNro
     *
     * @return Facturas
     */
    public function setFcNro($fcNro)
    {
        $this->fcNro = $fcNro;

        return $this;
    }

    /**
     * Get fcNro
     *
     * @return integer
     */
    public function getFcNro()
    {
        return $this->fcNro;
    }

    /**
     * Set total
     *
     * @param string $total
     *
     * @return Facturas
     */
    public function setTotal($total)
    {
        $this->total = $total;

        return $this;
    }

    /**
     * Get total
     *
     * @return string
     */
    public function getTotal()
    {
        return $this->total;
    }

    /**
     * Set porcentajeIIBB
     *
     * @param string $porcentajeIIBB
     *
     * @return Facturas
     */
    public function setPorcentajeIIBB($porcentajeIIBB)
    {
        $this->porcentajeIIBB = $porcentajeIIBB;

        return $this;
    }

    /**
     * Get porcentajeIIBB
     *
     * @return string
     */
    public function getPorcentajeIIBB()
    {
        return $this->porcentajeIIBB;
    }

    /**
     * Set departamento
     *
     * @param string $departamento
     *
     * @return Facturas
     */
    public function setDepartamento($departamento)
    {
        $this->departamento = $departamento;

        return $this;
    }

    /**
     * Get departamento
     *
     * @return string
     */
    public function getDepartamento()
    {
        return $this->departamento;
    }
}
