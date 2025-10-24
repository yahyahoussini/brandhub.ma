import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import EnhancedFAQ from "@/components/EnhancedFAQ";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, TrendingUp, Globe, Users, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LocationMorocco = () => {
  // Enhanced FAQ data for Morocco SEO
  const moroccoFAQs = [
    {
      question: "Combien coûte la création d'un site web au Maroc?",
      answer: "Les prix varient selon vos besoins:<br/>• <strong>Site vitrine (5 pages):</strong> 3000-5000 MAD incluant design responsive, formulaire de contact et SEO de base<br/>• <strong>E-commerce:</strong> 8000-15000 MAD avec catalogue produits, paiement CMI/PayPal et gestion stock<br/>• <strong>Site sur mesure:</strong> 15000-50000 MAD avec fonctionnalités personnalisées et intégrations API<br/>Tous nos prix incluent hébergement 1 an, formation et support. <Link to='/contact' className='text-primary'>Demandez votre devis gratuit</Link>.",
      category: "Prix & Tarifs"
    },
    {
      question: "Dans quelles villes du Maroc intervenez-vous?",
      answer: "Nous intervenons dans toutes les villes du Maroc:<br/>• <strong>Principales:</strong> Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir<br/>• <strong>Secondaires:</strong> Meknès, Oujda, Kenitra, Tétouan, Salé, Mohammedia<br/>• <strong>Partout au Maroc:</strong> Déplacements possibles ou services 100% en ligne<br/>Support en français et arabe pour tous nos clients marocains.",
      category: "Couverture Géographique"
    },
    {
      question: "Quels sont les délais de création d'un site web au Maroc?",
      answer: "Délais garantis selon le type de projet:<br/>• <strong>Site vitrine:</strong> 2-3 semaines<br/>• <strong>E-commerce standard:</strong> 4-6 semaines<br/>• <strong>Application web complexe:</strong> 6-12 semaines<br/>• <strong>Urgence:</strong> Supplément 30% pour livraison express<br/>Planning détaillé fourni dès validation du devis. Suivi projet en temps réel disponible.",
      category: "Délais & Planning"
    },
    {
      question: "Proposez-vous la maintenance et l'hébergement au Maroc?",
      answer: "Oui, services complets d'hébergement et maintenance:<br/>• <strong>Hébergement:</strong> Serveurs optimisés pour le Maroc (latence réduite)<br/>• <strong>Maintenance:</strong> Mises à jour sécurité, sauvegarde quotidienne, monitoring 24/7<br/>• <strong>Support:</strong> Équipe technique en français et arabe<br/>• <strong>Forfaits:</strong> Dès 300 MAD/mois tout inclus<br/>Garantie 99.9% uptime et intervention rapide en cas de problème.",
      category: "Maintenance & Support"
    },
    {
      question: "Comment se déroule le paiement pour nos services au Maroc?",
      answer: "Options de paiement flexibles adaptées au Maroc:<br/>• <strong>Virement bancaire:</strong> BMCE, Attijariwafa Bank, CIH Bank<br/>• <strong>Paiement mobile:</strong> Orange Money, Inwi Money<br/>• <strong>Espèces:</strong> Possible pour rendez-vous à Casablanca<br/>• <strong>Échelonnement:</strong> 50% à la commande, 50% à la livraison<br/>Factures officielles conformes à la réglementation marocaine.",
      category: "Paiement & Facturation"
    },
    {
      question: "Vos sites sont-ils optimisés pour le marché marocain?",
      answer: "Optimisation spécifique pour le Maroc:<br/>• <strong>Langues:</strong> Français, Arabe, Anglais selon besoins<br/>• <strong>Paiements:</strong> CMI, CashPlus, PayPal, Orange Money<br/>• <strong>SEO local:</strong> Mots-clés et stratégie pour Google.ma<br/>• <strong>Performance:</strong> Serveurs CDN optimisés Maroc/Afrique<br/>• <strong>Légal:</strong> Conformité RGPD et réglementation marocaine<br/>Expertise du marché local depuis 2020.",
      category: "Spécificités Maroc"
    },
    {
      question: "Offrez-vous des formations sur l'utilisation du site?",
      answer: "Formation complète incluse dans tous nos projets:<br/>• <strong>Session individuelle:</strong> 2h de formation personnalisée<br/>• <strong>Documentation:</strong> Guides utilisateur en français<br/>• <strong>Vidéos tutoriels:</strong> Accès plateforme de formation<br/>• <strong>Support continu:</strong> Questions illimitées 3 premiers mois<br/>Formation adaptée au niveau technique de votre équipe au Maroc.",
      category: "Formation & Support"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Agence Web Casablanca & Maroc | Développement Site Internet Pro 2024 | BrandHub.ma</title>
        <meta name="description" content="🥇 Agence web #1 au Maroc. Développement sites web professionnels, e-commerce et apps à Casablanca, Rabat, Marrakech. +200 clients satisfaits. Prix compétitifs dès 3000 MAD. Devis gratuit!" />
        <meta name="keywords" content="agence web casablanca, développement web maroc, création site web casablanca prix, agence digitale rabat, programmeur web marrakech, site e-commerce maroc, application mobile casablanca, développeur freelance maroc, agence marketing digital casablanca, برمجة مواقع الدار البيضاء, تصميم مواقع المغرب, شركة تطوير تطبيقات الرباط" />
        
        {/* Enhanced for Morocco Searches */}
        <meta name="geo.region" content="MA" />
        <meta name="geo.placename" content="Morocco" />
        <meta name="coverage" content="Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Meknès, Oujda, Kenitra, Tétouan, Salé, Mohammedia" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Agence Web Casablanca & Maroc | Développement Site Internet Pro" />
        <meta property="og:description" content="Agence web leader au Maroc. Développement web, e-commerce, apps mobiles. Casablanca, Rabat, Marrakech. +200 projets réussis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brandhub.ma/maroc" />
        <meta property="og:locale" content="fr_MA" />
        <meta property="og:locale:alternate" content="ar_MA" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Agence Web Casablanca & Maroc | BrandHub.ma" />
        <meta name="twitter:description" content="Développement web professionnel au Maroc. Sites, e-commerce, apps. Casablanca, Rabat, Marrakech." />
        
        <link rel="canonical" content="https://brandhub.ma/maroc" />
        
        {/* Morocco-Specific LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "BrandHub.ma - Agence Web Maroc",
            "description": "Agence de développement web et branding au Maroc. Services professionnels pour entreprises à Casablanca, Rabat, Marrakech et partout au Maroc.",
            "image": "https://brandhub.ma/favicone.png",
            "telephone": "+212703026422",
            "email": "contact@brandhub.ma",
            "url": "https://brandhub.ma/maroc",
            "priceRange": "3000-50000 MAD",
            "paymentAccepted": "Cash, Credit Card, Bank Transfer",
            "currenciesAccepted": "MAD, EUR, USD",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Casablanca",
              "addressRegion": "Casablanca-Settat",
              "addressCountry": "MA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "33.5731",
              "longitude": "-7.5898"
            },
            "areaServed": [
              {"@type": "City", "name": "Casablanca", "sameAs": "https://en.wikipedia.org/wiki/Casablanca"},
              {"@type": "City", "name": "Rabat", "sameAs": "https://en.wikipedia.org/wiki/Rabat"},
              {"@type": "City", "name": "Marrakech", "sameAs": "https://en.wikipedia.org/wiki/Marrakech"},
              {"@type": "City", "name": "Fès", "sameAs": "https://en.wikipedia.org/wiki/Fez,_Morocco"},
              {"@type": "City", "name": "Tanger", "sameAs": "https://en.wikipedia.org/wiki/Tangier"},
              {"@type": "City", "name": "Agadir", "sameAs": "https://en.wikipedia.org/wiki/Agadir"}
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services de Développement Web au Maroc",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Développement Site Web Maroc",
                    "description": "Création de sites web professionnels au Maroc"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-commerce Maroc",
                    "description": "Boutiques en ligne WooCommerce et Shopify au Maroc"
                  }
                }
              ]
            }
          })}
        </script>
        
        {/* FAQ Schema for Morocco */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Où se trouve votre agence web au Maroc?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BrandHub.ma est basée à Casablanca avec présence à Rabat et Marrakech. Nous offrons nos services de développement web dans toutes les villes du Maroc: Fès, Tanger, Agadir, Meknès, Oujda, Kenitra, Tétouan et plus."
                }
              },
              {
                "@type": "Question",
                "name": "Quels sont vos tarifs pour un site web au Maroc?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Nos tarifs au Maroc: Site vitrine dès 3000 MAD, E-commerce dès 8000 MAD, Application mobile dès 15000 MAD. Prix tout compris avec hébergement et maintenance. Devis gratuit sous 24h."
                }
              },
              {
                "@type": "Question",
                "name": "Travaillez-vous avec des entreprises dans toutes les villes du Maroc?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Oui, BrandHub.ma travaille avec des entreprises partout au Maroc: Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir, Meknès, Oujda et toutes les autres villes. Nous offrons services en ligne et déplacements sur site."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Maroc</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Agence de Développement Web et Branding au Maroc
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Votre partenaire digital au Maroc pour le développement web, le branding, le design graphique et le marketing digital. 
                Nous accompagnons les PME et grandes entreprises à Casablanca, Rabat, Marrakech et partout au Maroc dans leur transformation digitale.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gradient-accent" asChild>
                  <a href="https://wa.me/212703026422?text=Bonjour%2C%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20services%20au%20Maroc.%20Je%20vous%20contacte%20depuis%20votre%20page%20Maroc." target="_blank" rel="noopener noreferrer">
                    Contactez-nous au Maroc
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/services/programming">
                    Nos Services au Maroc
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services au Maroc */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nos Services de Développement Web au Maroc
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Solutions digitales complètes pour entreprises marocaines à Casablanca, Rabat, Marrakech, Tanger, Agadir et dans tout le Maroc
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Développement Web Maroc</h3>
                  <p className="text-muted-foreground">
                    Création de sites web professionnels, e-commerce et applications web sur mesure pour entreprises marocaines. 
                    Technologies modernes et SEO optimisé pour le marché marocain. Découvrez nos 
                    <Link to="/services/programming" className="text-primary hover:underline"> services de développement web complets</Link>.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Branding & Design Graphique</h3>
                  <p className="text-muted-foreground">
                    Création d'identité visuelle, logo design, charte graphique et supports marketing pour marques marocaines. 
                    Design qui capture l'essence de votre entreprise au Maroc. Explorez nos 
                    <Link to="/services/graphics" className="text-primary hover:underline"> services de design et branding</Link>.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Marketing Digital Maroc</h3>
                  <p className="text-muted-foreground">
                    Stratégies SEO, publicité Google Ads, gestion réseaux sociaux et content marketing pour entreprises au Maroc. 
                    Augmentez votre visibilité en ligne sur le marché marocain. Consultez nos 
                    <Link to="/services/content" className="text-primary hover:underline"> solutions de marketing digital</Link>.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Conseil en Stratégie Digitale</h3>
                  <p className="text-muted-foreground">
                    Accompagnement stratégique pour la transformation digitale de votre entreprise au Maroc. 
                    Analyse, audit et recommandations personnalisées.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">E-commerce Maroc</h3>
                  <p className="text-muted-foreground">
                    Boutiques en ligne complètes avec paiement sécurisé adapté au marché marocain. 
                    Solutions WooCommerce, Shopify et développement sur mesure.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-elegant transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Applications Web & Mobile</h3>
                  <p className="text-muted-foreground">
                    Développement d'applications web progressives (PWA) et applications mobiles pour iOS et Android 
                    pour entreprises marocaines.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Villes Principales */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Présents dans Toutes les Villes du Maroc
              </h2>
              <p className="text-xl text-muted-foreground">
                Nos services de développement web et branding sont disponibles partout au Maroc
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                "Casablanca", "Rabat", "Marrakech", "Tanger",
                "Fès", "Agadir", "Meknès", "Oujda",
                "Kenitra", "Tétouan", "Salé", "Mohammedia"
              ].map((city) => (
                <Card key={city} className="text-center shadow-card hover:shadow-elegant transition-shadow">
                  <CardContent className="p-6">
                    <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                    <h3 className="font-bold">{city}</h3>
                    <p className="text-sm text-muted-foreground">Développement Web</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pourquoi Choisir Notre Agence au Maroc */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                Pourquoi Choisir Notre Agence Web au Maroc?
              </h2>

              <Card className="shadow-elegant">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Expertise Locale au Maroc</h3>
                        <p className="text-muted-foreground">
                          Connaissance approfondie du marché marocain, des comportements des consommateurs et des spécificités 
                          culturelles pour des solutions digitales adaptées aux entreprises marocaines.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Technologies de Pointe</h3>
                        <p className="text-muted-foreground">
                          Développement web avec les dernières technologies: React, Node.js, WordPress, Shopify. 
                          Sites web rapides, sécurisés et optimisés pour le SEO au Maroc.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Support Client Dédié</h3>
                        <p className="text-muted-foreground">
                          Équipe disponible en français et arabe, support réactif et accompagnement continu après livraison. 
                          Nous sommes là pour votre succès au Maroc.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-primary font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Tarifs Compétitifs</h3>
                        <p className="text-muted-foreground">
                          Prix transparents et adaptés au marché marocain. Excellent rapport qualité-prix pour des services 
                          de développement web et branding professionnels.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Contactez Notre Agence au Maroc
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Téléphone</h3>
                    <a href="tel:+212703026422" className="text-muted-foreground hover:text-primary">
                      +212 703 026 422
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">Email</h3>
                    <a href="mailto:contact@youragency.com" className="text-muted-foreground hover:text-primary">
                      contact@youragency.com
                    </a>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h3 className="font-bold mb-2">WhatsApp</h3>
                    <a 
                      href="https://wa.me/212703026422?text=Bonjour%2C%20je%20souhaite%20discuter%20avec%20vous%20concernant%20vos%20services%20au%20Maroc." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      Chat Direct
                    </a>
                  </CardContent>
                </Card>
              </div>

              <p className="text-lg text-muted-foreground">
                Agence de développement web et branding au service des entreprises marocaines depuis plusieurs années. 
                Transformez votre présence digitale au Maroc avec nos solutions professionnelles. 
                <Link to="/about" className="text-primary hover:underline">Découvrez notre histoire</Link> et 
                <Link to="/blog" className="text-primary hover:underline">consultez nos articles spécialisés</Link> pour en savoir plus.
              </p>
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section for Morocco SEO */}
        <EnhancedFAQ 
          faqs={moroccoFAQs}
          title="Questions Fréquentes - Services Web au Maroc"
          description="Tout ce que vous devez savoir sur nos services de développement web, prix et processus au Maroc"
          pageType="location"
        />

        <CTASection />
        <Footer />
      </div>
    </>
  );
};

export default LocationMorocco;
