import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseDate: { type: String, required: true }, // releaseDate som sträng
  genre: { type: String, required: true },
  director: { type: String, required: true },
  duration: { type: Number, required: true }, // Längd i minuter
  posterUrl: { type: String, default: 'https://via.placeholder.com/150' } // Standardbild om ingen finns
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
