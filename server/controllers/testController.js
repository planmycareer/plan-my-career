// Enhanced Test Controller

import { getQuestions, submitTest } from '../services/testService.js'

export async function fetchQuestions(req, res, next) {
  try {
    const questions = await getQuestions()
    res.json({ 
      success: true, 
      questions,
      totalQuestions: questions.length,
      sections: [...new Set(questions.map(q => q.section))],
    })
  } catch (err) {
    next(err)
  }
}

export async function submit(req, res, next) {
  try {
    const { answers, time_taken } = req.body
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'Answers array is required' })
    }
    
    const test = await submitTest(req.user._id, answers, time_taken)
    
    res.json({ 
      success: true, 
      testId: test._id,
      overall_percentage: test.overall_percentage,
      dominant_profile: test.dominant_profile,
      section_scores: test.section_scores,
      message: 'Test submitted successfully',
    })
  } catch (err) {
    next(err)
  }
}

