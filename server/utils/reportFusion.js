// Report Fusion Engine - Combines all 7 section reports into unified career report

import { getSectionInsights } from './sectionReports.js'

// Career path database based on section strengths
const CAREER_PATHS = {
  'High Aptitude + High Skills': [
    {
      title: 'Software Engineer',
      match_percentage: 95,
      avg_salary: '₹8-25 LPA',
      demand: 'Very High',
      required_education: ['B.Tech CSE', 'B.Sc CS', 'BCA'],
      top_colleges: ['IITs', 'NITs', 'IIIT', 'BITS'],
    },
    {
      title: 'Data Scientist',
      match_percentage: 92,
      avg_salary: '₹10-30 LPA',
      demand: 'Very High',
      required_education: ['B.Tech CSE/IT', 'B.Sc Data Science'],
      top_colleges: ['IITs', 'IISc', 'Top NITs'],
    },
  ],
  'High Interest + High Motivation': [
    {
      title: 'Entrepreneur',
      match_percentage: 90,
      avg_salary: 'Variable (High Potential)',
      demand: 'High',
      required_education: ['Any Bachelor + MBA', 'Startup Programs'],
      top_colleges: ['IIMs', 'ISB', 'FMS'],
    },
    {
      title: 'Product Manager',
      match_percentage: 88,
      avg_salary: '₹12-40 LPA',
      demand: 'High',
      required_education: ['B.Tech + MBA', 'B.Sc + MBA'],
      top_colleges: ['IIMs', 'IITs', 'Top Business Schools'],
    },
  ],
  'High Personality + High Work Preference': [
    {
      title: 'Human Resources Manager',
      match_percentage: 89,
      avg_salary: '₹6-20 LPA',
      demand: 'High',
      required_education: ['BBA/MBA HR', 'Psychology + MBA'],
      top_colleges: ['XLRI', 'TISS', 'IIMs'],
    },
    {
      title: 'Marketing Manager',
      match_percentage: 87,
      avg_salary: '₹7-25 LPA',
      demand: 'High',
      required_education: ['BBA/MBA Marketing', 'Mass Communication'],
      top_colleges: ['IIMs', 'FMS', 'MICA'],
    },
  ],
  'Engineering Stream': [
    {
      title: 'Mechanical Engineer',
      match_percentage: 85,
      avg_salary: '₹5-15 LPA',
      demand: 'Moderate',
      required_education: ['B.Tech Mechanical'],
      top_colleges: ['IITs', 'NITs', 'BITS'],
    },
    {
      title: 'Civil Engineer',
      match_percentage: 83,
      avg_salary: '₹4-12 LPA',
      demand: 'Moderate',
      required_education: ['B.Tech Civil'],
      top_colleges: ['IITs', 'NITs', 'DCE'],
    },
  ],
  'Medical Stream': [
    {
      title: 'Doctor (MBBS)',
      match_percentage: 95,
      avg_salary: '₹8-50 LPA (varies)',
      demand: 'Very High',
      required_education: ['MBBS', 'MD/MS Specialization'],
      top_colleges: ['AIIMS', 'CMC', 'JIPMER', 'Top Medical Colleges'],
    },
    {
      title: 'Pharmacist',
      match_percentage: 82,
      avg_salary: '₹3-10 LPA',
      demand: 'High',
      required_education: ['B.Pharm', 'M.Pharm'],
      top_colleges: ['NIPER', 'ICT Mumbai', 'BITS'],
    },
  ],
  'Commerce Stream': [
    {
      title: 'Chartered Accountant',
      match_percentage: 90,
      avg_salary: '₹7-30 LPA',
      demand: 'Very High',
      required_education: ['B.Com + CA'],
      top_colleges: ['SRCC', 'St. Xavier\'s', 'Loyola'],
    },
    {
      title: 'Investment Banker',
      match_percentage: 88,
      avg_salary: '₹10-50 LPA',
      demand: 'High',
      required_education: ['B.Com/BBA + MBA Finance'],
      top_colleges: ['IIMs', 'ISB', 'XLRI'],
    },
  ],
  'Arts/Humanities Stream': [
    {
      title: 'Psychologist',
      match_percentage: 86,
      avg_salary: '₹4-15 LPA',
      demand: 'High',
      required_education: ['BA/BSc Psychology', 'MA/MSc Psychology'],
      top_colleges: ['DU', 'Christ University', 'Fergusson'],
    },
    {
      title: 'Journalist',
      match_percentage: 84,
      avg_salary: '₹4-12 LPA',
      demand: 'Moderate',
      required_education: ['BA Journalism', 'Mass Communication'],
      top_colleges: ['IIMC', 'Symbiosis', 'Xavier\'s'],
    },
  ],
  'Creative Fields': [
    {
      title: 'Graphic Designer',
      match_percentage: 87,
      avg_salary: '₹3-12 LPA',
      demand: 'High',
      required_education: ['BFA', 'B.Des', 'Diploma Design'],
      top_colleges: ['NID', 'NIFT', 'Srishti'],
    },
    {
      title: 'Content Creator',
      match_percentage: 85,
      avg_salary: '₹3-20 LPA',
      demand: 'Very High',
      required_education: ['Any Bachelor\'s', 'Mass Communication'],
      top_colleges: ['Any University + Portfolio'],
    },
  ],
}

