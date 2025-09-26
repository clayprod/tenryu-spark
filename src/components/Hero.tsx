import { ArrowRight, Calendar } from "lucide-react";

const Hero = () => {
  const scrollToContato = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
      </div>
      
      <div className="container-tenryu relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-exo">
            Transformamos <span className="text-primary">Visões</span> em 
            <br className="hidden sm:block" />
            Negócios <span className="text-primary">Reais</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Consultoria especializada em desenvolvimento de negócios e importação. 
            <strong className="text-white"> Redução de riscos e custos</strong> com expertise internacional 
            e <strong className="text-white">visão holística</strong> para seu sucesso.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={scrollToContato}
              className="btn-hero flex items-center gap-2 group"
            >
              <Calendar size={20} />
              Agende uma Reunião
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => scrollToSection("sobre")}
              className="btn-secondary text-white border-white hover:bg-white hover:text-gray-900"
            >
              Conheça Nossa História
            </button>
          </div>
          
          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              { number: "500+", label: "Produtos Lançados" },
              { number: "10+", label: "Marcas Atendidas" },
              { number: "20+", label: "Categorias de Produtos" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;