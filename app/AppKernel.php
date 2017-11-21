<?php
use Symfony\Component\HttpKernel\Kernel;
use Symfony\Component\Config\Loader\LoaderInterface;

class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            new Symfony\Bundle\FrameworkBundle\FrameworkBundle(),
            new Symfony\Bundle\SecurityBundle\SecurityBundle(),
            new Symfony\Bundle\TwigBundle\TwigBundle(),
            new Symfony\Bundle\MonologBundle\MonologBundle(),
            new Symfony\Bundle\SwiftmailerBundle\SwiftmailerBundle(),
            new Symfony\Bundle\AsseticBundle\AsseticBundle(),
            new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
            new Sensio\Bundle\FrameworkExtraBundle\SensioFrameworkExtraBundle(),
            new Mbp\SenchaBundle\MbpSenchaBundle(),
            new Mbp\CalidadBundle\MbpCalidadBundle(),
            new Mbp\ArticulosBundle\MbpArticulosBundle(),
            new Mbp\ClientesBundle\MbpClientesBundle(),
            new FOS\JsRoutingBundle\FOSJsRoutingBundle(),
            new Mbp\SecurityBundle\MbpSecurityBundle(),
            new Mbp\ProduccionBundle\MbpProduccionBundle(),
            new Mbp\PersonalBundle\MbpPersonalBundle(),
            new Liuggio\ExcelBundle\LiuggioExcelBundle(),
            new Mbp\FinanzasBundle\MbpFinanzasBundle(),
            new Mbp\ProveedoresBundle\MbpProveedoresBundle(),
            new Mbp\ComprasBundle\MbpComprasBundle(),
            new Mbp\WebBundle\MbpWebBundle(),
            new Stof\DoctrineExtensionsBundle\StofDoctrineExtensionsBundle(),
            new Mbp\TestBundle\MbpTestBundle(),
            new Lopi\Bundle\PusherBundle\LopiPusherBundle(),
        );

        if (in_array($this->getEnvironment(), array('dev', 'test'))) {
            $bundles[] = new Symfony\Bundle\WebProfilerBundle\WebProfilerBundle();
            $bundles[] = new Sensio\Bundle\DistributionBundle\SensioDistributionBundle();
            $bundles[] = new Sensio\Bundle\GeneratorBundle\SensioGeneratorBundle();
        }

        return $bundles;
    }

    public function registerContainerConfiguration(LoaderInterface $loader)
    {
        $loader->load(__DIR__.'/config/config_'.$this->getEnvironment().'.yml');
    }
}
