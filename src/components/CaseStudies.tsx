import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, DollarSign, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface CaseStudyMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  location: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: CaseStudyMetric[];
  technologies: string[];
  timeline: string;
  investment: string;
  roi: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
  imageUrl?: string;
}

interface CaseStudiesProps {
  studies: CaseStudy[];
  showAll?: boolean;
  title?: string;
  description?: string;
}

export const CaseStudies = ({ 
  studies, 
  showAll = false, 
  title = "Nos Succès Clients",
  description = "Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs digitaux" 
}: CaseStudiesProps) => {
  const displayStudies = showAll ? studies : studies.slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="space-y-12 max-w-6xl mx-auto">
          {displayStudies.map((study, index) => (
            <Card 
              key={study.id} 
              className="shadow-elegant hover:shadow-lg transition-shadow overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-primary border-primary">
                        {study.industry}
                      </Badge>
                      <Badge variant="secondary">
                        {study.location}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl">{study.title}</CardTitle>
                    <p className="text-muted-foreground mt-2">
                      <strong>Client:</strong> {study.client}
                    </p>
                  </div>
                  
                  {study.imageUrl && (
                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden">
                      <img 
                        src={study.imageUrl} 
                        alt={`Projet ${study.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Challenge & Solution */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-lg mb-3 text-destructive">
                        🎯 Défi
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg mb-3 text-primary">
                        💡 Solution
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {study.solution}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-lg mb-3">
                        🛠️ Technologies Utilisées
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Metrics & Results */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-lg mb-4 text-green-600">
                        📈 Résultats
                      </h4>
                      <ul className="space-y-2">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span className="text-muted-foreground">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      {study.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center p-4 rounded-lg bg-muted/50">
                          <div className={`w-8 h-8 mx-auto mb-2 ${metric.color}`}>
                            {metric.icon}
                          </div>
                          <div className="font-bold text-lg">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="border-t pt-6 grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="font-bold">{study.timeline}</div>
                    <div className="text-sm text-muted-foreground">Délai de réalisation</div>
                  </div>
                  
                  <div className="text-center">
                    <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="font-bold">{study.investment}</div>
                    <div className="text-sm text-muted-foreground">Investissement</div>
                  </div>
                  
                  <div className="text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-bold">{study.roi}</div>
                    <div className="text-sm text-muted-foreground">ROI à 6 mois</div>
                  </div>
                </div>

                {/* Testimonial */}
                {study.testimonial && (
                  <div className="mt-8 p-6 rounded-lg bg-primary/5 border-l-4 border-primary">
                    <blockquote className="text-lg italic mb-4">
                      "{study.testimonial.quote}"
                    </blockquote>
                    <cite className="text-sm font-semibold">
                      — {study.testimonial.author}, {study.testimonial.position}
                    </cite>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {!showAll && studies.length > 3 && (
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/case-studies">
                Voir Tous Nos Projets
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

// Sample case studies data for Morocco
export const sampleCaseStudies: CaseStudy[] = [
  {
    id: "ecommerce-casablanca-fashion",
    title: "Boutique Mode en Ligne - Croissance 400%",
    client: "Fashion Brand Casablanca",
    industry: "Mode & Textile",
    location: "Casablanca",
    challenge: "Entreprise textile familiale sans présence en ligne, perdait des clients face à la concurrence digitale. Ventes limitées au magasin physique de Casablanca.",
    solution: "Création boutique e-commerce WooCommerce avec design sur mesure, intégration paiement CMI et CashPlus, optimisation mobile-first pour le marché marocain.",
    results: [
      "400% d'augmentation du chiffre d'affaires en 8 mois",
      "#1 Google pour 'mode femme casablanca'",
      "3000+ commandes en ligne en 6 mois",
      "Expansion réussie vers Rabat et Marrakech"
    ],
    metrics: [
      { label: "CA en ligne", value: "+400%", icon: <TrendingUp className="w-full h-full" />, color: "text-green-600" },
      { label: "Commandes/mois", value: "500+", icon: <Users className="w-full h-full" />, color: "text-blue-600" },
      { label: "Trafic organique", value: "+300%", icon: <TrendingUp className="w-full h-full" />, color: "text-purple-600" },
      { label: "Conversion", value: "3.2%", icon: <DollarSign className="w-full h-full" />, color: "text-orange-600" }
    ],
    technologies: ["WooCommerce", "React", "CMI Payment", "CashPlus", "Google Analytics"],
    timeline: "6 semaines",
    investment: "18,000 MAD",
    roi: "+350% ROI",
    testimonial: {
      quote: "BrandHub.ma a transformé notre entreprise familiale. Nous vendons maintenant dans tout le Maroc grâce à notre site e-commerce. Service exceptionnel!",
      author: "Fatima Bennani",
      position: "Directrice Commerciale"
    }
  },
  {
    id: "startup-rabat-saas",
    title: "Startup SaaS - 10k Utilisateurs en 4 Mois", 
    client: "Tech Startup Rabat",
    industry: "SaaS & Tech",
    location: "Rabat",
    challenge: "Startup avec produit innovant mais aucune présence web professionnelle. Difficulté à convaincre investisseurs et acquérir premiers clients au Maroc.",
    solution: "Développement application web React complète avec dashboard admin, système d'abonnements, intégrations API et stratégie marketing digital ciblée.",
    results: [
      "10,000 utilisateurs actifs en 4 mois",
      "Levée de fonds de 2M MAD réussie", 
      "Expansion vers 3 pays africains",
      "#1 dans leur catégorie au Maroc"
    ],
    metrics: [
      { label: "Utilisateurs", value: "10k+", icon: <Users className="w-full h-full" />, color: "text-blue-600" },
      { label: "Funding", value: "2M MAD", icon: <DollarSign className="w-full h-full" />, color: "text-green-600" },
      { label: "Pays", value: "3", icon: <TrendingUp className="w-full h-full" />, color: "text-purple-600" },
      { label: "MRR", value: "50k MAD", icon: <DollarSign className="w-full h-full" />, color: "text-orange-600" }
    ],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Stripe", "SendGrid"],
    timeline: "10 semaines",
    investment: "45,000 MAD",
    roi: "+200% ROI"
  },
  {
    id: "restaurant-marrakech",
    title: "Restaurant - Commandes en Ligne x5",
    client: "Restaurant Traditionnel Marrakech",
    industry: "Restauration",
    location: "Marrakech", 
    challenge: "Restaurant traditionnel impacté par COVID-19, aucun système de commande en ligne, perte de clientèle touristique, dépendance aux platforms comme Glovo/Jumia.",
    solution: "Site web avec système de commande en ligne intégré, menu digital, réservations, optimisation locale pour touristes et résidents de Marrakech.",
    results: [
      "500% d'augmentation des commandes en ligne",
      "Indépendance des plateformes (économie 20% commission)",
      "Nouveau segment clientèle (livraison résidentielle)",
      "Réservations en ligne 24/7 automatisées"
    ],
    metrics: [
      { label: "Commandes", value: "+500%", icon: <TrendingUp className="w-full h-full" />, color: "text-green-600" },
      { label: "Économies", value: "20%", icon: <DollarSign className="w-full h-full" />, color: "text-blue-600" },
      { label: "Nouveaux clients", value: "60%", icon: <Users className="w-full h-full" />, color: "text-purple-600" },
      { label: "Réservations", value: "24/7", icon: <Clock className="w-full h-full" />, color: "text-orange-600" }
    ],
    technologies: ["WordPress", "WooCommerce", "Booking System", "SMS Integration"],
    timeline: "4 semaines",
    investment: "12,000 MAD",
    roi: "+180% ROI",
    testimonial: {
      quote: "Grâce à BrandHub.ma, nous avons survécu au COVID et notre restaurant prospère maintenant avec les commandes en ligne. Merci!",
      author: "Ahmed El Fassi",
      position: "Propriétaire Restaurant"
    }
  }
];

export default CaseStudies;
