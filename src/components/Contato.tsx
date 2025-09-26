import { useState, useEffect } from "react";
import { Phone, Mail, Globe, MapPin, Send } from "lucide-react";

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    company: "",
    message: ""
  });

  const [showStickyButton, setShowStickyButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home");
      const contactSection = document.getElementById("contato");
      
      if (homeSection && contactSection) {
        const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;
        const contactTop = contactSection.offsetTop;
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        // Show button when user has scrolled past home section and is not in contact section
        setShowStickyButton(scrollPosition > homeBottom && scrollPosition < contactTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email service
    console.log("Form submitted:", formData);
    alert("Mensagem enviada! Responderemos em até 1 dia útil.");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contato" className="section-padding bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(244,63,94,0.1)_0%,transparent_50%)]"></div>
      </div>

      <div className="container-tenryu relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground font-exo">
            Vamos Colocar <span className="text-primary">Sonhos</span> em 
            <br className="hidden sm:block" />
            Prática <span className="text-primary">Juntos?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Estamos prontos para transformar suas ideias em negócios reais. 
            Entre em contato e vamos começar essa jornada de sucesso.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="card-tenryu">
            <h3 className="text-xl font-bold text-foreground mb-6 font-exo">
              Envie sua Mensagem
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background text-foreground"
                  placeholder="Seu nome completo"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background text-foreground"
                  placeholder="seu@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background text-foreground"
                  placeholder="Nome da sua empresa"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background text-foreground resize-none"
                  placeholder="Conte-nos sobre seu projeto ou como podemos ajudar..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full btn-hero flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Enviar Mensagem
              </button>
            </form>
            
            <p className="text-sm text-muted-foreground mt-4 text-center lg:text-left">
              * Campos obrigatórios. Responderemos em até 1 dia útil.
            </p>
          </div>

          {/* Other Contact Methods */}
          <div className="card-tenryu">
            <h3 className="text-xl font-bold text-foreground mb-6 font-exo">
              Outras Formas de Contato
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <a 
                    href="https://wa.me/5511941901424" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-foreground text-lg hover:text-primary transition-colors cursor-pointer"
                  >
                    (11) 94190-1424
                  </a>
                  <p className="text-sm text-muted-foreground">Clique para ir ao WhatsApp</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-lg">clayton@tenryu.com.br</p>
                  <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-lg">tenryu.com.br</p>
                  <p className="text-sm text-muted-foreground">Site institucional</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-lg">São Paulo, SP</p>
                  <p className="text-sm text-muted-foreground">Atendimento nacional</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Sticky Mobile */}
        {showStickyButton && (
          <div className="fixed bottom-4 left-4 right-4 md:hidden z-50">
            <button 
              onClick={() => {
                const element = document.getElementById("contato");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full btn-hero shadow-2xl"
            >
              Agende uma Reunião
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contato;