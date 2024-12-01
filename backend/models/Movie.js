import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  releaseDate: Date,
  posterUrl: { type: String, default: 'https://via.placeholder.com/150' }, // standardbild
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
