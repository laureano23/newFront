<?php

namespace Mbp\ArticulosBundle\Entity;

/**
 * RemitosClientesRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class RemitosClientesRepository extends \Doctrine\ORM\EntityRepository
{
	public function listarRemitosPendientesFacturacion($idCliente){
		$em = $this->getEntityManager();
		
		$repo = $em->getRepository('MbpArticulosBundle:RemitosClientes');
		$qb = $repo->createQueryBuilder('r');
		
		$res =	$qb->select('r.id, d.id as remitoNum, d.descripcion, d.cantidad, d.unidad,
			 	art.codigo, d.oc, p.id as pedido, d.facturado,
			 	art.costo, art.precio')
			->join('r.detalleRemito', 'd')
			->join('d.articuloId', 'art')
			->leftjoin('d.pedidoDetalleId', 'p')
			->where('d.facturado = 0')
			->andWhere($qb->expr()->isNotNull('r.clienteId'))
			->andWhere('r.clienteId = :clienteId')
			->setParameter('clienteId', $idCliente)
			->getQuery()
			->getResult();
		
		return $res;
	}
	
	public function listarRemitosPendientesTodos(){
		$em = $this->getEntityManager();
		
		$repo = $em->getRepository('MbpArticulosBundle:RemitosClientes');
		$qb = $repo->createQueryBuilder('r');
		
		$res =	$qb->select('r.id, d.id as remitoNum, d.descripcion, d.cantidad, d.unidad,
			 	art.codigo, d.oc, p.id as pedido, d.facturado,
			 	art.costo, art.precio')
			->join('r.detalleRemito', 'd')
			->join('d.articuloId', 'art')
			->leftjoin('d.pedidoDetalleId', 'p')
			->where('d.facturado = 0')
			->andWhere($qb->expr()->isNotNull('r.clienteId'))
			->getQuery()
			->getResult();
		
		return $res;
	}
	
	public function listarRemitos(){
		$em = $this->getEntityManager();
		
		$repo = $em->getRepository('MbpArticulosBundle:RemitosClientes');
		$res = $repo->createQueryBuilder('r')
						->select("r.id, r.remitoNum, DATE_FORMAT(r.fecha, '%d/%m/%Y') as fecha,
							c.rsocial as cliente,
							p.rsocial as proveedor")
						->leftJoin('r.proveedorId', 'p')
						->leftJoin('r.clienteId', 'c')
						->getQuery()
						->getArrayResult();
		
		return $res;
	}
}
