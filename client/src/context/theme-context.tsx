import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Check localStorage first
    const savedSettings = localStorage.getItem("app_settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        if (parsed.theme === "light" || parsed.theme === "dark") {
          // Apply theme immediately
          const root = document.documentElement;
          root.classList.remove("dark", "light");
          root.classList.add(parsed.theme);
          return parsed.theme;
        }
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    // Default to dark and apply it
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add("dark");
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove("dark", "light");
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Update localStorage
    const savedSettings = localStorage.getItem("app_settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        parsed.theme = theme;
        localStorage.setItem("app_settings", JSON.stringify(parsed));
      } catch (e) {
        console.error("Failed to update settings", e);
      }
    } else {
      // Create settings if they don't exist
      localStorage.setItem("app_settings", JSON.stringify({ theme }));
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

