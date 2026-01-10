// Middleware to check if user has paid for a service

import Payment from '../models/Payment.js'

export const requirePayment = (service) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id

      // Check if user has access to this service
      const hasAccess = await Payment.hasAccess(userId, service)

      if (!hasAccess) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Please purchase ${service} to continue.`,
          service,
          paymentRequired: true
        })
      }

      // Get payment details to attach to request
      const payment = await Payment.findOne({
        user: userId,
        service: { $in: [service, 'full-access'] },
        status: 'completed',
        isActive: true,
        expiresAt: { $gt: new Date() }
      }).sort({ expiresAt: -1 })

      req.subscription = {
        service: payment.service,
        expiresAt: payment.expiresAt,
        daysRemaining: Math.ceil((payment.expiresAt - new Date()) / (1000 * 60 * 60 * 24))
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

// Check if user is admin (for admin routes)
export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    })
  }
  next()
}
