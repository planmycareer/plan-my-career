import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import authRoutes from './server/routes/authRoutes.js'
import testRoutes from './server/routes/testRoutes.js'
import reportRoutes from './server/routes/reportRoutes.js'
import predictorRoutes from './server/routes/predictorRoutes.js'
import bookingRoutes from './server/routes/bookingRoutes.js'
import adminRoutes from './server/routes/adminRoutes.js'
import paymentRoutes from './server/routes/paymentRoutes.js'
import { errorHandler } from './server/middleware/errorHandler.js'

dotenv.config()

const app = express()

// CORS Configuration - Allow frontend domains
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://career-web-nk75.pages.dev', // Cloudflare Pages
    /\.pages\.dev$/, // All Cloudflare Pages subdomains
  ],
  credentials: true
}))

app.use(bodyParser.json())

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/test', testRoutes)
app.use('/api/report', reportRoutes)
app.use('/api/predictor', predictorRoutes)
app.use('/api/booking', bookingRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/payment', paymentRoutes)

// Central error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000
// Accept both MONGODB_URI (common convention) and MONGO_URI (legacy)
const MONGO = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career-web'

async function start() {
  try {
    await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  } catch (err) {
    console.error('❌ Failed to start server', err)
    process.exit(1)
  }
}

start()

export default app

