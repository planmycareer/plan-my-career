import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  class: { type: String, enum: ['10th', '11th', '12th', '12th Passed'], required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  phone: { type: String },
  state: { type: String },
  category: { type: String, enum: ['General', 'OBC', 'SC', 'ST', 'EWS'] },
  purchasedServices: [{ 
    type: String, 
    enum: ['college-predictor', 'career-test', 'counselling-session', 'full-access'] 
  }], // Track which services user has purchased
  services: [{
    type: String,
    enum: ['college-predictor', 'career-test', 'counselling-session', 'full-access']
  }],
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
})

userSchema.index({ email: 1 })

export default mongoose.model('User', userSchema)
