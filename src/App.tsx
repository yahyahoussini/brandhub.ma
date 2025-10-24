import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CanonicalLink } from "@/components/CanonicalLink";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ServiceProgramming from "./pages/ServiceProgramming";
import ServiceGraphics from "./pages/ServiceGraphics";
import ServiceContent from "./pages/ServiceContent";
import ServiceBusiness from "./pages/ServiceBusiness";
import ServiceDetail from "./pages/ServiceDetail";
import LocationMorocco from "./pages/LocationMorocco";
import LocationSpain from "./pages/LocationSpain";
import LocationSaudiArabia from "./pages/LocationSaudiArabia";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import SimpleBlogGenerator from "./pages/admin/SimpleBlogGenerator";
import QuickBlogGenerator from "./pages/admin/QuickBlogGenerator";
import AutoBlogGenerator from "./pages/admin/AutoBlogGenerator";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSEO from "./pages/admin/AdminSEO";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminClients from "./pages/admin/AdminClients";
import AdminServices from "./pages/admin/AdminServices";
import AdminServiceDetails from "./pages/admin/AdminServiceDetails";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminApiKeys from "./pages/admin/AdminApiKeys";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminRevenue from "./pages/admin/AdminRevenue";
import AdminMarketing from "./pages/admin/AdminMarketing";
import AdminEmail from "./pages/admin/AdminEmail";
import NotFound from "./pages/NotFound";
import { CookieConsent } from "@/components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
      </BrowserRouter>
      </ErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
