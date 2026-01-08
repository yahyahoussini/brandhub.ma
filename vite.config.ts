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
        manualChunks: {
          // React ecosystem - keep together to avoid duplicates
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI components
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          // Heavy 3D libraries - separate for lazy loading
          'vendor-three': ['three'],
          'vendor-spline': ['@splinetool/react-spline'],
          'vendor-particles': ['@tsparticles/react', '@tsparticles/engine', '@tsparticles/slim'],
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
