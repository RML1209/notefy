"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const mounted = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  function toggleTheme() {
    const isDark = theme === "dark";
    setTheme(isDark ? "light" : "dark");
  }

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled
        aria-label="Change color theme"
        title="Change color theme"
        className="
          rounded-xl
          text-slate-700
          transition-colors
          hover:bg-blue-200
          dark:text-slate-200
          dark:hover:bg-blue-200
        "
      >
        <Sun className="h-5 w-5" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="
        rounded-xl
        text-slate-700
        transition-colors
        hover:bg-blue-200
        dark:text-slate-200
        dark:hover:bg-blue-200
      "
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
