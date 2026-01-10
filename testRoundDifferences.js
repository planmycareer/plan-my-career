import mongoose from 'mongoose';
import CollegeCutoff from './server/models/CollegeCutoff.js';

async function testRoundDifferences() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/career-web');
    console.log('\n✅ Connected to MongoDB\n');

    // Test a specific query matching what frontend sends
    const query = {
      exam: 'JEE',
      category: 'General',
      quota: 'AI',
      gender: 'Gender-Neutral',
      isActive: true
    };

    console.log('🔍 Testing: JEE - General - AI - Gender-Neutral\n');

    for (let round = 1; round <= 5; round++) {
      const results = await CollegeCutoff.find({ ...query, round })
        .sort({ closing_rank: 1 })
        .limit(5);

      console.log(`📍 Round ${round}:`);
      console.log(`   Total found: ${results.length}`);
      
      if (results.length > 0) {
        console.log(`   Top college: ${results[0].collegeName}`);
        console.log(`   Branch: ${results[0].branchName.substring(0, 50)}...`);
        console.log(`   Closing Rank: ${results[0].closing_rank}`);
      }
      console.log();
    }

    // Check if a specific college has different ranks across rounds
    console.log('🎯 Checking specific college across rounds:\n');
    
    const sampleCollege = await CollegeCutoff.findOne({
      exam: 'JEE',
      category: 'General',
      quota: 'AI',
      gender: 'Gender-Neutral',
      round: 1
    }).sort({ closing_rank: 1 });

    if (sampleCollege) {
      console.log(`Tracking: ${sampleCollege.collegeName}`);
      console.log(`Branch: ${sampleCollege.branchName}\n`);

      const allRounds = await CollegeCutoff.find({
        collegeName: sampleCollege.collegeName,
        branchName: sampleCollege.branchName,
        category: 'General',
        quota: 'AI',
        gender: 'Gender-Neutral'
      }).sort({ round: 1 });

      allRounds.forEach(c => {
        console.log(`   Round ${c.round}: Closing Rank = ${c.closing_rank}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testRoundDifferences();
