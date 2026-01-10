import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  package: { type: String, required: true, enum: ['Basic', 'Premium', 'Career Roadmap'] },
  date: { type: String, required: true },
  time: { type: String, required: true },
  mode: { type: String, enum: ['online', 'offline'], default: 'online' },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  payment_status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  amount: { type: Number },
  notes: { type: String },
  counsellor_notes: { type: String },
  createdAt: { type: Date, default: Date.now },
})

bookingSchema.index({ user: 1, createdAt: -1 })
bookingSchema.index({ date: 1, time: 1 })
bookingSchema.index({ status: 1 })

export default mongoose.model('Booking', bookingSchema)

