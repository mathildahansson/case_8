import express from 'express';
import authenticateToken from '../middleware/authMiddleware.js';
import { createBooking, getUserBookings, importBookings, } from '../controllers/bookingController.js';

const router = express.Router();

// POST - skapa ny bokning
router.post('/', createBooking);

// GET - hämta alla bokningar för en användare
router.get('/', getUserBookings);

// GET - importera bokningar från extern API
router.get('/import', authenticateToken, importBookings);

export default router;