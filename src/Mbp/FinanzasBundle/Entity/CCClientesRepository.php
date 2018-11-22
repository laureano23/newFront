<?php

namespace Mbp\FinanzasBundle\Entity;
use Mbp\FinanzasBundle\Entity\CCClientes;

/**
 * CCClientesRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class CCClientesRepository extends \Doctrine\ORM\EntityRepository
{	
	public function listarCCClientes($idCliente){
		$em = $this->getEntityManager()->getConnection();
		
		// prepare statement
		$sth = $em->prepare("CALL listarCCCliente($idCliente)");
		
		// execute and fetch
		$sth->execute();
		$res = $sth->fetchAll();
		
		
		return $res;
	
	}

	public function crearMovimientoCC($mov, $cbte){
		$em = $this->getEntityManager();
		$repoCliente=$em->getRepository('MbpClientesBundle:Cliente');

		$cc=new CCClientes;
		if($mov->sosNotaCreditoA()){
			$cc->setHaber($mov->getTotalComprobante());	
		}else{
			$cc->setDebe($mov->getTotalComprobante());
		}		
		$cliente=$repoCliente->find($mov->getCliente());
		$cc->setClienteId($cliente);
		$cc->setFacturaId($cbte);
		$cc->setFechaVencimiento($mov->getFechaVencimiento());
		$cc->setFechaEmision(\DateTime::createFromFormat('Ymd',$mov->getFechaEmision()));

		return $cc;
	}
}
