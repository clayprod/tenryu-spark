import { Search, BarChart3, Cog, Megaphone, Ship, Briefcase, ArrowRight } from "lucide-react";

const Servicos = () => {
  const services = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Pesquisa de Mercado",
      description: "Análise completa de mercado, identificação de oportunidades, estudo de concorrência e validação de demanda para novos produtos e negócios.",
      features: ["Análise de tendências", "Mapeamento competitivo", "Validação de demanda", "Relatórios detalhados"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Análise de Viabilidade",
      description: "Avaliação técnica e financeira de projetos, modelagem de cenários e projeções para tomada de decisão estratégica.",
      features: ["Modelagem financeira", "Análise de riscos", "Projeções de ROI", "Cenários otimistas/pessimistas"]
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Engenharia de Produtos",
      description: "Desenvolvimento e otimização de produtos desde a concepção até o lançamento, com foco na viabilidade comercial.",
      features: ["Design thinking", "Prototipagem", "Testes de mercado", "Otimização de custos"]
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: "Marketing",
      description: "Estratégias de marketing integrado, posicionamento de marca e campanhas para maximizar o alcance e conversão.",
      features: ["Estratégia de marca", "Marketing digital", "Campanhas integradas", "Análise de performance"]
    },
    {
      icon: <Ship className="w-8 h-8" />,
      title: "Assessoria de Importação",
      description: "Consultoria completa em processos de importação, documentação, logística e conformidades regulatórias.",
      features: ["Processos aduaneiros", "Documentação", "Logística internacional", "Compliance regulatório"]
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Gestão de Portfólio",
      description: "Otimização contínua do mix de produtos, análise de performance e estratégias de crescimento sustentável.",
      features: ["Análise de mix", "KPIs de performance", "Estratégias de growth", "Otimização contínua"]
    }
  ];

  const processSteps = [
    { step: "01", title: "Diagnóstico", description: "Análise completa da situação atual" },
    { step: "02", title: "Estratégia", description: "Desenvolvimento de plano customizado" },
    { step: "03", title: "Execução", description: "Implementação com acompanhamento" },
    { step: "04", title: "Resultados", description: "Monitoramento e otimização contínua" }
  ];

  return (
    <section id="servicos" className="section-padding bg-secondary/30">
      <div className="container-tenryu">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Serviços & <span className="text-primary">Custos</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Soluções completas e personalizadas para cada etapa do seu negócio. 
            Investimos no seu sucesso com uma <strong className="text-foreground">abordagem holística</strong> e resultados mensuráveis.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="card-tenryu group h-full">
              <div className="flex flex-col h-full">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 flex-grow">
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            Nosso Processo de Trabalho
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
                
                {/* Arrow for desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-primary">
                    <ArrowRight size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Investment Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Investimento Personalizado
            </h3>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Cada projeto é único. Nossos investimentos são estruturados de acordo com 
              o escopo, complexidade e objetivos do seu negócio, sempre com foco no 
              <strong className="text-white"> retorno sobre o investimento</strong>.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-lg font-bold mb-2">Consultoria Pontual</h4>
                <p className="text-gray-300 text-sm">
                  Projetos específicos com escopo definido
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-lg font-bold mb-2">Parceria Estratégica</h4>
                <p className="text-gray-300 text-sm">
                  Acompanhamento contínuo de médio/longo prazo
                </p>
              </div>
              
              <div className="bg-white/10 rounded-xl p-6">
                <h4 className="text-lg font-bold mb-2">Success Fee</h4>
                <p className="text-gray-300 text-sm">
                  Remuneração por resultados alcançados
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                const element = document.getElementById("contato");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-secondary text-white border-white hover:bg-white hover:text-gray-900"
            >
              Solicitar Proposta Personalizada
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Servicos;