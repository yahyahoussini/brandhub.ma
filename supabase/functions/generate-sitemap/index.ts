import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch published blog posts
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at, category')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }

    // Generate XML sitemap
    const now = new Date().toISOString();
    const baseUrl = 'https://brandhub.ma';
    
    // Static pages with priorities
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily', lastmod: now },
      { url: '/maroc', priority: '0.95', changefreq: 'weekly', lastmod: now },
      { url: '/services/programming', priority: '0.9', changefreq: 'weekly', lastmod: now },
      { url: '/services/graphics', priority: '0.9', changefreq: 'weekly', lastmod: now },
      { url: '/services/content', priority: '0.9', changefreq: 'weekly', lastmod: now },
      { url: '/services/business', priority: '0.9', changefreq: 'weekly', lastmod: now },
      { url: '/about', priority: '0.8', changefreq: 'monthly', lastmod: now },
      { url: '/contact', priority: '0.8', changefreq: 'monthly', lastmod: now },
      { url: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: now },
      { url: '/espana', priority: '0.7', changefreq: 'monthly', lastmod: now },
      { url: '/saudi-arabia', priority: '0.7', changefreq: 'monthly', lastmod: now },
      { url: '/terms', priority: '0.3', changefreq: 'yearly', lastmod: '2024-10-01' }
    ];

    // Generate XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    // Add static pages
    staticPages.forEach(page => {
      const lastmod = page.lastmod || now;
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;
      
      // Add hreflang for main pages
      if (page.url === '/' || page.url === '/maroc') {
        sitemap += `
    <xhtml:link rel="alternate" hreflang="fr-ma" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="ar-ma" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.url}" />`;
      }
      
      sitemap += `
  </url>`;
    });

    // Add blog posts
    blogPosts?.forEach(post => {
      const lastmod = post.updated_at || post.published_at;
      const priority = post.category === 'Morocco' ? '0.8' : '0.7';
      
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});