import { lazy, Suspense } from "react";
import { Button } from "./ui/button";
import { StarBorder } from "./ui/star-border";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const DottedSurface = lazy(() => import("./ui/dotted-surface").then(m => ({ default: m.DottedSurface })));

const Hero = () => {
  return (
    <section 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20"
      aria-labelledby="hero-title"
      role="banner"
    >
      {/* Animated Dotted Surface Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />}>
        <DottedSurface className="absolute inset-0" />
      </Suspense>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-background/90 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 animate-fade-in border border-white/20" role="status" aria-label="Badge de service premium">
            <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="text-sm text-white font-medium">Solutions de Branding Premium</span>
          </div>

          <h1 
            id="hero-title"
            className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up leading-tight" 
            style={{ willChange: 'transform, opacity' }}
          >
            Transformez Votre Vision En Réalité Digitale
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-10 animate-fade-in max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: "0.2s", willChange: 'opacity' }}>
            Agence de développement web et branding au Maroc, en Espagne, en Arabie Saoudite et en Afrique. Solutions complètes de design graphique, marketing digital, création de sites web et stratégie de contenu pour PME et grandes entreprises.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <StarBorder
              as="a"
              href="https://wa.me/212607076940?text=Bonjour%2C%20je%20souhaite%20d%C3%A9marrer%20un%20projet%20avec%20vous.%20J'ai%20vu%20votre%20site%20depuis%20la%20page%20d'accueil."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Démarrer votre projet via WhatsApp"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base group flex items-center"
              speed="3s"
              color="hsl(var(--primary))"
            >
              Démarrer Votre Projet
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </StarBorder>
            
            <StarBorder
              as={Link}
              to="/services/programming"
              aria-label="Découvrir nos services de programmation"
              className="bg-background/20 backdrop-blur-sm text-white hover:bg-background/30 font-medium text-base flex items-center"
              speed="4s"
              color="rgba(255, 255, 255, 0.6)"
            >
              Découvrir Nos Services
            </StarBorder>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/80 animate-fade-in" style={{ animationDelay: "0.6s" }} role="region" aria-label="Statistiques de l'entreprise">
            <div className="text-center" style={{ minWidth: '120px' }}>
              <div className="text-3xl font-bold text-white" aria-label="Plus de 500 projets réalisés">500+</div>
              <div className="text-sm">Projets Réalisés</div>
            </div>
            <div className="w-px h-12 bg-white/30" aria-hidden="true"></div>
            <div className="text-center" style={{ minWidth: '120px' }}>
              <div className="text-3xl font-bold text-white" aria-label="Plus de 300 clients satisfaits">300+</div>
              <div className="text-sm">Clients Satisfaits</div>
            </div>
            <div className="w-px h-12 bg-white/30" aria-hidden="true"></div>
            <div className="text-center" style={{ minWidth: '120px' }}>
              <div className="text-3xl font-bold text-white" aria-label="Plus de 50 experts">50+</div>
              <div className="text-sm">Experts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
