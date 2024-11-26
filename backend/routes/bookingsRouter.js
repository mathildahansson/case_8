import express from 'express';
import Booking from '../models/Booking.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// POST - skapa ny bokning
router.post('/', authenticateToken, async (req, res) => {
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
      email: req.user.email || email, // använder email från token om möjligt
      seats,
      show,
      totalPrice,
      bookingTime: bookingTime ? new Date(bookingTime) : new Date(), // använd nuvarande tid som standard
    });

    // spara i databasen
    const savedBooking = await booking.save();
    console.log('Ny bokning skapad:', savedBooking);

    // returnera bokningen
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Fel vid skapande av bokning:', error.message);
    res.status(500).json({ error: 'Kunde inte skapa bokningen.' });
  }
});

// GET - hämta alla bokningar från databasen
router.get('/', authenticateToken, async (req, res) => {
  try {
    // const bookings = await Booking.find();

    // filtrera bokningar baserat på användarens email
    const userBookings = await Booking.find({ email: req.user.email });


    if (userBookings.length === 0) {
      return res.status(404).json({ message: 'Inga bokningar hittades för användaren.' });
    }

    res.status(200).json(userBookings);
  } catch (error) {
    console.error('Fel vid hämtning av bokningar:', error.message);
    res.status(500).json({ error: 'Kunde inte hämta bokningar.' });
  }
});

// separera /import för extern API-import
router.get('/import', authenticateToken, async (req, res) => {
  try {
    const response = await axios.get('https://cinema-api.henrybergstrom.com/api/v1/bookings');

    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ error: 'Inga bokningar hittades i det externa API:et.' });
    }


    // Lägg till ett obligatoriskt name-fält om det saknas
    const bookingsWithNames = response.data.map((booking) => {
      if (!booking.name) {
        // Om `name` saknas, generera ett standardvärde
        booking.name = `Anonym användare (${booking.email || 'Okänd email'})`;
      }
      return booking;
    });

    const savedBookings = await Booking.insertMany(bookingsWithNames);
    res.status(200).json({
      message: 'Bokningar importerades!',
      bookings: savedBookings,
    });
  } catch (error) {
    console.error('Fel vid importering av bokningar:', error.message);
    res.status(500).json({ error: 'Kunde inte importera bokningar.' });
  }
});

export default router;
