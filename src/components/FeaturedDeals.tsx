import React from 'react';
import { useBooking } from '../context/BookingContext';

const FeaturedDeals: React.FC = () => {
  const { state } = useBooking();
  const { flights, hotels } = state;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Deals</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {flights.slice(0, 2).map((flight) => (
          <div key={flight.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Flight Deal</h3>
            <p className="text-gray-600 mb-4">
              {flight.fromCity} to {flight.toCity}
            </p>
            <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
            <p className="text-sm text-gray-500 mt-2">Limited time offer</p>
          </div>
        ))}

        {hotels.slice(0, 1).map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
            <p className="text-gray-600 mb-4">{hotel.city}</p>
            <p className="text-2xl font-bold text-blue-600">${hotel.pricePerNight}</p>
            <p className="text-sm text-gray-500 mt-2">Per night</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDeals;