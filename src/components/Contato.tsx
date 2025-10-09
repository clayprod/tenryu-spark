import { useState, useEffect } from "react";
import { Phone, Mail, Globe, MapPin, Send, CheckCircle, X, Instagram } from "lucide-react";
import emailjs from '@emailjs/browser';

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "", 
    company: "",
    employees: "",
    industry: "",
    industryOther: "",
    salesChannel: "",
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
      // Monta a mensagem com os campos adicionais em linhas separadas
      const industryValue =
        formData.industry === 'Outro, especifique'
          ? (formData.industryOther ? `Outro: ${formData.industryOther}` : 'Outro (não especificado)')
          : (formData.industry || 'Não informado');
      const composedMessage = `${formData.message}\n\n---\nInformações adicionais:\n- Número de funcionários: ${formData.employees || 'Não informado'}\n- Ramo de atuação: ${industryValue}\n- Canal de vendas: ${formData.salesChannel || 'Não informado'}`;
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
        message: composedMessage,
        to_email: 'clayton@tenryu.com.br',
        subject: `Contato Tenryu - ${formData.name}${formData.company ? ` (${formData.company})` : ''}`
      };

      // Parâmetros para e-mail de confirmação para o usuário
      const confirmationParams = {
        to_name: formData.name,
        to_email: formData.email,
        company_name: formData.company || 'Não informado',
        message: composedMessage,
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
      setFormData({ name: "", email: "", company: "", employees: "", industry: "", industryOther: "", salesChannel: "", message: "" });
      
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contato" className="section-padding bg-background relative" itemScope itemType="https://schema.org/ContactPage">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(244,63,94,0.1)_0%,transparent_50%)]"></div>
      </div>

      <div className="container-tenryu relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground font-exo" itemProp="name">
            Vamos Colocar <span className="text-primary">Sonhos</span> em
            <br className="hidden sm:block" />
            <span className="text-primary">Prática</span> <span className="text-primary">Juntos?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" itemProp="description">
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

              {/* Campos adicionais para facilitar o filtro posterior */}
              <div>
                <label htmlFor="employees" className="block text-sm font-medium text-foreground mb-2">
                  Número de Funcionários
                </label>
                <select
                  id="employees"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background text-foreground"
                >
                  <option value="">Selecione...</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value=">200">200+</option>
                </select>
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-foreground mb-2">
                  Ramo de Atuação
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background text-foreground"
                >
                  <option value="">Selecione...</option>
                  <option value="Agronegócio">Agronegócio</option>
                  <option value="Alimentos e Bebidas">Alimentos e Bebidas</option>
                  <option value="Automotivo">Automotivo</option>
                  <option value="Beleza e Cosméticos">Beleza e Cosméticos</option>
                  <option value="Casa e Construção">Casa e Construção</option>
                  <option value="Materiais de Construção">Materiais de Construção</option>
                  <option value="Ferramentas">Ferramentas</option>
                  <option value="Móveis e Decoração">Móveis e Decoração</option>
                  <option value="Utilidades Domésticas">Utilidades Domésticas</option>
                  <option value="Limpeza">Limpeza</option>
                  <option value="Higiene Pessoal">Higiene Pessoal</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Farmacêutico">Farmacêutico</option>
                  <option value="Equipamentos Médicos e Hospitalares">Equipamentos Médicos e Hospitalares</option>
                  <option value="Químico">Químico</option>
                  <option value="Pet">Pet</option>
                  <option value="Papelaria e Escritório">Papelaria e Escritório</option>
                  <option value="Brinquedos">Brinquedos</option>
                  <option value="Esportes e Lazer">Esportes e Lazer</option>
                  <option value="Moda e Vestuário">Moda e Vestuário</option>
                  <option value="Calçados">Calçados</option>
                  <option value="Acessórios">Acessórios</option>
                  <option value="Joias e Óptica">Joias e Óptica</option>
                  <option value="Eletrônicos e Informática">Eletrônicos e Informática</option>
                  <option value="Eletrodomésticos">Eletrodomésticos</option>
                  <option value="Telefonia e Acessórios">Telefonia e Acessórios</option>
                  <option value="Energia e Iluminação">Energia e Iluminação</option>
                  <option value="Segurança e CFTV">Segurança e CFTV</option>
                  <option value="Automação e Eletrônica">Automação e Eletrônica</option>
                  <option value="Logística e Transporte">Logística e Transporte</option>
                  <option value="Educação">Educação</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Imobiliário">Imobiliário</option>
                  <option value="Hotelaria e Turismo">Hotelaria e Turismo</option>
                  <option value="Restaurantes e Food Service">Restaurantes e Food Service</option>
                  <option value="Bares e Bebidas">Bares e Bebidas</option>
                  <option value="Mercado Público / Governo">Mercado Público / Governo</option>
                  <option value="ONG / Terceiro Setor">ONG / Terceiro Setor</option>
                  <option value="Mineração e Siderurgia">Mineração e Siderurgia</option>
                  <option value="Papel e Celulose">Papel e Celulose</option>
                  <option value="Plásticos e Embalagens">Plásticos e Embalagens</option>
                  <option value="Têxtil">Têxtil</option>
                  <option value="Agroindústria">Agroindústria</option>
                  <option value="Tecnologia e Software">Tecnologia e Software</option>
                  <option value="Serviços Profissionais">Serviços Profissionais</option>
                  <option value="Outro, especifique">Outro, especifique</option>
                </select>
                {formData.industry === 'Outro, especifique' && (
                  <div className="mt-3">
                    <label htmlFor="industryOther" className="block text-sm font-medium text-foreground mb-2">
                      Especifique o ramo
                    </label>
                    <input
                      type="text"
                      id="industryOther"
                      name="industryOther"
                      value={formData.industryOther}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background text-foreground"
                      placeholder="Ex.: Cosméticos naturais, Energia solar, etc."
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="salesChannel" className="block text-sm font-medium text-foreground mb-2">
                  Canal de Vendas
                </label>
                <select
                  id="salesChannel"
                  name="salesChannel"
                  value={formData.salesChannel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-background text-foreground"
                >
                  <option value="">Selecione...</option>
                  <option value="Distribuidor / Atacado">Distribuidor / Atacado</option>
                  <option value="Revenda / Varejo">Revenda / Varejo</option>
                  <option value="Indústria">Indústria</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Serviços">Serviços</option>
                </select>
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
                  <a
                    href="mailto:clayton@tenryu.com.br"
                    className="font-medium text-foreground text-lg hover:text-primary transition-colors cursor-pointer"
                  >
                    clayton@tenryu.com.br
                  </a>
                  <p className="text-sm text-muted-foreground">Resposta em até 24h</p>
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