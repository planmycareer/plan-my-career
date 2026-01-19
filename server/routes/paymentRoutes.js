import express from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middleware/validateRequest.js'
import { auth, verifyJWT } from '../middleware/authMiddleware.js'
import { requireAdmin } from '../middleware/paymentMiddleware.js'
import * as paymentController from '../controllers/paymentController.js'

const router = express.Router()

// Public route - Get service pricing
router.get('/pricing', paymentController.getPricing)

// Protected routes - require authentication
router.use(auth)

// Create payment order
router.post('/create-order', [
  body('service').notEmpty().isIn(['college-predictor', 'career-test', 'counselling-session', 'full-access'])
    .withMessage('Invalid service type'),
], validateRequest, paymentController.createOrder)

// Verify payment (webhook from payment gateway)
router.post('/verify', [
  body('orderId').notEmpty().withMessage('Order ID is required'),
  body('transactionId').notEmpty().withMessage('Transaction ID is required'),
], validateRequest, paymentController.verifyPayment)

// Check access to specific service
router.get('/check-access/:service', verifyJWT, paymentController.checkServiceAccess)

// Get user's payment history
router.get('/history', paymentController.getPaymentHistory)

// Get active subscriptions
router.get('/subscriptions', paymentController.getActiveSubscriptions)

// Admin routes
router.get('/admin/all', requireAdmin, paymentController.getAllPayments)

export default router
