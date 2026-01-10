import mongoose from 'mongoose'

const cutoffSchema = new mongoose.Schema({
  collegeName: { type: String, required: true },
  branchName: { type: String, required: true },
  exam: { type: String, required: true, enum: ['JEE', 'NEET'] },
  round: { type: Number, default: 1 }, // Round number (1-6)
  state: { type: String },
  quota: { type: String, enum: ['AI', 'HS', 'OS', 'GO', 'JK', 'LA'], default: 'AI' }, // All India, Home State, Other State, Goa, Jammu Kashmir, Ladakh
  category: { type: String, required: true, enum: ['General', 'OBC', 'SC', 'ST', 'EWS'] },
  gender: { type: String, enum: ['Gender-Neutral', 'Female-only'] }, // Gender filter
  year: { type: Number, required: true },
  opening_rank: { type: Number, required: true },
  closing_rank: { type: Number, required: true },
  college_type: { type: String, enum: ['IIT', 'NIT', 'IIIT', 'GFTI', 'Private', 'Government', 'Medical'], required: true },
  fees: { type: String },
  isActive: { type: Boolean, default: true },
})

cutoffSchema.index({ exam: 1, round: 1, state: 1, category: 1, closing_rank: 1 })
cutoffSchema.index({ collegeName: 1, branchName: 1, round: 1 })

// Unique compound index to prevent duplicate entries for same college-branch-round-category-quota-gender
cutoffSchema.index(
  { collegeName: 1, branchName: 1, round: 1, category: 1, quota: 1, gender: 1 },
  { unique: true }
)

export default mongoose.model('CollegeCutoff', cutoffSchema)


