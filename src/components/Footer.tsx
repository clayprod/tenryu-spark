
const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { label: "Início", id: "home" },
    { label: "Quem Somos", id: "sobre" },
    { label: "Clientes", id: "clientes" },
    { label: "Serviços", id: "servicos" },
    { label: "Contato", id: "contato" }
  ];

  const services = [
    "Pesquisa de Mercado",
    "Análise de Viabilidade", 
    "Engenharia de Produtos",
    "Marketing",
    "Assessoria de Importação",
    "Gestão de Portfólio"
  ];

  return (
    <footer className="bg-gradient-hero text-white">
      <div className="container-tenryu">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-pieces mb-2">tenryu</h3>
                <p className="text-white text-lg">CONSULTING</p>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                Consultoria especializada em desenvolvimento de negócios e importação. 
                Transformamos visões em negócios reais com expertise internacional 
                e visão holística.
              </p>
              
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Telefone:</span>
                  <span className="text-gray-300">(11) 94190-1424</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">E-mail:</span>
                  <span className="text-gray-300">clayton@tenryu.com.br</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Site:</span>
                  <span className="text-gray-300">tenryu.com.br</span>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Navegação</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-300 hover:text-primary transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Serviços</h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="text-gray-300 text-sm">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-white/20">
          <div className="text-center">
            <div className="text-gray-300 text-sm">
              © 2024 Tenryu Consulting. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;