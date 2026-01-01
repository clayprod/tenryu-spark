import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import QuemSomos from "@/components/QuemSomos";
import Clientes from "@/components/Clientes";
import Servicos from "@/components/Servicos";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEO/SEOHead";
import { OrganizationSchema } from "@/components/SEO/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Tenryu Consulting - Consultoria em Desenvolvimento de Negócios e Importação | São Paulo"
        description="Consultoria especializada em desenvolvimento de produtos, negócios e importação. Redução de riscos e custos com expertise internacional e visão holística. Atendimento em São Paulo e todo Brasil."
        keywords="consultoria empresarial, desenvolvimento de negócios, importação, gestão de portfólio, redução de custos, expertise internacional, São Paulo, Brasil"
        canonical="https://tenryu.com.br"
      />
      <OrganizationSchema />
      <Navigation />
      <main>
        <Hero />
        <QuemSomos />
        <Clientes />
        <Servicos />
        <Contato />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
