import express from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middleware/validateRequest.js'
import { auth } from '../middleware/authMiddleware.js'
import { requirePayment } from '../middleware/paymentMiddleware.js'
import { fetchQuestions, submit } from '../controllers/testController.js'

const router = express.Router()

router.get('/questions', auth, requirePayment('career-test'), fetchQuestions)

router.post('/submit', auth, requirePayment('career-test'), [
  body('answers').isObject().withMessage('Answers object required')
], validateRequest, submit)

export default router
