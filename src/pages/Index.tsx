import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import QuemSomos from "@/components/QuemSomos";
import Clientes from "@/components/Clientes";
import Servicos from "@/components/Servicos";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
