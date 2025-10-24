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
import { BarChart3, Database, FileSearch, Scale, TrendingUp, Users, Target, Package, Microscope, Lightbulb, Rocket, CheckCircle, Award, Globe, Shield, Code, Palette, PenTool, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
}

const ServiceBusiness = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("category", "business")
      .eq("is_active", true);

    if (data) setServices(data);
  };

  const getIconComponent = (iconName: string | null) => {
    const icons: { [key: string]: any } = {
      BarChart3, Database, FileSearch, Scale, TrendingUp, Users
    };
    return icons[iconName || "BarChart3"] || BarChart3;
  };

  const fallbackServices = [
    {
      icon: BarChart3,
      title: "Analyse de Données",
      description: "Business intelligence et tableaux de bord analytiques"
    },
    {
      icon: Database,
      title: "Gestion de Données",
      description: "Architecture et administration de bases de données"
    },
    {
      icon: FileSearch,
      title: "Études de Marché",
      description: "Recherche et analyse de marché approfondie"
    },
    {
      icon: Scale,
      title: "Consultation Légale",
      description: "Conseil juridique pour votre entreprise"
    },
    {
      icon: TrendingUp,
      title: "Business Plans",
      description: "Plans d'affaires et stratégies de croissance"
    },
    {
      icon: Users,
      title: "Conseil Stratégique",
      description: "Accompagnement dans vos décisions stratégiques"
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  const processSteps = [
    {
      number: "01",
      title: "Analyse des Besoins",
      description: "Identification précise de vos défis business et objectifs stratégiques.",
      icon: Target
    },
    {
      number: "02",
      title: "Collecte de Données",
      description: "Rassemblement des données pertinentes internes et externes pour une analyse complète.",
      icon: Package
    },
    {
      number: "03",
      title: "Analyse Approfondie",
      description: "Traitement et analyse des données avec des outils avancés de business intelligence.",
      icon: Microscope
    },
    {
      number: "04",
      title: "Recommandations Stratégiques",
      description: "Élaboration de stratégies actionnables basées sur des insights data-driven.",
      icon: Lightbulb
    },
    {
      number: "05",
      title: "Mise en Œuvre & Suivi",
      description: "Accompagnement dans l'implémentation et suivi des KPIs pour mesurer l'impact.",
      icon: Rocket
    }
  ];

  // FAQ Data for Business Page
  const businessFAQs = [
    {
      question: "Quels types d'analyses business proposez-vous au Maroc?",
      answer: "Analyses complètes adaptées au marché marocain:<br/>• <strong>Analyse financière:</strong> Rentabilité, cash-flow, ratios<br/>• <strong>Étude de marché:</strong> Concurrence locale, positioning<br/>• <strong>Analyse opérationnelle:</strong> Processus, productivité, coûts<br/>• <strong>Business Intelligence:</strong> Tableaux de bord, KPIs<br/>• <strong>Audit digital:</strong> Présence en ligne, performance web<br/>Recommandations stratégiques actionables incluses.",
      category: "Types d'Analyses"
    },
    {
      question: "Comment mesurez-vous le ROI de vos recommandations business?",
      answer: "Méthodes de mesure ROI transparentes:<br/>• <strong>KPIs définis:</strong> Objectifs chiffrés avant intervention<br/>• <strong>Baseline établie:</strong> Situation initiale documentée<br/>• <strong>Suivi mensuel:</strong> Reporting évolution des métriques<br/>• <strong>ROI calculé:</strong> (Gains - Investissement) / Investissement<br/>• <strong>Études de cas:</strong> Résultats clients précédents<br/>ROI moyen constaté: +180% en 12 mois.",
      category: "ROI & Résultats"
    },
    {
      question: "Travaillez-vous avec des PME et des grandes entreprises au Maroc?",
      answer: "Services adaptés à toutes tailles d'entreprises:<br/>• <strong>PME (5-50 employés):</strong> Audits ciblés, quick wins<br/>• <strong>ETI (50-250 employés):</strong> Transformation digitale complète<br/>• <strong>Grandes entreprises:</strong> Projets complexes, multi-sites<br/>• <strong>Startups:</strong> Business plans, études de faisabilité<br/>• <strong>Secteurs:</strong> Retail, industrie, services, tech, finance<br/>Portfolio clients dans 12 villes du Maroc.",
      category: "Tailles & Secteurs"
    },
    {
      question: "Utilisez-vous des outils d'analyse de données spécifiques?",
      answer: "Stack technologique professionnel:<br/>• <strong>Business Intelligence:</strong> Tableau, Power BI, Google Data Studio<br/>• <strong>Analytics:</strong> Google Analytics 4, Adobe Analytics<br/>• <strong>CRM Analysis:</strong> Salesforce, HubSpot reporting<br/>• <strong>Finance:</strong> Excel avancé, modèles financiers<br/>• <strong>Base données:</strong> SQL, Python pour analyses avancées<br/>Formations équipes sur outils déployés.",
      category: "Outils & Technologies"
    },
    {
      question: "Combien de temps pour voir les premiers résultats?",
      answer: "Timeline résultats selon type d'intervention:<br/>• <strong>Quick wins:</strong> 2-4 semaines (optimisations simples)<br/>• <strong>Processus:</strong> 1-3 mois (réorganisation opérationnelle)<br/>• <strong>Stratégie digitale:</strong> 3-6 mois (transformation complète)<br/>• <strong>Projets complexes:</strong> 6-12 mois (restructuration majeure)<br/>Premiers indicateurs positifs généralement sous 30 jours.",
      category: "Délais & Planning"
    },
    {
      question: "Proposez-vous un accompagnement après l'audit?",
      answer: "Accompagnement complet mise en œuvre:<br/>• <strong>Plan d'action:</strong> Roadmap détaillée étape par étape<br/>• <strong>Formation équipes:</strong> Montée en compétences collaborateurs<br/>• <strong>Suivi mensuel:</strong> Points d'étape, ajustements<br/>• <strong>Support continu:</strong> Questions et conseils à la demande<br/>• <strong>Reporting:</strong> Tableaux de bord performance<br/>Garantie d'atteinte des objectifs fixés.",
      category: "Accompagnement"
    },
    {
      question: "Quels sont vos tarifs pour le conseil business au Maroc?",
      answer: "Tarification transparente et flexible:<br/>• <strong>Audit express:</strong> 5000-8000 MAD (2-3 jours)<br/>• <strong>Étude complète:</strong> 15000-25000 MAD (2-3 semaines)<br/>• <strong>Accompagnement mensuel:</strong> 8000-15000 MAD/mois<br/>• <strong>Mission longue:</strong> Tarif négocié selon projet<br/>• <strong>Paiement:</strong> 50% démarrage, 50% livraison<br/>Devis personnalisé gratuit sous 24h.",
      category: "Tarifs & Conditions"
    }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Services Business Intelligence & Analyse de Données | BrandHub.ma</title>
        <meta name="description" content="BrandHub offre des services experts en Business Intelligence, analyse de données, études de marché et conseil stratégique au Maroc et en Afrique. Prenez des décisions éclairées basées sur les données." />
        <meta name="keywords" content="business intelligence maroc, analyse de données maroc, études de marché afrique, conseil stratégique maroc, data analytics casablanca, gestion de données maroc, business plans maroc, consultation légale business maroc, insights stratégiques afrique" />
        
        <meta property="og:title" content="Services Business Intelligence & Analyse de Données | BrandHub.ma" />
        <meta property="og:description" content="Exploitez la puissance des données avec nos services de Business Intelligence, analyse stratégique et conseil business. Solutions data-driven pour votre croissance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brandhub.ma/services/business" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services Business Intelligence & Analyse de Données | BrandHub.ma" />
        <meta name="twitter:description" content="Exploitez la puissance des données avec nos services de Business Intelligence, analyse stratégique et conseil business." />
        
        <link rel="canonical" href="https://brandhub.ma/services/business" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Business Intelligence & Data Analytics",
            "provider": {
              "@type": "Organization",
              "name": "BrandHub.ma",
              "url": "https://brandhub.ma"
            },
            "areaServed": ["Morocco", "Africa", "Middle East"],
            "description": "Services professionnels en Business Intelligence, analyse de données, études de marché et conseil stratégique pour optimiser vos décisions business.",
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "MAD"
            }
          })}
        </script>
        
        {/* HowTo Schema for Business Process (AEO) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "Comment nous optimisons votre stratégie business au Maroc",
            "description": "Notre processus d'analyse et optimisation business en 5 étapes pour maximiser votre croissance",
            "totalTime": "PT6W",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "MAD",
              "value": "8000"
            },
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Audit Business Complet",
                "text": "Analyse approfondie de votre entreprise, concurrence au Maroc, positionnement marché et identification des opportunités de croissance",
                "url": "https://brandhub.ma/services/business#audit"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Analyse de Données",
                "text": "Collecte et analyse de vos données business, création de dashboards KPI et identification des leviers de performance",
                "url": "https://brandhub.ma/services/business#analytics"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Stratégie & Plan d'Action",
                "text": "Développement d'une stratégie business sur mesure avec plan d'action détaillé et objectifs SMART",
                "url": "https://brandhub.ma/services/business#strategy"
              },
              {
                "@type": "HowToStep",
                "position": 4,
                "name": "Implémentation",
                "text": "Mise en œuvre des recommandations avec accompagnement de votre équipe et formation aux nouveaux processus",
                "url": "https://brandhub.ma/services/business#implementation"
              },
              {
                "@type": "HowToStep",
                "position": 5,
                "name": "Suivi & Optimisation",
                "text": "Monitoring continu des résultats, ajustements basés sur les données et optimisation pour atteindre vos objectifs",
                "url": "https://brandhub.ma/services/business#monitoring"
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
            <div className="inline-flex items-center space-x-2 bg-green-500/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Business & Data</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Insights Stratégiques
              <span className="block gradient-primary bg-clip-text text-transparent mt-2">
                Pour Décisions Éclairées
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Exploitez la puissance des données et du conseil stratégique 
              pour optimiser votre activité et accélérer votre croissance.
            </p>
          </div>
        </div>
      </WavyBackground>

      {/* Location Coverage Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Nos Services Business Intelligence dans Tout le Maroc
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              <strong>BrandHub.ma</strong> accompagne les entreprises marocaines avec des services de 
              <span className="text-primary font-semibold"> conseil business professionnels</span> dans les principales villes du royaume.
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
                  onClick={() => navigate(`/services/business/${service.id}`)}
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

      <ProcessSection steps={processSteps} accentColor="green" />

      {/* Trust Signals Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Pourquoi Choisir BrandHub.ma pour vos Projets Business Intelligence?
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
                <h3 className="font-bold text-lg mb-2">Analystes Certifiés</h3>
                <p className="text-muted-foreground text-sm">
                  Équipe certifiée Tableau, Power BI et Google Analytics
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

      {/* FAQ Section for Business Services */}
      <EnhancedFAQ 
        faqs={businessFAQs}
        title="Questions Fréquentes - Business Intelligence Maroc"
        description="Tout savoir sur nos services de conseil business et analyse de données au Maroc"
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
                  Implémentez vos recommandations business avec des solutions web
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/services/programming">En savoir plus</Link>
                </Button>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Palette className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Design Graphique</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Créez une identité visuelle forte pour votre stratégie business
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/services/graphics">En savoir plus</Link>
                </Button>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <PenTool className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Création de Contenu</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Communiquez vos insights business avec du contenu engageant
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/services/content">En savoir plus</Link>
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

export default ServiceBusiness;
