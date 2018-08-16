<?php

namespace Mbp\FinanzasBundle\Entity;

/**
 * CotizacionRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CotizacionRepository extends \Doctrine\ORM\EntityRepository
{
	public function listarCotizaciones()
	{
		$em = $this->getEntityManager();
		$repo = $em->getRepository('MbpFinanzasBundle:Cotizacion');
		
		$res = $repo->createQueryBuilder('c')
			->select("
				c.id, 
				DATE_FORMAT(c.emision, '%d/%m/%Y') AS fecha,
				c.cliente
				")
			->orderBy('c.id', 'DESC')
			->getQuery()
			->getArrayResult();
		
		return $res;
	}

	public function listarCotizacionesPorCodigo($idCodigo)
	{
		$em = $this->getEntityManager();
		$repo = $em->getRepository('MbpFinanzasBundle:Cotizacion');
		
		$res = $repo->createQueryBuilder('c')
			->select("
				c.id, 
				DATE_FORMAT(c.emision, '%d/%m/%Y') AS fecha,
				c.cliente
				")
			->join('c.detalle', 'd')
			->join('d.articuloId', 'art')
			->where('art.id = :idCodigo')
			->setParameter('idCodigo', $idCodigo)
			->orderBy('c.id', 'DESC')			
			->getQuery()
			->getArrayResult();
		
		return $res;
	}
}
