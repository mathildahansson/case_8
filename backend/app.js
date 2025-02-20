import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Importera routes
import siteRouter from './routes/siteRouter.js';
import moviesRouter from './routes/moviesRouter.js';
import bookingsRouter from './routes/bookingsRouter.js';
import showsRouter from './routes/showsRouter.js';
import authRouter from './routes/authRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Kontrollera att MONGODB_URI är korrekt
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

// MongoDB anslutning
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });

// Använd routes
app.use('/api/v1/movies', moviesRouter);  // Movie endpoint
app.use('/api/v1/bookings', bookingsRouter);  // Booking endpoint
app.use('/api/v1/shows', showsRouter);  // Shows endpoint
app.use('/api/v1/auth', authRouter);  // Auth endpoint

app.use(siteRouter); // För allmänna routes om du har några andra

// Portinställning
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
