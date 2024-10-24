import React, { useState } from 'react';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { Flight, Hotel } from '../types';

// ... (keep existing imports and interfaces)

const SearchForm: React.FC = () => {
  const { state } = useBooking();
  const { user } = useAuth();
  const [searchType, setSearchType] = useState<'flights' | 'hotels'>('flights');
  const [searchResults, setSearchResults] = useState<Array<Flight | Hotel>>([]);
  
  const [formData, setFormData] = useState({
    fromCity: '',
    toCity: '',
    city: '',
    departureDate: '',
    checkIn: '',
    checkOut: '',
    travelers: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'travelers' ? parseInt(value) : value,
    }));
  };

  const validateDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = searchType === 'flights' 
      ? new Date(formData.departureDate)
      : new Date(formData.checkIn);

    if (selectedDate < today) {
      toast.error('Please select a future date');
      return false;
    }

    if (searchType === 'hotels') {
      const checkOut = new Date(formData.checkOut);
      if (checkOut <= new Date(formData.checkIn)) {
        toast.error('Check-out date must be after check-in date');
        return false;
      }
    }

    return true;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateDates()) return;

    if (searchType === 'flights') {
      const results = state.flights.filter(
        flight =>
          flight.fromCity.toLowerCase() === formData.fromCity.toLowerCase() &&
          flight.toCity.toLowerCase() === formData.toCity.toLowerCase() &&
          flight.availableSeats >= formData.travelers
      );
      setSearchResults(results);
    } else {
      const results = state.hotels.filter(
        hotel =>
          hotel.city.toLowerCase() === formData.city.toLowerCase() &&
          hotel.availableRooms >= formData.travelers
      );
      setSearchResults(results);
    }

    if (searchResults.length === 0) {
      toast.error('No results found. Try different search criteria.');
    }
  };

  const handleBook = () => {
    if (!user) {
      toast.error('Please sign in to book');
      return;
    }
    toast.success('Booking feature coming soon!');
  };

  // ... (keep the rest of the component code, but update the BookButton component)

  const BookButton: React.FC = () => (
    <button
      onClick={handleBook}
      className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Book Now
    </button>
  );

  // ... (keep the rest of the component code)
};

export default SearchForm;