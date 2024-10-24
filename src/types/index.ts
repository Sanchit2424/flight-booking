export interface Flight {
  id: number;
  fromCity: string;
  toCity: string;
  departureDate: string;
  price: number;
  availableSeats: number;
}

export interface Hotel {
  id: number;
  name: string;
  city: string;
  pricePerNight: number;
  rating: number;
  availableRooms: number;
}

export interface Booking {
  id: number;
  type: 'flight' | 'hotel';
  referenceId: number;
  userEmail: string;
  bookingDate: string;
  numTravelers: number;
  totalPrice: number;
}