import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import EnhancedFAQ from "@/components/EnhancedFAQ";
import GlassCard from "@/components/ui/glass-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Code, Smartphone, Monitor, Bot, Shield, ShoppingCart, Map, Cpu, CheckCircle, Award, Globe, Palette, PenTool, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Service {
  id: string;
  category: string;
  title: string;
  description: string | null;
  icon: string | null;
  features: string[] | null;
}

const ServiceProgramming = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("category", "programming")
      .eq("is_active", true);

    if (error) {
      console.error("Error fetching services:", error);
    } else if (data) {
      setServices(data);
    }
    setLoading(false);
  };

  const getIconComponent = (iconName: string | null) => {
    const icons: { [key: string]: any } = {
      Code, Smartphone, Monitor, Bot, Shield, ShoppingCart, Map, Cpu
    };
    return icons[iconName || "Code"] || Code;
  };

  // Fallback services if database is empty
  const fallbackServices = [
    {
      icon: Code,
      title: "Développement Web",
      description: "Sites WordPress, WooCommerce, Shopify et solutions web sur mesure"
    },
    {
      icon: Smartphone,
      title: "Applications Mobile",
      description: "Développement iOS et Android natif et cross-platform"
    },
    {
      icon: Monitor,
      title: "Applications Desktop",
      description: "Logiciels Windows, Mac et Linux pour toutes vos besoins"
    },
    {
      icon: Bot,
      title: "IA & Automatisation",
      description: "Agents IA, chatbots et automatisation de processus"
    },
    {
      icon: Shield,
      title: "Cybersécurité",
      description: "Audit de sécurité, protection et conformité RGPD"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Boutiques en ligne performantes et optimisées"
    },
    {
      icon: Map,
      title: "Cartographie Web",
      description: "Geoportail, web-mapping et solutions SIG"
    },
    {
      icon: Cpu,
      title: "Solutions Hardware",
      description: "CAD, PCB design, 3D printing et prototypage"
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  // FAQ Data for Programming Page
  const programmingFAQs = [
    {
      question: "Combien de temps faut-il pour développer un site web au Maroc?",
      answer: "Les délais varient selon la complexité:<br/>• <strong>Site vitrine:</strong> 2-3 semaines<br/>• <strong>E-commerce:</strong> 4-6 semaines<br/>• <strong>Application web:</strong> 6-12 semaines<br/>Nous respectons toujours les délais convenus avec un suivi projet en temps réel.",
      category: "Délais & Planning"
    },
    {
      question: "Quelles technologies utilisez-vous pour le développement web?",
      answer: "Nous utilisons les technologies les plus modernes:<br/>• <strong>Frontend:</strong> React, TypeScript, Next.js<br/>• <strong>Backend:</strong> Node.js, Python, PHP<br/>• <strong>E-commerce:</strong> WooCommerce, Shopify, Magento<br/>• <strong>Mobile:</strong> React Native, Flutter<br/>Toutes nos solutions sont évolutives et maintenables.",
      category: "Technologies"
    },
    {
      question: "Proposez-vous la maintenance après livraison?",
      answer: "Oui, nous offrons plusieurs formules de maintenance:<br/>• <strong>Maintenance de base:</strong> Mises à jour sécurité, sauvegardes<br/>• <strong>Maintenance premium:</strong> Modifications mineures, support prioritaire<br/>• <strong>Maintenance complète:</strong> Évolutions, nouvelles fonctionnalités<br/>Support technique en français et arabe disponible.",
      category: "Maintenance"
    },
    {
      question: "Travaillez-vous avec des entreprises dans toutes les villes du Maroc?",
      answer: "Absolument! Nous servons des clients dans tout le Maroc:<br/>• <strong>Principales:</strong> Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir<br/>• <strong>Autres villes:</strong> Meknès, Oujda, Kenitra, Tétouan, Salé<br/>Services 100% en ligne ou déplacement possible selon vos besoins.",
      category: "Couverture Géographique"
    },
    {
      question: "Vos sites sont-ils optimisés pour les moteurs de recherche?",
      answer: "Tous nos sites incluent un SEO technique de base:<br/>• <strong>Performance:</strong> Optimisation vitesse de chargement<br/>• <strong>Mobile-first:</strong> Design responsive parfait<br/>• <strong>Structure:</strong> Balises HTML sémantiques<br/>• <strong>Local SEO:</strong> Optimisation pour Google.ma<br/>Service SEO avancé disponible en complément.",
      category: "SEO & Performance"
    },
    {
      question: "Comment gérez-vous les paiements en ligne au Maroc?",
      answer: "Nous intégrons toutes les solutions de paiement locales:<br/>• <strong>CMI:</strong> Standard bancaire marocain<br/>• <strong>CashPlus:</strong> Paiement mobile populaire<br/>• <strong>PayPal:</strong> Pour ventes internationales<br/>• <strong>Orange Money / Inwi Money:</strong> Mobile money<br/>Tous certifiés et sécurisés selon standards internationaux.",
      category: "Paiements"
    },
    {
      question: "Fournissez-vous une formation pour gérer le site?",
      answer: "Formation complète incluse dans tous nos projets:<br/>• <strong>Session personnalisée:</strong> 2h de formation individuelle<br/>• <strong>Documentation:</strong> Guides utilisateur en français<br/>• <strong>Vidéos:</strong> Tutoriels d'utilisation<br/>• <strong>Support:</strong> Questions illimitées pendant 3 mois<br/>Formation adaptée au niveau de votre équipe.",
      category: "Formation"
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Développement Web & Applications | BrandHub.ma</title>
        <meta name="description" content="Services de développement web et mobile professionnels au Maroc : sites WordPress, WooCommerce, Shopify, applications iOS/Android, IA, cybersécurité et solutions e-commerce. Agence tech innovante." />
        <meta name="keywords" content="développement web maroc, création site wordpress maroc, développement application mobile maroc, woocommerce maroc, shopify maroc, développement ios android casablanca, intelligence artificielle maroc, cybersécurité maroc, e-commerce maroc, développement logiciel maroc" />
        
        <meta property="og:title" content="Développement Web & Applications | BrandHub.ma" />
        <meta property="og:description" content="Solutions technologiques innovantes : développement web, applications mobiles, IA, cybersécurité et e-commerce au Maroc et en Afrique." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brandhub.ma/services/programming" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Développement Web & Applications | BrandHub.ma" />
        <meta name="twitter:description" content="Services de développement web, applications mobiles, IA et cybersécurité au Maroc." />
        
        <link rel="canonical" href="https://brandhub.ma/services/programming" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Web & Mobile Development",
            "provider": {
              "@type": "Organization",
              "name": "BrandHub.ma",
              "url": "https://brandhub.ma"
            },
            "areaServed": ["Morocco", "Africa", "Middle East", "Europe"],
            "description": "Services professionnels de développement web (WordPress, WooCommerce, Shopify), applications mobiles (iOS, Android), intelligence artificielle, cybersécurité et solutions e-commerce.",
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "MAD"
            }
          })}
        </script>
        
        {/* HowTo Schema for Development Process (AEO) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Comment nous créons votre site web professionnel au Maroc",
            "description": "Notre processus de développement web professionnel en 5 étapes garantit qualité et satisfaction",
            "totalTime": "PT4W",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "MAD",
              "value": "5000"
            },
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Consultation & Analyse",
                "text": "Nous analysons vos besoins, objectifs business et budget pour créer une stratégie de développement sur mesure adaptée à votre entreprise au Maroc",
                "url": "https://brandhub.ma/services/programming#consultation"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Design & Maquettes",
                "text": "Création de maquettes UX/UI et wireframes professionnels pour validation avant le développement, garantissant que le design correspond parfaitement à votre vision",
                "url": "https://brandhub.ma/services/programming#design"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Développement",
                "text": "Développement avec technologies modernes (React, TypeScript, WordPress, etc.) suivant les meilleures pratiques et standards de sécurité",
                "url": "https://brandhub.ma/services/programming#development"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Tests & Optimisation",
                "text": "Tests complets sur tous les navigateurs et appareils, optimisation des performances, SEO et sécurité avant le lancement",
                "url": "https://brandhub.ma/services/programming#testing"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "Lancement & Support",
                "text": "Mise en ligne professionnelle, formation complète de votre équipe et support technique continu après livraison",
                "url": "https://brandhub.ma/services/programming#launch"
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
      
      {/* Hero Section */}
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
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <Code className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary">Programmation & Technologie</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Solutions Technologiques
              <span className="block gradient-primary bg-clip-text text-transparent mt-2">
                Innovantes et Performantes
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Du développement web aux applications mobiles, en passant par l'IA et la cybersécurité, 
              nous créons des solutions technologiques adaptées à vos besoins.
            </p>
          </div>
        </div>
      </WavyBackground>

      {/* Location Coverage Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Nos Services de Développement Web dans Tout le Maroc
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              <strong>BrandHub.ma</strong> accompagne les entreprises marocaines avec des services de 
              <span className="text-primary font-semibold"> développement web professionnels</span> dans les principales villes du royaume.
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

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto justify-items-center">
            {displayServices.map((service, index) => {
              const IconComponent = service.id 
                ? getIconComponent(service.icon)
                : service.icon;
              
              return (
                <div
                  key={service.id || index} 
                  className="animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => service.id && navigate(`/services/programming/${service.id}`)}
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

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Notre <span className="gradient-primary bg-clip-text text-transparent">Processus</span>
            </h2>
            
            <div className="space-y-8">
              {[
                { step: "01", title: "Analyse", desc: "Étude approfondie de vos besoins et objectifs" },
                { step: "02", title: "Conception", desc: "Architecture technique et design de la solution" },
                { step: "03", title: "Développement", desc: "Codage et intégration des fonctionnalités" },
                { step: "04", title: "Tests & Déploiement", desc: "Validation qualité et mise en production" },
                { step: "05", title: "Maintenance", desc: "Support continu et évolutions" }
              ].map((item, index) => (
                <Card key={index} className="hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 flex items-start space-x-6">
                    <div className="text-5xl font-bold gradient-primary bg-clip-text text-transparent opacity-30">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Pourquoi Choisir BrandHub.ma pour vos Projets Développement Web?
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
                <h3 className="font-bold text-lg mb-2">Équipe Certifiée</h3>
                <p className="text-muted-foreground text-sm">
                  Certifications Google Analytics, Ads et développement web
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

      {/* FAQ Section for Programming Services */}
      <EnhancedFAQ 
        faqs={programmingFAQs}
        title="Questions Fréquentes - Développement Web Maroc"
        description="Réponses aux questions les plus posées sur nos services de développement web au Maroc"
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
                <Palette className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Design Graphique</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Créez une identité visuelle forte avec nos services de design
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/services/graphics">En savoir plus</Link>
                </Button>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <PenTool className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Création de Contenu</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Alimentez votre site avec du contenu engageant et optimisé
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/services/content">En savoir plus</Link>
                </Button>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Conseil Business</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Optimisez votre stratégie avec nos analyses de données
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

export default ServiceProgramming;
