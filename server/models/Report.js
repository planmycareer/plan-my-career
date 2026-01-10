import mongoose from 'mongoose'

const sectionInsightSchema = new mongoose.Schema({
  section: { type: String, required: true },
  score: { type: Number, required: true },
  percentage: { type: Number, required: true },
  strength_level: { type: String, required: true },
  insights: { type: String, required: true },
  recommendations: [String],
})

const careerPathSchema = new mongoose.Schema({
  title: { type: String, required: true },
  match_percentage: { type: Number, required: true },
  avg_salary: { type: String },
  demand: { type: String },
  required_education: [String],
  top_colleges: [String],
})

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  
  // Student Summary
  summary: { type: String, required: true },
  dominant_profile: { type: String, required: true },
  overall_percentage: { type: Number, required: true },
  
  // Section Analysis
  section_insights: [sectionInsightSchema],
  
  // Career Guidance
  top_strengths: [String],
  areas_to_improve: [String],
  recommended_streams: [String],
  recommended_courses: [String],
  career_paths: [careerPathSchema],
  
  // Action Plan
  immediate_actions: [String],
  short_term_goals: [String],
  long_term_goals: [String],
  
  // Counsellor Notes
  counsellor_notes: { type: String },
  
  // PDF
  pdf_url: { type: String },
  pdf_generated: { type: Boolean, default: false },
  
  createdAt: { type: Date, default: Date.now },
})

reportSchema.index({ user: 1, createdAt: -1 })
reportSchema.index({ test: 1 })

export default mongoose.model('Report', reportSchema)

