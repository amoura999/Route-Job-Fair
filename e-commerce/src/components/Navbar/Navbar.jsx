import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow fixed inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between px-6 py-3 lg:px-12" aria-label="Global">
        {/* Logo */}
        <Link to={'home'} className="flex items-center gap-2">
          <span className="block w-8 h-8 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full" />
          <span className="font-bold text-xl text-gray-800">MyStore</span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden lg:flex lg:gap-x-6 capitalize">
          <NavLink to={'home'} className={({ isActive }) => isActive ? 'font-semibold text-blue-600' : 'font-medium text-gray-900'}>home</NavLink>
          <NavLink to={'categories'} className={({ isActive }) => isActive ? 'font-semibold text-blue-600' : 'font-medium text-gray-900'}>categories</NavLink>
        </div>
        {/* Mobile menu button */}
        <div onClick={() => setIsOpen(true)} className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-transparent hover:bg-gray-100">
            <span className="sr-only">Open main menu</span>
            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile menu, show/hide based on menu open state. */}
      <div className={isOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setIsOpen(false)} />
        <div className="fixed inset-y-0 right-0 z-50 w-4/5 max-w-xs overflow-y-auto bg-white px-6 py-6 shadow-lg rounded-l-xl">
          <div className="flex items-center justify-between mb-6">
            <Link to={'home'} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <span className="block w-8 h-8 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full" />
              <span className="font-bold text-lg text-gray-800">MyStore</span>
            </Link>
            <button onClick={() => setIsOpen(false)} type="button" className="-m-2.5 bg-transparent hover:bg-gray-100 rounded-md p-2.5 text-gray-700">
              <span className="sr-only">Close menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            <NavLink to={'home'} className={({ isActive }) => isActive ? 'block rounded-lg px-4 py-2 font-semibold text-blue-600 bg-blue-50' : 'block rounded-lg px-4 py-2 font-medium text-gray-900 hover:bg-gray-50'} onClick={() => setIsOpen(false)}>home</NavLink>
            <NavLink to={'cart'} className={({ isActive }) => isActive ? 'block rounded-lg px-4 py-2 font-semibold text-blue-600 bg-blue-50' : 'block rounded-lg px-4 py-2 font-medium text-gray-900 hover:bg-gray-50'} onClick={() => setIsOpen(false)}>cart</NavLink>
            <NavLink to={'categories'} className={({ isActive }) => isActive ? 'block rounded-lg px-4 py-2 font-semibold text-blue-600 bg-blue-50' : 'block rounded-lg px-4 py-2 font-medium text-gray-900 hover:bg-gray-50'} onClick={() => setIsOpen(false)}>categories</NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}
