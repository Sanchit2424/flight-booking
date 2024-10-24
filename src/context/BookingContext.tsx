import React, { createContext, useContext, useReducer } from 'react';
import { Flight, Hotel, Booking } from '../types';

interface State {
  flights: Flight[];
  hotels: Hotel[];
  bookings: Booking[];
}

type Action =
  | { type: 'SET_FLIGHTS'; payload: Flight[] }
  | { type: 'SET_HOTELS'; payload: Hotel[] }
  | { type: 'ADD_BOOKING'; payload: Booking };

const initialState: State = {
  flights: [
    {
      id: 1,
      fromCity: 'New York',
      toCity: 'Paris',
      departureDate: '2024-04-15',
      price: 599.99,
      availableSeats: 150,
    },
    {
      id: 2,
      fromCity: 'London',
      toCity: 'Dubai',
      departureDate: '2024-04-20',
      price: 499.99,
      availableSeats: 200,
    },
    {
      id: 3,
      fromCity: 'Tokyo',
      toCity: 'Singapore',
      departureDate: '2024-04-25',
      price: 399.99,
      availableSeats: 180,
    },
  ],
  hotels: [
    {
      id: 1,
      name: 'Grand Plaza',
      city: 'Paris',
      pricePerNight: 299.99,
      rating: 4.8,
      availableRooms: 50,
    },
    {
      id: 2,
      name: 'Desert Oasis',
      city: 'Dubai',
      pricePerNight: 399.99,
      rating: 4.9,
      availableRooms: 30,
    },
    {
      id: 3,
      name: 'Marina Bay',
      city: 'Singapore',
      pricePerNight: 259.99,
      rating: 4.7,
      availableRooms: 40,
    },
  ],
  bookings: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FLIGHTS':
      return { ...state, flights: action.payload };
    case 'SET_HOTELS':
      return { ...state, hotels: action.payload };
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };
    default:
      return state;
  }
};

const BookingContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};