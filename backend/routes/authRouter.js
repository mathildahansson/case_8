import express from 'express';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

// post/login - anropa loginUser från authController
router.post('/login', loginUser);

export default router;