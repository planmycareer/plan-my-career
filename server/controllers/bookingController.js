import { createBooking, getBookingsForUser } from '../services/bookingService.js'

export const create = async (req, res, next) => {
  try {
    const { date, time, mode } = req.body
    const booking = await createBooking(req.user._id, { date, time, mode })
    res.json({ success: true, booking })
  } catch (err) { next(err) }
}

export const myBookings = async (req, res, next) => {
  try {
    const bookings = await getBookingsForUser(req.user._id)
    res.json({ success: true, bookings })
  } catch (err) { next(err) }
}
