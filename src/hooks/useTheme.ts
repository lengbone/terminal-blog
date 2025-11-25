"use client";

import { useState, useEffect } from "react";

export type Theme = "dark" | "light" | "green" | "blue" | "purple";

const themes: Record<Theme, { name: string; description: string }> = {
  dark: { name: "Dark", description: "Default dark theme" },
  light: { name: "Light", description: "Light theme" },
  green: { name: "Matrix", description: "Matrix green theme" },
  blue: { name: "Ocean", description: "Ocean blue theme" },
  purple: { name: "Cyberpunk", description: "Cyberpunk purple theme" },
};

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const changeTheme = (newTheme: Theme) => {
    if (themes[newTheme]) {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      return true;
    }
    return false;
  };

  const getThemeList = () => {
    return Object.entries(themes).map(([key, value]) => ({
      key: key as Theme,
      ...value,
    }));
  };

  return {
    theme,
    changeTheme,
    getThemeList,
    themes,
    mounted,
  };
}

export { themes };
