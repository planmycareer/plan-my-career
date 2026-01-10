// Payment Controller

import * as paymentService from '../services/paymentService.js'

// Create payment order
export async function createOrder(req, res, next) {
  try {
    const { service } = req.body
    const userId = req.user.id

    const order = await paymentService.createPaymentOrder(userId, service)

    res.status(201).json({
      success: true,
      data: order,
      message: 'Payment order created successfully'
    })
  } catch (error) {
    next(error)
  }
}

// Verify payment after payment gateway callback
export async function verifyPayment(req, res, next) {
  try {
    const { orderId, transactionId, paymentDetails } = req.body

    const result = await paymentService.verifyPayment(orderId, transactionId, paymentDetails)

    res.json({
      success: true,
      data: result,
      message: 'Payment verified successfully'
    })
  } catch (error) {
    next(error)
  }
}

// Check user's access to a service
export async function checkServiceAccess(req, res, next) {
  try {
    const { service } = req.params
    const userId = req.user.id

    const access = await paymentService.checkAccess(userId, service)

    res.json({
      success: true,
      data: access
    })
  } catch (error) {
    next(error)
  }
}

// Get user's payment history
export async function getPaymentHistory(req, res, next) {
  try {
    const userId = req.user.id

    const payments = await paymentService.getPaymentHistory(userId)

    res.json({
      success: true,
      data: payments,
      count: payments.length
    })
  } catch (error) {
    next(error)
  }
}

// Get active subscriptions
export async function getActiveSubscriptions(req, res, next) {
  try {
    const userId = req.user.id

    const subscriptions = await paymentService.getActiveSubscriptions(userId)

    res.json({
      success: true,
      data: subscriptions,
      count: subscriptions.length
    })
  } catch (error) {
    next(error)
  }
}

// Get service pricing
export async function getPricing(req, res, next) {
  try {
    const pricing = paymentService.getServicePricing()

    res.json({
      success: true,
      data: pricing
    })
  } catch (error) {
    next(error)
  }
}

// Admin: Get all payments
export async function getAllPayments(req, res, next) {
  try {
    const filters = {
      status: req.query.status,
      service: req.query.service,
      limit: req.query.limit
    }

    const payments = await paymentService.getAllPayments(filters)

    res.json({
      success: true,
      data: payments,
      count: payments.length
    })
  } catch (error) {
    next(error)
  }
}
