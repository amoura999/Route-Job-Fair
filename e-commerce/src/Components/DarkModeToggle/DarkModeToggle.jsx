import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

export default function DarkModeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative group p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="relative z-10 flex items-center gap-2">
        {isDark ? (
          <>
            <Sun className="w-4 h-4 text-yellow-500" />
            <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">Light</span>
          </>
        ) : (
          <>
            <Moon className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">Dark</span>
          </>
        )}
      </div>
      
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
}
