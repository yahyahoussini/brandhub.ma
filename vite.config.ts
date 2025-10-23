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
          // Critical vendors - load first
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui';
            }
            if (id.includes('three')) {
              return 'vendor-three';
            }
            if (id.includes('@splinetool')) {
              return 'vendor-spline';
            }
            if (id.includes('@tsparticles')) {
              return 'vendor-particles';
            }
            // Other node_modules go to vendor
            return 'vendor';
          }
          
          // Route-based code splitting
          if (id.includes('src/pages/admin/')) {
            return 'admin';
          }
          if (id.includes('src/pages/Service')) {
            return 'services';
          }
          if (id.includes('src/pages/Location')) {
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
