// Payment Service for handling payments and subscriptions

import Payment from '../models/Payment.js'
import User from '../models/User.js'

// Service pricing (in INR)
const SERVICE_PRICES = {
  'college-predictor': 299, // ₹299 for 30 days
  'career-test': 499, // ₹499 for lifetime
  'counselling-session': 999, // ₹999 per session
  'full-access': 1499 // ₹1499 for 90 days
}

const SERVICE_VALIDITY = {
  'college-predictor': 30, // 30 days
  'career-test': 365 * 10, // 10 years (lifetime)
  'counselling-session': 90, // 90 days to book
  'full-access': 90 // 90 days
}

// Create payment order
export async function createPaymentOrder(userId, service) {
  if (!SERVICE_PRICES[service]) {
    throw { statusCode: 400, message: 'Invalid service type' }
  }

  const user = await User.findById(userId)
  if (!user) {
    throw { statusCode: 404, message: 'User not found' }
  }

  const amount = SERVICE_PRICES[service]
  const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`
  
  // Calculate expiry date
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + SERVICE_VALIDITY[service])

  // Create payment record
  const payment = await Payment.create({
    user: userId,
    service,
    amount,
    orderId,
    status: 'pending',
    expiresAt
  })

  return {
    orderId: payment.orderId,
    amount: payment.amount,
    currency: payment.currency,
    service: payment.service,
    validity: SERVICE_VALIDITY[service],
    expiresAt: payment.expiresAt,
    paymentId: payment._id
  }
}

// Verify payment (called after payment gateway confirms)
export async function verifyPayment(orderId, transactionId, paymentDetails) {
  const payment = await Payment.findOne({ orderId })
  
  if (!payment) {
    throw { statusCode: 404, message: 'Payment order not found' }
  }

  if (payment.status === 'completed') {
    throw { statusCode: 400, message: 'Payment already completed' }
  }

  // Update payment status
  payment.status = 'completed'
  payment.transactionId = transactionId
  payment.paymentDetails = paymentDetails
  await payment.save()

  // Update user's purchased services
  const user = await User.findById(payment.user)
  if (!user.purchasedServices) {
    user.purchasedServices = []
  }
  
  if (!user.purchasedServices.includes(payment.service)) {
    user.purchasedServices.push(payment.service)
  }
  
  if (payment.service === 'full-access') {
    user.purchasedServices.push('college-predictor', 'career-test', 'counselling-session')
  }
  
  await user.save()

  return {
    message: 'Payment verified successfully',
    service: payment.service,
    expiresAt: payment.expiresAt,
    transactionId: payment.transactionId
  }
}

// Check if user has access to service
export async function checkAccess(userId, service) {
  const hasAccess = await Payment.hasAccess(userId, service)
  
  if (hasAccess) {
    const payment = await Payment.findOne({
      user: userId,
      service: { $in: [service, 'full-access'] },
      status: 'completed',
      isActive: true,
      expiresAt: { $gt: new Date() }
    }).sort({ expiresAt: -1 })

    return {
      hasAccess: true,
      expiresAt: payment.expiresAt,
      service: payment.service,
      daysRemaining: Math.ceil((payment.expiresAt - new Date()) / (1000 * 60 * 60 * 24))
    }
  }

  return {
    hasAccess: false,
    price: SERVICE_PRICES[service],
    validity: SERVICE_VALIDITY[service]
  }
}

// Get user's payment history
export async function getPaymentHistory(userId) {
  const payments = await Payment.find({ user: userId })
    .sort({ createdAt: -1 })
    .select('-paymentDetails') // Exclude sensitive payment details

  return payments
}

// Get active subscriptions
export async function getActiveSubscriptions(userId) {
  const activePayments = await Payment.find({
    user: userId,
    status: 'completed',
    isActive: true,
    expiresAt: { $gt: new Date() }
  }).sort({ expiresAt: -1 })

  return activePayments.map(payment => ({
    service: payment.service,
    amount: payment.amount,
    purchasedOn: payment.createdAt,
    expiresAt: payment.expiresAt,
    daysRemaining: Math.ceil((payment.expiresAt - new Date()) / (1000 * 60 * 60 * 24)),
    transactionId: payment.transactionId
  }))
}

// Get service pricing info
export function getServicePricing() {
  return Object.keys(SERVICE_PRICES).map(service => ({
    service,
    price: SERVICE_PRICES[service],
    validity: SERVICE_VALIDITY[service],
    validityText: SERVICE_VALIDITY[service] >= 365 
      ? 'Lifetime' 
      : `${SERVICE_VALIDITY[service]} days`
  }))
}

// Admin: Get all payments
export async function getAllPayments(filters = {}) {
  const query = {}
  
  if (filters.status) query.status = filters.status
  if (filters.service) query.service = filters.service
  
  const payments = await Payment.find(query)
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(filters.limit || 100)

  return payments
}
