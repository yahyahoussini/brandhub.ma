import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { StarBorder } from "./ui/star-border";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const services = [
    { name: "Programmation & Technologie", path: "/services/programming" },
    { name: "Design & Graphisme", path: "/services/graphics" },
    { name: "Contenu & Marketing", path: "/services/content" },
    { name: "Business & Data", path: "/services/business" },
  ];

  return (
    <nav 
      id="navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-card"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group" aria-label="Retour à l'accueil BrandHub.ma">
            <img 
              src={logo} 
              alt="BrandHub.ma Logo - Agence Digitale Premium" 
              className="w-24 h-24 transition-smooth group-hover:scale-110"
              width="96"
              height="96"
              loading="eager"
              decoding="async"
              {...({ fetchpriority: "high" } as any)}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Navigation principale">
            <Link to="/" className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center">
              Accueil
            </Link>
            
            <div className="relative group" ref={servicesRef}>
              <button 
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-base font-medium min-h-[44px]"
                aria-label="Menu des services"
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              
              {servicesOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-elegant border border-border overflow-hidden animate-fade-in"
                  role="menu"
                  aria-label="Sous-menu des services"
                >
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block px-4 py-3 hover:bg-muted transition-base text-sm min-h-[44px] flex items-center"
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/blog" className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center">
              Blog
            </Link>
            
            <Link to="/contact" className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <StarBorder
              as="button"
              onClick={() => window.location.href = '/auth'}
              aria-label="Se connecter à votre compte"
              className="min-h-[44px] min-w-[44px]"
              speed="4s"
            >
              Connexion
            </StarBorder>
            <StarBorder
              as="a"
              href="https://wa.me/212607076940?text=Bonjour%2C%20je%20souhaite%20obtenir%20un%20devis%20gratuit%20depuis%20le%20menu%20de%20navigation."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Obtenir un devis gratuit via WhatsApp"
              className="gradient-accent text-foreground hover:shadow-accent transition-smooth font-semibold min-h-[44px] min-w-[44px]"
              speed="3s"
              color="hsl(var(--primary))"
            >
              Devis Gratuit
            </StarBorder>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsOpen(!isOpen);
              }
            }}
            aria-label={isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-haspopup="true"
            type="button"
          >
            {isOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
            <span className="sr-only">
              {isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav id="mobile-menu" className="md:hidden py-4 animate-fade-in" aria-label="Navigation mobile">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Accueil
              </Link>
              
              <div className="space-y-2">
                <button 
                  className="flex items-center space-x-1 text-foreground font-medium w-full min-h-[44px]"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-label="Menu des services"
                  aria-expanded={servicesOpen}
                >
                  <span>Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                
                {servicesOpen && (
                  <div className="pl-4 space-y-2">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="block text-sm text-muted-foreground hover:text-primary transition-base min-h-[44px] flex items-center"
                        onClick={() => setIsOpen(false)}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/blog" 
                className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              
              <Link 
                to="/contact" 
                className="text-foreground hover:text-primary transition-base font-medium min-h-[44px] flex items-center"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              <StarBorder
                as="a"
                href="https://wa.me/212607076940?text=Bonjour%2C%20je%20souhaite%20obtenir%20un%20devis%20gratuit%20depuis%20le%20menu%20mobile."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Obtenir un devis gratuit via WhatsApp"
                className="gradient-accent text-foreground font-semibold w-full min-h-[48px]"
                speed="3s"
                color="hsl(var(--primary))"
              >
                Devis Gratuit
              </StarBorder>
              
              <StarBorder
                as="button"
                onClick={() => {
                  setIsOpen(false);
                  window.location.href = '/auth';
                }}
                aria-label="Se connecter à votre compte"
                className="w-full min-h-[48px]"
                speed="4s"
              >
                Connexion
              </StarBorder>
            </div>
          </nav>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
