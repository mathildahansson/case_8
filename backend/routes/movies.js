import express from 'express';
import Movie from '../models/Movie.js'; 

const router = express.Router();

// GET alla filmer
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
