import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

interface BlogPostData {
  title: string;
  published_at: string;
  category: string;
  image_url: string;
  content: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  const parseContent = (rawContent: string): string => {
    if (!rawContent) return '';
    
    console.log('Raw content from DB:', rawContent.substring(0, 200));
    let cleaned = rawContent.trim();
    
    // Remove markdown code block wrapper (```json and ```)
    if (cleaned.startsWith('```')) {
      console.log('Removing markdown wrapper...');
      // Remove opening ``` with optional language identifier
      cleaned = cleaned.replace(/^```[a-z]*\s*\n?/i, '');
      // Remove closing ```
      cleaned = cleaned.replace(/\n?```\s*$/, '');
      cleaned = cleaned.trim();
      console.log('After removing wrapper:', cleaned.substring(0, 200));
    }
    
    // Try to parse as JSON if it looks like JSON
    if (cleaned.startsWith('{') || cleaned.startsWith('[')) {
      try {
        console.log('Attempting to parse as JSON...');
        const parsed = JSON.parse(cleaned);
        if (parsed && typeof parsed === 'object' && 'content' in parsed) {
          cleaned = parsed.content;
          console.log('Extracted content from JSON:', cleaned.substring(0, 200));
        }
      } catch (e) {
        console.warn('Content looks like JSON but failed to parse:', e);
        console.log('Failed to parse:', cleaned.substring(0, 500));
      }
    }
    
    console.log('Final parsed content:', cleaned.substring(0, 200));
    return cleaned;
  };

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('title, published_at, category, image_url, content')
        .eq('slug', id)
        .eq('is_published', true)
        .maybeSingle();

      if (error) {
        console.error('Error fetching blog post:', error);
      } else if (data) {
        // Parse the content to extract HTML from JSON wrapper
        setPost({
          ...data,
          content: parseContent(data.content)
        });
      } else {
        setPost(null);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <p className="text-muted-foreground">Chargement de l'article...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">L'article que vous recherchez n'existe pas ou a été supprimé.</p>
          <Button asChild>
            <Link to="/blog">Retour au blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

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
              <span>{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Équipe BrandHub.ma</span>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>

          {/* Featured Image */}
          <div className="aspect-video mb-12 rounded-2xl overflow-hidden shadow-elegant animate-fade-in">
            <img 
              src={post.image_url || 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=600&fit=crop'} 
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none animate-fade-in prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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
