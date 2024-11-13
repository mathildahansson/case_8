// huvudfil för att konfigurera servern och api-routes
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// lokala dependencies
import siteRouter from './routes/siteRouter.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// routes
// app.use('/api/v1/movies', moviesRouter);
// app.use('/api/v1/shows', showsRouter);
// app.use('/api/v1/bookings', bookingsRouter);

app.use(siteRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
