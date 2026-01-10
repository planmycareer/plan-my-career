import mongoose from 'mongoose';
import CollegeCutoff from './server/models/CollegeCutoff.js';

async function checkRoundData() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/career-web');
    console.log('\n✅ Connected to MongoDB\n');

    // Check a specific college across rounds
    const samples = await CollegeCutoff.find({
      collegeName: { $regex: 'IIT Bombay', $options: 'i' },
      branchName: { $regex: 'Computer Science', $options: 'i' },
      category: 'General',
      quota: 'AI'
    }).sort({ round: 1 });

    console.log('🔍 IIT Bombay - Computer Science - General - AI Quota:\n');
    
    if (samples.length === 0) {
      console.log('   No data found. Trying broader search...\n');
      
      // Try any IIT with Computer
      const broader = await CollegeCutoff.find({
        collegeName: { $regex: 'IIT', $options: 'i' },
        branchName: { $regex: 'Computer', $options: 'i' },
        category: 'General',
        quota: 'AI',
        round: { $in: [1, 2, 3] }
      }).sort({ round: 1, closing_rank: 1 }).limit(6);

      console.log('📊 Sample IIT Computer branches across rounds:\n');
      broader.forEach(c => {
        console.log(`   Round ${c.round}: ${c.collegeName} - ${c.branchName}`);
        console.log(`   Closing Rank: ${c.closing_rank}\n`);
      });
    } else {
      samples.forEach(c => {
        console.log(`   Round ${c.round}: Closing Rank = ${c.closing_rank}`);
      });
    }

    // Check if rounds have different data
    console.log('\n📊 Count by Round:');
    const roundCounts = await CollegeCutoff.aggregate([
      { $match: { round: { $ne: null } } },
      { $group: { _id: '$round', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    roundCounts.forEach(r => {
      console.log(`   Round ${r._id}: ${r.count.toLocaleString()} cutoffs`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkRoundData();
