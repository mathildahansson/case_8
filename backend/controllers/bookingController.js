import jwt from 'jsonwebtoken';
import Booking from '../models/Booking.js';

// POST - skapa ny bokning
export const createBooking = async (req, res) => {
    try {
      const { name, email, seats, show, totalPrice, bookingTime } = req.body;
  
      // validering av obligatoriska fält
      if (!name || !email || !seats || !show || !totalPrice) {
        return res.status(400).json({ error: 'Alla fält (name, email, seats, show, totalPrice) är obligatoriska!' });
      }
  
      if (!Array.isArray(seats) || seats.length === 0) { // kontrollera att 'seats' är en array
        return res.status(400).json({ error: 'Seats måste vara en array med innehåll.' });
      }
  
      if (isNaN(totalPrice) || totalPrice <= 0) { // kontrollera att 'totalPrice' är ett positivt nummer
        return res.status(400).json({ error: 'totalPrice måste vara ett positivt nummer.' });
      }
  
      // skapa ny bokning
      const booking = new Booking({
        name,
        email,
        seats,
        show,
        totalPrice,
        bookingTime: bookingTime ? new Date(bookingTime) : new Date(), // använd nuvarande tid som standard
      });
  
      // spara i databasen
      const savedBooking = await booking.save();
      console.log('Ny bokning skapad:', savedBooking);
  
      // generera jtw-token baserat på namn och e-post
      const token = jwt.sign(
        { name, email }, // payload
        process.env.JWT_SECRET, // hemlig nyckel
        { expiresIn: '1h' } // token giltig i 1 timme
      );
  
      // returnera bokningen och token
      res.status(201).json({
        message: 'Bokning lyckades!',
        booking: savedBooking,
        token, // returnera token
      });
  
    } catch (error) {
      console.error('Fel vid skapande av bokning:', error.message);
      res.status(500).json({ error: 'Kunde inte skapa bokningen.' });
    }
  };
  
  // GET - hämta alla bokningar för en användare
  export const getUserBookings = async (req, res) => {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header saknas.' });
      }
  
      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Access token krävs.' });
      }
  
      // verifiera jtw-token
      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
          return res.status(403).json({ error: 'Ogiltig eller utgången token...' });
        }
  
        // hämta användarens bokningar baserat på e-post
        const userBookings = await Booking.find({ email: user.email });
        if (userBookings.length === 0) {
          return res.status(404).json({ message: 'Inga bokningar hittades för användaren.' });
        }
  
        res.status(200).json(userBookings);
      });
    } catch (error) {
      console.error('Fel vid hämtning av bokningar:', error.message);
      res.status(500).json({ error: 'Kunde inte hämta bokningar.' });
    }
  };


