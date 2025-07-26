
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')        // Remove all non-word chars
    .replace(/--+/g, '-')           // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
        const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtering and sorting logic
  const filteredProducts = products
    .filter(product =>
      (!category || product.category === category) &&
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'price-low-high') return a.price - b.price;
      if (sort === 'price-high-low') return b.price - a.price;
      if (sort === 'name-az') return a.title.localeCompare(b.title);
      return 0;
    });

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold mb-2 md:mb-0">Products</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64 transition-shadow shadow-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-48 transition-shadow shadow-sm"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-az">Name: A–Z</option>
          </select>
          <select
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 w-full sm:w-48 transition-shadow shadow-sm"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${slugify(product.title)}`}
            className="no-underline"
          >
            <div className="relative bg-gradient-to-br from-blue-100 via-white to-pink-100 rounded-2xl shadow-xl p-5 flex flex-col items-center border border-gray-100 hover:border-blue-400 cursor-pointer overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-300 opacity-70 group-hover:opacity-100 transition-all duration-300" />
              <img
                src={product.image}
                alt={product.title}
                className="h-32 w-32 object-contain mb-4 rounded-full bg-white shadow-md border-2 border-blue-100 group-hover:border-blue-400 transition-all duration-300"
              />
              <h3 className="text-lg font-bold text-center line-clamp-2 mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 drop-shadow-sm">
                {product.title}
              </h3>
              <span className="text-pink-600 font-extrabold text-xl mb-2 drop-shadow">
                ${product.price}
              </span>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-sm font-semibold text-gray-700">
                  {product.rating?.rate ?? 'N/A'}
                </span>
                <span className="text-gray-400 text-xs">
                  ({product.rating?.count ?? 0})
                </span>
              </div>
              <span className="text-xs text-gray-500 italic mt-1">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-pink-200 via-blue-200 to-yellow-100 opacity-60 group-hover:opacity-90 transition-all duration-300 rounded-b-2xl" />
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 mt-12">No products found.</div>
      )}
    </div>
  );
}
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// function slugify(text) {
//   return text
//     .toString()
//     .toLowerCase()
//     .replace(/\s+/g, '-')
//     .replace(/[^\w-]+/g, '')
//     .replace(/--+/g, '-')
//     .replace(/^-+/, '')
//     .replace(/-+$/, '');
// }

// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sort, setSort] = useState('');
//   const [search, setSearch] = useState('');
//   const [category, setCategory] = useState('');
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     fetch('https://fakestoreapi.com/products')
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch products');
//         return res.json();
//       })
//       .then((data) => {
//         setProducts(data);
//         setLoading(false);
//         const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
//         setCategories(uniqueCategories);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   const filteredProducts = products
//     .filter(product =>
//       (!category || product.category === category) &&
//       product.title.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sort === 'price-low-high') return a.price - b.price;
//       if (sort === 'price-high-low') return b.price - a.price;
//       if (sort === 'name-az') return a.title.localeCompare(b.title);
//       return 0;
//     });

//   if (loading) return <div className="flex justify-center items-center h-64 text-blue-500 text-xl">Loading products...</div>;
//   if (error) return <div className="flex justify-center items-center h-64 text-red-500 text-xl">{error}</div>;

//   return (
//     <div className="max-w-screen-xl mx-auto px-4 py-10">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Explore Our Products</h2>

//       {/* Filter Bar */}
//       <div className="flex flex-col md:flex-row justify-between gap-4 mb-10 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
//         <input
//           type="text"
//           placeholder="🔍 Search products..."
//           className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//         />

//         <select
//           className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           value={sort}
//           onChange={e => setSort(e.target.value)}
//         >
//           <option value="">🔃 Sort By</option>
//           <option value="price-low-high">💰 Price: Low to High</option>
//           <option value="price-high-low">💸 Price: High to Low</option>
//           <option value="name-az">🔠 Name: A–Z</option>
//         </select>

