import express from 'express';
import Show from '../models/Show.js';

const router = express.Router();


// GET - hämta alla shows
router.get('/', async (req, res) => {
  try {
    const shows = await Show.find().populate('movie'); // populerar relaterad film
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST - skapa en ny show
router.post('/', async (req, res) => {
  try {
    const newShow = new Show(req.body);
    const savedShow = await newShow.save();
    res.status(201).json(savedShow);
  } catch (error) {
    console.error('Fel vid skapandet av show:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// GET - hämta en specifik show baserat på id
router.get('/:id', async (req, res) => {
  try {
    const show = await Show.findById(req.params.id).populate('movie');
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }
    res.status(200).json(show);
  } catch (error) {
    console.error('Fel vid fetch av show:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// PUT - uppdatera en specifik show
router.put('/:id', async (req, res) => {
  try {
    const updatedShow = await Show.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('movie');
    if (!updatedShow) {
      return res.status(404).json({ error: 'Show hittas inte' });
    }
    res.status(200).json(updatedShow);
  } catch (error) {
    console.error('Fel vid uppdatering av show:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// DELETE - ta bort en specifik show
router.delete('/:id', async (req, res) => {
  try {
    const deletedShow = await Show.findByIdAndDelete(req.params.id);
    if (!deletedShow) {
      return res.status(404).json({ error: 'Show kan ej hittas' });
    }
    res.status(200).json({ message: 'Show raderad' });
  } catch (error) {
    console.error('Fel vid radering av show:', error.message);
    res.status(400).json({ error: error.message });
  }
});


export default router;
