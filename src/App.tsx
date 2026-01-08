import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { CanonicalLink } from "@/components/CanonicalLink";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AdminLayout } from "./components/admin/AdminLayout";
import { CookieConsent } from "@/components/CookieConsent";

// Lazy-loaded page components
const Index = lazy(() => import("./pages/Index"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Terms = lazy(() => import("./pages/Terms"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const ServiceProgramming = lazy(() => import("./pages/ServiceProgramming"));
const ServiceGraphics = lazy(() => import("./pages/ServiceGraphics"));
const ServiceContent = lazy(() => import("./pages/ServiceContent"));
const ServiceBusiness = lazy(() => import("./pages/ServiceBusiness"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const LocationMorocco = lazy(() => import("./pages/LocationMorocco"));
const LocationSpain = lazy(() => import("./pages/LocationSpain"));
const LocationSaudiArabia = lazy(() => import("./pages/LocationSaudiArabia"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy-loaded admin page components
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const SimpleBlogGenerator = lazy(() => import("./pages/admin/SimpleBlogGenerator"));
const QuickBlogGenerator = lazy(() => import("./pages/admin/QuickBlogGenerator"));
const AutoBlogGenerator = lazy(() => import("./pages/admin/AutoBlogGenerator"));
const AdminAnalytics = lazy(() => import("./pages/admin/AdminAnalytics"));
const AdminSEO = lazy(() => import("./pages/admin/AdminSEO"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminClients = lazy(() => import("./pages/admin/AdminClients"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const AdminServiceDetails = lazy(() => import("./pages/admin/AdminServiceDetails"));
const AdminInquiries = lazy(() => import("./pages/admin/AdminInquiries"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminApiKeys = lazy(() => import("./pages/admin/AdminApiKeys"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminRevenue = lazy(() => import("./pages/admin/AdminRevenue"));
const AdminMarketing = lazy(() => import("./pages/admin/AdminMarketing"));
const AdminEmail = lazy(() => import("./pages/admin/AdminEmail"));

const queryClient = new QueryClient();

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Sonner />
          <CookieConsent />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <CanonicalLink />
            <BreadcrumbSchema />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/services/programming" element={<ServiceProgramming />} />
                <Route path="/services/graphics" element={<ServiceGraphics />} />
                <Route path="/services/content" element={<ServiceContent />} />
                <Route path="/services/business" element={<ServiceBusiness />} />
                <Route path="/services/:category/:id" element={<ServiceDetail />} />
                <Route path="/maroc" element={<LocationMorocco />} />
                <Route path="/espana" element={<LocationSpain />} />
                <Route path="/saudi-arabia" element={<LocationSaudiArabia />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="blog" element={<AdminBlogEditor />} />
                  <Route path="blog/generate" element={<SimpleBlogGenerator />} />
                  <Route path="blog/quick-generate" element={<QuickBlogGenerator />} />
                  <Route path="blog/auto-generate" element={<AutoBlogGenerator />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="seo" element={<AdminSEO />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="clients" element={<AdminClients />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="services/:id" element={<AdminServiceDetails />} />
                  <Route path="inquiries" element={<AdminInquiries />} />
                  <Route path="testimonials" element={<AdminTestimonials />} />
                  <Route path="api-keys" element={<AdminApiKeys />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="revenue" element={<AdminRevenue />} />
                  <Route path="marketing" element={<AdminMarketing />} />
                  <Route path="email" element={<AdminEmail />} />
                </Route>

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
