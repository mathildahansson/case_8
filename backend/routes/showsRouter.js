import express from 'express';
import axios from 'axios'; // för att göra HTTP-förfrågningar
import Show from '../models/Show.js'; 

const router = express.Router();

// GET - alla shows
router.get('/', async (req, res) => {
  try {
    const shows = await Show.find().populate('movie'); // populera 'movie' om den refererar till en annan modell
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - för att importera shows från externt API
router.get('/import', async (req, res) => {
  try {
    // hämta shows från externt API
    const response = await axios.get('https://cinema-api.henrybergstrom.com/api/v1/shows'); 

    // kontrollera om data finns
    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ error: 'No shows found in external API' });
    }

    // spara shows i databasen
    const savedShows = await Show.insertMany(response.data);

    // skicka tillbaka de sparade shows
    res.status(200).json({
      message: 'Shows successfully imported',
      shows: savedShows,
    });
  } catch (error) {
    console.error('Error importing shows:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
