import { useState } from "react";
import { Monitor, Shield, Home, ChevronDown, ChevronRight } from "lucide-react";

const Produtos = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const categories = [
    {
      title: "Acessórios de Informática",
      icon: <Monitor className="w-8 h-8" />,
      color: "bg-blue-500",
      products: [
        "Monitores", "SSDs", "Memórias", "Fontes", "Coolers", 
        "Placas de vídeo", "Placas-mãe", "Gabinetes", 
        "Mouses", "Teclados", "Headsets", "Cadeiras", "Hubs"
      ]
    },
    {
      title: "Segurança Eletrônica",
      icon: <Shield className="w-8 h-8" />,
      color: "bg-green-500",
      products: [
        "Câmeras", "Gravadores", "Fechaduras eletrônicas", 
        "Alarmes", "Vídeo-porteiros", "Controladoras de acesso"
      ]
    },
    {
      title: "Home Appliances",
      icon: <Home className="w-8 h-8" />,
      color: "bg-purple-500",
      products: [
        "Air-fryers", "Aspiradores", "Cafeteiras", "Liquidificadores", 
        "Batedeiras", "Assadeiras", "Fornos elétricos", "Entre outras categorias"
      ]
    }
  ];

  return (
    <section id="produtos" className="section-padding bg-background">
      <div className="container-tenryu">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Principais <span className="text-primary">Produtos</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Oferecemos uma ampla gama de produtos em três categorias principais, 
            com expertise em importação e desenvolvimento de negócios para cada segmento.
          </p>
        </div>

        {/* Desktop Layout - 3 Columns */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => (
            <div key={index} className="card-tenryu group">
              <div className="text-center mb-6">
                <div className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-2">
                {category.products.map((product, productIndex) => (
                  <div key={productIndex} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground hover:text-foreground transition-colors">
                      {product}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout - Accordion */}
        <div className="lg:hidden mb-16">
          {categories.map((category, index) => (
            <div key={index} className="card-tenryu mb-4">
              <button
                onClick={() => setActiveCategory(activeCategory === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>
                {activeCategory === index ? (
                  <ChevronDown className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
              
              {activeCategory === index && (
                <div className="px-4 pb-4 space-y-2 animate-accordion-down">
                  {category.products.map((product, productIndex) => (
                    <div key={productIndex} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-primary/5">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">
                        {product}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Números que Comprovam Nossa Expertise
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                500+
              </div>
              <p className="text-gray-200">
                Produtos já importados e validados
              </p>
            </div>
            
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                15+
              </div>
              <p className="text-gray-200">
                Países de origem dos produtos
              </p>
            </div>
            
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                98%
              </div>
              <p className="text-gray-200">
                Taxa de sucesso em validações
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <button 
              onClick={() => {
                const element = document.getElementById("servicos");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-secondary text-white border-white hover:bg-white hover:text-gray-900"
            >
              Conheça Nossos Serviços
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Produtos;