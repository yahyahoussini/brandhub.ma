import { lazy, Suspense, useState, useEffect, useRef } from 'react';

const SplineScene = lazy(() => import('@/components/ui/splite').then(m => ({ default: m.SplineScene })));

interface LazySplineProps {
  scene: string;
  className?: string;
}

export const LazySpline = ({ scene, className }: LazySplineProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay to ensure initial page load is complete
          setTimeout(() => setShouldLoad(true), 100);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '50px' // Start loading slightly before element enters viewport
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {shouldLoad ? (
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center bg-muted/30 animate-pulse">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground text-sm">Chargement de la scène 3D...</p>
            </div>
          </div>
        }>
          <SplineScene scene={scene} className="w-full h-full" />
        </Suspense>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-muted/20 to-muted/40 animate-pulse rounded-lg flex items-center justify-center">
          <div className="text-muted-foreground/50">
            <svg className="w-16 h-16 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

