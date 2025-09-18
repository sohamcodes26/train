import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RailwayLayout } from "@/components/RailwayLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Simulation from "./pages/Simulation";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing page without sidebar */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard routes with sidebar layout */}
          <Route path="/dashboard" element={
            <RailwayLayout>
              <Dashboard />
            </RailwayLayout>
          } />
          <Route path="/simulation" element={
            <RailwayLayout>
              <Simulation />
            </RailwayLayout>
          } />
          <Route path="/reports" element={
            <RailwayLayout>
              <Reports />
            </RailwayLayout>
          } />
          <Route path="/settings" element={
            <RailwayLayout>
              <Settings />
            </RailwayLayout>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
