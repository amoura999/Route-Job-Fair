import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')        // Remove all non-word chars
    .replace(/--+/g, '-')            // Replace multiple - with single -
    .replace(/^-+/, '')              // Trim - from start of text
    .replace(/-+$/, '');             // Trim - from end of text
}

export default function ProductDetails() {
  const { id: slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        const found = data.find(p => slugify(p.title) === slug);
        setProduct(found);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-64 text-red-500">{error}</div>;
  if (!product) return <div className="flex justify-center items-center h-64 text-gray-500">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.title} className="h-64 w-64 object-contain rounded-xl bg-gray-50 border shadow-md mx-auto md:mx-0" />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mb-2">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-pink-600 font-extrabold text-2xl">${product.price}</span>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="text-base font-semibold text-gray-700">{product.rating?.rate ?? 'N/A'}</span>
              <span className="text-gray-400 text-xs">({product.rating?.count ?? 0})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 