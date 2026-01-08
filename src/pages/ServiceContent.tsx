import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
import { PenTool, Globe, FileText, Camera, TrendingUp, MessageCircle, ClipboardList, Calendar, Edit, Search as SearchIcon, Share2, CheckCircle, Award, Shield, Code, Palette, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
}

const ServiceContent = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("category", "content")
      .eq("is_active", true);

    if (data) setServices(data);
  };

  const getIconComponent = (iconName: string | null) => {
    const icons: { [key: string]: any } = {
      PenTool, Globe, FileText, Camera, TrendingUp, MessageCircle
    };
    return icons[iconName || "PenTool"] || PenTool;
  };

  const fallbackServices = [
    {
      icon: PenTool,
      title: "Rédaction Web",
      description: "Articles de blog, pages web et contenus optimisés SEO"
    },
    {
      icon: Globe,
      title: "Traduction",
      description: "Services de traduction multilingue professionnelle"
    },
    {
      icon: FileText,
      title: "Copywriting",
      description: "Textes publicitaires et contenus persuasifs"
    },
    {
      icon: Camera,
      title: "Production Vidéo",
      description: "Vidéos promotionnelles et contenus audiovisuels"
    },
    {
      icon: TrendingUp,
      title: "Marketing Digital",
      description: "Stratégies et campagnes marketing sur mesure"
    },
    {
      icon: MessageCircle,
      title: "Social Media",
      description: "Gestion et création de contenus pour réseaux sociaux"
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  const processSteps = [
    {
      number: "01",
      title: "Audit & Stratégie",
      description: "Analyse de votre présence actuelle et définition d'une stratégie de contenu sur mesure.",
      icon: ClipboardList
    },
    {
      number: "02",
      title: "Planification du Contenu",
      description: "Création d'un calendrier éditorial aligné avec vos objectifs marketing.",
      icon: Calendar
    },
    {
      number: "03",
      title: "Création & Rédaction",
      description: "Production de contenus engageants, authentiques et adaptés à votre audience.",
      icon: Edit
    },
    {
      number: "04",
      title: "Optimisation SEO",
      description: "Optimisation pour les moteurs de recherche afin de maximiser votre visibilité.",
      icon: SearchIcon
    },
    {
      number: "05",
      title: "Publication & Analyse",
      description: "Diffusion stratégique et analyse des performances pour amélioration continue.",
      icon: Share2
    }
  ];

  // FAQ Data for Content Page
  const contentFAQs = [
    {
      question: "Quels types de contenus créez-vous pour les entreprises marocaines?",
      answer: "Nous créons tous types de contenus marketing:<br/>• <strong>Articles de blog:</strong> SEO optimisé pour Google.ma<br/>• <strong>Réseaux sociaux:</strong> Posts Facebook, Instagram, LinkedIn<br/>• <strong>Newsletters:</strong> Email marketing personnalisé<br/>• <strong>Pages web:</strong> Contenu site et landing pages<br/>• <strong>Vidéos:</strong> Scripts et storyboards<br/>Tous adaptés au marché et à la culture marocaine.",
      category: "Types de Contenus"
    },
    {
      question: "Vos contenus sont-ils optimisés pour le SEO au Maroc?",
      answer: "Tous nos contenus incluent une optimisation SEO complète:<br/>• <strong>Recherche mots-clés:</strong> Analyse Google.ma et tendances locales<br/>• <strong>SEO technique:</strong> Balises H1-H6, meta descriptions<br/>• <strong>SEO local:</strong> Géolocalisation Maroc et villes principales<br/>• <strong>Concurrence:</strong> Analyse des competitors marocains<br/>• <strong>Performance:</strong> Suivi positions et trafic organique<br/>Expertise Google Analytics et Search Console.",
      category: "SEO & Référencement"
    },
    {
      question: "Pouvez-vous créer du contenu en arabe et français?",
      answer: "Services multilingues adaptés au Maroc:<br/>• <strong>Français:</strong> Langue principale, style professionnel<br/>• <strong>Arabe:</strong> Rédaction native par locuteurs natifs<br/>• <strong>Darija:</strong> Contenu réseaux sociaux local<br/>• <strong>Anglais:</strong> Pour audience internationale<br/>• <strong>Traduction:</strong> Adaptation culturelle, pas traduction littérale<br/>Respect des nuances culturelles marocaines.",
      category: "Langues & Localisation"
    },
    {
      question: "Combien d'articles de blog produisez-vous par mois?",
      answer: "Forfaits content marketing flexibles:<br/>• <strong>Starter:</strong> 4 articles/mois (1000+ mots chacun)<br/>• <strong>Growth:</strong> 8 articles/mois + réseaux sociaux<br/>• <strong>Premium:</strong> 12 articles/mois + newsletters + vidéos<br/>• <strong>Enterprise:</strong> Volume personnalisé selon besoins<br/>Calendrier éditorial et planning approuvés en amont.",
      category: "Volume & Planning"
    },
    {
      question: "Incluez-vous les visuels avec vos contenus?",
      answer: "Contenus visuels inclus dans nos services:<br/>• <strong>Images:</strong> Photos libres de droits HD + édition<br/>• <strong>Infographies:</strong> Données visualisées et attractives<br/>• <strong>Réseaux sociaux:</strong> Designs Facebook, Instagram stories<br/>• <strong>Bannières web:</strong> Call-to-action optimisées<br/>• <strong>Vidéos courtes:</strong> Montage et sous-titres inclus<br/>Cohérence avec votre identité visuelle.",
      category: "Visuels & Design"
    },
    {
      question: "Comment mesurez-vous le ROI de vos contenus marketing?",
      answer: "Analytiques détaillées et reporting mensuel:<br/>• <strong>Trafic organique:</strong> Visites, sessions, pages vues<br/>• <strong>Engagement:</strong> Temps sur page, taux de rebond<br/>• <strong>Conversions:</strong> Leads générés, ventes attribuées<br/>• <strong>Réseaux sociaux:</strong> Portée, engagement, clics<br/>• <strong>ROI global:</strong> Revenus générés vs investissement content<br/>Tableau de bord temps réel disponible.",
      category: "ROI & Analytics"
    },
    {
      question: "Proposez-vous la gestion complète des réseaux sociaux?",
      answer: "Gestion social media complète au Maroc:<br/>• <strong>Stratégie:</strong> Audit, personas, planning éditorial<br/>• <strong>Création:</strong> Posts, stories, réels adaptés à chaque plateforme<br/>• <strong>Publication:</strong> Planification optimale selon audience<br/>• <strong>Community management:</strong> Réponses commentaires et messages<br/>• <strong>Publicité:</strong> Campagnes Facebook/Instagram Ads<br/>Facebook, Instagram, LinkedIn, TikTok selon votre cible.",
      category: "Réseaux Sociaux"
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Création de Contenu & Marketing Digital | BrandHub.ma</title>
        <meta name="description" content="Services experts en création de contenu, rédaction web SEO, copywriting, marketing digital et social media au Maroc. Production de contenus engageants qui convertissent pour votre marque." />
        <meta name="keywords" content="création contenu maroc, rédaction web seo maroc, copywriting maroc, marketing digital casablanca, social media management maroc, production vidéo maroc, traduction professionnelle maroc, contenu marketing afrique, stratégie contenu maroc" />

        <meta property="og:title" content="Création de Contenu & Marketing Digital | BrandHub.ma" />
        <meta property="og:description" content="Créez du contenu engageant et des campagnes marketing efficaces avec BrandHub. Services de rédaction, copywriting, social media et marketing digital." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brandhub.ma/services/content" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Création de Contenu & Marketing Digital | BrandHub.ma" />
        <meta name="twitter:description" content="Services experts en création de contenu, rédaction web SEO et marketing digital au Maroc." />

        <link rel="canonical" href="https://brandhub.ma/services/content" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Content Creation & Digital Marketing",
            "provider": {
              "@type": "Organization",
              "name": "BrandHub.ma",
              "url": "https://brandhub.ma"
            },
            "areaServed": ["Morocco", "Africa", "Middle East", "Europe"],
            "description": "Services professionnels de création de contenu, rédaction web optimisée SEO, copywriting persuasif, marketing digital et gestion des réseaux sociaux.",
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "MAD"
            }
          })}
        </script>

        {/* HowTo Schema for Content Process (AEO) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Comment nous créons votre contenu marketing au Maroc",
            "description": "Notre processus de création de contenu et marketing digital en 5 étapes pour maximiser votre impact",
            "totalTime": "PT2W",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "MAD",
              "value": "3500"
            },
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Stratégie & Audit",
                "text": "Analyse de votre marché au Maroc, audit de contenu existant et définition d'une stratégie content marketing adaptée à votre audience",
                "url": "https://brandhub.ma/services/content#strategy"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Calendrier Éditorial",
                "text": "Création d'un planning de contenu mensuel avec sujets optimisés SEO et adaptés aux tendances du marché marocain",
                "url": "https://brandhub.ma/services/content#calendar"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Création de Contenu",
                "text": "Rédaction d'articles de blog, posts réseaux sociaux, newsletters et contenus web optimisés pour votre audience marocaine",
                "url": "https://brandhub.ma/services/content#creation"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Optimisation SEO",
                "text": "Optimisation de chaque contenu pour les moteurs de recherche avec mots-clés pertinents pour le marché marocain",
                "url": "https://brandhub.ma/services/content#seo"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "Publication & Analyse",
                "text": "Publication multi-canaux et analyse des performances avec ajustements basés sur les résultats",
                "url": "https://brandhub.ma/services/content#analytics"
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
            <div className="inline-flex items-center space-x-2 bg-orange-500/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <PenTool className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">Contenu & Marketing</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contenu Qui Convertit
              <span className="block gradient-primary bg-clip-text text-transparent mt-2">
                Et Marketing Qui Performe
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Créez du contenu engageant et des campagnes marketing efficaces
              pour amplifier votre message et atteindre vos objectifs.
            </p>
          </div>
        </div>
      </WavyBackground>

      {/* Location Coverage Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Nos Services de Création de Contenu dans Tout le Maroc
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              <strong>BrandHub.ma</strong> accompagne les entreprises marocaines avec des services de
              <span className="text-primary font-semibold"> création de contenu professionnels</span> dans les principales villes du royaume.
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
                  onClick={() => navigate(`/services/content/${service.id}`)}
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

      <ProcessSection steps={processSteps} accentColor="orange" />

      {/* Trust Signals Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Pourquoi Choisir BrandHub.ma pour vos Projets Création de Contenu?
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
                <h3 className="font-bold text-lg mb-2">Rédacteurs SEO</h3>
                <p className="text-muted-foreground text-sm">
                  Équipe certifiée Google Analytics et spécialisée SEO Maroc
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

      {/* FAQ Section for Content Services */}
      <EnhancedFAQ
        faqs={contentFAQs}
        title="Questions Fréquentes - Création de Contenu Maroc"
        description="Découvrez nos services de création de contenu, rédaction SEO et marketing digital au Maroc"
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
                  Créez des sites web pour héberger et présenter votre contenu
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/services/programming">En savoir plus</Link>
                </Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Palette className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Design Graphique</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Créez une identité visuelle forte pour accompagner votre contenu
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/services/graphics">En savoir plus</Link>
                </Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <BarChart3 className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Conseil Business</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Optimisez votre stratégie de contenu avec nos analyses
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

export default ServiceContent;
