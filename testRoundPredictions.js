// Test round-wise prediction differences
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/predictor/predict';

async function testRoundPredictions() {
  console.log('\n🎯 Testing Round-Wise Predictions\n');
  console.log('Test Case: JEE Rank 1000, General Category, AI Quota, Gender-Neutral\n');
  
  const baseQuery = {
    exam: 'JEE',
    rank: 1000,
    category: 'General',
    quota: 'AI',
    gender: 'Gender-Neutral'
  };

  for (let round = 1; round <= 5; round++) {
    try {
      const response = await axios.post(API_URL, {
        ...baseQuery,
        round
      });

      const data = response.data;
      const total = data.highChance.length + data.mediumChance.length + data.dreamColleges.length;
      
      console.log(`📍 Round ${round}:`);
      console.log(`   Total colleges: ${total}`);
      console.log(`   High chance: ${data.highChance.length}`);
      console.log(`   Medium chance: ${data.mediumChance.length}`);
      console.log(`   Dream colleges: ${data.dreamColleges.length}`);
      
      if (data.highChance.length > 0) {
        console.log(`   Top match: ${data.highChance[0].collegeName}`);
        console.log(`              ${data.highChance[0].branchName.substring(0, 60)}...`);
        console.log(`              Closing Rank: ${data.highChance[0].closing_rank}`);
      }
      console.log();
      
    } catch (error) {
      console.error(`❌ Round ${round} error:`, error.message);
      if (error.response) {
        console.error(`   Status: ${error.response.status}`);
        console.error(`   Data:`, error.response.data);
      }
    }
  }

  console.log('\n✅ Test complete! Notice how results differ by round.\n');
  process.exit(0);
}

testRoundPredictions();
