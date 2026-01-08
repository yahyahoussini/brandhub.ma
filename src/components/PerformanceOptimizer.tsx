import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export const PerformanceOptimizer = () => {
  useEffect(() => {
    const metrics: PerformanceMetrics = {};

    // Prefetch critical routes on idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const routes = ['/blog', '/services/programming', '/contact'];
        routes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
      });
    }

    // Enhanced performance monitoring
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry: any = entries[entries.length - 1];
          metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
          
          // Log performance metrics in development
          if (import.meta.env.DEV) {
            console.log('LCP:', metrics.lcp);
          }
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
              if (import.meta.env.DEV) {
                console.log('FCP:', metrics.fcp);
              }
            }
          });
        });
        fcpObserver.observe({ type: 'paint', buffered: true });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            metrics.fid = entry.processingStart - entry.startTime;
            if (import.meta.env.DEV) {
              console.log('FID:', metrics.fid);
            }
          });
        });
        fidObserver.observe({ type: 'first-input', buffered: true });

        // Cumulative Layout Shift (CLS)
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
              metrics.cls = clsScore;
              if (import.meta.env.DEV) {
                console.log('CLS:', metrics.cls);
              }
            }
          });
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Time to First Byte (TTFB)
        const navigationObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            metrics.ttfb = entry.responseStart - entry.requestStart;
            if (import.meta.env.DEV) {
              console.log('TTFB:', metrics.ttfb);
            }
          });
        });
        navigationObserver.observe({ type: 'navigation', buffered: true });

      } catch (e) {
        console.warn('PerformanceObserver not fully supported');
      }
    }

    // Preconnect to critical third-party origins on interaction
    const preconnectOnInteraction = () => {
      const origins = [
        'https://oxiyfnlhalptsdydlbmz.supabase.co',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://prod.spline.design',
        'https://cdn.jsdelivr.net'
      ];
      
      origins.forEach(origin => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = origin;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Trigger preconnect on first user interaction
    const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
    const handler = () => {
      preconnectOnInteraction();
      events.forEach(event => document.removeEventListener(event, handler));
    };
    events.forEach(event => document.addEventListener(event, handler, { passive: true, once: true }));

    // Report metrics on page unload (in production)
    const reportMetrics = () => {
      if (!import.meta.env.DEV && Object.keys(metrics).length > 0) {
        // You could send this to your analytics service
        // Example: navigator.sendBeacon('/api/metrics', JSON.stringify(metrics));
        console.log('Performance Metrics:', metrics);
      }
    };

    window.addEventListener('beforeunload', reportMetrics);
    
    return () => {
      events.forEach(event => document.removeEventListener(event, handler));
      window.removeEventListener('beforeunload', reportMetrics);
    };
  }, []);

  return null;
};