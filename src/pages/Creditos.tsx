import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEO/SEOHead";
import { Breadcrumbs } from "@/components/SEO/Breadcrumbs";

const Creditos = () => {
  const credits = [
    {
      name: "Slidesgo",
      url: "https://slidesgo.com/",
      description: "Templates e apresentações utilizados como referência de design"
    },
    {
      name: "Flaticon",
      url: "https://www.flaticon.com/",
      description: "Ícones minimalistas e lineares utilizados na interface"
    },
    {
      name: "Freepik", 
      url: "https://www.freepik.com/",
      description: "Elementos gráficos e recursos visuais"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Créditos de Design - Tenryu Consulting"
        description="Reconhecimento aos criadores e plataformas que contribuíram para a criação visual do website Tenryu Consulting. Slidesgo, Flaticon e Freepik."
        keywords="créditos, design, slidesgo, flaticon, freepik, recursos visuais"
        canonical="https://tenryu.com.br/creditos"
      />
      <Breadcrumbs />
      {/* Header */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="container-tenryu">
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Voltar ao site
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Créditos de Design
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Reconhecimento aos criadores e plataformas que contribuíram 
            para a criação visual deste website.
          </p>
        </div>
      </div>

      {/* Credits Content */}
      <div className="section-padding">
        <div className="container-tenryu">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {credits.map((credit, index) => (
                <div key={index} className="card-tenryu">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {credit.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {credit.description}
                      </p>
                    </div>
                    <a
                      href={credit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hero flex items-center gap-2 self-start"
                    >
                      Visitar Site
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Information */}
            <div className="mt-12 card-tenryu">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Sobre os Recursos Utilizados
              </h3>
              <div className="text-muted-foreground space-y-4">
                <p>
                  Este website foi desenvolvido respeitando os termos de uso e licenças 
                  das plataformas mencionadas. Todos os recursos visuais foram utilizados 
                  conforme suas respectivas licenças.
                </p>
                <p>
                  <strong className="text-foreground">Slidesgo:</strong> Referências de design 
                  e layout para criação de apresentações corporativas modernas.
                </p>
                <p>
                  <strong className="text-foreground">Flaticon:</strong> Ícones vetoriais 
                  minimalistas que complementam o design clean e profissional.
                </p>
                <p>
                  <strong className="text-foreground">Freepik:</strong> Elementos gráficos 
                  e recursos visuais que enriquecem a experiência do usuário.
                </p>
              </div>
            </div>

            {/* Back to Site */}
            <div className="text-center mt-12">
              <Link 
                to="/"
                className="btn-hero inline-flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Voltar ao Site Principal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creditos;