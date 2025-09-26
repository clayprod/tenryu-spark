import { Target, Users, Globe, Award } from "lucide-react";
import claytonPhoto from "@/assets/clayton-photo.png";

const QuemSomos = () => {
  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="container-tenryu">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground font-exo">
            Quem <span className="text-primary">Somos</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            A <strong className="text-foreground font-pieces">Tenryu Consulting</strong> é uma empresa especializada em apoiar empresas que buscam 
            expertise e uma <strong className="text-foreground">visão holística</strong> no desenvolvimento de novos produtos e negócios, 
            além da <strong className="text-foreground">redução de riscos e custos</strong> na gestão de capital humano especializado, 
            otimizando OPEX por meio de soluções validadas em casos reais de sucesso.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Clayton Costa Profile */}
          <div className="card-tenryu">
            <div className="text-center lg:text-left">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto lg:mx-0 mb-6 bg-gray-100">
                <img 
                  src={claytonPhoto} 
                  alt="Clayton Costa - Sócio-proprietário da Tenryu Consulting" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-exo">
                Clayton Costa
              </h3>
              <p className="text-lg text-primary font-semibold mb-4">
                Sócio-proprietário
              </p>
              
              <div className="text-muted-foreground space-y-4">
                <p>
                  Especialista em <strong className="text-foreground">desenvolvimento de negócios e importação</strong>, 
                  com mais de <strong className="text-foreground">12 anos de experiência</strong> em tecnologia, 
                  comércio internacional e gestão de portfólio.
                </p>
                <p>
                  Atuação em empresas líderes em seus respectivos mercados, tanto na indústria 
                  como na distribuição e no varejo.
                </p>
                <p>
                  <strong className="text-foreground">Sólida vivência internacional</strong> e presença em 
                  eventos globais do segmento.
                </p>
              </div>
            </div>
          </div>

          {/* Company Values */}
          <div className="space-y-8">
            <div className="card-tenryu group">
              <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Target className="w-6 h-6 text-primary" />
              </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2 font-exo">
                    Visão Holística
                  </h4>
                  <p className="text-muted-foreground">
                    Abordagem completa que considera todos os aspectos do negócio, 
                    desde a concepção até a implementação e otimização.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-tenryu group">
              <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6 text-primary" />
              </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2 font-exo">
                    Equipe Multidisciplinar
                  </h4>
                  <p className="text-muted-foreground">
                    Equipe de apoio com passagem por grandes empresas de tecnologia, 
                    além de formação e conhecimento prático em cada etapa do processo.
                  </p>
                </div>
              </div>
            </div>

            <div className="card-tenryu group">
              <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Globe className="w-6 h-6 text-primary" />
              </div>
                <div>
                  <h4 className="text-xl font-semibold text-foreground mb-2 font-exo">
                    Experiência Internacional
                  </h4>
                  <p className="text-muted-foreground">
                    Conhecimento profundo dos mercados globais e processos 
                    de importação, com presença ativa em eventos internacionais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuemSomos;