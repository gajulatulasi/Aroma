import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useCart();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-gold-500 group-hover:text-gold-600 transition-colors" />
              <div className="absolute inset-0 bg-gold-500 opacity-20 rounded-full blur-lg group-hover:opacity-30 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-playfair font-bold bg-gradient-to-r from-gold-600 to-rose-600 bg-clip-text text-transparent">
                Aroma Bills
              </span>
              <span className="text-xs text-gray-500 font-inter tracking-wider">
                BREATHE LUXURY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-gold-600 ${
                isActive('/') ? 'text-gold-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium transition-colors hover:text-gold-600 ${
                isActive('/products') ? 'text-gold-600' : 'text-gray-700'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/about" 
              className={`font-medium transition-colors hover:text-gold-600 ${
                isActive('/about') ? 'text-gold-600' : 'text-gray-700'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium transition-colors hover:text-gold-600 ${
                isActive('/contact') ? 'text-gold-600' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Cart */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative p-3 text-gray-700 hover:text-gold-600 transition-colors group"
            >
              <ShoppingBag className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium animate-pulse">
                  {state.itemCount}
                </span>
              )}
              <div className="absolute inset-0 bg-gold-500 opacity-0 group-hover:opacity-10 rounded-full transition-opacity"></div>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-gold-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-100 bg-white">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`font-medium transition-colors hover:text-gold-600 ${
                  isActive('/') ? 'text-gold-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`font-medium transition-colors hover:text-gold-600 ${
                  isActive('/products') ? 'text-gold-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className={`font-medium transition-colors hover:text-gold-600 ${
                  isActive('/about') ? 'text-gold-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`font-medium transition-colors hover:text-gold-600 ${
                  isActive('/contact') ? 'text-gold-600' : 'text-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;