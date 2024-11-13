import express from 'express';
import Show from '../models/Show.js'; 

const router = express.Router();

// GET alla shows
router.get('/', async (req, res) => {
  try {
    const shows = await Show.find().populate('movie'); 
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;