import { useState } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

interface EnhancedFAQProps {
  faqs: FAQ[];
  title?: string;
  description?: string;
  pageType?: 'homepage' | 'service' | 'location';
}

export const EnhancedFAQ = ({ 
  faqs, 
  title = "Questions Fréquemment Posées", 
  description = "Trouvez rapidement les réponses à vos questions sur nos services.",
  pageType = 'service'
}: EnhancedFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ schema for search engines
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </h2>
              <p className="text-xl text-muted-foreground">
                {description}
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card 
                  key={index} 
                  className="shadow-card hover:shadow-elegant transition-shadow"
                >
                  <CardContent className="p-0">
                    <Button
                      variant="ghost"
                      className="w-full h-auto p-6 flex items-center justify-between text-left hover:bg-muted/50 rounded-lg"
                      onClick={() => toggleFAQ(index)}
                    >
                      <div className="flex-1 pr-4">
                        <h3 className="font-semibold text-lg mb-1">
                          {faq.question}
                        </h3>
                        {faq.category && (
                          <span className="text-sm text-primary font-medium">
                            {faq.category}
                          </span>
                        )}
                      </div>
                      
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </Button>
                    
                    <div className={cn(
                      "overflow-hidden transition-all duration-300",
                      openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}>
                      <div className="px-6 pb-6">
                        <div 
                          className="text-muted-foreground leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnhancedFAQ;
