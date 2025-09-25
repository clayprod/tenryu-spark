import { useState } from "react";
import { Calendar, Phone, Mail, Globe, MapPin, Clock, Send, ExternalLink } from "lucide-react";

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    company: "",
    message: ""
  });

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

  const meetingLinks = [
    { 
      label: "Agendar Reunião Principal",
      url: "#", // Replace with actual bit.ly link
      description: "Link principal para agendamento"
    },
    { 
      label: "Reunião Expressa (30min)",
      url: "#", // Replace with actual bit.ly link  
      description: "Para consultas rápidas"
    },
    { 
      label: "Reunião Completa (60min)",
      url: "#", // Replace with actual bit.ly link
      description: "Para projetos complexos"
    }
  ];

  return (
    <section id="contato" className="section-padding bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(244,63,94,0.1)_0%,transparent_50%)]"></div>
      </div>

      <div className="container-tenryu relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Vamos Colocar <span className="text-primary">Sonhos</span> em 
            <br className="hidden sm:block" />
            Prática <span className="text-primary">Juntos?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Estamos prontos para transformar suas ideias em negócios reais. 
            Entre em contato e vamos começar essa jornada de sucesso.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Meeting Links */}
            <div className="card-tenryu">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  Agende uma Reunião
                </h3>
              </div>
              
              <div className="space-y-4">
                {meetingLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link.label}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="card-tenryu">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Outras Formas de Contato
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">(11) 94190-1424</p>
                    <p className="text-sm text-muted-foreground">WhatsApp disponível</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">clayton@tenryu.com.br</p>
                    <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">tenryu.com.br</p>
                    <p className="text-sm text-muted-foreground">Site institucional</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">São Paulo, SP</p>
                    <p className="text-sm text-muted-foreground">Atendimento nacional</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Seg - Sex: 9h às 18h</p>
                    <p className="text-sm text-muted-foreground">Horário comercial</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-tenryu">
            <h3 className="text-xl font-bold text-foreground mb-6">
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
            
            <p className="text-sm text-muted-foreground mt-4 text-center">
              * Campos obrigatórios. Responderemos em até 1 dia útil.
            </p>
          </div>
        </div>

        {/* CTA Sticky Mobile */}
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
      </div>
    </section>
  );
};

export default Contato;