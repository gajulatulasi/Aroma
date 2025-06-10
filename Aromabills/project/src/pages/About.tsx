import React from 'react';
import { Award, Heart, Leaf, Users, Star, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gold-600 to-rose-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Born from a passion for luxury and a commitment to excellence, 
            Aroma Bills has been crafting unforgettable fragrances since 2010.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-6">
                The Beginning of Elegance
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Aroma Bills was founded by master perfumer Isabella Chen, who spent over 
                  a decade studying the art of fragrance creation in the perfume capitals 
                  of France and Italy. Her vision was simple yet profound: to create 
                  fragrances that don't just smell beautiful, but tell a story.
                </p>
                <p>
                  Each bottle in our collection represents months of careful formulation, 
                  using only the finest ingredients sourced from around the world. From 
                  Bulgarian rose petals to Indonesian sandalwood, every element is chosen 
                  for its exceptional quality and unique character.
                </p>
                <p>
                  Today, Aroma Bills continues to push the boundaries of luxury fragrance, 
                  creating scents that capture emotions, memories, and dreams in every drop.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1458838/pexels-photo-1458838.jpeg"
                alt="Perfume creation process"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-6">
              Vision & Mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe that fragrance is more than just a scent – it's an expression 
              of identity, a memory maker, and a confidence booster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mb-6">
                <Star className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become the world's most beloved luxury fragrance brand, known for 
                creating scents that inspire confidence, evoke emotions, and celebrate 
                the unique beauty of every individual who wears them.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To craft exceptional fragrances using sustainable practices and the 
                finest ingredients, while maintaining our commitment to cruelty-free 
                beauty and ethical sourcing in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do, from ingredient sourcing 
              to customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <Leaf className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-4">
                Sustainability
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We're committed to sustainable sourcing and eco-friendly packaging, 
                ensuring our luxury doesn't come at the planet's expense.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-rose-200 transition-colors">
                <Heart className="h-10 w-10 text-rose-600" />
              </div>
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-4">
                Cruelty-Free
              </h3>
              <p className="text-gray-600 leading-relaxed">
                All our products are developed without animal testing. Beauty should 
                never come at the cost of animal welfare.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold-200 transition-colors">
                <Award className="h-10 w-10 text-gold-600" />
              </div>
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-4">
                Excellence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We never compromise on quality. Every fragrance undergoes rigorous 
                testing to ensure it meets our exacting standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind every bottle of Aroma Bills fragrance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-gold-400 to-rose-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">IC</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-2">
                Isabella Chen
              </h3>
              <p className="text-gold-600 font-medium mb-4">Founder & Master Perfumer</p>
              <p className="text-gray-600 leading-relaxed">
                With over 15 years of experience in luxury fragrance creation, 
                Isabella brings artistry and innovation to every scent.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">MR</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-2">
                Marcus Rodriguez
              </h3>
              <p className="text-gold-600 font-medium mb-4">Head of Sourcing</p>
              <p className="text-gray-600 leading-relaxed">
                Marcus travels the world to source the finest ingredients, 
                ensuring every component meets our quality standards.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">SL</span>
              </div>
              <h3 className="text-xl font-playfair font-bold text-gray-900 mb-2">
                Sophie Laurent
              </h3>
              <p className="text-gold-600 font-medium mb-4">Creative Director</p>
              <p className="text-gray-600 leading-relaxed">
                Sophie leads our creative vision, ensuring each fragrance 
                tells a compelling story and connects with our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-gold-600 to-rose-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">14+</div>
              <div className="text-gold-100">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-gold-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">25+</div>
              <div className="text-gold-100">Unique Fragrances</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">30+</div>
              <div className="text-gold-100">Countries Served</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;