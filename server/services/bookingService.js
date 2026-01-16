import Booking from '../models/Booking.js'

export const createBooking = async (userId, { date, time, mode, package: pkg }) => {
  // Prevent double-booking for same date+time
  const existing = await Booking.findOne({ date, time })
  if (existing) throw { statusCode: 409, message: 'Selected slot already booked' }

  const booking = await Booking.create({ user: userId, date, time, mode, package: pkg })
  return booking
}

export const getBookingsForUser = async (userId) => {
  return Booking.find({ user: userId }).sort({ createdAt: -1 })
}
