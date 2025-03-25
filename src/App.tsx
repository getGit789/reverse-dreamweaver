
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TextReverserPage from "./pages/TextReverserPage";
import ImageReverserPage from "./pages/ImageReverserPage";
import ThoughtReverserPage from "./pages/ThoughtReverserPage";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route 
            path="/text-reverser" 
            element={
              <ProtectedRoute>
                <TextReverserPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/image-reverser" 
            element={
              <ProtectedRoute>
                <ImageReverserPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/thought-reverser" 
            element={
              <ProtectedRoute>
                <ThoughtReverserPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
