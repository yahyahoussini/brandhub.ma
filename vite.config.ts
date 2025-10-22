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
    sourcemap: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          'vendor-three': ['three'],
          'vendor-spline': ['@splinetool/react-spline'],
          'vendor-particles': ['@tsparticles/react', '@tsparticles/engine', '@tsparticles/slim'],
        },
      },
    },
    minify: 'esbuild',
    target: 'es2015',
    chunkSizeWarningLimit: 1000,
  },
}));
