<?php

namespace Mbp\WebBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Translatable\Translatable;

/**
 * Categorias
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Mbp\WebBundle\Entity\CategoriasRepository")
 */
class Categorias implements Translatable
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
     * @Gedmo\Translatable
     * @ORM\Column(name="titulo", type="string", length=80)
     */
    private $titulo;

    /**
     * @var string
     * 
     * @Gedmo\Translatable
     * @ORM\Column(name="descripcion", type="string", length=250)
     */
    private $descripcion;

    /**
     * @var string
     *
     * @ORM\Column(name="rutaCatalogo", type="string", length=250)
     */
    private $rutaCatalogo;

    /**
     * @var string
     *
     * @ORM\Column(name="imagen", type="string", length=250)
     */
    private $imagen;

    /**
     * @Gedmo\Locale
     * Used locale to override Translation listener`s locale
     * this is not a mapped field of entity metadata, just a simple property
     */
    private $locale;

    
	
	/**
     * @var \Mbp\WebBundle\Entity\SubCategoria
     *
     * @ORM\OneToMany(targetEntity="Mbp\WebBundle\Entity\SubCategoria", mappedBy="categoria", cascade={"all"})
     * @ORM\JoinColumn(name="subCategoriaId", referencedColumnName="id")
     */
    private $subCategoria; 

    /**
     * @var boolean
     *
     * @ORM\Column(name="esComercial", type="boolean")
     */
    private $esComercial=0;

    public function __construct()
    {
		$this->subCategoria = new ArrayCollection();
    }

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
     * Set rutaCatalogo
     *
     * @param string $rutaCatalogo
     *
     * @return Categorias
     */
    public function setRutaCatalogo($rutaCatalogo)
    {
        $this->rutaCatalogo = $rutaCatalogo;

        return $this;
    }

    /**
     * Get rutaCatalogo
     *
     * @return string
     */
    public function getRutaCatalogo()
    {
        return $this->rutaCatalogo;
    }

    /**
     * Set imagen
     *
     * @param string $imagen
     *
     * @return Categorias
     */
    public function setImagen($imagen)
    {
        $this->imagen = $imagen;

        return $this;
    }

    /**
     * Get imagen
     *
     * @return string
     */
    public function getImagen()
    {
        return $this->imagen;
    }

    /**
     * Add articulo
     *
     * @param \Mbp\WebBundle\Entity\Articulos $articulo
     *
     * @return Categorias
     */
    public function addArticulo(\Mbp\WebBundle\Entity\Articulos $articulo)
    {
        $this->articulos[] = $articulo;

        return $this;
    }

    /**
     * Remove articulo
     *
     * @param \Mbp\WebBundle\Entity\Articulos $articulo
     */
    public function removeArticulo(\Mbp\WebBundle\Entity\Articulos $articulo)
    {
        $this->articulos->removeElement($articulo);
    }

    /**
     * Get articulos
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getArticulos()
    {
        return $this->articulos;
    }

    /**
     * Add subCategorium
     *
     * @param \Mbp\WebBundle\Entity\SubCategoria $subCategorium
     *
     * @return Categorias
     */
    public function addSubCategorium(\Mbp\WebBundle\Entity\SubCategoria $subCategorium)
    {
        $this->subCategoria[] = $subCategorium;

        return $this;
    }

    /**
     * Remove subCategorium
     *
     * @param \Mbp\WebBundle\Entity\SubCategoria $subCategorium
     */
    public function removeSubCategorium(\Mbp\WebBundle\Entity\SubCategoria $subCategorium)
    {
        $this->subCategoria->removeElement($subCategorium);
    }

    /**
     * Get subCategoria
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getSubCategoria()
    {
        return $this->subCategoria;
    }

    public function setTranslatableLocale($locale)
    {
        $this->locale = $locale;
    }

    /**
     * Set titulo
     *
     * @param string $titulo
     *
     * @return Categorias
     */
    public function setTitulo($titulo)
    {
        $this->titulo = $titulo;

        return $this;
    }

    /**
     * Get titulo
     *
     * @return string
     */
    public function getTitulo()
    {
        return $this->titulo;
    }

    /**
     * Set descripcion
     *
     * @param string $descripcion
     *
     * @return Categorias
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
     * Set esComercial
     *
     * @param boolean $esComercial
     *
     * @return Categorias
     */
    public function setEsComercial($esComercial)
    {
        $this->esComercial = $esComercial;

        return $this;
    }

    /**
     * Get esComercial
     *
     * @return boolean
     */
    public function getEsComercial()
    {
        return $this->esComercial;
    }
}
