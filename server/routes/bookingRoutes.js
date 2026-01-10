import express from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middleware/validateRequest.js'
import { auth } from '../middleware/authMiddleware.js'
import { create, myBookings } from '../controllers/bookingController.js'

const router = express.Router()

router.post('/', auth, [
  body('date').notEmpty(),
  body('time').notEmpty(),
  body('mode').isIn(['online','offline'])
], validateRequest, create)

router.get('/my', auth, myBookings)

export default router
