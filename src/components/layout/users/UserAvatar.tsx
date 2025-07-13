"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-6 h-6 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-10 h-10 text-base",
};

export function UserAvatar({ name, image, size = "sm", className }: UserAvatarProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClass = sizeClasses[size];

  if (image) {
    return (
      <div className={cn(`relative ${sizeClass} rounded-full overflow-hidden`, className)}>
        <Image
          src={image}
          alt={`${name}'s avatar`}
          fill
          sizes={size === "sm" ? "24px" : size === "md" ? "32px" : "40px"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn(`${sizeClass} rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium`, className)}>
      {getInitials(name)}
    </div>
  );
}