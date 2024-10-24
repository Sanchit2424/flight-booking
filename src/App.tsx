import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import SearchForm from './components/SearchForm';
import FeaturedDeals from './components/FeaturedDeals';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <Navbar />
          
          <div className="relative h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80"
                alt="Hero background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Discover Your Next Adventure
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Find and book the best deals on flights and hotels worldwide
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
            <SearchForm />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <FeaturedDeals />
          </div>

          <Footer />
        </div>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;