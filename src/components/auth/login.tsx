"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/icons/google";
import { GitHubIcon } from "@/components/icons/github";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { data: session, isPending } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn.social({ provider: "google" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn.social({ provider: "github" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending) {
    return (
      <div
        className={cn(
          "min-h-screen bg-white flex items-center justify-center",
          className
        )}
        {...props}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div
        className={cn(
          "min-h-screen bg-white flex flex-col items-center justify-center",
          className
        )}
        {...props}
      >
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer">
              <span className="text-white font-bold text-sm">H</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <Avatar className="w-20 h-20 border border-gray-200">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-700 text-2xl font-semibold">
                  {session.user.name?.charAt(0) ||
                    session.user.email?.charAt(0) ||
                    "U"}
                </div>
              )}
            </Avatar>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Welcome back, {session.user.name || "User"}!
              </h2>
              <p className="text-gray-500">{session.user.email}</p>
            </div>
            <Button
              onClick={() => signOut()}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition-colors border border-gray-200"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "min-h-screen bg-white flex flex-col items-center justify-center p-4",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center cursor-pointer">
            <span className="text-white font-bold text-sm">H</span>
          </div>
        </div>

        <h1 className="text-center text-3xl font-bold text-black mb-10">
          Log in
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Social Login Buttons */}
        <div className="space-y-3 flex flex-col items-center">
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="max-w-xs sm:max-w-sm bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border border-gray-300 shadow-sm"
          >
            <GoogleIcon className="w-5 h-5" />
            Continue with Google
          </Button>

          <Button
            onClick={handleGitHubSignIn}
            disabled={isLoading}
            className="max-w-xs sm:max-w-sm bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border border-gray-300 shadow-sm"
          >
            <GitHubIcon className="w-5 h-5" />
            Continue with GitHub
          </Button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
          </div>
        )}
        
        {/* Privacy Disclaimer */}
        <div className="mt-10 text-center text-xs text-gray-500">
          <p>
            By clicking "Continue with Google" or "Continue with GitHub", you agree to our{" "}
            <a href="/terms" className="text-blue-600 hover:underline cursor-pointer">Terms of Conditions</a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
