import mongoose from 'mongoose'

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  score: { type: Number, required: true }, // Points for this option
})

const questionSchema = new mongoose.Schema({
  question_id: { type: String, required: true, unique: true },
  section: {
    type: String,
    required: true,
    enum: ['Aptitude', 'Interest', 'Personality', 'Skills', 'Learning Style', 'Motivation', 'Work Preference'],
  },
  question_text: { type: String, required: true },
  options: [optionSchema],
  weight: { type: Number, default: 1 }, // Importance multiplier
  order: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
})

questionSchema.index({ section: 1, order: 1 })
questionSchema.index({ question_id: 1 })

export default mongoose.model('Question', questionSchema)
