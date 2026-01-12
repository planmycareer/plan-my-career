import express from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middleware/validateRequest.js'
import { auth } from '../middleware/authMiddleware.js'
import { requirePayment } from '../middleware/paymentMiddleware.js'
import { 
  getQuestions, 
  submitTest, 
  getLatestReport, 
  getTestById, 
  getTestHistory,
  fetchQuestions, 
  submit 
} from '../controllers/testController.js'

const router = express.Router()

// New API endpoints
router.get('/questions', auth, requirePayment('career-test'), getQuestions)
router.post('/submit', auth, requirePayment('career-test'), [
  body('answers').isObject().withMessage('Answers object required')
], validateRequest, submitTest)
router.get('/report', auth, getLatestReport)
router.get('/history', auth, getTestHistory)
router.get('/:testId', auth, getTestById)

// Legacy endpoints (for backward compatibility)
router.get('/legacy/questions', auth, requirePayment('career-test'), fetchQuestions)
router.post('/legacy/submit', auth, requirePayment('career-test'), [
  body('answers').isObject().withMessage('Answers object required')
], validateRequest, submit)

export default router
