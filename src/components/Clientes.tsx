import { Building2, TrendingUp, Users, Zap } from "lucide-react";

const Clientes = () => {
  const clients = [
    {
      name: "KaBuM!",
      description: "Líder em e-commerce de tecnologia",
      website: "www.kabum.com.br",
      icon: <Zap className="w-8 h-8" />
    },
    {
      name: "Fiber",
      description: "Soluções em fibra óptica",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      name: "Grupo Multi",
      description: "Distribuição multimarca",
      icon: <Building2 className="w-8 h-8" />
    },
    {
      name: "Dagundez Distribuição",
      description: "Distribuição especializada",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const cases = [
    {
      title: "Expansão Internacional",
      description: "Apoio na entrada de produtos asiáticos no mercado brasileiro",
      results: "40% redução de custos operacionais"
    },
    {
      title: "Otimização de Portfólio",
      description: "Reestruturação e análise de viabilidade de produtos",
      results: "25% aumento na margem de contribuição"
    },
    {
      title: "Desenvolvimento de Novos Negócios", 
      description: "Pesquisa de mercado e validação de oportunidades",
      results: "3 novas linhas de produtos lançadas"
    }
  ];

  return (
    <section id="clientes" className="section-padding bg-secondary/30">
      <div className="container-tenryu">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Clientes & <span className="text-primary">Cases</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Parcerias estratégicas que geram resultados reais. Conheça algumas empresas que 
            confiam na nossa expertise e os cases de sucesso que construímos juntos.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            Nossos Clientes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <div key={index} className="card-tenryu text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary">
                    {client.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {client.name}
                </h4>
                <p className="text-muted-foreground text-sm mb-3">
                  {client.description}
                </p>
                {client.website && (
                  <p className="text-primary text-sm font-medium">
                    {client.website}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cases de Sucesso */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-foreground">
            Cases de Sucesso
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {cases.map((case_, index) => (
              <div key={index} className="card-tenryu">
                <div className="h-full flex flex-col">
                  <h4 className="text-xl font-bold text-foreground mb-4">
                    {case_.title}
                  </h4>
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {case_.description}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-primary">
                      Resultado Alcançado
                    </p>
                    <p className="text-foreground font-medium">
                      {case_.results}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="card-tenryu max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Quer ser nosso próximo case de sucesso?
            </h3>
            <p className="text-muted-foreground mb-6">
              Vamos conversar sobre como podemos ajudar sua empresa a alcançar 
              resultados extraordinários.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById("contato");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-hero"
            >
              Solicitar Proposta
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clientes;