import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { SocialShare } from "@/components/SocialShare";

interface BlogPostData {
  title: string;
  published_at: string;
  category: string;
  image_url: string;
  content: string;
  excerpt?: string;
  slug?: string;
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
        .select('title, published_at, category, image_url, content, excerpt, slug')
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

  const currentUrl = `https://brandhub.ma/blog/${id}`;
  const cleanContent = post?.content?.replace(/<[^>]*>/g, '').substring(0, 160) || '';

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{post?.title} | Blog BrandHub.ma</title>
        <meta name="description" content={post?.excerpt || cleanContent || `Découvrez notre article sur ${post?.category?.toLowerCase()}`} />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={post?.title} />
        <meta property="og:description" content={post?.excerpt || cleanContent} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post?.image_url || 'https://brandhub.ma/favicone.png'} />
        <meta property="article:published_time" content={post?.published_at} />
        <meta property="article:author" content="BrandHub.ma" />
        <meta property="article:section" content={post?.category} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post?.title} />
        <meta name="twitter:description" content={post?.excerpt || cleanContent} />
        <meta name="twitter:image" content={post?.image_url || 'https://brandhub.ma/favicone.png'} />

        {/* Enhanced Article Schema for AEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post?.title,
            "description": post?.excerpt || cleanContent,
            "image": post?.image_url || 'https://brandhub.ma/favicone.png',
            "datePublished": post?.published_at,
            "dateModified": post?.updated_at || post?.published_at,
            "author": {
              "@type": "Person",
              "name": "Yahya Houssini",
              "jobTitle": "CEO & Lead Developer",
              "url": "https://brandhub.ma/about",
              "worksFor": {
                "@type": "Organization",
                "name": "BrandHub.ma",
                "url": "https://brandhub.ma"
              }
            },
            "publisher": {
              "@type": "Organization",
              "name": "BrandHub.ma",
              "logo": {
                "@type": "ImageObject",
                "url": "https://brandhub.ma/favicone.png",
                "width": 512,
                "height": 512
              },
              "url": "https://brandhub.ma"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": currentUrl
            },
            "wordCount": post?.content?.split(' ').length || 1000,
            "articleSection": post?.category,
            "inLanguage": "fr-MA",
            "about": {
              "@type": "Thing",
              "name": post?.category
            },
            "isAccessibleForFree": true,
            "keywords": post?.tags?.join(', ') || post?.category
          })}
        </script>

        {/* Speakable Schema for Voice Search */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "speakable": {
              "@type": "SpeakableSpecification",
              "cssSelector": ["h1", "h2", ".prose"]
            }
          })}
        </script>
      </Helmet>

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
              <User className="w-5 h-5" aria-hidden="true" />
              <span>Équipe BrandHub.ma</span>
            </div>
          </div>

          {/* Social Share */}
          <div className="mb-8">
            <SocialShare
              url={currentUrl}
              title={post.title}
              description={post.excerpt || cleanContent}
            />
          </div>

          {/* Featured Image */}
          <div className="aspect-video mb-12 rounded-2xl overflow-hidden shadow-elegant animate-fade-in">
            <img
              src={post.image_url || 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1200&h=600&fit=crop'}
              alt={`Image de couverture: ${post.title}`}
              loading="lazy"
              width="1200"
              height="600"
              decoding="async"
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
