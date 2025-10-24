import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeroSkeleton, ServicesSkeleton, TestimonialsSkeleton, ContentSkeleton } from "@/components/LoadingSkeleton";
import { PerformanceOptimizer } from "@/components/PerformanceOptimizer";
import { LazyLoadObserver } from "@/components/LazyLoadObserver";

// Lazy load ALL heavy components for optimal performance
const Hero = lazy(() => import("@/components/Hero"));
const ServicesOverview = lazy(() => import("@/components/ServicesOverview"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const WorldMapSection = lazy(() => import("@/components/WorldMapSection").then(m => ({ default: m.WorldMapSection })));
const CTAWithVerticalMarquee = lazy(() => import("@/components/ui/cta-with-text-marquee"));
const NeuralNetworkHero = lazy(() => import("@/components/ui/neural-network-hero"));
const TechStackCloud = lazy(() => import("@/components/TechStackCloud"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Agence Web #1 au Maroc 2024 | Développement Site Web Casablanca, Rabat | BrandHub.ma</title>
        <meta name="description" content="🏆 Agence web leader au Maroc depuis 2020. Développement sites web, e-commerce et apps mobiles à Casablanca, Rabat, Marrakech. +300 projets réussis. Devis gratuit 24h! Prix dès 3000 MAD." />
        <meta name="keywords" content="agence web maroc, développement web casablanca, création site web maroc, agence digitale rabat, programmeur web marrakech, site internet maroc prix, e-commerce maroc, application mobile maroc, برمجة المواقع المغرب, تصميم مواقع الدار البيضاء" />
        
        {/* Enhanced Local SEO */}
        <meta name="geo.region" content="MA-CAS" />
        <meta name="geo.placename" content="Casablanca" />
        <meta name="geo.position" content="33.5731;-7.5898" />
        
        {/* Open Graph Enhanced */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_MA" />
        <meta property="og:locale:alternate" content="ar_MA" />
        <meta property="og:site_name" content="BrandHub.ma - Agence Web Maroc" />
        <meta property="og:title" content="Agence Web #1 au Maroc | Développement Site Web Professionnel" />
        <meta property="og:description" content="Agence web leader au Maroc. Développement sites web, e-commerce et apps mobiles à Casablanca, Rabat, Marrakech. +300 projets réussis." />
        <meta property="og:url" content="https://brandhub.ma/" />
        <meta property="og:image" content="https://brandhub.ma/favicone.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Enhanced */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@brandhubma" />
        <meta name="twitter:title" content="Agence Web #1 au Maroc | BrandHub.ma" />
        <meta name="twitter:description" content="Développement web professionnel au Maroc. Sites web, e-commerce, apps mobiles. Casablanca, Rabat, Marrakech." />
        
        <link rel="canonical" href="https://brandhub.ma/" />
        
        {/* Enhanced Structured Data - LocalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://brandhub.ma/#organization",
            "name": "BrandHub.ma - Agence Web Casablanca",
            "image": "https://brandhub.ma/favicone.png",
            "logo": "https://brandhub.ma/favicone.png",
            "url": "https://brandhub.ma",
            "telephone": "+212703026422",
            "email": "contact@brandhub.ma",
            "priceRange": "3000-50000 MAD",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Boulevard Zerktouni",
              "addressLocality": "Casablanca",
              "addressRegion": "Casablanca-Settat",
              "postalCode": "20000",
              "addressCountry": "MA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "33.5731",
              "longitude": "-7.5898"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            },
            "areaServed": [
              {"@type": "City", "name": "Casablanca"},
              {"@type": "City", "name": "Rabat"},
              {"@type": "City", "name": "Marrakech"},
              {"@type": "City", "name": "Fès"},
              {"@type": "City", "name": "Tanger"},
              {"@type": "City", "name": "Agadir"}
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "127",
              "bestRating": "5"
            },
            "founder": {
              "@type": "Person",
              "name": "Yahya Houssini",
              "jobTitle": "CEO & Lead Developer",
              "nationality": "Moroccan"
            }
          })}
        </script>
        
        {/* FAQ Schema for Featured Snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Combien coûte la création d'un site web au Maroc?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Le prix d'un site web au Maroc varie de 3000 MAD pour un site vitrine professionnel à 25000 MAD pour un e-commerce complet avec paiement en ligne. BrandHub.ma offre des tarifs transparents avec devis gratuit sous 24h pour tous projets web à Casablanca, Rabat et Marrakech."
                }
              },
              {
                "@type": "Question",
                "name": "Quelle est la meilleure agence web à Casablanca?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BrandHub.ma est l'agence web leader à Casablanca avec +200 projets réussis depuis 2020. Nous offrons développement web, création e-commerce, applications mobiles, SEO et maintenance avec garantie satisfaction. Services disponibles à Casablanca, Rabat, Marrakech et partout au Maroc."
                }
              },
              {
                "@type": "Question",
                "name": "Combien de temps pour créer un site web au Maroc?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Le délai de création d'un site web au Maroc est de 2 à 4 semaines pour un site vitrine et 4 à 8 semaines pour un e-commerce complet. BrandHub.ma garantit des délais de livraison respectés avec suivi de projet en temps réel."
                }
              },
              {
                "@type": "Question",
                "name": "Quels services offre votre agence web au Maroc?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "BrandHub.ma offre développement de sites web sur mesure, création e-commerce (WooCommerce, Shopify), applications mobiles iOS/Android, design graphique, branding, référencement SEO, marketing digital et maintenance web. Services disponibles à Casablanca, Rabat, Marrakech, Fès, Tanger et partout au Maroc."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      
      <PerformanceOptimizer />
      
      {/* Skip to main content link for keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded"
      >
        Aller au contenu principal
      </a>
      
      <Navbar />
      
      <main id="main-content" role="main">
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
        
        <Suspense fallback={<ServicesSkeleton />}>
          <ServicesOverview />
        </Suspense>
        
        <Suspense fallback={<TestimonialsSkeleton />}>
          <Testimonials />
        </Suspense>
      
      <LazyLoadObserver fallback={<ContentSkeleton />} rootMargin="200px">
        <Suspense fallback={<ContentSkeleton />}>
          <CTAWithVerticalMarquee />
        </Suspense>
      </LazyLoadObserver>
      
      <LazyLoadObserver fallback={<ContentSkeleton />} rootMargin="200px">
        <Suspense fallback={<ContentSkeleton />}>
          <NeuralNetworkHero 
            title="Prêt à Transformer Votre Vision en Réalité?"
            description="Discutons de votre projet et découvrez comment nous pouvons vous aider à atteindre vos objectifs avec des solutions innovantes et performantes."
            badgeText="Technologie de Pointe"
            badgeLabel="Nouveau"
            ctaButtons={[
              { text: "Consultation Gratuite", href: "https://wa.me/212703026422?text=Bonjour%2C%20je%20souhaite%20une%20consultation%20gratuite.%20Je%20vous%20contacte%20depuis%20la%20section%20technologique%20de%20votre%20site.", primary: true },
              { text: "Voir Nos Projets", href: "/services/programming" }
            ]}
            microDetails={["Innovation constante", "Expertise confirmée", "Résultats garantis"]}
          />
        </Suspense>
      </LazyLoadObserver>
      
      <LazyLoadObserver fallback={<ContentSkeleton />} rootMargin="200px">
        <Suspense fallback={<ContentSkeleton />}>
          <WorldMapSection />
        </Suspense>
      </LazyLoadObserver>
      
      <LazyLoadObserver fallback={<ContentSkeleton />} rootMargin="200px">
        <Suspense fallback={<ContentSkeleton />}>
          <TechStackCloud />
        </Suspense>
      </LazyLoadObserver>
      
      <LazyLoadObserver fallback={<ContentSkeleton />} rootMargin="200px">
        <Suspense fallback={<ContentSkeleton />}>
          <BlogPreview />
        </Suspense>
      </LazyLoadObserver>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
