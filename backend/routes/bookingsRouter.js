import express from 'express';
import axios from 'axios'; // för att göra http-förfrågningar
import Booking from '../models/Booking.js';
import Show from '../models/Show.js'; // för att uppdatera visningen

const router = express.Router();

// POST - skicka bokning
router.post('/', async (req, res) => {
  try {
    // destructure inkommande data från req-body
    const { email, seats, show, totalPrice, bookingTime } = req.body;

    // validering - kontrollera att alla obligatoriska fält är närvarande
    if (!email || !seats || !show || !totalPrice) {
      return res.status(400).json({ error: 'Alla fält (email, seats, show, totalPrice) är obligatoriska.' });
    }

    // skapa en ny bokning med validerad data
    const booking = new Booking({
      email,
      seats,
      show,
      totalPrice,
      bookingTime: bookingTime ? new Date(bookingTime) : undefined, // om 'bookingTime' saknas, sätts ett standardvärde via schemat
    });

    // spara bokning i databasen
    const savedBooking = await booking.save();

    console.log('Ny bokning skapad:', savedBooking);
    res.status(201).json(savedBooking); // returnera den sparade bokningen
  } catch (error) {
    console.error('Fel vid skapande av bokning:', error.message);
    res.status(500).json({ error: 'Kunde inte skapa bokningen. Försök igen senare.' });
  }
});


// GET - få alla filmer från externt api och spara i databasen
router.get('/import', async (req, res) => {
  try {
    // hämta filmer från den API-URL:en
    const response = await axios.get('https://cinema-api.henrybergstrom.com/api/v1/bookings'); // här är den externa API:en för bokningar

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



// POST
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body); // logga bokningsdatan
    const booking = new Booking(req.body);
    await booking.save();
    console.log('Booking saved:', booking); // bekräfta att den sparades
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error saving booking:', error.message); // logga felmeddelande
    res.status(500).json({ error: error.message });
  }
});


export default router;
