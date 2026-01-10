import express from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middleware/validateRequest.js'
import { auth } from '../middleware/authMiddleware.js'
import { requirePayment } from '../middleware/paymentMiddleware.js'
import { predict } from '../controllers/predictorController.js'

const router = express.Router()

// College predictor now requires payment
router.post('/college', auth, requirePayment('college-predictor'), [
  body('exam').notEmpty().withMessage('Exam is required'),
  body('rank').isNumeric().withMessage('Rank must be a number'),
  body('category').notEmpty().withMessage('Category is required'),
  body('state').optional(), // State is optional
  body('quota').optional(), // Quota is optional
], validateRequest, predict)

export default router
