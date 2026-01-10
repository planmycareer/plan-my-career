// Enhanced College Predictor Service (JEE + NEET)

import CollegeCutoff from '../models/CollegeCutoff.js'

export async function predictColleges({ exam, rank, category, state, quota = 'AI', round = null, gender = null }) {
  // Validate inputs
  if (!exam || !rank || !category) {
    throw { statusCode: 400, message: 'exam, rank, and category are required' }
  }
  
  // Debug logging
  console.log('🔍 Predictor Query:', { exam, rank, category, state, quota, round, gender })
  
  // Fetch cutoffs matching criteria
  const query = {
    exam: exam.toUpperCase(),
    category,
    isActive: true,
  }
  
  // Add round filter if provided (default to latest/highest round if not specified)
  if (round) {
    query.round = parseInt(round)
  }
  
  // Add gender filter if provided
  if (gender) {
    query.gender = gender
  }
  
  // Add state filter only if provided and quota is relevant
  if (state && (quota === 'HS' || quota === 'OS')) {
    query.state = state
  }
  
  if (quota) {
    query.quota = quota
  }
  
  console.log('📊 Final MongoDB Query:', query)
  
  const cutoffs = await CollegeCutoff.find(query).sort({ closing_rank: 1 })
  
  console.log(`✅ Found ${cutoffs.length} colleges matching criteria`)
  
  if (cutoffs.length === 0) {
    return {
      highChance: [],
      mediumChance: [],
      dreamColleges: [],
      message: 'No cutoff data available for the specified criteria',
      disclaimer: '⚠️ Predictions are indicative based on previous year data. Always refer to official counselling portals for final decisions.',
    }
  }
  
  // Categorization logic with buffer
  const buffer = Math.round(rank * 0.05) + 50 // 5% of rank + 50
  
  const highChance = []
  const mediumChance = []
  const dreamColleges = []
  
  cutoffs.forEach((college) => {
    const closingRank = college.closing_rank
    
    if (rank <= closingRank - buffer) {
      // High chance - rank is well within cutoff
      highChance.push({
        collegeName: college.collegeName,
        branchName: college.branchName,
        closing_rank: college.closing_rank,
        college_type: college.college_type,
        fees: college.fees || 'N/A',
        chance: 'High',
      })
    } else if (rank <= closingRank + buffer) {
      // Medium chance - rank is near cutoff
      mediumChance.push({
        collegeName: college.collegeName,
        branchName: college.branchName,
        closing_rank: college.closing_rank,
        college_type: college.college_type,
        fees: college.fees || 'N/A',
        chance: 'Medium',
      })
    } else if (rank <= closingRank + buffer * 3) {
      // Dream colleges - rank is below cutoff but within reach
      dreamColleges.push({
        collegeName: college.collegeName,
        branchName: college.branchName,
        closing_rank: college.closing_rank,
        college_type: college.college_type,
        fees: college.fees || 'N/A',
        chance: 'Dream',
      })
    }
  })
  
  return {
    rank,
    category,
    state: state || 'All India',
    quota,
    highChance: highChance.slice(0, 20), // Limit results
    mediumChance: mediumChance.slice(0, 15),
    dreamColleges: dreamColleges.slice(0, 10),
    totalCollegesAnalyzed: cutoffs.length,
    disclaimer: '⚠️ Predictions are indicative based on previous year data. Cutoffs change every year. Always refer to official counselling portals (JoSAA, MCC) for final decisions.',
  }
}

