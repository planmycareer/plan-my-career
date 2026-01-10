// Admin Service - Admin operations

import User from '../models/User.js'
import Report from '../models/Report.js'
import Booking from '../models/Booking.js'
import Service from '../models/Service.js'
import CollegeCutoff from '../models/CollegeCutoff.js'
import csvParser from 'csv-parser'
import fs from 'fs'

// Get all students
export async function getAllStudents(page = 1, limit = 20) {
  const skip = (page - 1) * limit
  const students = await User.find({ role: 'student' })
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
  
  const total = await User.countDocuments({ role: 'student' })
  
  return {
    students,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalStudents: total,
  }
}

// Get student details with reports
export async function getStudentDetails(studentId) {
  const student = await User.findById(studentId).select('-password')
  if (!student) throw { statusCode: 404, message: 'Student not found' }
  
  const reports = await Report.find({ user: studentId }).populate('test').sort({ createdAt: -1 })
  const bookings = await Booking.find({ user: studentId }).sort({ createdAt: -1 })
  
  return {
    student,
    reports,
    bookings,
  }
}

// Get all reports
export async function getAllReports(page = 1, limit = 20) {
  const skip = (page - 1) * limit
  const reports = await Report.find()
    .populate('user', 'name email class')
    .populate('test')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
  
  const total = await Report.countDocuments()
  
  return {
    reports,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalReports: total,
  }
}

// Get all bookings
export async function getAllBookings(status = null) {
  const query = status ? { status } : {}
  const bookings = await Booking.find(query)
    .populate('user', 'name email phone')
    .sort({ createdAt: -1 })
  
  return bookings
}

// Update booking status
export async function updateBookingStatus(bookingId, status, counsellorNotes = null) {
  const booking = await Booking.findById(bookingId)
  if (!booking) throw { statusCode: 404, message: 'Booking not found' }
  
  booking.status = status
  if (counsellorNotes) booking.counsellor_notes = counsellorNotes
  await booking.save()
  
  return booking
}

// Get all services
export async function getAllServices() {
  return await Service.find().sort({ createdAt: -1 })
}

// Create service
export async function createService(serviceData) {
  const service = new Service(serviceData)
  await service.save()
  return service
}

// Update service
export async function updateService(serviceId, updates) {
  const service = await Service.findByIdAndUpdate(serviceId, updates, { new: true })
  if (!service) throw { statusCode: 404, message: 'Service not found' }
  return service
}

// Delete service
export async function deleteService(serviceId) {
  const service = await Service.findByIdAndDelete(serviceId)
  if (!service) throw { statusCode: 404, message: 'Service not found' }
  return { message: 'Service deleted successfully' }
}

// Import cutoff data from CSV
export async function importCutoffCSV(filePath) {
  const results = []
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        // Expected CSV columns: collegeName, branchName, exam, state, quota, category, year, opening_rank, closing_rank, college_type, fees
        results.push({
          collegeName: row.collegeName || row.college_name,
          branchName: row.branchName || row.branch_name,
          exam: row.exam,
          state: row.state,
          quota: row.quota || 'AI',
          category: row.category,
          year: parseInt(row.year),
          opening_rank: parseInt(row.opening_rank),
          closing_rank: parseInt(row.closing_rank),
          college_type: row.college_type,
          fees: row.fees,
          isActive: true,
        })
      })
      .on('end', async () => {
        try {
          // Bulk insert
          await CollegeCutoff.insertMany(results, { ordered: false })
          resolve({ imported: results.length, message: 'CSV import successful' })
        } catch (error) {
          reject({ statusCode: 500, message: 'Error importing CSV', error: error.message })
        }
      })
      .on('error', (error) => {
        reject({ statusCode: 500, message: 'Error reading CSV file', error: error.message })
      })
  })
}

// Get dashboard stats
export async function getDashboardStats() {
  const totalStudents = await User.countDocuments({ role: 'student' })
  const totalReports = await Report.countDocuments()
  const totalBookings = await Booking.countDocuments()
  const pendingBookings = await Booking.countDocuments({ status: 'pending' })
  const activeServices = await Service.countDocuments({ isActive: true })
  
  // Recent activity
  const recentStudents = await User.find({ role: 'student' }).sort({ createdAt: -1 }).limit(5).select('name email createdAt')
  const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email')
  
  return {
    totalStudents,
    totalReports,
    totalBookings,
    pendingBookings,
    activeServices,
    recentStudents,
    recentBookings,
  }
}
