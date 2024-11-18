import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  startTime: Date,
  endTime: Date,
  roomNumber: Number,
  pricePerSeat: Number,
  availableSeats: [String],
  bookedSeats: [String],
});

const Show = mongoose.model('Show', showSchema);

export default Show;