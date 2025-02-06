import express from 'express';
import Movie from '../models/Movie.js';

const router = express.Router();

// GET - hämta alla filmer
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

// POST - skapa en ny film
router.post('/', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Fel vid skapande av film:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// GET - hämta en specifik film baserat på id
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Film hittades inte' });
    }

    // Omvandla releaseDate till ISO-sträng format
    const formattedMovie = {
      ...movie.toObject(),
      releaseDate: movie.releaseDate ? movie.releaseDate.toISOString() : null,
    };

    res.status(200).json(formattedMovie);
  } catch (error) {
    console.error('Fel vid fetch av film (id):', error.message);
    res.status(400).json({ error: error.message });
  }
});

// PUT - uppdatera en specifik film
router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ error: 'Film hittades inte' });
    }
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error('Fel vid uppdatering av film:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// DELETE - ta bort en film (med specifikt id)
router.delete('/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (!deletedMovie) {
      return res.status(404).json({ error: 'Film hittades inte' });
    }
    res.status(200).json({ message: 'Film raderad' });
  } catch (error) {
    console.error('Fel vid radering av film:', error.message);
    res.status(400).json({ error: error.message });
  }
});

export default router;
