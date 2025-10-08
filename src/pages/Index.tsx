import { lazy, Suspense } from "react";

// Critical components loaded immediately
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Lazy load all non-critical components
const ServicesOverview = lazy(() => import("@/components/ServicesOverview"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Footer = lazy(() => import("@/components/Footer"));
const CTAWithVerticalMarquee = lazy(() => import("@/components/ui/cta-with-text-marquee"));
const NeuralNetworkHero = lazy(() => import("@/components/ui/neural-network-hero"));
const SplineSceneBasic = lazy(() => 
  import("@/components/ui/spline-demo").then(m => ({ default: m.SplineSceneBasic }))
);
const TechStackCloud = lazy(() => import("@/components/TechStackCloud"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));
const CEOSection = lazy(() => import("@/components/CEOSection"));
const NeonRaymarcherSection = lazy(() => import("@/components/NeonRaymarcherSection"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50">
        Skip to main content
      </a>
      
      <header role="banner">
        <Navbar />
      </header>
      
      <main id="main-content" role="main" tabIndex={-1}>
        <Hero />
      
      <Suspense fallback={<div className="py-20 bg-muted/20 animate-pulse" />}>
        <ServicesOverview />
      </Suspense>
      
      <Suspense fallback={<div className="py-20 bg-muted/20 animate-pulse" />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<div className="py-20" />}>
        <CTAWithVerticalMarquee />
      </Suspense>
      
      <Suspense fallback={<div className="py-20" />}>
        <NeuralNetworkHero 
          title="Prêt à Transformer Votre Vision en Réalité?"
          description="Discutons de votre projet et découvrez comment nous pouvons vous aider à atteindre vos objectifs avec des solutions innovantes et performantes."
          badgeText="Technologie de Pointe"
          badgeLabel="Nouveau"
          ctaButtons={[
            { text: "Consultation Gratuite", href: "https://wa.me/212607076940?text=Bonjour%2C%20je%20souhaite%20une%20consultation%20gratuite.%20Je%20vous%20contacte%20depuis%20la%20section%20technologique%20de%20votre%20site.", primary: true },
            { text: "Voir Nos Projets", href: "/services/programming" }
          ]}
          microDetails={["Innovation constante", "Expertise confirmée", "Résultats garantis"]}
        />
      </Suspense>
      
      {/* Interactive 3D Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Suspense fallback={<div className="w-full h-[500px] bg-muted animate-pulse rounded-lg" />}>
            <SplineSceneBasic />
          </Suspense>
        </div>
      </section>
      
      <Suspense fallback={<div className="py-20" />}>
        <TechStackCloud />
      </Suspense>
      
      <Suspense fallback={<div className="py-20" />}>
        <BlogPreview />
      </Suspense>
      
      <Suspense fallback={<div className="py-20" />}>
        <CEOSection />
      </Suspense>
      
        <Suspense fallback={<div className="py-20" />}>
          <NeonRaymarcherSection />
        </Suspense>
      </main>
      
      <footer role="contentinfo">
        <Suspense fallback={<div className="py-20 bg-muted/20 animate-pulse" />}>
          <Footer />
        </Suspense>
      </footer>
    </div>
  );
};

export default Index;
