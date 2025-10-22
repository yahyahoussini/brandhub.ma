'use client'

import { Suspense, lazy, useCallback } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  // Optimize render performance
  const onLoad = useCallback((splineApp: any) => {
    // Set higher quality for smoother interactions
    if (splineApp) {
      splineApp.setQuality?.(1) // 0-1, where 1 is highest quality
    }
  }, [])

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={onLoad}
        // Performance optimizations
        renderOnDemand={false} // Keep rendering for smooth interaction
        style={{ pointerEvents: 'auto' }} // Ensure pointer events work smoothly
      />
    </Suspense>
  )
}
