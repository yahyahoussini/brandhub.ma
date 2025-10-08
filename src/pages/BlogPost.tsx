import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();

  // Mock data - in production, fetch based on id
  const post = {
    title: "Les Tendances du Design Web en 2025",
    date: "15 Mars 2025",
    author: "Équipe BrandHub.ma",
    category: "Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop",
    content: `
      Le design web évolue constamment, et 2025 apporte son lot de nouvelles tendances passionnantes qui redéfinissent l'expérience utilisateur.

      ## Minimalisme Augmenté
      Le minimalisme reste une tendance forte, mais avec une touche de sophistication. Les designs épurés intègrent désormais des micro-interactions et des animations subtiles qui enrichissent l'expérience sans la surcharger.

      ## IA et Personnalisation
      L'intelligence artificielle permet maintenant de créer des expériences ultra-personnalisées. Les interfaces s'adaptent en temps réel aux préférences et au comportement de chaque utilisateur.

      ## Design Immersif 3D
      Les éléments 3D interactifs deviennent la norme, offrant des expériences plus immersives et engageantes. WebGL et Three.js permettent des rendus impressionnants directement dans le navigateur.

      ## Typographie Expressive
      Les polices variables et la typographie cinétique prennent le devant de la scène. Le texte devient un élément de design à part entière, pas seulement un support d'information.

      ## Durabilité et Éco-conception
      Le design web éco-responsable gagne en importance. L'optimisation des performances n'est plus seulement une question d'UX, mais aussi d'impact environnemental.

      Ces tendances façonnent l'avenir du web design au Maroc et dans le monde. Chez BrandHub.ma, nous restons à la pointe de ces évolutions pour offrir à nos clients des solutions innovantes et performantes.
    `
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8" asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Retour au blog
            </Link>
          </Button>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium text-sm">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>

          {/* Featured Image */}
          <div className="aspect-video mb-12 rounded-2xl overflow-hidden shadow-elegant animate-fade-in">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none animate-fade-in">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('##')) {
                return (
                  <h2 key={index} className="text-3xl font-bold mt-12 mb-4 text-foreground">
                    {paragraph.replace('##', '').trim()}
                  </h2>
                );
              }
              return (
                <p key={index} className="mb-6 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 rounded-2xl gradient-primary text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Besoin d'aide pour votre projet?
            </h3>
            <p className="text-white/90 mb-6">
              Discutons de comment nous pouvons vous aider à atteindre vos objectifs digitaux.
            </p>
            <Button 
              size="lg" 
              className="gradient-accent text-foreground hover:shadow-accent transition-smooth font-semibold"
              asChild
            >
              <Link to="/contact">
                Contactez-nous
              </Link>
            </Button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
