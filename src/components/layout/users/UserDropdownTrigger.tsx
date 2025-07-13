"use client";

import { ChevronDown } from "lucide-react";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import type { DisplayUser } from "@/lib/user-utils";

interface UserDropdownTriggerProps {
  user: DisplayUser;
}

export function UserDropdownTrigger({ user }: UserDropdownTriggerProps) {
  return (
    <DropdownMenuTrigger asChild>
      <button className="flex items-center gap-2 p-1.5 rounded-md hover:bg-muted/50 transition-all duration-200">
        {/* User Avatar */}
        <UserAvatar name={user.name} image={user.image} size="sm" />
        
        {/* Username */}
        <span className="text-sm hidden sm:inline text-primary">{user.name}</span>
        
        {/* Dropdown Arrow */}
        <ChevronDown className="w-3 h-3 text-primary transition-transform" />
      </button>
    </DropdownMenuTrigger>
  );
}