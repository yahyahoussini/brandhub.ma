import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { BlogSearch } from "@/components/BlogSearch";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image_url: string;
  published_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, category, image_url, published_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (fetchError) throw fetchError;

      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Impossible de charger les articles. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.category.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Notre <span className="gradient-primary bg-clip-text text-transparent">Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Conseils, tendances et insights pour votre succès digital
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-20 mb-3" />
                    <div className="h-6 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 text-destructive">Erreur de chargement</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Button onClick={fetchPosts} className="mb-4">Réessayer</Button>
          <div className="mt-8">
            <Link to="/">
              <Button variant="outline">Retour à l'accueil</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Blog Digital Marketing & Développement Web | BrandHub.ma</title>
        <meta name="description" content="Découvrez nos articles sur le développement web, le design, le marketing digital et les tendances technologiques au Maroc et en Afrique." />
        <link rel="canonical" href="https://brandhub.ma/blog" />
        <meta property="og:title" content="Blog BrandHub.ma - Conseils Digital & Tech" />
        <meta property="og:description" content="Articles, conseils et insights pour votre succès digital au Maroc" />
        <meta property="og:url" content="https://brandhub.ma/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog BrandHub.ma - Conseils Digital & Tech" />
        <meta name="twitter:description" content="Articles, conseils et insights pour votre succès digital au Maroc" />
      </Helmet>

      <Navbar />

      <section className="pt-32 pb-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Notre <span className="gradient-primary bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conseils, tendances et insights pour votre succès digital
            </p>
          </div>

          <BlogSearch onSearch={setSearchQuery} />

          {searchQuery && (
            <div className="text-center mb-8">
              <p className="text-muted-foreground">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} trouvé{filteredPosts.length !== 1 ? 's' : ''} pour "{searchQuery}"
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground col-span-full">
                Aucun article disponible pour le moment.
              </p>
            ) : filteredPosts.length === 0 && searchQuery ? (
              <div className="text-center col-span-full">
                <p className="text-muted-foreground mb-4">
                  Aucun article ne correspond à votre recherche "{searchQuery}".
                </p>
                <Button onClick={() => setSearchQuery("")} variant="outline">
                  Afficher tous les articles
                </Button>
              </div>
            ) : (
              filteredPosts.map((post, index) => (
                <Link key={post.id} to={`/blog/${post.slug}`} aria-label={`Lire l'article: ${post.title}`}>
                  <Card className="hover-lift overflow-hidden h-full animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image_url || 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop'}
                        alt={`Image de couverture: ${post.title}`}
                        loading="lazy"
                        width="800"
                        height="600"
                        decoding="async"
                        className="w-full h-full object-cover transition-smooth hover:scale-110"
                      />
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                        </div>
                      </div>

                      <h2 className="text-xl font-bold mb-2 hover:text-primary transition-base">
                        {post.title}
                      </h2>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="mt-4 flex items-center text-primary font-semibold text-sm">
                        Lire l'article →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
