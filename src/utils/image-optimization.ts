// Image optimization utilities for better Core Web Vitals

interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export class ImageOptimizer {
  private static instance: ImageOptimizer;
  
  static getInstance(): ImageOptimizer {
    if (!ImageOptimizer.instance) {
      ImageOptimizer.instance = new ImageOptimizer();
    }
    return ImageOptimizer.instance;
  }

  // Generate optimized image URL with CDN
  optimizeUrl(url: string, options: ImageOptimizationOptions = {}): string {
    if (!url || url.startsWith('data:') || url.startsWith('blob:')) {
      return url;
    }

    const { quality = 80, format = 'auto' } = options;
    
    // If it's an Unsplash image, add optimization parameters
    if (url.includes('unsplash.com')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}fm=${format}&q=${quality}&auto=format&fit=crop&w=800&h=600`;
    }
    
    // If it's a local image, return as is (Vite handles optimization)
    return url;
  }

  // Generate responsive image sources
  generateSrcSet(baseUrl: string, sizes: number[] = [400, 800, 1200]): string {
    return sizes.map(size => {
      if (baseUrl.includes('unsplash.com')) {
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}w=${size}&auto=format ${size}w`;
      }
      return `${baseUrl} ${size}w`;
    }).join(', ');
  }

  // Check if browser supports modern formats
  supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('webp') > 0;
  }

  supportsAVIF(): boolean {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('avif') > 0;
  }

  // Get optimal format for current browser
  getOptimalFormat(): string {
    if (this.supportsAVIF()) return 'avif';
    if (this.supportsWebP()) return 'webp';
    return 'jpg';
  }

  // Preload critical images
  preloadCriticalImages(urls: string[]): void {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = this.optimizeUrl(url, { format: 'webp', quality: 85 });
      document.head.appendChild(link);
    });
  }

  // Lazy load images with intersection observer
  setupLazyLoading(): void {
    if (!('IntersectionObserver' in window)) {
      return; // Fallback for older browsers
    }

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          
          if (src) {
            img.src = this.optimizeUrl(src);
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Enhanced Lazy Image Component
export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes = "100vw",
  quality = 80
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}) => {
  const optimizer = ImageOptimizer.getInstance();
  const optimizedSrc = optimizer.optimizeUrl(src, { quality, format: 'auto' });
  const srcSet = optimizer.generateSrcSet(src, [400, 800, 1200]);

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : undefined 
      }}
    />
  );
};

// Critical resource hints for Morocco
export const criticalResourceHints = [
  // Preconnect to critical domains
  { rel: 'preconnect', href: 'https://oxiyfnlhalptsdydlbmz.supabase.co', crossOrigin: true },
  { rel: 'preconnect', href: 'https://prod.spline.design', crossOrigin: true },
  { rel: 'preconnect', href: 'https://images.unsplash.com', crossOrigin: true },
  
  // DNS prefetch for less critical domains
  { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
  { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
  { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
  
  // Preload critical assets
  { rel: 'preload', href: '/favicone.png', as: 'image' },
];

// Service worker registration with update handling
export const registerServiceWorker = (): void => {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available, notify user
                  if (confirm('Une nouvelle version est disponible. Actualiser?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch(error => {
          console.log('SW registration failed: ', error);
        });
    });
  }
};
