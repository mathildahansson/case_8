// huvudfil för att konfigurera servern och api-routes
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import moviesRouter from './routes/movies.js';
import showsRouter from './routes/shows.js';
import bookingsRouter from './routes/bookings.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// routes
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/shows', showsRouter);
app.use('/api/v1/bookings', bookingsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
