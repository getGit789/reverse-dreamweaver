import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ToolSelection from "./pages/ToolSelection";
import TextReverserPage from "./pages/TextReverserPage";
import ImageReverserPage from "./pages/ImageReverserPage";
import ThoughtReverserPage from "./pages/ThoughtReverserPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/tools"
            element={
              <>
                <SignedIn>
                  <ToolSelection />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn redirectUrl="/tools" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/text-reverser"
            element={
              <>
                <SignedIn>
                  <TextReverserPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn redirectUrl="/tools" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/image-reverser"
            element={
              <>
                <SignedIn>
                  <ImageReverserPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn redirectUrl="/tools" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/thought-reverser"
            element={
              <>
                <SignedIn>
                  <ThoughtReverserPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn redirectUrl="/tools" />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <SignedIn>
                  <AdminPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn redirectUrl="/tools" />
                </SignedOut>
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
