import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema({
  question_id: { type: String, required: true },
  section: { type: String, required: true },
  selected_option: { type: String, required: true },
  score: { type: Number, required: true },
  weight: { type: Number, default: 1 },
})

const sectionScoreSchema = new mongoose.Schema({
  section: { type: String, required: true },
  raw_score: { type: Number, required: true },
  max_score: { type: Number, required: true },
  percentage: { type: Number, required: true },
  strength_level: { type: String, enum: ['Excellent', 'Strong', 'Average', 'Needs Improvement'], required: true },
})

const testSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [answerSchema],
  total_score: { type: Number, default: 0 },
  total_max_score: { type: Number, default: 0 },
  overall_percentage: { type: Number, default: 0 },
  section_scores: [sectionScoreSchema],
  dominant_profile: { type: String }, // Based on top sections
  status: { type: String, enum: ['in_progress', 'completed'], default: 'completed' },
  time_taken: { type: Number }, // seconds
  createdAt: { type: Date, default: Date.now },
})

testSchema.index({ user: 1, createdAt: -1 })

export default mongoose.model('Test', testSchema)

