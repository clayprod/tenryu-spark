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

  return (
    <section id="clientes" className="section-padding bg-secondary/30">
      <div className="container-tenryu">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground font-exo">
            Nossos <span className="text-primary">Clientes</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Parcerias estratégicas que geram resultados reais. Conheça algumas empresas que 
            confiam na nossa expertise para seus projetos de desenvolvimento de negócios.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <div key={index} className="card-tenryu text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <div className="text-primary">
                    {client.icon}
                  </div>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2 font-exo">
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

        {/* Call to Action */}
        <div className="text-center">
          <div className="card-tenryu max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-exo">
              Quer ser nosso próximo cliente?
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