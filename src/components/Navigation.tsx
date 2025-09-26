import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import tenryuLogo from "@/assets/tenryu-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "sobre", "clientes", "servicos", "contato"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: "home", label: "Início" },
    { id: "sobre", label: "Quem Somos" },
    { id: "clientes", label: "Clientes" },
    { id: "servicos", label: "Serviços" },
    { id: "contato", label: "Contato" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="container-tenryu">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <img 
              src={tenryuLogo} 
              alt="Tenryu Consulting - Especialistas em desenvolvimento de negócios e importação" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link font-medium ${
                  activeSection === item.id ? "text-primary after:w-full" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection("contato")}
              className="bg-primary text-primary-foreground hover:bg-primary-hover px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Agende uma Reunião
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 text-base font-medium w-full text-left transition-colors ${
                    activeSection === item.id 
                      ? "text-primary bg-primary/10" 
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <button 
                  onClick={() => scrollToSection("contato")}
                  className="bg-primary text-primary-foreground hover:bg-primary-hover px-4 py-2 rounded-md text-sm font-medium transition-colors w-full"
                >
                  Agende uma Reunião
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;