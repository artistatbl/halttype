"use client";

import { useRouter } from "next/navigation";
import { UserIcon } from "lucide-react";

interface SignInButtonProps {
  className?: string;
}

export function SignInButton({ className }: SignInButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/sign")}
      className={`flex items-center gap-2 p-1.5 rounded-md hover:bg-muted/50 transition-all duration-200 ${className || ""}`}
    >
      <UserIcon className="w-5 h-5 text-primary" />
      <span className="text-sm hidden sm:inline text-primary">Sign In</span>
    </button>
  );
}