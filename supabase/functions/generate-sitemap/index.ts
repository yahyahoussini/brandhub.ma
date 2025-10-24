import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    const blogUrls = posts?.map(post => `
  <url>
    <loc>https://brandhub.ma/blog/${post.slug}</loc>
    <lastmod>${new Date(post.published_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('') || ''

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  
  <!-- Homepage -->
  <url>
    <loc>https://brandhub.ma/</loc>
    <lastmod>2024-12-23</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr-ma" href="https://brandhub.ma/" />
    <xhtml:link rel="alternate" hreflang="fr" href="https://brandhub.ma/" />
    <xhtml:link rel="alternate" hreflang="ar-ma" href="https://brandhub.ma/" />
  </url>
  
  <!-- About -->
  <url>
    <loc>https://brandhub.ma/about</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Services -->
  <url>
    <loc>https://brandhub.ma/services/programming</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://brandhub.ma/services/graphics</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://brandhub.ma/services/content</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <url>
    <loc>https://brandhub.ma/services/business</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Blog -->
  <url>
    <loc>https://brandhub.ma/blog</loc>
    <lastmod>2024-12-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog Posts -->
  ${blogUrls}
  
  <!-- Contact -->
  <url>
    <loc>https://brandhub.ma/contact</loc>
    <lastmod>2024-12-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Terms -->
  <url>
    <loc>https://brandhub.ma/terms</loc>
    <lastmod>2024-10-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- Locations -->
  <url>
    <loc>https://brandhub.ma/maroc</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://brandhub.ma/espana</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <url>
    <loc>https://brandhub.ma/saudi-arabia</loc>
    <lastmod>2024-12-20</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
</urlset>`

    return new Response(sitemap, {
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
