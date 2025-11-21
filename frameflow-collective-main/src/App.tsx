import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Create from "./pages/Create";
import Learn from "./pages/Learn";
import Community from "./pages/Community";
import SignIn from "./pages/SignIn";
import Join from "./pages/Join";
import Profile from "./pages/Profile";
import Portfolio from "./pages/Portfolio";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/create" element={<Create />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/community" element={<Community />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/join" element={<Join />} />
              <Route path="/creator/profile" element={<Profile />} />
              <Route path="/creator/portfolio" element={<Portfolio />} />
              <Route path="/creator/analytics" element={<Analytics />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
