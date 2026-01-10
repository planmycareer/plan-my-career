import mongoose from 'mongoose';
import CollegeCutoff from './server/models/CollegeCutoff.js';

async function compareSameCollege() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/career-web');
    console.log('\n✅ Connected to MongoDB\n');

    // Get a college name from Round 1
    const round1Sample = await CollegeCutoff.findOne({ 
      round: 1,
      collegeName: { $regex: 'IIIT', $options: 'i' }
    });

    if (!round1Sample) {
      console.log('❌ No Round 1 data found\n');
      process.exit(1);
    }

    const collegeName = round1Sample.collegeName;
    const branchName = round1Sample.branchName;
    const category = round1Sample.category;
    const quota = round1Sample.quota;

    console.log(`🔍 Tracking: ${collegeName}`);
    console.log(`   Branch: ${branchName}`);
    console.log(`   Category: ${category} | Quota: ${quota}\n`);

    // Find this same college in all rounds
    const allRounds = await CollegeCutoff.find({
      collegeName: collegeName,
      branchName: branchName,
      category: category,
      quota: quota
    }).sort({ round: 1 });

    console.log('📊 Same College Across Rounds:\n');
    
    if (allRounds.length === 0) {
      console.log('   ❌ No data found\n');
    } else if (allRounds.length === 1) {
      console.log(`   ⚠️ Only found in Round ${allRounds[0].round}`);
      console.log(`   Closing Rank: ${allRounds[0].closing_rank}\n`);
      console.log('   This college appears in ONLY ONE round!\n');
    } else {
      allRounds.forEach(c => {
        console.log(`   Round ${c.round}: Closing Rank = ${c.closing_rank}`);
      });
      console.log();
    }

    // Check a few more samples
    console.log('📋 Checking 5 random colleges:\n');
    const samples = await CollegeCutoff.aggregate([
      { $match: { round: 1 } },
      { $sample: { size: 5 } }
    ]);

    for (const sample of samples) {
      const rounds = await CollegeCutoff.find({
        collegeName: sample.collegeName,
        branchName: sample.branchName,
        category: sample.category,
        quota: sample.quota
      }).sort({ round: 1 });

      console.log(`${sample.collegeName.substring(0, 50)}...`);
      console.log(`   Found in ${rounds.length} round(s): ${rounds.map(r => r.round).join(', ')}`);
      if (rounds.length > 1) {
        console.log(`   Ranks: ${rounds.map(r => r.closing_rank).join(' → ')}`);
      }
      console.log();
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

compareSameCollege();
