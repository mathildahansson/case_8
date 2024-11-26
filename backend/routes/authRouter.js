import express from 'express';
import { generateToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/token', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Namn och e-post krävs.' });
  }
  const token = generateToken({ name, email });
  res.status(200).json({ token });
});

export default router;
