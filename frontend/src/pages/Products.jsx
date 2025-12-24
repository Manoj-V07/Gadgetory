import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import axios from 'axios'

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    
    const fetchProducts = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products`)
        console.log('Products from API:', response.data);
        setProductsData(response.data);
    };

    fetchProducts();
  }, []);

  const filteredProducts = productsData.filter((product) =>
    ((product.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description || '').toLowerCase().includes(searchTerm.toLowerCase())) &&
    (product.discountedPrice || 0) <= maxPrice &&
    (product.rating || 0) >= minRating &&
    (selectedCategory === 'all' || (product.category && product.category === selectedCategory))
  );

  // Get unique categories
  const categories = ['all', ...new Set(productsData.map(product => product.category).filter(Boolean))];


  return (
    <>
      {/* Page Header */}
      <div className="py-12">
          <h1 className="text-4xl text-center text-gray-50 font-bold mb-3">Our Products</h1>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <input
          type="text"
          placeholder="Search products by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border text-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-1 bg-gray-950 border-1 border-white sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50 p-6 rounded-lg">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-gray-50 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">
              Max Price: ₹{maxPrice}
            </label>
            <input 
              type="range"
              min="0"
              max="10000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span className="text-gray-100 ">₹0</span>
              <span className="text-gray-100 ">₹10000</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-2">
              Min Rating: {minRating.toFixed(1)} 
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span className="text-gray-100 ">0</span>
              <span className="text-gray-100 ">5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
        {productsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
                <ProductCard
                    key={product._id}
                    id={product._id}
                    title={product.title}
                    description={product.description}
                    image={product.image}
                    originalPrice={product.originalPrice}
                    discountedPrice={product.discountedPrice}
                    rating={product.rating || 0}
                />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Products