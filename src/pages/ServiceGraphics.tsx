import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ProcessSection from "@/components/ProcessSection";
import EnhancedFAQ from "@/components/EnhancedFAQ";
import GlassCard from "@/components/ui/glass-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Palette, Layers, PenTool, Image, Video, Package, Search, Lightbulb, Pencil, Sparkles, CheckCircle, Award, Globe, Shield, Code, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Service {
  id: string;
  category: string;
  title: string;
  description: string | null;
  icon: string | null;
}

const ServiceGraphics = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("category", "graphics")
      .eq("is_active", true);

    if (data) setServices(data);
  };

  const getIconComponent = (iconName: string | null) => {
    const icons: { [key: string]: any } = {
      Palette, Layers, PenTool, Image, Video, Package
    };
    return icons[iconName || "Palette"] || Palette;
  };

  const fallbackServices = [
    {
      icon: Palette,
      title: "Identité Visuelle",
      description: "Logo, charte graphique et brand identity complète"
    },
    {
      icon: Layers,
      title: "UI/UX Design",
      description: "Interfaces web et mobile centrées utilisateur"
    },
    {
      icon: PenTool,
      title: "Design Graphique",
      description: "Créations visuelles pour tous supports"
    },
    {
      icon: Image,
      title: "Design Print",
      description: "Flyers, cartes de visite, affiches et supports imprimés"
    },
    {
      icon: Video,
      title: "Motion Design",
      description: "Animations et vidéos pour vos contenus digitaux"
    },
    {
      icon: Package,
      title: "Design 3D",
      description: "Visualisation 3D et design d'intérieur"
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  const processSteps = [
    {
      number: "01",
      title: "Découverte & Brief",
      description: "Compréhension approfondie de votre vision, vos objectifs et votre identité de marque.",
      icon: Search
    },
    {
      number: "02",
      title: "Recherche & Inspiration",
      description: "Analyse des tendances, de la concurrence et recherche d'inspiration créative.",
      icon: Lightbulb
    },
    {
      number: "03",
      title: "Concepts & Croquis",
      description: "Développement de concepts créatifs et esquisses préliminaires.",
      icon: Pencil
    },
    {
      number: "04",
      title: "Design & Raffinage",
      description: "Création des designs finaux avec itérations et ajustements selon vos retours.",
      icon: Sparkles
    },
    {
      number: "05",
      title: "Livraison & Support",
      description: "Livraison des fichiers finaux dans tous les formats nécessaires avec support continu.",
      icon: CheckCircle
    }
  ];

  // FAQ Data for Graphics Page
  const graphicsFAQs = [
    {
      question: "Combien coûte la création d'un logo professionnel au Maroc?",
      answer: "Nos tarifs logo varient selon vos besoins:<br/>• <strong>Logo simple:</strong> 1500-3000 MAD<br/>• <strong>Logo + variations:</strong> 3000-5000 MAD<br/>• <strong>Identité complète:</strong> 5000-10000 MAD<br/>Inclus: fichiers vectoriels, déclinaisons couleurs, guide d'utilisation.",
      category: "Prix & Tarifs"
    },
    {
      question: "Quels formats de fichiers recevrai-je pour mon design?",
      answer: "Vous recevez tous les formats nécessaires:<br/>• <strong>Vectoriels:</strong> AI, EPS, PDF pour impression<br/>• <strong>Web:</strong> PNG, JPG, SVG haute résolution<br/>• <strong>Réseaux sociaux:</strong> Formats optimisés Facebook, Instagram<br/>• <strong>Print:</strong> Haute résolution 300 DPI minimum<br/>Propriété complète de tous vos fichiers garantie.",
      category: "Fichiers & Formats"
    },
    {
      question: "Combien de révisions sont incluses dans vos services design?",
      answer: "Révisions généreuses pour votre satisfaction:<br/>• <strong>Concepts initiaux:</strong> 3 propositions différentes<br/>• <strong>Révisions mineures:</strong> Illimitées (couleurs, textes)<br/>• <strong>Révisions majeures:</strong> 2 modifications structurelles<br/>• <strong>Validation finale:</strong> Ajustements jusqu'à satisfaction<br/>Communication directe avec votre designer attitré.",
      category: "Processus & Révisions"
    },
    {
      question: "Travaillez-vous avec tous types d'entreprises au Maroc?",
      answer: "Oui, nous adaptons notre design à tout secteur:<br/>• <strong>PME locales:</strong> Restaurants, boutiques, services<br/>• <strong>Startups:</strong> Tech, digital, innovation<br/>• <strong>Grandes entreprises:</strong> Industrie, finance, télécoms<br/>• <strong>Associations:</strong> ONG, fondations, événements<br/>Portfolio diversifié avec +200 projets au Maroc.",
      category: "Secteurs d'Activité"
    },
    {
      question: "Proposez-vous des services de print et signalétique?",
      answer: "Services design print complets au Maroc:<br/>• <strong>Papeterie:</strong> Cartes visite, en-têtes, factures<br/>• <strong>Marketing:</strong> Flyers, brochures, catalogues<br/>• <strong>Signalétique:</strong> Enseignes, panneaux, vitrophanies<br/>• <strong>Textile:</strong> T-shirts, uniformes, goodies<br/>Réseau partenaires imprimeurs dans tout le Maroc.",
      category: "Print & Signalétique"
    },
    {
      question: "Combien de temps pour créer une identité visuelle complète?",
      answer: "Délais selon l'étendue du projet:<br/>• <strong>Logo seul:</strong> 5-7 jours<br/>• <strong>Identité de base:</strong> 2-3 semaines<br/>• <strong>Identité complète:</strong> 3-4 semaines<br/>• <strong>Brand book complet:</strong> 4-6 semaines<br/>Rush possible avec supplément 30% pour projets urgents.",
      category: "Délais"
    },
    {
      question: "Pouvez-vous refondre l'identité d'une entreprise existante?",
      answer: "Spécialistes en rebranding et refonte identitaire:<br/>• <strong>Audit existant:</strong> Analyse de votre image actuelle<br/>• <strong>Stratégie évolution:</strong> Conservation éléments forts<br/>• <strong>Transition graduelle:</strong> Migration sans perdre notoriété<br/>• <strong>Déclinaison complète:</strong> Tous supports mis à jour<br/>Accompagnement changement avec vos équipes.",
      category: "Rebranding"
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Design Graphique & Identité Visuelle | BrandHub.ma</title>
        <meta name="description" content="Services de design graphique professionnel au Maroc : création logo, identité visuelle, UI/UX design, motion design et design 3D. Agence créative pour visuels impactants qui marquent les esprits." />
        <meta name="keywords" content="design graphique maroc, création logo casablanca, identité visuelle maroc, ui ux design maroc, motion design afrique, design 3D maroc, charte graphique maroc, brand identity morocco, design print maroc, agence design casablanca" />
        
        <meta property="og:title" content="Design Graphique & Identité Visuelle | BrandHub.ma" />
        <meta property="og:description" content="Créativité et design qui marquent les esprits. Services professionnels de design graphique, identité de marque et UI/UX au Maroc et en Afrique." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brandhub.ma/services/graphics" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Design Graphique & Identité Visuelle | BrandHub.ma" />
        <meta name="twitter:description" content="Services de design graphique professionnel : création logo, identité visuelle, UI/UX design au Maroc." />
        
        <link rel="canonical" href="https://brandhub.ma/services/graphics" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Graphic Design & Visual Identity",
            "provider": {
              "@type": "Organization",
              "name": "BrandHub.ma",
              "url": "https://brandhub.ma"
            },
            "areaServed": ["Morocco", "Africa", "Middle East", "Europe"],
            "description": "Services professionnels de design graphique incluant création de logo, identité visuelle complète, UI/UX design, motion design et visualisation 3D.",
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "MAD"
            }
          })}
        </script>
        
        {/* HowTo Schema for Design Process (AEO) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Comment nous créons votre identité visuelle au Maroc",
            "description": "Notre processus de design graphique et création d'identité visuelle en 6 étapes professionnelles",
            "totalTime": "PT3W",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "MAD",
              "value": "4000"
            },
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Brief & Recherche",
                "text": "Analyse approfondie de votre marque, marché cible et concurrence au Maroc pour créer un brief créatif solide",
                "url": "https://brandhub.ma/services/graphics#brief"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Concepts & Moodboard",
                "text": "Création de moodboards et exploration de directions créatives adaptées au marché marocain et à votre secteur",
                "url": "https://brandhub.ma/services/graphics#concepts"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Design Logo",
                "text": "Création de propositions de logo avec variations, couleurs et typographies professionnelles",
                "url": "https://brandhub.ma/services/graphics#logo"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Identité Complète",
                "text": "Développement de l'identité visuelle complète: palette couleurs, typographies, éléments graphiques, patterns",
                "url": "https://brandhub.ma/services/graphics#identity"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "Applications",
                "text": "Déclinaison sur supports de communication: cartes de visite, papeterie, signalétique, web",
                "url": "https://brandhub.ma/services/graphics#applications"
              },
              {
                "@type": "HowToStep",
                "position": 6,
                "name": "Charte Graphique",
                "text": "Création du guide de style complet (brand guidelines) pour utilisation cohérente de votre identité",
                "url": "https://brandhub.ma/services/graphics#guidelines"
              }
            ]
          })}
        </script>
        
        {/* Speakable Schema for Voice Search */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["h1", "h2", ".service-description"]
            }
          })}
        </script>
      </Helmet>
      <Navbar />
      
      <WavyBackground
        containerClassName="pt-32 pb-20"
        colors={["#11118b", "#8b5cf6", "#6366f1", "#a855f7", "#7c3aed"]}
        waveWidth={80}
        backgroundFill="hsl(var(--background))"
        blur={8}
        speed="slow"
        waveOpacity={0.3}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Palette className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Design & Graphisme</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Créativité et Design
              <span className="block gradient-primary bg-clip-text text-transparent mt-2">
                Qui Marquent les Esprits
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              De l'identité de marque au design d'interfaces, nous créons des visuels 
              impactants qui reflètent l'essence de votre entreprise.
            </p>
          </div>
        </div>
      </WavyBackground>

      {/* Location Coverage Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Nos Services de Design Graphique dans Tout le Maroc
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              <strong>BrandHub.ma</strong> accompagne les entreprises marocaines avec des services de 
              <span className="text-primary font-semibold"> design graphique professionnels</span> dans les principales villes du royaume.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">🏙️ Grandes Métropoles</h3>
                <p className="text-muted-foreground">
                  <strong>Casablanca</strong> (centre économique), <strong>Rabat</strong> (capitale), 
                  <strong>Marrakech</strong> (tourisme), <strong>Fès</strong> (industrie)
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">🌊 Villes Côtières</h3>
                <p className="text-muted-foreground">
                  <strong>Tanger</strong> (port), <strong>Agadir</strong> (pêche), 
                  <strong>Essaouira</strong>, <strong>El Jadida</strong>, <strong>Kenitra</strong>
                </p>
              </Card>
              
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-2">🏔️ Autres Régions</h3>
                <p className="text-muted-foreground">
                  <strong>Meknès</strong>, <strong>Oujda</strong>, <strong>Tétouan</strong>, 
                  <strong>Beni Mellal</strong>, <strong>Khouribga</strong> et plus
                </p>
              </Card>
            </div>
            
            <div className="mt-8 p-6 bg-primary/5 rounded-lg border-l-4 border-primary">
              <h4 className="font-bold text-lg mb-2">✅ Service Personnalisé par Région</h4>
              <p className="text-muted-foreground">
                Que vous soyez à Casablanca ou dans une ville plus petite, nous adaptons nos services 
                aux spécificités locales de votre marché. <strong>Déplacement possible</strong> ou 
                <strong> services 100% en ligne</strong> selon vos préférences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center">
            {displayServices.map((service, index) => {
              const IconComponent = service.id 
                ? getIconComponent(service.icon)
                : service.icon;
              
              return (
                <div
                  key={service.id || index} 
                  className="animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => navigate(`/services/graphics/${service.id}`)}
                >
                  <GlassCard
                    variant="light"
                    title={service.title}
                    description={service.description || ""}
                    icon={IconComponent}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessSection steps={processSteps} accentColor="purple" />

      {/* Trust Signals Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Pourquoi Choisir BrandHub.ma pour vos Projets Design Graphique?
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6 text-center shadow-card">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">200+ Projets</h3>
                <p className="text-muted-foreground text-sm">
                  Réalisés depuis 2020 avec un taux de satisfaction de 98%
                </p>
              </Card>
              
              <Card className="p-6 text-center shadow-card">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Designers Certifiés</h3>
                <p className="text-muted-foreground text-sm">
                  Équipe créative avec certifications Adobe et formations design
                </p>
              </Card>
              
              <Card className="p-6 text-center shadow-card">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Support Bilingue</h3>
                <p className="text-muted-foreground text-sm">
                  Service client en français et arabe, adapté au marché marocain
                </p>
              </Card>
              
              <Card className="p-6 text-center shadow-card">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Garantie Satisfaction</h3>
                <p className="text-muted-foreground text-sm">
                  Révisions illimitées jusqu'à votre satisfaction complète
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section for Graphics Services */}
      <EnhancedFAQ 
        faqs={graphicsFAQs}
        title="Questions Fréquentes - Design Graphique Maroc"
        description="Tout savoir sur nos services de création graphique et identité visuelle au Maroc"
        pageType="service"
      />

      {/* Related Services */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Services Complémentaires
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Code className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Développement Web</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Donnez vie à vos designs avec nos solutions web sur mesure
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/services/programming">En savoir plus</Link>
                </Button>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <PenTool className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Création de Contenu</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Alimentez votre identité visuelle avec du contenu engageant
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/services/content">En savoir plus</Link>
                </Button>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Conseil Business</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Optimisez votre stratégie de marque avec nos analyses
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/services/business">En savoir plus</Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServiceGraphics;
