import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignedIn, SignedOut, RedirectToSignIn, SignInButton, UserButton } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TextReverserPage from "./pages/TextReverserPage";
import ImageReverserPage from "./pages/ImageReverserPage";
import ThoughtReverserPage from "./pages/ThoughtReverserPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <header className="fixed top-4 right-[200px] z-[1000] hidden md:block">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  userButtonAvatarBox: "cursor-pointer",
                  userButtonTrigger: "cursor-pointer"
                }
              }}
            />
          </SignedIn>
        </header>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/text-reverser"
            element={
              <>
                <SignedIn>
                  <TextReverserPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
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
                  <RedirectToSignIn />
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
                  <RedirectToSignIn />
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
