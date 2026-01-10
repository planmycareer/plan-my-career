import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async ({ name, email, password, class: studentClass }) => {
  const existing = await User.findOne({ email })
  if (existing) throw { statusCode: 400, message: 'Email already registered' }

  const hashed = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, password: hashed, class: studentClass })

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }
}

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email })
  if (!user) throw { statusCode: 400, message: 'Invalid credentials' }

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw { statusCode: 400, message: 'Invalid credentials' }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }
}
