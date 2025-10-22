'use client'

import { lazy, Suspense } from "react";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"

// Lazy load the heavy Spline component
const SplineScene = lazy(() => import("@/components/ui/splite").then(m => ({ default: m.SplineScene })));
 
export function SplineSceneBasic() {
  return (
    <section aria-label="Hero section avec scène 3D interactive">
      <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
          aria-hidden="true"
        />
        
        <div className="flex h-full">
          {/* Left content */}
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
              Agence Création Site Web & Branding au Maroc
            </h1>
            <p className="mt-4 text-neutral-300 max-w-lg text-lg">
              BrandHub.ma – Solutions Web sur-mesure à Casablanca, Marrakech & Rabat
            </p>
          </div>

          {/* Right content - Lazy loaded with proper fallback */}
          <div 
            className="flex-1 relative" 
            role="img" 
            aria-label="Scène 3D interactive représentant notre expertise digitale"
            style={{ 
              transform: 'translate3d(0, 0, 0)', // Force GPU acceleration
              willChange: 'transform' // Hint to browser for optimization
            }}
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center" role="status">
                <span className="animate-pulse text-neutral-400" aria-live="polite">Chargement de la scène 3D...</span>
              </div>
            }>
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </Suspense>
          </div>
        </div>
      </Card>
    </section>
  )
}
