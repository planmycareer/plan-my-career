// College Cutoff Seeder - JEE & NEET Sample Data

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import CollegeCutoff from './server/models/CollegeCutoff.js'

dotenv.config()

const CUTOFFS = [
  // ========== JEE - IITs ==========
  {
    collegeName: 'IIT Delhi',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: null,
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 1,
    closing_rank: 63,
    college_type: 'IIT',
    fees: '₹2.5L/year',
  },
  {
    collegeName: 'IIT Bombay',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: null,
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 1,
    closing_rank: 67,
    college_type: 'IIT',
    fees: '₹2.5L/year',
  },
  {
    collegeName: 'IIT Madras',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: null,
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 1,
    closing_rank: 90,
    college_type: 'IIT',
    fees: '₹2.5L/year',
  },
  {
    collegeName: 'IIT Kanpur',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: null,
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 50,
    closing_rank: 225,
    college_type: 'IIT',
    fees: '₹2.5L/year',
  },
  {
    collegeName: 'IIT Kharagpur',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: null,
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 100,
    closing_rank: 354,
    college_type: 'IIT',
    fees: '₹2.5L/year',
  },
  {
    collegeName: 'IIT Roorkee',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: null,
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 150,
    closing_rank: 456,
    college_type: 'IIT',
    fees: '₹2.5L/year',
  },
  
  // ========== JEE - NITs ==========
  {
    collegeName: 'NIT Trichy',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: 'Tamil Nadu',
    quota: 'HS',
    category: 'General',
    year: 2024,
    opening_rank: 1000,
    closing_rank: 3500,
    college_type: 'NIT',
    fees: '₹1.5L/year',
  },
  {
    collegeName: 'NIT Surathkal',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: 'Karnataka',
    quota: 'HS',
    category: 'General',
    year: 2024,
    opening_rank: 800,
    closing_rank: 3200,
    college_type: 'NIT',
    fees: '₹1.5L/year',
  },
  {
    collegeName: 'NIT Warangal',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: 'Telangana',
    quota: 'HS',
    category: 'General',
    year: 2024,
    opening_rank: 900,
    closing_rank: 3400,
    college_type: 'NIT',
    fees: '₹1.5L/year',
  },
  {
    collegeName: 'NIT Rourkela',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: 'Odisha',
    quota: 'HS',
    category: 'General',
    year: 2024,
    opening_rank: 2000,
    closing_rank: 5500,
    college_type: 'NIT',
    fees: '₹1.5L/year',
  },
  {
    collegeName: 'NIT Calicut',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: 'Kerala',
    quota: 'HS',
    category: 'General',
    year: 2024,
    opening_rank: 1500,
    closing_rank: 4200,
    college_type: 'NIT',
    fees: '₹1.5L/year',
  },
  
  // ========== JEE - IIITs ==========
  {
    collegeName: 'IIIT Hyderabad',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: 'Telangana',
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 100,
    closing_rank: 800,
    college_type: 'IIIT',
    fees: '₹3L/year',
  },
  {
    collegeName: 'IIIT Bangalore',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: 'Karnataka',
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 500,
    closing_rank: 2000,
    college_type: 'IIIT',
    fees: '₹3.5L/year',
  },
  {
    collegeName: 'IIIT Delhi',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: 'Delhi',
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 600,
    closing_rank: 2500,
    college_type: 'IIIT',
    fees: '₹3L/year',
  },
  
  // ========== JEE - Private (BITS) ==========
  {
    collegeName: 'BITS Pilani',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: 'Rajasthan',
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 500,
    closing_rank: 2000,
    college_type: 'Private',
    fees: '₹5L/year',
  },
  {
    collegeName: 'BITS Goa',
    branchName: 'Computer Science and Engineering',
    exam: 'JEE',
    state: 'Goa',
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 1500,
    closing_rank: 4000,
    college_type: 'Private',
    fees: '₹5L/year',
  },
  
  // ========== NEET - AIIMS ==========
  {
    collegeName: 'AIIMS Delhi',
    branchName: 'MBBS',
    exam: 'NEET',
    state: 'Delhi',
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 1,
    closing_rank: 50,
    college_type: 'Medical',
    fees: '₹1.5L (total)',
  },
  {
    collegeName: 'AIIMS Jodhpur',
    branchName: 'MBBS',
    exam: 'NEET',
    state: 'Rajasthan',
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 50,
    closing_rank: 300,
    college_type: 'Medical',
    fees: '₹1.5L (total)',
  },
  {
    collegeName: 'AIIMS Rishikesh',
    branchName: 'MBBS',
    exam: 'NEET',
    state: 'Uttarakhand',
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 100,
    closing_rank: 400,
    college_type: 'Medical',
    fees: '₹1.5L (total)',
  },
  
  // ========== NEET - Government Medical Colleges ==========
  {
    collegeName: 'Maulana Azad Medical College',
    branchName: 'MBBS',
    exam: 'NEET',
    state: 'Delhi',
    quota: 'HS',
    category: 'General',
    year: 2024,
    opening_rank: 100,
    closing_rank: 800,
    college_type: 'Medical',
    fees: '₹10K/year',
  },
  {
    collegeName: 'Grant Medical College',
    branchName: 'MBBS',
    exam: 'NEET',
    state: 'Maharashtra',
    quota: 'HS',
    category: 'General',
    year: 2024,
    opening_rank: 200,
    closing_rank: 1500,
    college_type: 'Medical',
    fees: '₹15K/year',
  },
  {
    collegeName: 'Madras Medical College',
    branchName: 'MBBS',
    exam: 'NEET',
    state: 'Tamil Nadu',
    quota: 'HS',
    category: 'General',
    year: 2024,
    opening_rank: 300,
    closing_rank: 2000,
    college_type: 'Medical',
    fees: '₹12K/year',
  },
  {
    collegeName: 'King George Medical University',
    branchName: 'MBBS',
    exam: 'NEET',
    state: 'Uttar Pradesh',
    quota: 'HS',
    category: 'General',
    year: 2024,
    opening_rank: 500,
    closing_rank: 3000,
    college_type: 'Medical',
    fees: '₹20K/year',
  },
  
  // ========== NEET - Private Medical Colleges ==========
  {
    collegeName: 'Christian Medical College (CMC)',
    branchName: 'MBBS',
    exam: 'NEET',
    state: 'Tamil Nadu',
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 50,
    closing_rank: 500,
    college_type: 'Private',
    fees: '₹60K/year',
  },
  {
    collegeName: 'Kasturba Medical College',
    branchName: 'MBBS',
    exam: 'NEET',
    state: 'Karnataka',
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 1000,
    closing_rank: 8000,
    college_type: 'Private',
    fees: '₹15L/year',
  },
  {
    collegeName: 'St. John\'s Medical College',
    branchName: 'MBBS',
    exam: 'NEET',
    state: 'Karnataka',
    quota: 'AI',
    category: 'General',
    year: 2024,
    opening_rank: 2000,
    closing_rank: 10000,
    college_type: 'Private',
    fees: '₹12L/year',
  },
]

async function seedCutoffs() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career-web')
    console.log('✅ Connected to MongoDB')
    
    // Clear existing cutoffs
    await CollegeCutoff.deleteMany({})
    console.log('🗑️  Cleared existing cutoffs')
    
    // Insert new cutoffs
    await CollegeCutoff.insertMany(CUTOFFS)
    console.log(`✅ Inserted ${CUTOFFS.length} college cutoffs`)
    
    // Verify by exam
    const jeeCount = await CollegeCutoff.countDocuments({ exam: 'JEE' })
    const neetCount = await CollegeCutoff.countDocuments({ exam: 'NEET' })
    console.log(`   JEE: ${jeeCount} entries`)
    console.log(`   NEET: ${neetCount} entries`)
    
    console.log('\n🎉 Cutoff seeding complete!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding cutoffs:', error)
    process.exit(1)
  }
}

seedCutoffs()
