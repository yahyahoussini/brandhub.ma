import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Accueil", url: "https://brandhub.ma/" }
  ];

  const paths: Record<string, string> = {
    "/about": "À Propos",
    "/blog": "Blog",
    "/contact": "Contact",
    "/terms": "Conditions d'Utilisation",
    "/services/programming": "Développement Web",
    "/services/graphics": "Design Graphique",
    "/services/content": "Création de Contenu",
    "/services/business": "Solutions Business",
    "/maroc": "Maroc",
    "/espana": "Espagne",
    "/saudi-arabia": "Arabie Saoudite",
  };

  // Handle nested paths like /blog/:slug
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    breadcrumbs.push({
      name: "Blog",
      url: "https://brandhub.ma/blog"
    });
    breadcrumbs.push({
      name: "Article",
      url: `https://brandhub.ma${pathname}`
    });
  } else if (pathname !== "/" && paths[pathname]) {
    breadcrumbs.push({
      name: paths[pathname],
      url: `https://brandhub.ma${pathname}`
    });
  }

  return breadcrumbs;
};

export const BreadcrumbSchema = () => {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);

  // Enhanced breadcrumb schema for AEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": {
        "@type": "WebPage",
        "@id": item.url,
        "url": item.url,
        "name": item.name
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

