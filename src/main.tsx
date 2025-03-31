import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignInUrl="/tools"
      afterSignUpUrl="/tools"
      afterSignOutUrl="/"
      routerPush={(to) => window.location.assign(to)}
      routerReplace={(to) => window.location.replace(to)}
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary: 
            "bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors",
          card: "bg-zinc-900 border border-zinc-800",
          headerTitle: "text-white text-2xl font-bold",
          headerSubtitle: "text-zinc-400",
          socialButtonsBlockButton: 
            "border border-zinc-700 hover:bg-zinc-800 transition-colors",
          formFieldLabel: "text-zinc-300",
          formFieldInput: 
            "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500",
          footerActionLink: "text-purple-400 hover:text-purple-300",
          identityPreviewText: "text-zinc-300",
          identityPreviewEditButton: 
            "text-purple-400 hover:text-purple-300",
        },
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton",
          termsPageUrl: "https://your-terms-url.com",
          privacyPageUrl: "https://your-privacy-url.com",
        },
      }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>,
);
