// CSV Import Script for College Cutoffs
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { importCutoffCSV } from './server/services/adminService.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career-web'

async function importCSV() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI)
    console.log('✅ Connected to MongoDB')

    // Get CSV file path from command line argument
    const csvFilePath = process.argv[2]
    
    if (!csvFilePath) {
      console.error('❌ Error: Please provide CSV file path')
      console.log('Usage: node importCutoffs.js <path-to-csv-file>')
      console.log('Example: node importCutoffs.js ./cutoffs.csv')
      process.exit(1)
    }

    // Resolve absolute path
    const absolutePath = path.resolve(csvFilePath)
    console.log(`📂 Reading CSV from: ${absolutePath}`)

    // Import CSV
    const result = await importCutoffCSV(absolutePath)
    console.log(`✅ ${result.message}`)
    console.log(`📊 Imported ${result.imported} college cutoffs`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error importing CSV:', error.message)
    process.exit(1)
  }
}

importCSV()
