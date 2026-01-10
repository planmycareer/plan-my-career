// Admin Controller - Complete admin operations

import * as adminService from '../services/adminService.js'

// Get all students
export async function getStudents(req, res, next) {
  try {
    const { page = 1, limit = 20 } = req.query
    const result = await adminService.getAllStudents(Number(page), Number(limit))
    res.json({ success: true, ...result })
  } catch (err) {
    next(err)
  }
}

// Get student details
export async function getStudentDetails(req, res, next) {
  try {
    const { studentId } = req.params
    const result = await adminService.getStudentDetails(studentId)
    res.json({ success: true, ...result })
  } catch (err) {
    next(err)
  }
}

// Get all reports
export async function getReports(req, res, next) {
  try {
    const { page = 1, limit = 20 } = req.query
    const result = await adminService.getAllReports(Number(page), Number(limit))
    res.json({ success: true, ...result })
  } catch (err) {
    next(err)
  }
}

// Get all bookings
export async function getBookings(req, res, next) {
  try {
    const { status } = req.query
    const bookings = await adminService.getAllBookings(status)
    res.json({ success: true, bookings, total: bookings.length })
  } catch (err) {
    next(err)
  }
}

// Update booking status
export async function updateBooking(req, res, next) {
  try {
    const { bookingId } = req.params
    const { status, counsellor_notes } = req.body
    
    const booking = await adminService.updateBookingStatus(bookingId, status, counsellor_notes)
    res.json({ success: true, booking, message: 'Booking updated successfully' })
  } catch (err) {
    next(err)
  }
}

// Get all services
export async function getServices(req, res, next) {
  try {
    const services = await adminService.getAllServices()
    res.json({ success: true, services, total: services.length })
  } catch (err) {
    next(err)
  }
}

// Create service
export async function createService(req, res, next) {
  try {
    const service = await adminService.createService(req.body)
    res.status(201).json({ success: true, service, message: 'Service created successfully' })
  } catch (err) {
    next(err)
  }
}

// Update service
export async function updateService(req, res, next) {
  try {
    const { serviceId } = req.params
    const service = await adminService.updateService(serviceId, req.body)
    res.json({ success: true, service, message: 'Service updated successfully' })
  } catch (err) {
    next(err)
  }
}

// Delete service
export async function deleteService(req, res, next) {
  try {
    const { serviceId } = req.params
    const result = await adminService.deleteService(serviceId)
    res.json({ success: true, ...result })
  } catch (err) {
    next(err)
  }
}

// Import cutoff CSV
export async function importCutoff(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'CSV file is required' })
    }
    
    const result = await adminService.importCutoffCSV(req.file.path)
    res.json({ success: true, ...result })
  } catch (err) {
    next(err)
  }
}

// Dashboard stats
export async function getDashboard(req, res, next) {
  try {
    const stats = await adminService.getDashboardStats()
    res.json({ success: true, ...stats })
  } catch (err) {
    next(err)
  }
}
