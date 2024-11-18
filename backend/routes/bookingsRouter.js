import express from 'express';
import axios from 'axios'; // för att göra http-förfrågningar
import Booking from '../models/Booking.js';

const router = express.Router();

// GET - få alla filmer från externt api och spara i databasen
router.get('/import', async (req, res) => {
  try {
    // hämta filmer från den API-URL:en
    const response = await axios.get('https://cinema-api.henrybergstrom.com/api/v1/bookings'); // Här är den externa API:en för bokningar

    // kontrollera om det finns några bokningar i svaret
    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ error: 'No bookings found in the external API' });
    }

    // spara bokningar MongoDB-databas
    const savedBookings = await Booking.insertMany(response.data);

    // skicka tillbaka de sparade bokningarna som svar
    res.status(200).json({
      message: 'Bookings successfully imported',
      bookings: savedBookings,
    });
  } catch (error) {
    console.error('Error importing bookings:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET - hämta alla bokningar från databasen
router.get('/', async (req, res) => {
  try {
    // hämta alla bokningar från databasen
    const bookings = await Booking.find();

    // om inga bokningar finns
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    // skicka tillbaka bokningarna som JSON
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