// Generate unified career report
export function generateUnifiedReport(test, sectionScores) {
  const sortedSections = [...sectionScores].sort((a, b) => b.percentage - a.percentage)
  const topSections = sortedSections.slice(0, 3)
  const weakSections = sortedSections.filter((s) => s.strength_level === 'Needs Improvement' || s.strength_level === 'Average')
  
  // Generate section insights
  const section_insights = sectionScores.map((sectionScore) => {
    const { insights, recommendations } = getSectionInsights(sectionScore.section, sectionScore.strength_level)
    return {
      section: sectionScore.section,
      score: sectionScore.raw_score,
      percentage: sectionScore.percentage,
      strength_level: sectionScore.strength_level,
      insights,
      recommendations,
    }
  })
  
  // Generate summary
  const summary = generateSummary(test.overall_percentage, test.dominant_profile, topSections)
  
  // Extract top strengths
  const top_strengths = topSections.map((s) => `${s.section} (${s.percentage}%)`)
  
  // Extract areas to improve
  const areas_to_improve = weakSections.map((s) => `${s.section} (${s.percentage}%)`)
  
  // Recommend streams based on profile
  const recommended_streams = recommendStreams(topSections, test.dominant_profile)
  
  // Recommend courses
  const recommended_courses = recommendCourses(topSections, recommended_streams)
  
  // Generate career paths
  const career_paths = generateCareerPaths(topSections, recommended_streams)
  
  // Generate action plan
  const { immediate_actions, short_term_goals, long_term_goals } = generateActionPlan(topSections, weakSections, test.overall_percentage)
  
  // Counsellor notes
  const counsellor_notes = generateCounsellorNotes(test.overall_percentage, topSections, weakSections)
  
  return {
    summary,
    dominant_profile: test.dominant_profile,
    overall_percentage: test.overall_percentage,
    section_insights,
    top_strengths,
    areas_to_improve,
    recommended_streams,
    recommended_courses,
    career_paths,
    immediate_actions,
    short_term_goals,
    long_term_goals,
    counsellor_notes,
  }
}

function generateSummary(overallPercentage, dominantProfile, topSections) {
  const topNames = topSections.map((s) => s.section).join(', ')
  
  if (overallPercentage >= 75) {
    return `Congratulations! You have demonstrated excellent performance across multiple dimensions of the assessment. Your dominant profile is "${dominantProfile}", with exceptional strength in ${topNames}. You have a clear advantage for pursuing high-achievement career paths. Your strong foundation positions you well for competitive entrance exams and premium institutions.`
  }
  if (overallPercentage >= 60) {
    return `You have shown strong performance in this comprehensive psychometric assessment. Your profile is "${dominantProfile}", with notable strengths in ${topNames}. You have solid potential for achieving your career goals with focused effort. Your assessment indicates good readiness for higher education and professional development.`
  }
  if (overallPercentage >= 45) {
    return `Your assessment reveals a developing profile with room for growth. You demonstrate "${dominantProfile}" characteristics, with emerging strengths in ${topNames}. With strategic planning and skill development, you can build a successful career path. This assessment provides clear direction for improvement areas.`
  }
  return `Your assessment provides valuable insights into your current abilities and areas for development. Your profile leans toward "${dominantProfile}", with potential in ${topNames}. This is an excellent starting point for focused improvement. With guidance and consistent effort, you can significantly enhance your career readiness.`
}

function recommendStreams(topSections, dominantProfile) {
  const topNames = topSections.map((s) => s.section)
  const streams = []
  
  if (topNames.includes('Aptitude') || topNames.includes('Skills')) {
    streams.push('Science (PCM) - Engineering & Technology')
    streams.push('Science (PCB) - Medical & Life Sciences')
  }
  
  if (topNames.includes('Interest') || topNames.includes('Motivation')) {
    streams.push('Commerce - Business & Finance')
    streams.push('Science with Research Focus')
  }
  
  if (topNames.includes('Personality') || topNames.includes('Work Preference')) {
    streams.push('Humanities & Social Sciences')
    streams.push('Commerce - Management & Marketing')
  }
  
  if (topNames.includes('Learning Style')) {
    streams.push('Any stream with strong academic focus')
  }
  
  return streams.length > 0 ? streams : ['Explore multiple options based on your interests']
}

