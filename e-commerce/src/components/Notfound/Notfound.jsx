import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-gray-200 dark:text-gray-700">404</div>
          <div className="text-6xl font-bold text-blue-600 dark:text-blue-400 -mt-8">404</div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Page Not Found
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Go Home
          </Link>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Or try one of these pages:
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/products"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
