import elgLogo from "@/assets/clients/elg.png";
import fiberxLogo from "@/assets/clients/fiberx.png";
import grupomultiLogo from "@/assets/clients/grupomulti.png";
import huskyLogo from "@/assets/clients/husky.png";
import kabumLogo from "@/assets/clients/kabum.png";
import veldsLogo from "@/assets/clients/velds.png";
import wapLogo from "@/assets/clients/wap.png";
import waawLogo from "@/assets/clients/waaw.webp";

const Clientes = () => {
  const clients = [
    {
      name: "ELG",
      description: "Soluções em tecnologia",
      website: "elg.com.br",
      logo: elgLogo
    },
    {
      name: "Fagundez",
      description: "Distribuição especializada",
      website: "fagundez.com",
      logo: null // Fagundez não tem logo no upload
    },
    {
      name: "Husky Gaming",
      description: "Gaming e e-sports",
      logo: huskyLogo
    },
    {
      name: "Waaw",
      description: "Marca by Alok",
      website: "waaw.com.br",
      logo: waawLogo
    },
    {
      name: "FiberX",
      description: "Soluções em fibra óptica",
      website: "fiberx.com.br",
      logo: fiberxLogo
    },
    {
      name: "Wap",
      description: "Indústria e tecnologia",
      website: "wap.ind.br",
      logo: wapLogo
    },
    {
      name: "Velds",
      description: "Soluções tecnológicas",
      website: "velds.com.br",
      logo: veldsLogo
    },
    {
      name: "KaBuM!",
      description: "Líder em e-commerce de tecnologia",
      website: "kabum.com.br",
      logo: kabumLogo
    },
    {
      name: "Grupo Multi",
      description: "Distribuição multimarca",
      website: "multilaser.com.br",
      logo: grupomultiLogo
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <div key={index} className="card-tenryu text-center group">
                <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all p-3">
                  {client.logo ? (
                    <img 
                      src={client.logo} 
                      alt={`${client.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <div className="text-2xl font-bold text-gray-400">
                      {client.name.charAt(0)}
                    </div>
                  )}
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