import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  service: {
    type: String,
    enum: ['college-predictor', 'career-test', 'counselling-session', 'full-access'],
    required: true
  },
  amount: { 
    type: Number, 
    required: true 
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'stripe', 'paypal', 'upi', 'card', 'netbanking'],
    default: 'razorpay'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true // Allows null values while maintaining uniqueness for non-null
  },
  orderId: {
    type: String,
    required: true
  },
  paymentDetails: {
    type: mongoose.Schema.Types.Mixed // Store payment gateway response
  },
  expiresAt: {
    type: Date,
    required: true // When this service access expires
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
})

// Index for faster queries
paymentSchema.index({ user: 1, service: 1, status: 1 })
paymentSchema.index({ transactionId: 1 })
paymentSchema.index({ expiresAt: 1 })

// Method to check if payment is valid and not expired
paymentSchema.methods.isValid = function() {
  return this.status === 'completed' && this.isActive && this.expiresAt > new Date()
}

// Static method to check if user has access to a service
paymentSchema.statics.hasAccess = async function(userId, service) {
  const payment = await this.findOne({
    user: userId,
    service: { $in: [service, 'full-access'] }, // Check specific service or full access
    status: 'completed',
    isActive: true,
    expiresAt: { $gt: new Date() }
  })
  
  return !!payment
}

export default mongoose.model('Payment', paymentSchema)
