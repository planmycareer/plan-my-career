// Custom JEE CSV Import Script
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import csvParser from 'csv-parser'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import CollegeCutoff from './server/models/CollegeCutoff.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/career-web'

// Detect college type from institute name
function detectCollegeType(instituteName) {
  const name = instituteName.toUpperCase()
  if (name.includes('IIT')) return 'IIT'
  if (name.includes('NIT')) return 'NIT'
  if (name.includes('IIIT')) return 'IIIT'
  if (name.includes('GFTI')) return 'GFTI'
  return 'Government'
}

// Extract state from institute name (basic logic)
function extractState(instituteName) {
  const stateMap = {
    'Delhi': 'Delhi',
    'Bombay': 'Maharashtra',
    'Madras': 'Tamil Nadu',
    'Kanpur': 'Uttar Pradesh',
    'Kharagpur': 'West Bengal',
    'Roorkee': 'Uttarakhand',
    'Guwahati': 'Assam',
    'Hyderabad': 'Telangana',
    'Bangalore': 'Karnataka',
    'Bhubaneswar': 'Odisha',
    'Gandhinagar': 'Gujarat',
    'Jodhpur': 'Rajasthan',
    'Patna': 'Bihar',
    'Indore': 'Madhya Pradesh',
    'Mandi': 'Himachal Pradesh',
    'Ropar': 'Punjab',
    'Varanasi': 'Uttar Pradesh',
    'Palakkad': 'Kerala',
    'Tirupati': 'Andhra Pradesh',
    'Jammu': 'Jammu and Kashmir',
    'Dharwad': 'Karnataka',
    'Bhilai': 'Chhattisgarh',
    'Goa': 'Goa',
  }

  for (const [keyword, state] of Object.entries(stateMap)) {
    if (instituteName.includes(keyword)) {
      return state
    }
  }
  return 'India'
}

// Map Seat Type to Category
function mapSeatTypeToCategory(seatType) {
  const upper = seatType.toUpperCase()
  if (upper.includes('OPEN') || upper.includes('GEN')) return 'General'
  if (upper.includes('OBC')) return 'OBC'
  if (upper.includes('SC')) return 'SC'
  if (upper.includes('ST')) return 'ST'
  if (upper.includes('EWS')) return 'EWS'
  return 'General' // default
}

async function importJEECSV() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI)
    console.log('✅ Connected to MongoDB')

    // Get CSV file path and round number
    const csvFilePath = process.argv[2] || 'cutoffs_sample .csv'
    const roundNumber = parseInt(process.argv[3]) || 1
    const absolutePath = path.resolve(csvFilePath)
    
    console.log(`📂 Reading JEE CSV from: ${absolutePath}`)
    console.log(`🔢 Round Number: ${roundNumber}`)

    const results = []
    let rowCount = 0
    let errorCount = 0

    // Read and parse CSV
    await new Promise((resolve, reject) => {
      fs.createReadStream(absolutePath)
        .pipe(csvParser())
        .on('data', (row) => {
          rowCount++
          
          try {
            // Parse ranks (handle non-numeric values)
            const openingRank = parseInt(row['Opening Rank'])
            const closingRank = parseInt(row['Closing Rank'])
            
            // Skip if ranks are invalid
            if (isNaN(openingRank) || isNaN(closingRank)) {
              errorCount++
              return
            }

            // Normalize gender value
            let gender = row['Gender'] || 'Gender-Neutral'
            if (gender.includes('Female-only')) {
              gender = 'Female-only'
            } else if (gender.includes('Gender-Neutral') || gender === 'Gender-Neutral') {
              gender = 'Gender-Neutral'
            }

            // Map your CSV columns to our schema
            const cutoffData = {
              collegeName: row['Institute'],
              branchName: row['Academic Program Name'],
              exam: 'JEE', // All data is JEE
              round: roundNumber, // Round number from command line
              state: extractState(row['Institute']),
              quota: row['Quota'] || 'AI',
              category: mapSeatTypeToCategory(row['Seat Type']),
              gender: gender, // Normalized gender
              year: 2024, // Adjust year as needed
              opening_rank: openingRank,
              closing_rank: closingRank,
              college_type: detectCollegeType(row['Institute']),
              fees: 'Not Available', // Add if you have fees data
              isActive: true,
            }

            results.push(cutoffData)
          } catch (error) {
            errorCount++
            console.error(`⚠️  Error processing row ${rowCount}:`, error.message)
          }
        })
        .on('end', () => {
          console.log(`📊 Processed ${rowCount} rows (${errorCount} errors)`)
          resolve()
        })
        .on('error', (error) => {
          reject(error)
        })
    })

    if (results.length === 0) {
      console.log('❌ No valid data to import')
      process.exit(1)
    }

    // Clear existing JEE cutoffs for this round to avoid duplicates
    console.log(`🗑️  Clearing existing JEE Round ${roundNumber} cutoffs...`)
    await CollegeCutoff.deleteMany({ exam: 'JEE', round: roundNumber })

    // Use bulkWrite with upsert to prevent duplicates
    console.log(`💾 Inserting ${results.length} cutoffs into database...`)
    
    const bulkOps = results.map(cutoff => ({
      updateOne: {
        filter: {
          collegeName: cutoff.collegeName,
          branchName: cutoff.branchName,
          round: cutoff.round,
          category: cutoff.category,
          quota: cutoff.quota,
          gender: cutoff.gender
        },
        update: { $set: cutoff },
        upsert: true
      }
    }))

    const result = await CollegeCutoff.bulkWrite(bulkOps, { ordered: false })
    
    const insertedCount = result.upsertedCount + result.modifiedCount
    console.log(`✅ Successfully imported ${insertedCount} JEE college cutoffs!`)
    console.log(`   (${result.upsertedCount} new, ${result.modifiedCount} updated, ${result.matchedCount - result.modifiedCount} skipped duplicates)`)
    
    // Show statistics
    const stats = {
      totalProcessed: results.length,
      totalImported: insertedCount,
      byCollegeType: {},
      byQuota: {},
      byCategory: {},
    }

    for (const cutoff of results) {
      stats.byCollegeType[cutoff.college_type] = (stats.byCollegeType[cutoff.college_type] || 0) + 1
      stats.byQuota[cutoff.quota] = (stats.byQuota[cutoff.quota] || 0) + 1
      stats.byCategory[cutoff.category] = (stats.byCategory[cutoff.category] || 0) + 1
    }

    console.log('\n📊 Import Statistics:')
    console.log('By College Type:', stats.byCollegeType)
    console.log('By Quota:', stats.byQuota)
    console.log('By Category:', stats.byCategory)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error importing JEE CSV:', error.message)
    process.exit(1)
  }
}

importJEECSV()
