import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ProcessSection from "@/components/ProcessSection";
import GlassCard from "@/components/ui/glass-card";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Palette, Layers, PenTool, Image, Video, Package, Search, Lightbulb, Pencil, Sparkles, CheckCircle } from "lucide-react";

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

  return (
    <div className="min-h-screen">
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

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServiceGraphics;
