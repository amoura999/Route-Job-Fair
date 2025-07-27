import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export default function ProductDetails() {
  const { id: slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        const found = data.find((p) => slugify(p.title) === slug);
        setProduct(found);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-t-purple-600 rounded-full animate-spin animation-delay-200"></div>
          </div>
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Loading product details...
          </span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Product not found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li className="text-gray-400 dark:text-gray-500">/</li>
            <li>
              <Link
                to="/categories"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Categories
              </Link>
            </li>
            <li className="text-gray-400 dark:text-gray-500">/</li>
            <li className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-xs">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="relative p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-96 lg:h-[500px] object-contain rounded-2xl shadow-lg"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-blue-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm shadow-lg">
                    {product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-yellow-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm shadow-lg">
                  <span className="text-yellow-200">★</span>
                  <span>{product.rating?.rate ?? "N/A"}</span>
                  <span className="text-xs opacity-90">
                    ({product.rating?.count ?? 0})
                  </span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div className="space-y-8">
                {/* Title and Price */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-6 leading-tight">
                    {product.title}
                  </h1>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl lg:text-5xl font-bold text-pink-600 dark:text-pink-400">
                      ${product.price}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-2xl">★</span>
                        <span className="text-xl font-semibold text-gray-700 dark:text-gray-300 ml-2">
                          {product.rating?.rate ?? "N/A"}
                        </span>
                      </div>
                      <span className="text-gray-400 dark:text-gray-500 text-sm">
                        ({product.rating?.count ?? 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                    Description
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
