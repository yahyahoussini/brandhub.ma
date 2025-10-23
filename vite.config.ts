import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Deduplicate Three.js to prevent multiple instances
    dedupe: ['three'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'three', 'lodash.debounce'],
    exclude: ['@splinetool/react-spline'],
    esbuildOptions: {
      // Handle CommonJS modules properly
      mainFields: ['module', 'main'],
    },
  },
  build: {
    sourcemap: false,  // Disable sourcemaps in production for smaller bundle size
    cssCodeSplit: true,
    assetsInlineLimit: 0,  // Prevents inlining assets as data URIs
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // React core - must be together
            if (id.includes('react/') || id.includes('react-dom/') || id.includes('scheduler/')) {
              return 'vendor-react';
            }
            // React Router
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // Radix UI components
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            // Three.js
            if (id.includes('three')) {
              return 'vendor-three';
            }
            // Spline
            if (id.includes('@splinetool') || id.includes('spline')) {
              return 'vendor-spline';
            }
            // Particles
            if (id.includes('@tsparticles')) {
              return 'vendor-particles';
            }
            // Tanstack Query
            if (id.includes('@tanstack')) {
              return 'vendor-query';
            }
            // Other vendors
            return 'vendor';
          }
          
          // Route-based code splitting
          if (id.includes('/src/pages/admin/')) {
            return 'admin';
          }
          if (id.includes('/src/pages/Service')) {
            return 'services';
          }
          if (id.includes('/src/pages/Location')) {
            return 'locations';
          }
        },
      },
    },
    minify: 'terser',  // Better compression than esbuild
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    target: 'es2020',  // Modern browsers for smaller code
    chunkSizeWarningLimit: 600,  // Stricter limits to keep bundles smaller
  },
}));
