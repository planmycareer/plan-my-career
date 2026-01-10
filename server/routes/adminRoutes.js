// Admin Routes - Complete admin API

import express from 'express'
import multer from 'multer'
import { auth } from '../middleware/authMiddleware.js'
import { requireAdmin } from '../middleware/roleMiddleware.js'
import * as adminController from '../controllers/adminController.js'

const router = express.Router()

// Configure multer for CSV upload
const upload = multer({ dest: 'uploads/' })

// All admin routes require authentication + admin role
router.use(auth, requireAdmin)

// Student management
router.get('/students', adminController.getStudents)
router.get('/students/:studentId', adminController.getStudentDetails)

// Report management
router.get('/reports', adminController.getReports)

// Booking management
router.get('/bookings', adminController.getBookings)
router.put('/bookings/:bookingId', adminController.updateBooking)

// Service management
router.get('/services', adminController.getServices)
router.post('/services', adminController.createService)
router.put('/services/:serviceId', adminController.updateService)
router.delete('/services/:serviceId', adminController.deleteService)

// Cutoff data import
router.post('/cutoff/import', upload.single('csvFile'), adminController.importCutoff)

// Dashboard
router.get('/dashboard', adminController.getDashboard)

export default router
