"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// This component applies the selected theme class to the html element
export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Get all theme classes
    const themeClasses = [
      "halt",
      "amber",
      "caffiene",
      "nature",
      "notebook",
      "claude",
      "twitter",
      "mono",
    ];

    // Remove all theme classes first
    themeClasses.forEach((themeClass) => {
      document.documentElement.classList.remove(themeClass);
    });

    // Add the selected theme class
    if (theme) {
      // console.log("Applying theme class:", theme);
      document.documentElement.classList.add(theme);

      // Force a re-render by setting the theme again
      setTimeout(() => {
        setTheme(theme);
      }, 0);
    }

    // Log the current classes on the html element for debugging
    // console.log("Current HTML classes:", document.documentElement.className);
    // console.log("Current theme:", theme);
    // console.log("Resolved theme:", resolvedTheme);
  }, [theme, resolvedTheme, mounted, setTheme]);

  if (!mounted) return null;

  return null;
}
