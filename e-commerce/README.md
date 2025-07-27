# 🛍️ Products Gallery - E-commerce Web Application

A fully functional, responsive e-commerce web application built with React and Tailwind CSS, featuring product browsing, filtering, sorting, and dark mode support.

## 🎯 Project Overview

This application provides users with a seamless e-commerce experience, allowing them to browse products from the Fake Store API, filter by categories, search products, and view detailed product information. The app features a modern, mobile-first design with dark mode support.

## ✨ Features

### 🛍️ Product Browsing
- **Product Cards**: Display product name, image, price, rating, and category
- **Responsive Grid**: Mobile-first design that adapts to all screen sizes
- **Loading States**: Beautiful loading animations and skeleton screens
- **Error Handling**: Graceful error states with fallback UI

### 🔍 Filtering & Sorting
- **Search Functionality**: Real-time search by product name (case-insensitive)
- **Category Filtering**: Filter products by category
- **Sorting Options**:
  - Price: Low to High / High to Low
  - Name: A-Z alphabetical sorting

### 📄 Product Details
- **Dynamic Routing**: `/products/:slug` for individual product pages using slugify for URL-friendly product titles
- **Complete Information**: Name, description, image, price, category, rating
- **Breadcrumb Navigation**: User-friendly navigation path
- **Responsive Layout**: Optimized for all devices

### 🌙 Dark Mode
- **Theme Toggle**: Switch between light and dark themes
- **System Preference**: Automatically detects user's system theme
- **Persistent Storage**: Remembers user's theme preference
- **Smooth Transitions**: Beautiful theme switching animations

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive grid layouts
- **Desktop Experience**: Enhanced layouts for larger screens
- **Touch-Friendly**: Optimized for touch interactions


### Light Mode
- Home page with product grid
- Product details with full information
- Category browsing interface
- Search and filter functionality

### Dark Mode
- Elegant dark theme throughout the app
- Consistent color scheme
- Enhanced readability in low-light conditions

## 🧱 Tech Stack

### Frontend Framework
- **React 18+** - Modern React with hooks and functional components
- **React Router DOM** - Client-side routing and navigation

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **Custom CSS** - Additional styling and animations

### State Management
- **React Context API** - Global state management
- **Custom Hooks** - Reusable logic and state

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing


## 📁 Project Structure

```
e-commerce/
├── src/
│   ├── Components/
│   │   ├── Context/
│   │   │   ├── ThemeContext.jsx    # Theme management
│   │   │   └── AppContext.jsx      # General app state
│   │   ├── Layout/
│   │   │   └── Layout.jsx          # Main layout component
│   │   ├── Home/
│   │   │   └── Home.jsx            # Home page
│   │   ├── Categories/
│   │   │   └── Categories.jsx      # Category browsing
│   │   ├── Products/
│   │   │   └── Products.jsx        # Product grid
│   │   ├── ProductDetails/
│   │   │   └── ProductDetails.jsx  # Product details page
│   │   ├── NotFound/
│   │   │   └── NotFound.jsx        # 404 page
│   │   ├── DarkModeToggle/
│   │   │   └── DarkModeToggle.jsx  # Theme toggle
│   │   └── Footer/
│   │       └── Footer.jsx          # Footer component
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # App entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── package.json                    # Dependencies
├── tailwind.config.js             # Tailwind configuration
└── README.md                      # Project documentation
```
## 🔧 API Integration

### Fake Store API
- **Endpoint**: `https://fakestoreapi.com/products`
- **Error Handling**: Graceful fallbacks for API failures
- **Loading States**: User feedback during data fetching

### Data Structure
```javascript
{
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

