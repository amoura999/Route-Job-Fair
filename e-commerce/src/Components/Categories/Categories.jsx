import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Categories() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map(p => p.category)));
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getFilteredAndSortedProducts = () => {
    let filtered = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? product.category === category : true)
    );
    if (sort === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'name-az') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    return filtered;
  };

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {!category ? (
        // Show all categories
        <div>
          <h2 className="text-2xl font-bold mb-8">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/categories/${cat}`}
                className="no-underline"
              >
                <div className="bg-gradient-to-br from-blue-100 to-pink-100 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-blue-300">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {products.filter(p => p.category === cat).length} products
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        // Show products for selected category
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold mb-2 md:mb-0">
              {category.charAt(0).toUpperCase() + category.slice(1)} Products
            </h2>
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
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {getFilteredAndSortedProducts().map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="no-underline"
              >
                <div
                  className="relative bg-gradient-to-br from-blue-100 via-white to-pink-100 rounded-2xl shadow-xl p-5 flex flex-col items-center border border-gray-100 hover:border-blue-400 cursor-pointer overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-300 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                  <img src={product.image} alt={product.title} className="h-32 w-32 object-contain mb-4 rounded-full bg-white shadow-md border-2 border-blue-100 group-hover:border-blue-400 transition-all duration-300" />
                  <h3 className="text-lg font-bold text-center line-clamp-2 mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300 drop-shadow-sm">{product.title}</h3>
                  <span className="text-pink-600 font-extrabold text-xl mb-2 drop-shadow">${product.price}</span>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-sm font-semibold text-gray-700">{product.rating?.rate ?? 'N/A'}</span>
                    <span className="text-gray-400 text-xs">({product.rating?.count ?? 0})</span>
                  </div>
                  <span className="text-xs text-gray-500 italic mt-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-pink-200 via-blue-200 to-yellow-100 opacity-60 group-hover:opacity-90 transition-all duration-300 rounded-b-2xl" />
                </div>
              </Link>
            ))}
          </div>
          {getFilteredAndSortedProducts().length === 0 && (
            <div className="text-center text-gray-500 mt-12">No products found in this category.</div>
          )}
        </div>
      )}
    </div>
  );
}
