import { useState, useEffect } from "react";
import { Phone, Mail, Globe, MapPin, Send, CheckCircle, X, Instagram } from "lucide-react";
import emailjs from '@emailjs/browser';

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    company: "",
    message: ""
  });

  const [showStickyButton, setShowStickyButton] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Configurações do EmailJS para Umbler
      const serviceID = 'tenryu-app-mail'; // Seu Service ID
      const templateID = 'template_hl2gm4g'; // Template para Clayton
      const confirmationTemplateID = 'template_y5h5ikw'; // Template de confirmação para o usuário
      const userID = 'ZrftApoiQ6NDmVqNB'; // Sua Public Key

      // Parâmetros para e-mail para Clayton
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company_name: formData.company || 'Não informado',
        message: formData.message,
        to_email: 'clayton@tenryu.com.br',
        subject: `Contato Tenryu - ${formData.name}${formData.company ? ` (${formData.company})` : ''}`
      };

      // Parâmetros para e-mail de confirmação para o usuário
      const confirmationParams = {
        to_name: formData.name,
        to_email: formData.email,
        company_name: formData.company || 'Não informado',
        message: formData.message,
        from_email: 'clayton@tenryu.com.br',
        subject: 'Confirmação de Contato - Tenryu Consulting'
      };

      // Enviar e-mail para Clayton
      console.log('Enviando e-mail para Clayton:', templateParams);
      await emailjs.send(serviceID, templateID, templateParams, userID);
      
      // Enviar e-mail de confirmação para o usuário
      console.log('Enviando e-mail de confirmação:', confirmationParams);
      await emailjs.send(serviceID, confirmationTemplateID, confirmationParams, userID);
      
      setShowSuccessPopup(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      
      // Auto-hide popup after 5 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);
      
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      setShowErrorPopup(true);
      
      // Auto-hide error popup after 5 seconds
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 5000);
    } finally {
      setIsLoading(false);
    }
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
                disabled={isLoading}
                className="w-full btn-hero flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Enviar Mensagem
                  </>
                )}
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
                  <Instagram className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <a 
                    href="https://instagram.com/tenryucombr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-foreground text-lg hover:text-primary transition-colors cursor-pointer"
                  >
                    @tenryucombr
                  </a>
                  <p className="text-sm text-muted-foreground">Siga-nos no Instagram</p>
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

        {/* Error Popup */}
        {showErrorPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-in fade-in-0 zoom-in-95 duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2 font-exo">
                  Erro ao Enviar!
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Houve um problema ao enviar sua mensagem. Por favor, tente novamente ou entre em contato diretamente.
                </p>
                
                <button
                  onClick={() => setShowErrorPopup(false)}
                  className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Entendi
                </button>
              </div>
              
              <button
                onClick={() => setShowErrorPopup(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-in fade-in-0 zoom-in-95 duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2 font-exo">
                  Mensagem Enviada!
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Obrigado pelo seu contato! Você receberá um e-mail de confirmação e responderemos em até <strong className="text-foreground">1 dia útil</strong>.
                </p>
                
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="w-full bg-gradient-orange text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Entendi
                </button>
              </div>
              
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Contato;