import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  email: String,
  seats: [String],
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
  totalPrice: Number,
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
