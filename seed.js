import mongoose from 'mongoose'
import dotenv from 'dotenv'
import CollegeCutoff from './server/models/CollegeCutoff.js'

dotenv.config()

const sampleCutoffs = [
  { collegeName: 'IIT Delhi', exam: 'JEE Advanced', state: 'Delhi', category: 'General', year: 2025, cutoffRank: 150 },
  { collegeName: 'IIT Bombay', exam: 'JEE Advanced', state: 'Maharashtra', category: 'General', year: 2025, cutoffRank: 120 },
  { collegeName: 'BITS Pilani', exam: 'BITSAT', state: 'Rajasthan', category: 'General', year: 2025, cutoffRank: 350 },
  { collegeName: 'NIT Trichy', exam: 'JEE Main', state: 'Tamil Nadu', category: 'General', year: 2025, cutoffRank: 5000 },
  { collegeName: 'IIIT Hyderabad', exam: 'JEE Main', state: 'Telangana', category: 'General', year: 2025, cutoffRank: 3000 },
  { collegeName: 'VIT Vellore', exam: 'VITEEE', state: 'Tamil Nadu', category: 'General', year: 2025, cutoffRank: 8000 },
  { collegeName: 'SRM Chennai', exam: 'SRMJEEE', state: 'Tamil Nadu', category: 'General', year: 2025, cutoffRank: 12000 },
  { collegeName: 'Manipal Institute', exam: 'MET', state: 'Karnataka', category: 'General', year: 2025, cutoffRank: 10000 },
  { collegeName: 'DTU Delhi', exam: 'JEE Main', state: 'Delhi', category: 'General', year: 2025, cutoffRank: 7000 },
  { collegeName: 'NSUT Delhi', exam: 'JEE Main', state: 'Delhi', category: 'General', year: 2025, cutoffRank: 8500 },
]

async function seedCutoffs() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB')
    
    await CollegeCutoff.deleteMany({})
    console.log('Cleared existing cutoffs')
    
    await CollegeCutoff.insertMany(sampleCutoffs)
    console.log('Seeded college cutoffs')
    
    process.exit(0)
  } catch (err) {
    console.error('Seed failed', err)
    process.exit(1)
  }
}

seedCutoffs()
