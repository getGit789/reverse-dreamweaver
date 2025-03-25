
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="w-full max-w-md p-6">
        <div className="mb-8 text-center">
          <div className="inline-block p-2 rounded-full bg-white/20 mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              N
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gradient bg-gradient-to-r from-purple-600 to-indigo-600">
            NunoReverse
          </h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <ClerkSignIn 
            routing="path" 
            path="/sign-in" 
            signUpUrl="/sign-up"
            redirectUrl="/"
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "shadow-none p-6",
                headerTitle: "text-xl font-bold text-center text-gray-800",
                headerSubtitle: "text-center text-gray-600",
                formButtonPrimary: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90",
                formField: "mb-2",
                footer: "hidden",
              }
            }}
          />
        </div>
        
        <div className="mt-6 text-center">
          <button
            className="text-purple-600 hover:text-purple-700 font-medium"
            onClick={() => navigate("/")}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
