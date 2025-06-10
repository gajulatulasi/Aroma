import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, ShoppingBag, SlidersHorizontal, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Perfume {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  gender: string;
  fragranceType: string;
  notes: string[];
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

const Products = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [filteredPerfumes, setFilteredPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { dispatch } = useCart();
  const navigate = useNavigate();

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedFragranceType, setSelectedFragranceType] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300 });
  const [sortBy, setSortBy] = useState('');

  const genders = ['All', 'Men', 'Women', 'Unisex'];
  const fragranceTypes = ['All', 'Floral', 'Oriental', 'Woody', 'Citrus', 'Aquatic'];

  useEffect(() => {
    fetchPerfumes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [perfumes, searchTerm, selectedGender, selectedFragranceType, priceRange, sortBy]);

  const fetchPerfumes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/perfumes');
      const data = await response.json();
      setPerfumes(data);
    } catch (error) {
      console.error('Error fetching perfumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...perfumes];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(perfume =>
        perfume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perfume.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        perfume.notes.some(note => note.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Gender filter
    if (selectedGender !== 'All') {
      filtered = filtered.filter(perfume => perfume.gender === selectedGender);
    }

    // Fragrance type filter
    if (selectedFragranceType !== 'All') {
      filtered = filtered.filter(perfume => perfume.fragranceType === selectedFragranceType);
    }

    // Price range filter
    filtered = filtered.filter(perfume => 
      perfume.price >= priceRange.min && perfume.price <= priceRange.max
    );

    // Sorting
    if (sortBy) {
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.reverse();
          break;
      }
    }

    setFilteredPerfumes(filtered);
  };

  const addToCart = (e: React.MouseEvent, perfume: Perfume) => {
    e.stopPropagation();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: perfume.id,
        name: perfume.name,
        price: perfume.price,
        image: perfume.image,
        size: perfume.size
      }
    });
  };

  const handleProductClick = (perfumeId: string) => {
    navigate(`/product/${perfumeId}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGender('All');
    setSelectedFragranceType('All');
    setPriceRange({ min: 0, max: 300 });
    setSortBy('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
            Our Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Explore our complete range of luxury fragrances, each one carefully crafted 
            to capture unique emotions and memories.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, notes, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
            >
              <option value="">Sort By</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Gender Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    {genders.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>

                {/* Fragrance Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fragrance Type
                  </label>
                  <select
                    value={selectedFragranceType}
                    onChange={(e) => setSelectedFragranceType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    {fragranceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange.min} - ${priceRange.max}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-gold-600 hover:text-gold-700 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPerfumes.length} of {perfumes.length} fragrances
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-80 rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredPerfumes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-2">
              No fragrances found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPerfumes.map((perfume) => (
              <div 
                key={perfume.id}
                onClick={() => handleProductClick(perfume.id)}
                className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {perfume.gender}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {perfume.fragranceType}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button 
                    onClick={(e) => addToCart(e, perfume)}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-6 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold-500 hover:text-white flex items-center gap-2 z-10"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-16 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100 z-10"
                  >
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(perfume.rating)
                            ? 'text-gold-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({perfume.reviews})</span>
                  </div>
                  
                  <h3 className="text-xl font-playfair font-bold text-gray-900 mb-2 group-hover:text-gold-600 transition-colors">
                    {perfume.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {perfume.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {perfume.notes.slice(0, 3).map((note, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gold-600">
                      ${perfume.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {perfume.size}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;