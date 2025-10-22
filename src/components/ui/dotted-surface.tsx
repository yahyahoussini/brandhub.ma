'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { theme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = React.useState(true);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points[];
    animationId: number;
    count: number;
  } | null>(null);

  // Check WebGL support
  const isWebGLAvailable = () => {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!context;
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    if (!containerRef.current || !isWebGLAvailable()) {
      setWebGLSupported(false);
      return;
    }

    let handleResize: (() => void) | null = null;

    try {
      const SEPARATION = 150;
      const AMOUNTX = 40;
      const AMOUNTY = 60;

      // Scene setup
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xffffff, 2000, 10000);

      const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000,
      );
      camera.position.set(0, 355, 1220);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(scene.fog.color, 0);

      containerRef.current.appendChild(renderer.domElement);

      // Create particles
      const particles: THREE.Points[] = [];
      const positions: number[] = [];
      const colors: number[] = [];

      // Create geometry for all particles
      const geometry = new THREE.BufferGeometry();

      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
          const y = 0;
          const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

          positions.push(x, y, z);
          if (theme === 'dark') {
            colors.push(200, 200, 200);
          } else {
            colors.push(0, 0, 0);
          }
        }
      }

      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 8,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      let count = 0;
      let animationId: number;

      const animate = () => {
        animationId = requestAnimationFrame(animate);

        const positionAttribute = geometry.attributes.position;
        const positions = positionAttribute.array as Float32Array;

        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            const index = i * 3;
            positions[index + 1] =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50;
            i++;
          }
        }

        positionAttribute.needsUpdate = true;
        renderer.render(scene, camera);
        count += 0.1;
      };

      handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      animate();

      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles: [points],
        animationId,
        count,
      };
    } catch (error) {
      console.warn('WebGL initialization failed, falling back to CSS animation:', error);
      setWebGLSupported(false);
      return;
    }

    return () => {
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);

        sceneRef.current.scene.traverse((object) => {
          if (object instanceof THREE.Points) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });

        sceneRef.current.renderer.dispose();

        if (containerRef.current && sceneRef.current.renderer.domElement) {
          containerRef.current.removeChild(
            sceneRef.current.renderer.domElement,
          );
        }
      }
    };
  }, [theme]);

  // Fallback CSS animation when WebGL is not available
  if (!webGLSupported) {
    return (
      <div
        className={cn('pointer-events-none fixed inset-0 -z-10', className)}
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at 50% 50%, rgba(91, 97, 235, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 50% 50%, rgba(17, 17, 139, 0.05) 0%, transparent 50%)',
          backgroundSize: '100% 100%',
          animation: 'pulse 4s ease-in-out infinite',
        }}
        {...props}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none fixed inset-0 -z-10', className)}
      {...props}
    />
  );
}
