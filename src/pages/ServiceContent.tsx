import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import ProcessSection from "@/components/ProcessSection";
import GlassCard from "@/components/ui/glass-card";
import { WavyBackground } from "@/components/ui/wavy-background";
import { PenTool, Globe, FileText, Camera, TrendingUp, MessageCircle, ClipboardList, Calendar, Edit, Search as SearchIcon, Share2 } from "lucide-react";

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

      <CTASection />
      <Footer />
    </div>
  );
};

export default ServiceContent;
