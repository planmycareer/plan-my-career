// Enhanced Test Service with 7-section scoring

import Question from '../models/Question.js'
import Test from '../models/Test.js'
import { calculateSectionScores, getDominantProfile, calculateOverallStats } from '../utils/scoringEngine.js'

export async function getQuestions() {
  // Fetch active questions from database, sorted by section and order
  const questions = await Question.find({ isActive: true }).sort({ section: 1, order: 1 })
  
  // Format for frontend
  return questions.map((q) => ({
    question_id: q.question_id,
    section: q.section,
    question_text: q.question_text,
    options: q.options.map((o) => ({ text: o.text, score: o.score })),
    weight: q.weight,
  }))
}

export async function submitTest(userId, answers, timeTaken = null) {
  // Fetch all questions for score calculation
  const questions = await Question.find({ isActive: true })
  
  // Map answers with scores
  const answersWithScores = answers.map((answer) => {
    const question = questions.find((q) => q.question_id === answer.question_id)
    if (!question) throw new Error(`Question ${answer.question_id} not found`)
    
    const selectedOption = question.options.find((o) => o.text === answer.selected_option)
    if (!selectedOption) throw new Error(`Invalid option for question ${answer.question_id}`)
    
    return {
      question_id: answer.question_id,
      section: question.section,
      selected_option: answer.selected_option,
      score: selectedOption.score,
      weight: question.weight,
    }
  })
  
  // Calculate section scores
  const sectionScores = calculateSectionScores(answersWithScores, questions)
  
  // Calculate overall stats
  const { total_score, total_max_score, overall_percentage } = calculateOverallStats(sectionScores)
  
  // Determine dominant profile
  const dominant_profile = getDominantProfile(sectionScores)
  
  // Create test submission
  const test = new Test({
    user: userId,
    answers: answersWithScores,
    total_score,
    total_max_score,
    overall_percentage,
    section_scores: sectionScores,
    dominant_profile,
    time_taken: timeTaken,
    status: 'completed',
  })
  
  await test.save()
  return test
}

