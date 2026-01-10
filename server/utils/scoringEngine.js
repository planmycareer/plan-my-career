// Scoring Engine - Rule-based system for psychometric analysis

export const SECTIONS = {
  APTITUDE: 'Aptitude',
  INTEREST: 'Interest',
  PERSONALITY: 'Personality',
  SKILLS: 'Skills',
  LEARNING_STYLE: 'Learning Style',
  MOTIVATION: 'Motivation',
  WORK_PREFERENCE: 'Work Preference',
}

// Strength level rules
export function getStrengthLevel(percentage) {
  if (percentage >= 80) return 'Excellent'
  if (percentage >= 60) return 'Strong'
  if (percentage >= 40) return 'Average'
  return 'Needs Improvement'
}

// Calculate section scores from test answers
export function calculateSectionScores(answers, questions) {
  const sectionMap = {}
  
  // Group answers by section
  answers.forEach((answer) => {
    if (!sectionMap[answer.section]) {
      sectionMap[answer.section] = {
        raw_score: 0,
        max_score: 0,
      }
    }
    sectionMap[answer.section].raw_score += answer.score * (answer.weight || 1)
    
    // Find max possible score for this question
    const question = questions.find((q) => q.question_id === answer.question_id)
    if (question) {
      const maxOptionScore = Math.max(...question.options.map((o) => o.score))
      sectionMap[answer.section].max_score += maxOptionScore * (question.weight || 1)
    }
  })
  
  // Convert to percentage and strength level
  const sectionScores = Object.keys(sectionMap).map((section) => {
    const { raw_score, max_score } = sectionMap[section]
    const percentage = max_score > 0 ? Math.round((raw_score / max_score) * 100) : 0
    
    return {
      section,
      raw_score,
      max_score,
      percentage,
      strength_level: getStrengthLevel(percentage),
    }
  })
  
  return sectionScores
}

// Determine dominant profile based on top sections
export function getDominantProfile(sectionScores) {
  const sorted = [...sectionScores].sort((a, b) => b.percentage - a.percentage)
  const top3 = sorted.slice(0, 3).map((s) => s.section)
  
  // Profile mapping logic
  if (top3.includes(SECTIONS.APTITUDE) && top3.includes(SECTIONS.SKILLS)) {
    return 'Analytical & Problem Solver'
  }
  if (top3.includes(SECTIONS.INTEREST) && top3.includes(SECTIONS.MOTIVATION)) {
    return 'Passionate & Driven Explorer'
  }
  if (top3.includes(SECTIONS.PERSONALITY) && top3.includes(SECTIONS.WORK_PREFERENCE)) {
    return 'People-Oriented Leader'
  }
  if (top3.includes(SECTIONS.LEARNING_STYLE) && top3.includes(SECTIONS.APTITUDE)) {
    return 'Strategic Learner'
  }
  if (top3.includes(SECTIONS.SKILLS)) {
    return 'Practical & Hands-On'
  }
  
  return `${top3[0]} Dominant`
}

// Calculate overall stats
export function calculateOverallStats(sectionScores) {
  const total_score = sectionScores.reduce((sum, s) => sum + s.raw_score, 0)
  const total_max_score = sectionScores.reduce((sum, s) => sum + s.max_score, 0)
  const overall_percentage = total_max_score > 0 ? Math.round((total_score / total_max_score) * 100) : 0
  
  return {
    total_score,
    total_max_score,
    overall_percentage,
  }
}
