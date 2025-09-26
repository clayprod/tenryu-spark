import { useState } from "react";
import { Phone, Mail, Globe, MapPin, Send } from "lucide-react";

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

        <div className="grid lg:grid-cols-1 gap-12">
          {/* Contact Form */}
          <div className="card-tenryu max-w-2xl mx-auto">
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
            
            <p className="text-sm text-muted-foreground mt-4 text-center">
              * Campos obrigatórios. Responderemos em até 1 dia útil.
            </p>
          </div>
        </div>

        {/* Other Contact Methods */}
        <div className="mt-16">
          <div className="card-tenryu max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-foreground mb-6 font-exo text-center">
              Outras Formas de Contato
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
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