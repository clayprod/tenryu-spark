import elgLogo from "@/assets/clients/elg.png";
import fagundezLogo from "@/assets/clients/fagundez.png";
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
      website: "https://elg.com.br",
      logo: elgLogo
    },
    {
      name: "Fagundez",
      website: "https://fagundez.com.br",
      logo: fagundezLogo
    },
    {
      name: "FiberX",
      website: "https://fiberx.com.br",
      logo: fiberxLogo
    },
    {
      name: "Grupo Multi",
      website: "https://multilaser.com.br",
      logo: grupomultiLogo
    },
    {
      name: "Husky Gaming",
      website: "https://huskygaming.com.br",
      logo: huskyLogo
    },
    {
      name: "KaBuM!",
      website: "https://kabum.com.br",
      logo: kabumLogo
    },
    {
      name: "Velds",
      website: "https://velds.com.br",
      logo: veldsLogo
    },
    {
      name: "Waaw",
      website: "https://waaw.com.br",
      logo: waawLogo
    },
    {
      name: "Wap",
      website: "https://wap.ind.br",
      logo: wapLogo
    }
  ];

  return (
    <section id="clientes" className="section-padding bg-gradient-orange-subtle">
      <div className="container-tenryu">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground font-exo">
            Nossos <span className="bg-gradient-orange bg-clip-text text-transparent">Clientes</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Parcerias estratégicas que geram resultados reais. Conheça algumas empresas que 
            confiam na nossa expertise para seus projetos de desenvolvimento de negócios.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <a 
                key={index} 
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100"
              >
                <div className="w-20 h-20 flex items-center justify-center mb-3">
                  <img 
                    src={client.logo} 
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">
                  {client.name}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Clientes;