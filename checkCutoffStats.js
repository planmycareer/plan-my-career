// Check imported cutoff data stats
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import CollegeCutoff from './server/models/CollegeCutoff.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career-web'

async function checkStats() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ Connected to MongoDB\n')

    // Total count
    const total = await CollegeCutoff.countDocuments()
    console.log(`📊 Total Cutoffs: ${total}`)

    // Count by exam
    const jeeCount = await CollegeCutoff.countDocuments({ exam: 'JEE' })
    const neetCount = await CollegeCutoff.countDocuments({ exam: 'NEET' })
    console.log(`\n📚 By Exam:`)
    console.log(`   JEE: ${jeeCount}`)
    console.log(`   NEET: ${neetCount}`)

    // Count by category
    const categories = await CollegeCutoff.aggregate([
      { $group: { _id: '$category', count: { $count: {} } } },
      { $sort: { count: -1 } }
    ])
    console.log(`\n👥 By Category:`)
    categories.forEach(c => console.log(`   ${c._id}: ${c.count}`))

    // Count by college type
    const types = await CollegeCutoff.aggregate([
      { $group: { _id: '$college_type', count: { $count: {} } } },
      { $sort: { count: -1 } }
    ])
    console.log(`\n🏛️ By College Type:`)
    types.forEach(t => console.log(`   ${t._id}: ${t.count}`))

    // Sample data
    console.log(`\n📋 Sample Entries (First 5):`)
    const samples = await CollegeCutoff.find().limit(5)
    samples.forEach((s, i) => {
      console.log(`\n${i + 1}. ${s.collegeName}`)
      console.log(`   Branch: ${s.branchName}`)
      console.log(`   Exam: ${s.exam} | Category: ${s.category}`)
      console.log(`   Ranks: ${s.opening_rank} - ${s.closing_rank}`)
      console.log(`   Type: ${s.college_type} | Year: ${s.year}`)
    })

    // Unique colleges
    const uniqueColleges = await CollegeCutoff.distinct('collegeName')
    console.log(`\n🎓 Unique Colleges: ${uniqueColleges.length}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

checkStats()
