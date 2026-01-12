import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import morgan from 'morgan'
import authRoutes from './server/routes/authRoutes.js'
import testRoutes from './server/routes/testRoutes.js'
import reportRoutes from './server/routes/reportRoutes.js'
import predictorRoutes from './server/routes/predictorRoutes.js'
import bookingRoutes from './server/routes/bookingRoutes.js'
import adminRoutes from './server/routes/adminRoutes.js'
import paymentRoutes from './server/routes/paymentRoutes.js'
import { errorHandler } from './server/middleware/errorHandler.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProd = process.env.NODE_ENV === 'production'

// Basic hardening
app.disable('x-powered-by')
app.use(helmet({
  crossOriginResourcePolicy: false,
}))
app.use(hpp())
app.use(mongoSanitize())
app.use(compression())

// Request logging (avoid noisy logs in test; keep prod logs actionable)
app.use(morgan(isProd ? 'combined' : 'dev'))

// Rate limiting (tune as needed)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 200 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
}))

// CORS Configuration - Allow frontend domains
const envFrontendUrl = process.env.FRONTEND_URL
const corsOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://career-web-nk75.pages.dev',
  /\.pages\.dev$/,
]
if (envFrontendUrl) corsOrigins.unshift(envFrontendUrl)

app.use(cors({
  origin: corsOrigins,
  credentials: true,
}))

// Body size limits to prevent abuse
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }))

// Simple request timeout guard
app.use((req, res, next) => {
  res.setTimeout(30_000, () => {
    if (!res.headersSent) {
      res.status(503).json({ success: false, message: 'Request timeout' })
    }
  })
  next()
})

// Serve generated PDFs
app.use('/pdfs', express.static(path.join(__dirname, 'uploads', 'pdfs')))

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

