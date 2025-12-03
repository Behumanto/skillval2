"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ThemePreset = "skillval" | "samenai";

type ThemeContextValue = {
  theme: ThemePreset;
  setTheme: (theme: ThemePreset) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "skillval.theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreset>("skillval");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemePreset | null;
    if (stored === "skillval" || stored === "samenai") {
      setThemeState(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.classList.remove("theme-skillval", "theme-samenai");
    document.body.classList.add(`theme-${theme}`);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  const setTheme = useCallback((next: ThemePreset) => {
    setThemeState(next);
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
