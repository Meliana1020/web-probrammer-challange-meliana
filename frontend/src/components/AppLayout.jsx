// AppLayout.jsx
import { useState, useEffect } from "react";
import useThemeStore from "@/store/useThemeStore";

export default function AppLayout({ children }) {
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="flex justify-end p-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded shadow-sm"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      <main>{children}</main>
    </div>
  );
}