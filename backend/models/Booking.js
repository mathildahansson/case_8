import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  seats: { type: [String], required: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  totalPrice: { type: Number, required: true },
  bookingTime: { type: Date, default: Date.now, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;