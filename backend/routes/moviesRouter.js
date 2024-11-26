import express from 'express';
import Movie from '../models/Movie.js';
import axios from 'axios'; // för att göra http-förfrågningar

const router = express.Router();

// GET - få alla filmer från externt api och spara i databasen
router.get('/import', async (req, res) => {
  try {
    // hämta filmer från den API-URL:en
    const response = await axios.get('https://cinema-api.henrybergstrom.com/api/v1/movies');

    // extrahera filmerna från svar
    const movies = response.data;

    // spara varje film i MongoDB-databas
    // Movie.insertMany() kan användas för att spara flera filmer på en gång
    const savedMovies = await Movie.insertMany(movies);

    // skicka tillbaka de sparade filmerna som svar
    res.status(200).json(savedMovies);
  } catch (error) {
    console.error('Error importing movies:', error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;