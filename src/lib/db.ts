import Database from 'better-sqlite3';
import { z } from 'zod';

const db = new Database(':memory:');

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS flights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_city TEXT NOT NULL,
    to_city TEXT NOT NULL,
    departure_date TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    available_seats INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS hotels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    city TEXT NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    rating DECIMAL(3,1) NOT NULL,
    available_rooms INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    reference_id INTEGER NOT NULL,
    user_email TEXT NOT NULL,
    booking_date TEXT NOT NULL,
    num_travelers INTEGER NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
  );
`);

// Insert sample data
db.exec(`
  INSERT OR IGNORE INTO flights (from_city, to_city, departure_date, price, available_seats)
  VALUES 
    ('New York', 'Paris', '2024-04-15', 599.99, 150),
    ('London', 'Dubai', '2024-04-20', 499.99, 200),
    ('Tokyo', 'Singapore', '2024-04-25', 399.99, 180);

  INSERT OR IGNORE INTO hotels (name, city, price_per_night, rating, available_rooms)
  VALUES
    ('Grand Plaza', 'Paris', 299.99, 4.8, 50),
    ('Desert Oasis', 'Dubai', 399.99, 4.9, 30),
    ('Marina Bay', 'Singapore', 259.99, 4.7, 40);
`);

// Schema validation
export const SearchFlightSchema = z.object({
  fromCity: z.string().min(2),
  toCity: z.string().min(2),
  departureDate: z.string(),
  travelers: z.number().min(1).max(9),
});

export const SearchHotelSchema = z.object({
  city: z.string().min(2),
  checkIn: z.string(),
  checkOut: z.string(),
  guests: z.number().min(1).max(4),
});

export const BookingSchema = z.object({
  type: z.enum(['flight', 'hotel']),
  referenceId: z.number(),
  userEmail: z.string().email(),
  numTravelers: z.number().min(1),
  totalPrice: z.number(),
});

// Database operations
export const dbOperations = {
  searchFlights: (params: z.infer<typeof SearchFlightSchema>) => {
    const stmt = db.prepare(`
      SELECT * FROM flights 
      WHERE from_city = ? 
      AND to_city = ? 
      AND departure_date = ?
      AND available_seats >= ?
    `);
    return stmt.all(params.fromCity, params.toCity, params.departureDate, params.travelers);
  },

  searchHotels: (params: z.infer<typeof SearchHotelSchema>) => {
    const stmt = db.prepare(`
      SELECT * FROM hotels 
      WHERE city = ? 
      AND available_rooms >= ?
    `);
    return stmt.all(params.city, params.guests);
  },

  createBooking: (booking: z.infer<typeof BookingSchema>) => {
    const stmt = db.prepare(`
      INSERT INTO bookings (type, reference_id, user_email, booking_date, num_travelers, total_price)
      VALUES (?, ?, ?, datetime('now'), ?, ?)
    `);
    return stmt.run(
      booking.type,
      booking.referenceId,
      booking.userEmail,
      booking.numTravelers,
      booking.totalPrice
    );
  },

  getBookingsByEmail: (email: string) => {
    const stmt = db.prepare('SELECT * FROM bookings WHERE user_email = ?');
    return stmt.all(email);
  },
};

export default dbOperations;