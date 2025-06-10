import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Award, Leaf, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Perfume {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  image: string;
  rating: number;
  reviews: number;
}

const Home = () => {
  const [featuredPerfumes, setFeaturedPerfumes] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedPerfumes();
  }, []);

  const fetchFeaturedPerfumes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/perfumes/featured');
      const data = await response.json();
      setFeaturedPerfumes(data);
    } catch (error) {
      console.error('Error fetching featured perfumes:', error);
    } finally {
      setLoading(false);
    }
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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/965990/pexels-photo-965990.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight">
            Breathe Luxury,
            <span className="block bg-gradient-to-r from-gold-300 to-rose-300 bg-clip-text text-transparent">
              Wear Elegance
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted fragrances that capture 
            the essence of sophistication and timeless beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products"
              className="group bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Shop Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              to="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-20 animate-pulse">
          <div className="w-4 h-4 bg-gold-400 rounded-full opacity-70"></div>
        </div>
        <div className="absolute top-40 right-32 animate-pulse delay-100">
          <div className="w-6 h-6 bg-rose-400 rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-32 left-32 animate-pulse delay-200">
          <div className="w-8 h-8 bg-gold-300 rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
              Featured Fragrances
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated selection of signature scents, 
              each one crafted to perfection and designed to make you unforgettable.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-80 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredPerfumes.map((perfume) => (
                <div 
                  key={perfume.id}
                  onClick={() => handleProductClick(perfume.id)}
                  className="group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button 
                      onClick={(e) => addToCart(e, perfume)}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 px-6 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold-500 hover:text-white flex items-center gap-2 z-10"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
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
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {perfume.description}
                    </p>
                    
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

          <div className="text-center mt-12">
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
              Why Choose Aroma Bills
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to creating exceptional fragrances that respect both you and our planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Heart className="h-10 w-10 text-rose-500" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Cruelty-Free</h3>
              <p className="text-gray-600 leading-relaxed">
                All our fragrances are developed without animal testing, ensuring ethical beauty 
                that you can feel good about wearing.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Award className="h-10 w-10 text-gold-500" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Handcrafted</h3>
              <p className="text-gray-600 leading-relaxed">
                Each bottle is meticulously crafted by master perfumers using traditional 
                techniques and the finest ingredients from around the world.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Leaf className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Long-Lasting</h3>
              <p className="text-gray-600 leading-relaxed">
                Our premium formulations ensure exceptional longevity, so your signature 
                scent stays with you throughout the day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-gold-600 to-rose-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-4xl font-playfair font-bold text-white mb-6">
            Stay in the Scent
          </h3>
          <p className="text-xl text-gold-100 mb-8 leading-relaxed">
            Be the first to discover new fragrances, exclusive offers, and fragrance tips 
            from our master perfumers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-gold-300 text-gray-900"
            />
            <button className="bg-white text-gold-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;