function recommendCourses(topSections, streams) {
  const courses = []
  
  streams.forEach((stream) => {
    if (stream.includes('Engineering')) {
      courses.push('B.Tech Computer Science', 'B.Tech Mechanical', 'B.Tech Electrical')
    }
    if (stream.includes('Medical')) {
      courses.push('MBBS', 'BDS', 'B.Pharm', 'Nursing')
    }
    if (stream.includes('Commerce') && stream.includes('Business')) {
      courses.push('B.Com (Hons)', 'BBA', 'CA', 'CS')
    }
    if (stream.includes('Management')) {
      courses.push('BBA', 'B.Com + MBA', 'Hotel Management')
    }
    if (stream.includes('Humanities')) {
      courses.push('BA Psychology', 'BA Economics', 'Law (5-year integrated)', 'Mass Communication')
    }
  })
  
  return [...new Set(courses)].slice(0, 6)
}

function generateCareerPaths(topSections, streams) {
  const paths = []
  
  // Match section strengths to career categories
  const topNames = topSections.map((s) => s.section)
  
  if (topNames.includes('Aptitude') && topNames.includes('Skills')) {
    paths.push(...CAREER_PATHS['High Aptitude + High Skills'])
  }
  
  if (topNames.includes('Interest') && topNames.includes('Motivation')) {
    paths.push(...CAREER_PATHS['High Interest + High Motivation'])
  }
  
  if (topNames.includes('Personality') && topNames.includes('Work Preference')) {
    paths.push(...CAREER_PATHS['High Personality + High Work Preference'])
  }
  
  // Add stream-based careers
  streams.forEach((stream) => {
    if (stream.includes('Engineering') && !paths.some((p) => p.title.includes('Engineer'))) {
      paths.push(...CAREER_PATHS['Engineering Stream'].slice(0, 1))
    }
    if (stream.includes('Medical') && !paths.some((p) => p.title.includes('Doctor'))) {
      paths.push(...CAREER_PATHS['Medical Stream'].slice(0, 1))
    }
    if (stream.includes('Commerce') && !paths.some((p) => p.title.includes('Accountant'))) {
      paths.push(...CAREER_PATHS['Commerce Stream'].slice(0, 1))
    }
    if (stream.includes('Humanities') && !paths.some((p) => p.title.includes('Psychologist'))) {
      paths.push(...CAREER_PATHS['Arts/Humanities Stream'].slice(0, 1))
    }
  })
  
  // Default fallback
  if (paths.length === 0) {
    paths.push(...CAREER_PATHS['Engineering Stream'].slice(0, 2))
  }
  
  return paths.slice(0, 5)
}

function generateActionPlan(topSections, weakSections, overallPercentage) {
  const immediate_actions = [
    'Review your complete assessment report carefully',
    'Discuss results with parents and teachers',
    'Research recommended career paths in detail',
  ]
  
  if (weakSections.length > 0) {
    immediate_actions.push(`Focus on improving ${weakSections[0].section} through dedicated practice`)
  }
  
  const short_term_goals = [
    'Complete career exploration in recommended streams (1-2 months)',
    'Attend college open houses and career fairs',
    'Connect with professionals in fields of interest',
    'Start preparing for entrance exams relevant to chosen stream',
  ]
  
  const long_term_goals = [
    'Achieve target scores in board exams and competitive tests',
    'Secure admission to a top-tier college in your chosen field',
    'Build relevant skills through internships and projects',
    'Develop a 5-year career roadmap with milestones',
  ]
  
  return { immediate_actions, short_term_goals, long_term_goals }
}

function generateCounsellorNotes(overallPercentage, topSections, weakSections) {
  const notes = []
  
  notes.push(`Overall Performance: ${overallPercentage}% - ${overallPercentage >= 70 ? 'Strong' : overallPercentage >= 50 ? 'Moderate' : 'Developing'}`)
  notes.push(`Top Strengths: ${topSections.map((s) => s.section).join(', ')}`)
  
  if (weakSections.length > 0) {
    notes.push(`Areas Needing Attention: ${weakSections.map((s) => s.section).join(', ')}`)
  }
  
  notes.push('Recommendation: Schedule a detailed 1-on-1 counselling session to create a personalized career roadmap.')
  notes.push('Suggested Follow-up: College selection guidance and entrance exam strategy planning.')
  
  return notes.join('\n\n')
}
