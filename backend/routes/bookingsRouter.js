import express from 'express';
import Booking from '../models/Booking.js'; 

const router = express.Router();

// POST ny bokning
router.post('/', async (req, res) => {
  try {
    const { email, seats, show, totalPrice } = req.body;

    // uppdatera bokade platser för showen
    const showData = await Show.findById(show._id);
    showData.bookedSeats.push(...seats);  // lägg till de nya bokade platserna
    await showData.save();

    const booking = await Booking.create({
      email,
      seats,
      show: show._id,
      totalPrice,
    });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
