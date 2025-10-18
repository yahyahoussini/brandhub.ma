import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { WorldMapSection } from "@/components/WorldMapSection";

// Lazy load heavy components
const CTAWithVerticalMarquee = lazy(() => import("@/components/ui/cta-with-text-marquee"));
const NeuralNetworkHero = lazy(() => import("@/components/ui/neural-network-hero"));
const TechStackCloud = lazy(() => import("@/components/TechStackCloud"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServicesOverview />
      <Testimonials />
      
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
      
      <WorldMapSection />
      
      <Suspense fallback={<div className="py-20" />}>
        <TechStackCloud />
      </Suspense>
      
      <Suspense fallback={<div className="py-20" />}>
        <BlogPreview />
      </Suspense>
      
      <Footer />
    </div>
  );
};

export default Index;