//         <select
//           className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//           value={category}
//           onChange={e => setCategory(e.target.value)}
//         >
//           <option value="">📦 All Categories</option>
//           {categories.map(cat => (
//             <option key={cat} value={cat}>
//               {cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Products Grid */}
//       {filteredProducts.length > 0 ? (
//         <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {filteredProducts.map(product => (
//             <Link key={product.id} to={`/products/${slugify(product.title)}`} className="group">
//               <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between hover:-translate-y-1">
//                 <div className="flex justify-center">
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     className="h-32 w-32 object-contain mb-4 bg-white rounded-full shadow-sm border border-blue-100 group-hover:border-blue-400 transition"
//                   />
//                 </div>
//                 <h3 className="text-lg font-semibold text-center text-gray-800 group-hover:text-blue-600 transition">
//                   {product.title}
//                 </h3>
//                 <p className="text-pink-600 text-xl font-bold text-center my-2">${product.price}</p>
//                 <div className="flex justify-center items-center text-sm text-gray-600 gap-1 mb-1">
//                   <span className="text-yellow-400">★</span>
//                   <span>{product.rating?.rate ?? 'N/A'}</span>
//                   <span className="text-xs text-gray-400">({product.rating?.count ?? 0})</span>
//                 </div>
//                 <p className="text-xs text-center text-gray-400 italic mt-1">
//                   {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center text-gray-500 mt-16 text-lg">
//           😕 No products found matching your criteria.
//         </div>
//       )}
//     </div>
//   );
// }









// "use client"

// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom";
// import { Search, Filter, Star, ShoppingBag, Grid3X3, List, ChevronDown } from "lucide-react"

// function slugify(text) {
//   return text
//     .toString()
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^\w-]+/g, "")
//     .replace(/--+/g, "-")
//     .replace(/^-+/, "")
//     .replace(/-+$/, "")
// }

// // Skeleton loader component
// function ProductSkeleton() {
//   return (
//     <div className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
//       <div className="w-full h-48 bg-gray-200 rounded-2xl mb-4"></div>
//       <div className="h-4 bg-gray-200 rounded mb-2"></div>
//       <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
//       <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
//       <div className="flex items-center gap-2">
//         <div className="h-4 bg-gray-200 rounded w-16"></div>
//         <div className="h-4 bg-gray-200 rounded w-12"></div>
//       </div>
//     </div>
//   )
// }

// export default function EnhancedProducts() {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [sort, setSort] = useState("")
//   const [search, setSearch] = useState("")
//   const [category, setCategory] = useState("")
//   const [categories, setCategories] = useState([])
//   const [viewMode, setViewMode] = useState("grid")
//   const [showFilters, setShowFilters] = useState(false)

//   useEffect(() => {
//     fetch("https://fakestoreapi.com/products")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch products")
//         return res.json()
//       })
//       .then((data) => {
//         setProducts(data)
//         setLoading(false)
//         const uniqueCategories = Array.from(new Set(data.map((p) => p.category)))
//         setCategories(uniqueCategories)
//       })
//       .catch((err) => {
//         setError(err.message)
//         setLoading(false)
//       })
//   }, [])

//   const filteredProducts = products
//     .filter(
//       (product) =>
//         (!category || product.category === category) && product.title.toLowerCase().includes(search.toLowerCase()),
//     )
//     .sort((a, b) => {
//       if (sort === "price-low-high") return a.price - b.price
//       if (sort === "price-high-low") return b.price - a.price
//       if (sort === "name-az") return a.title.localeCompare(b.title)
//       if (sort === "rating") return b.rating.rate - a.rating.rate
//       return 0
//     })

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
//         <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <span className="text-red-500 text-2xl">⚠️</span>
//           </div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             {/* Title and Stats */}
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl">
//                 <ShoppingBag className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                   Products
//                 </h1>
//                 <p className="text-gray-600 text-sm">
//                   {loading ? "Loading..." : `${filteredProducts.length} products available`}
//                 </p>
//               </div>
//             </div>

