"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "@/lib/auth-client";
import {
  UserIcon,
  ChevronDown,
  User,
  Settings,
  Cog,
  LogOut,
} from "lucide-react";

interface UserDropdownProps {
  className?: string;
}

export function UserDropdown({ className }: UserDropdownProps) {
  const { data: session, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get user info from session - only first name
  const displayUser = session?.user
    ? {
        name: (
          session.user.name ||
          session.user.email?.split("@")[0] ||
          "User"
        ).split(" ")[0],
        email: session.user.email || "",
        image: session.user.image || "",
      }
    : {
        name: "Guest",
        email: "",
        image: "",
      };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {session ? (
        /* User Avatar Button when signed in */
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-1.5 rounded-md hover:bg-muted/50 transition-all duration-200"
        >
          {/* User Avatar or Initials Circle */}
          {displayUser.image ? (
            <div className="relative w-6 h-6 rounded-full overflow-hidden">
              <Image
                src={displayUser.image}
                alt={`${displayUser.name}'s avatar`}
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
              {getInitials(displayUser.name || "")}
            </div>
          )}

          {/* Username */}
          <span className="text-sm hidden sm:inline text-accent">{displayUser.name}</span>

          {/* Dropdown Arrow */}
          <ChevronDown
            className={cn(
              "w-3 h-3 text-muted-foreground transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>
      ) : (
        /* User Icon Button when signed out */
        <button
          onClick={() => router.push("/sign")}
          className="flex items-center gap-2 p-1.5 rounded-md hover:bg-muted/50 transition-all duration-200"
        >
          <UserIcon className="w-5 h-5 text-accent" />
          <span className="text-sm hidden sm:inline text-accent">Sign In</span>
        </button>
      )}

      {/* Dropdown Menu - only show when signed in and dropdown is open */}
      {session && isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded shadow-lg py-1 z-50 text-xs">
          {/* User Info */}
          <div className="px-3 py-2 border-b border-border">
            <p className="font-medium text-foreground">{displayUser.name}</p>
            <p className="text-muted-foreground text-xs">{displayUser.email}</p>
          </div>

          {/* Navigation Links */}
          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center gap-2 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-3.5 h-3.5" />
              Profile
            </Link>

            <Link
              href="/account"
              className="flex items-center gap-2 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Cog className="w-3.5 h-3.5" />
              Account Settings
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-2 px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-3.5 h-3.5" />
              User Settings
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-0.5"></div>

          {/* Sign Out */}
          <button
            className="flex items-center gap-2 px-3 py-1.5 text-destructive hover:text-destructive-foreground hover:bg-muted/50 transition-all duration-200 w-full text-left"
            onClick={() => {
              setIsOpen(false);
              signOut();
            }}
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
