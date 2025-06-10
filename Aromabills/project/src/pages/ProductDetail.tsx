import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Share2, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Perfume {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  size: string;
  gender: string;
  fragranceType: string;
  notes: string[];
  images: string[];
  rating: number;
  reviews: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { dispatch } = useCart();

  useEffect(() => {
    if (id) {
      fetchPerfume();
    }
  }, [id]);

  const fetchPerfume = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/perfumes/${id}`);
      const data = await response.json();
      setPerfume(data);
    } catch (error) {
      console.error('Error fetching perfume:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (perfume) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: perfume.id,
          name: perfume.name,
          price: perfume.price,
          image: perfume.images[0],
          size: perfume.size
        }
      });
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share && perfume) {
      try {
        await navigator.share({
          title: perfume.name,
          text: perfume.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-500"></div>
      </div>
    );
  }

  if (!perfume) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
            Perfume not found
          </h2>
          <Link 
            to="/products"
            className="text-gold-600 hover:text-gold-700 font-medium"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <img
                src={perfume.images[selectedImage]}
                alt={`${perfume.name} - Image ${selectedImage + 1}`}
                className="w-full h-96 md:h-[600px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Thumbnail Images */}
            {perfume.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {perfume.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? 'border-gold-500 ring-2 ring-gold-200'
                        : 'border-gray-300 hover:border-gold-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${perfume.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-medium">
                {perfume.gender}
              </span>
              <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">
                {perfume.fragranceType}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(perfume.rating)
                        ? 'text-gold-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {perfume.rating} ({perfume.reviews} reviews)
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900">
              {perfume.name}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              {perfume.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-gold-600">
                ${perfume.price}
              </span>
              <span className="text-lg text-gray-500">
                {perfume.size}
              </span>
            </div>

            {/* Fragrance Notes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Fragrance Notes
              </h3>
              <div className="flex flex-wrap gap-2">
                {perfume.notes.map((note, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={addToCart}
                className="flex-1 bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                {isAddedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    Add to Cart
                  </>
                )}
              </button>
              
              <button
                onClick={handleShare}
                className="px-6 py-4 border-2 border-gold-500 text-gold-600 hover:bg-gold-50 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="h-5 w-5" />
                Share
              </button>
              
              <button className="px-6 py-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Full Description */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-4">
                About This Fragrance
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {perfume.fullDescription}
              </p>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-4">
                Features
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Cruelty-free and ethically sourced</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Long-lasting formula (6-8 hours)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Handcrafted by master perfumers</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Premium glass bottle with elegant design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;