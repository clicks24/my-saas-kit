"use client"

import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Toggle
      className="fixed bottom-3 right-3"
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme == "light" ? <Sun size={16} /> : <Moon size={16} />}
    </Toggle>
  );
}
