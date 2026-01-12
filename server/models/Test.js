import mongoose from 'mongoose'

// New flexible schema for test results
const testSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  // Raw answers submitted by user
  answers: { 
    type: Map, 
    of: mongoose.Schema.Types.Mixed,
    required: true 
  },
  
  // Calculated scores for each subsection
  scores: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Best performing subsection per section
  bestSubsections: {
    type: Map,
    of: String,
    default: {}
  },
  
  // Complete generated report
  report: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Completion timestamp
  completedAt: { 
    type: Date, 
    default: Date.now 
  },
  
  // Status tracking
  status: { 
    type: String, 
    enum: ['in_progress', 'completed'], 
    default: 'completed' 
  },
  
  // Time taken to complete (seconds)
  timeTaken: { 
    type: Number 
  }
}, {
  timestamps: true
})

// Indexes for efficient queries
testSchema.index({ user: 1, completedAt: -1 })
testSchema.index({ user: 1, status: 1 })

export default mongoose.model('Test', testSchema)

