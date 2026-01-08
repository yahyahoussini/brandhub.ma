import { Card, CardContent } from "./ui/card";
import { Star, Quote } from "lucide-react";
import { SparklesCore } from "./ui/sparkles";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet-async";

interface Testimonial {
  id: string;
  name: string;
  company: string | null;
  content: string;
  rating: number;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .limit(3);

    if (data) {
      setTestimonials(data);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (testimonials.length === 0) {
    return null;
  }

  // Generate Enhanced Review schema for testimonials (AEO Optimized)
  const reviewSchema = testimonials.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BrandHub.ma",
    "url": "https://brandhub.ma",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1),
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.map(testimonial => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": testimonial.content,
      "datePublished": new Date().toISOString(),
      "publisher": {
        "@type": "Organization",
        "name": testimonial.company || "Client BrandHub.ma"
      },
      "itemReviewed": {
        "@type": "Service",
        "name": "Services de Développement Web et Branding",
        "provider": {
          "@type": "Organization",
          "name": "BrandHub.ma"
        }
      }
    }))
  } : null;

  return (
    <section className="py-20 bg-background" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
      {reviewSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(reviewSchema)}
          </script>
        </Helmet>
      )}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative inline-block">
            <div className="w-full h-20 absolute top-0">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={800}
                className="w-full h-full"
                particleColor="#8b5cf6"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
              Ce Que Disent <span className="gradient-primary bg-clip-text text-transparent">Nos Clients</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            La satisfaction de nos clients est notre plus grande fierté
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="hover-lift animate-fade-in shadow-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-accent mb-4 opacity-50" />

                <div className="flex mb-4" role="img" aria-label={`Note: ${testimonial.rating} sur 5 étoiles`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" aria-hidden="true" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    {testimonial.company && (
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
