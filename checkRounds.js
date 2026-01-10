import mongoose from 'mongoose';
import CollegeCutoff from './server/models/CollegeCutoff.js';

async function checkRounds() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/career-web');
    console.log('\n✅ Connected to MongoDB\n');

    // Get round-wise distribution
    const rounds = await CollegeCutoff.aggregate([
      { $group: { _id: '$round', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    console.log('📊 Cutoffs by Round:\n');
    rounds.forEach(r => {
      console.log(`   Round ${r._id}: ${r.count.toLocaleString()} cutoffs`);
    });

    const total = await CollegeCutoff.countDocuments();
    console.log(`\n✅ Total: ${total.toLocaleString()} cutoffs across all rounds\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkRounds();
