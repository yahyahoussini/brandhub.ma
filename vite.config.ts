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
  build: {
    sourcemap: mode === 'development',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
          'vendor-particles': ['@tsparticles/react', '@tsparticles/slim', '@tsparticles/engine'],
          'vendor-animation': ['framer-motion'],
        },
      },
    },
    minify: 'esbuild',
    target: 'es2020',
    chunkSizeWarningLimit: 500,
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'three'
    ],
    exclude: [
      '@splinetool/react-spline',
      '@tsparticles/react'
    ]
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'lodash.debounce': 'lodash-es/debounce'
    },
    dedupe: ['three', 'react', 'react-dom']
  },
  ssr: {
    noExternal: ['@splinetool/react-spline', '@splinetool/runtime']
  },
}));
