import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import { createBooking, getUserBookings } from '../controllers/bookingController.js';

const router = express.Router();

// POST - skapa ny bokning
router.post('/', createBooking, authenticateToken);

// GET - hämta alla bokningar för en användare
router.get('/', getUserBookings, authenticateToken);

export default router;