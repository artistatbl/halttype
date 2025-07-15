"use client";

import { useTheme } from "./theme-provider";
import { useEffect } from "react";
import { applyThemeClass } from "./utils";

export function ThemeSwitcher() {
  const { theme } = useTheme();

  useEffect(() => {
    if (theme) {
      applyThemeClass(theme);
    }
  }, [theme]);

  return null;
}
