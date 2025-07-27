import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow sticky inset-x-0 top-0 z-50 transition-colors">
      <nav className="flex items-center justify-between px-6 py-3 lg:px-12" aria-label="Global">
        {/* Logo */}
        <Link to={"home"} className="flex items-center gap-2">
          <span className="block w-8 h-8 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full" />
          <span className="font-bold text-xl text-gray-800 dark:text-white">MyStore</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex lg:gap-x-6 capitalize items-center">
          <NavLink
            to={"home"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-blue-600 dark:text-blue-400"
                : "font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-blue-500 dark:hover:text-blue-300"
            }
          >
            home
          </NavLink>
          <NavLink
            to={"categories"}
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-blue-600 dark:text-blue-400"
                : "font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-blue-500 dark:hover:text-blue-300"
            }
          >
            categories
          </NavLink>
          <DarkModeToggle />
        </div>

        {/* Mobile menu button */}
        <div onClick={() => setIsOpen(true)} className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={isOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
        {/* Background overlay */}
        <div className="sticky inset-0 z-40 bg-black/30" onClick={() => setIsOpen(false)} />

        <div className="sticky inset-y-0 right-0 z-50 w-4/5 max-w-xs overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 shadow-lg rounded-l-xl transition-transform">
          <div className="flex items-center justify-between mb-6">
            <Link to={"home"} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <span className="block w-8 h-8 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full" />
              <span className="font-bold text-lg text-gray-800 dark:text-white">MyStore</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="-m-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2.5 text-gray-700 dark:text-gray-200 transition"
            >
              <span className="sr-only">Close menu</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <NavLink
              to={"home"}
              className={({ isActive }) =>
                isActive
                  ? "block rounded-lg px-4 py-2 font-semibold text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900"
                  : "block rounded-lg px-4 py-2 font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              }
              onClick={() => setIsOpen(false)}
            >
              home
            </NavLink>
            <NavLink
              to={"categories"}
              className={({ isActive }) =>
                isActive
                  ? "block rounded-lg px-4 py-2 font-semibold text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900"
                  : "block rounded-lg px-4 py-2 font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              }
              onClick={() => setIsOpen(false)}
            >
              categories
            </NavLink>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
