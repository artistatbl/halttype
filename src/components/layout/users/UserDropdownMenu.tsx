"use client";

import Link from "next/link";
import { signOut } from "@/lib/auth-client";
import { User, Settings, Cog, LogOut } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { DisplayUser } from "@/lib/user-utils";

interface UserDropdownMenuProps {
  user: DisplayUser;
}

interface MenuItemConfig {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const menuItems: MenuItemConfig[] = [
  {
    href: "/profile",
    icon: User,
    label: "Profile",
  },
  {
    href: "/account",
    icon: Cog,
    label: "Account Settings",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "User Settings",
  },
];

export function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  return (
    <DropdownMenuContent align="end" className="w-48">
      {/* User Info */}
      <DropdownMenuLabel className="font-normal">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium leading-none">{user.name}</p>
          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
        </div>
      </DropdownMenuLabel>
      
      <DropdownMenuSeparator />
      
      {/* Navigation Links */}
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href} className="cursor-pointer">
              <IconComponent className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </DropdownMenuItem>
        );
      })}
      
      <DropdownMenuSeparator />
      
      {/* Sign Out */}
      <DropdownMenuItem
        variant="destructive"
        onClick={() => signOut()}
        className="cursor-pointer"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}