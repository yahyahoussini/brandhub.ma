import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  useEffect(() => {
    // Track 404 in Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: '404 Not Found',
        page_location: window.location.href,
        page_path: window.location.pathname,
        send_to: 'G-WDSM9FDJDH'
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>404 - Page non trouvée | BrandHub.ma</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      
      <Navbar />
      <main className="flex min-h-[60vh] items-center justify-center pt-20">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Page non trouvée</h2>
          <p className="text-muted-foreground mb-8">Désolé, la page que vous recherchez n'existe pas.</p>
          <Button asChild size="lg">
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
