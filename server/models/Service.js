import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String }, // e.g., "1 hour", "2 sessions"
  features: [String],
  isActive: { type: Boolean, default: true },
  icon: { type: String },
  category: { type: String, enum: ['Counselling', 'Testing', 'Mentorship', 'Other'], default: 'Counselling' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Service', serviceSchema)
