// Enhanced College Predictor Service (JEE + NEET)

import CollegeCutoff from '../models/CollegeCutoff.js'

export async function predictColleges({ exam, rank, category, state, quota = 'AI', round = null, gender = null }) {
  // Validate inputs
  if (!exam || !rank || !category) {
    throw { statusCode: 400, message: 'exam, rank, and category are required' }
  }
  
  // Debug logging
  console.log('🔍 Predictor Query:', { exam, rank, category, state, quota, round, gender })

  const normalizedExam = String(exam).toUpperCase()
  const normalizedRound = round ? parseInt(round) : null
  const normalizedGender = gender ? String(gender) : null

  const buildBaseQuery = () => {
    const query = {
      exam: normalizedExam,
      category,
      isActive: true,
    }

    // Add state filter only if provided and quota is relevant
    if (state && (quota === 'HS' || quota === 'OS')) {
      query.state = state
    }

    if (quota) {
      query.quota = quota
    }

    return query
  }

  const addGenderClause = (query) => {
    if (!normalizedGender) return query

    // Many datasets either omit gender entirely or use a slightly different label.
    // Treat missing/NULL gender as Gender-Neutral when the user selects Gender-Neutral.
    // (We still keep exact matches when present.)
    const treatMissingAsNeutral = normalizedGender === 'Gender-Neutral'
    const genderOr = treatMissingAsNeutral
      ? [{ gender: normalizedGender }, { gender: { $exists: false } }, { gender: null }]
      : [{ gender: normalizedGender }]

    // Preserve any existing logical clauses.
    const andClauses = query.$and ? [...query.$and] : []
    andClauses.push({ $or: genderOr })
    return { ...query, $and: andClauses }
  }

  const findCutoffs = async (query) => {
    console.log('📊 Final MongoDB Query:', query)
    const cutoffs = await CollegeCutoff.find(query).sort({ closing_rank: 1 })
    console.log(`✅ Found ${cutoffs.length} colleges matching criteria`)
    return cutoffs
  }

  const pickLatestRound = async (queryWithoutRound) => {
    const rounds = await CollegeCutoff.distinct('round', queryWithoutRound)
    const numericRounds = rounds
      .map((r) => (typeof r === 'number' ? r : parseInt(r)))
      .filter((r) => Number.isFinite(r))

    if (numericRounds.length === 0) return null
    return Math.max(...numericRounds)
  }

  // 1) Try exact filters first.
  let query = buildBaseQuery()
  if (normalizedRound) query.round = normalizedRound
  query = addGenderClause(query)

  let cutoffs = await findCutoffs(query)

  // 2) If nothing found and a round was selected, fall back to the latest available round
  // for the same filters (category/quota/state/gender).
  let usedRound = normalizedRound
  let usedFallback = false

  if (cutoffs.length === 0 && normalizedRound) {
    const baseNoRound = { ...query }
    delete baseNoRound.round
    const latest = await pickLatestRound(baseNoRound)

    if (latest && latest !== normalizedRound) {
      usedRound = latest
      usedFallback = true
      cutoffs = await findCutoffs({ ...baseNoRound, round: latest })
    }
  }

  // 3) If still nothing found and gender was selected, try again without gender restriction.
  if (cutoffs.length === 0 && normalizedGender) {
    const relaxed = buildBaseQuery()
    if (usedRound) relaxed.round = usedRound
    cutoffs = await findCutoffs(relaxed)
    if (cutoffs.length > 0) usedFallback = true
  }
  
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
    round: usedRound || undefined,
    note: usedFallback ? 'Showing closest available cutoff data based on your filters.' : undefined,
    highChance: highChance.slice(0, 20), // Limit results
    mediumChance: mediumChance.slice(0, 15),
    dreamColleges: dreamColleges.slice(0, 10),
    totalCollegesAnalyzed: cutoffs.length,
    disclaimer: '⚠️ Predictions are indicative based on previous year data. Cutoffs change every year. Always refer to official counselling portals (JoSAA, MCC) for final decisions.',
  }
}

