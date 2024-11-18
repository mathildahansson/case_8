// huvudfil för att konfigurera servern och api-routes
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios'; // för att göra http-förfrågningar

// lokala dependencies
import siteRouter from './routes/siteRouter.js';
import moviesRouter from './routes/moviesRouter.js'; // importera moviesRouter



dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


// kontrollera miljövariabler
if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

// MongoDB anslutning med felhantering
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // avsluta processen om anslutningen misslyckas
  });


// routes 


app.use('/api/v1/movies', moviesRouter); // Prefixa alla movie-endpoints med /api/v1/movies

app.use(siteRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
