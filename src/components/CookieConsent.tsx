import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show after 2 seconds to not annoy users immediately
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
    // Analytics is already loaded, just track the consent
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
      
      // Track the consent event
      (window as any).gtag('event', 'consent_update', {
        'consent_type': 'accepted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
    if ((window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
      
      // Track the consent event
      (window as any).gtag('event', 'consent_update', {
        'consent_type': 'declined'
      });
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up">
      <Card className="max-w-4xl mx-auto p-6 shadow-elegant bg-card/95 backdrop-blur-sm border">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              🍪 Utilisation des Cookies
            </h3>
            <p className="text-sm text-muted-foreground">
              Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et personnaliser le contenu. 
              En continuant à naviguer, vous acceptez notre utilisation des cookies conformément à notre politique de confidentialité.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDecline}
              className="flex-1 md:flex-none"
              aria-label="Refuser les cookies"
            >
              Refuser
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="flex-1 md:flex-none gradient-accent text-foreground font-semibold"
              aria-label="Accepter les cookies"
            >
              Accepter
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