//             {/* Controls */}
//             <div className="flex items-center gap-3">
//               {/* View Mode Toggle */}
//               <div className="flex bg-gray-100 rounded-xl p-1">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 rounded-lg transition-all ${
//                     viewMode === "grid" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   <Grid3X3 className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 rounded-lg transition-all ${
//                     viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"
//                   }`}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Mobile Filter Toggle */}
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
//               >
//                 <Filter className="w-4 h-4" />
//                 <span className="text-sm font-medium">Filters</span>
//               </button>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className={`mt-6 ${showFilters ? "block" : "hidden lg:block"}`}>
//             <div className="flex flex-col lg:flex-row gap-4">
//               {/* Search */}
//               <div className="relative flex-1 max-w-md">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//               </div>

//               {/* Category Filter */}
//               <div className="relative">
//                 <select
//                   className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm min-w-[180px]"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 >
//                   <option value="">All Categories</option>
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
//               </div>

//               {/* Sort */}
//               <div className="relative">
//                 <select
//                   className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm min-w-[180px]"
//                   value={sort}
//                   onChange={(e) => setSort(e.target.value)}
//                 >
//                   <option value="">Sort By</option>
//                   <option value="price-low-high">Price: Low to High</option>
//                   <option value="price-high-low">Price: High to Low</option>
//                   <option value="name-az">Name: A–Z</option>
//                   <option value="rating">Highest Rated</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className="container mx-auto px-4 py-8">
//         {loading ? (
//           <div
//             className={`grid gap-6 ${
//               viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
//             }`}
//           >
//             {Array.from({ length: 8 }).map((_, i) => (
//               <ProductSkeleton key={i} />
//             ))}
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Search className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
//             <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
//             <button
//               onClick={() => {
//                 setSearch("")
//                 setCategory("")
//                 setSort("")
//               }}
//               className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         ) : (
//           <div
//             className={`grid gap-6 ${
//               viewMode === "grid"
//                 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
//                 : "grid-cols-1 max-w-4xl mx-auto"
//             }`}
//           >
//             {filteredProducts.map((product) => (
//               <Link key={product.id} href={`/products/${slugify(product.title)}`} className="group block">
//                 <div
//                   className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group-hover:-translate-y-1 ${
//                     viewMode === "list" ? "flex items-center p-6 gap-6" : "p-6"
//                   }`}
//                 >
//                   {/* Product Image */}
//                   <div className={`relative ${viewMode === "list" ? "w-32 h-32 flex-shrink-0" : "w-full h-48 mb-4"}`}>
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl"></div>
//                     <img
//                       src={product.image || "/placeholder.svg"}
//                       alt={product.title}
//                       className={`relative z-10 object-contain w-full h-full p-4 group-hover:scale-105 transition-transform duration-300 ${
//                         viewMode === "list" ? "rounded-xl" : "rounded-2xl"
//                       }`}
//                     />
//                     {/* Floating badge */}
//                     <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-600 shadow-sm">
//                       {product.category}
//                     </div>
//                   </div>

//                   {/* Product Info */}
//                   <div className={`${viewMode === "list" ? "flex-1" : ""}`}>
//                     <h3
//                       className={`font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 ${
//                         viewMode === "list" ? "text-lg mb-2" : "text-base mb-3"
//                       }`}
//                     >
//                       {product.title}
//                     </h3>

//                     {viewMode === "list" && (
//                       <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
//                     )}

//                     {/* Rating */}
//                     <div className="flex items-center gap-2 mb-3">
//                       <div className="flex items-center gap-1">
//                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                         <span className="text-sm font-semibold text-gray-700">
//                           {product.rating?.rate?.toFixed(1) ?? "N/A"}
//                         </span>
//                       </div>
//                       <span className="text-gray-400 text-xs">({product.rating?.count ?? 0} reviews)</span>
//                     </div>

//                     {/* Price */}
//                     <div className="flex items-center justify-between">
//                       <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                         ${product.price}
//                       </span>
//                       <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                         <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//                           <span className="text-white text-sm">→</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
