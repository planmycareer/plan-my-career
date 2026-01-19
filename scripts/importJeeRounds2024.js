// Import JoSAA JEE cutoffs (Rounds 1–5, Year 2024) into MongoDB Atlas
// Usage: node scripts/importJeeRounds2024.js

import dotenv from 'dotenv'
import mongoose from 'mongoose'
import csvParser from 'csv-parser'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import CollegeCutoff from '../server/models/CollegeCutoff.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const MONGO = process.env.MONGODB_URI || process.env.MONGO_URI

function detectCollegeType(instituteName) {
  const name = String(instituteName || '').toUpperCase()
  if (name.includes('IIT')) return 'IIT'
  if (name.includes('NIT')) return 'NIT'
  if (name.includes('IIIT')) return 'IIIT'
  if (name.includes('GFTI')) return 'GFTI'
  return 'Government'
}

function extractState(instituteName) {
  const name = String(instituteName || '')
  const stateMap = {
    Delhi: 'Delhi',
    Bombay: 'Maharashtra',
    Madras: 'Tamil Nadu',
    Kanpur: 'Uttar Pradesh',
    Kharagpur: 'West Bengal',
    Roorkee: 'Uttarakhand',
    Guwahati: 'Assam',
    Hyderabad: 'Telangana',
    Bangalore: 'Karnataka',
    Bhubaneswar: 'Odisha',
    Gandhinagar: 'Gujarat',
    Jodhpur: 'Rajasthan',
    Patna: 'Bihar',
    Indore: 'Madhya Pradesh',
    Mandi: 'Himachal Pradesh',
    Ropar: 'Punjab',
    Varanasi: 'Uttar Pradesh',
    Palakkad: 'Kerala',
    Tirupati: 'Andhra Pradesh',
    Jammu: 'Jammu and Kashmir',
    Dharwad: 'Karnataka',
    Bhilai: 'Chhattisgarh',
    Goa: 'Goa',
  }

  for (const [keyword, state] of Object.entries(stateMap)) {
    if (name.includes(keyword)) return state
  }
  return 'India'
}

function mapSeatTypeToCategory(seatType) {
  const upper = String(seatType || '').toUpperCase()
  if (upper.includes('EWS')) return 'EWS'
  if (upper.includes('OBC')) return 'OBC'
  if (upper.includes('SC')) return 'SC'
  if (upper.includes('ST')) return 'ST'
  // OPEN/GEN/PwD all map to General bucket for this app
  return 'General'
}

function normalizeGender(value) {
  const raw = String(value || '')
  // JoSAA uses: "Gender-Neutral" and "Female-only (including Supernumerary)"
  if (raw.toLowerCase().includes('female')) return 'Female-only'
  return 'Gender-Neutral'
}

async function readCsvRows(csvPath, round) {
  const rows = []
  let processed = 0
  let skipped = 0

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csvParser())
      .on('data', (row) => {
        processed++

        const openingRank = parseInt(row['Opening Rank'])
        const closingRank = parseInt(row['Closing Rank'])
        if (!Number.isFinite(openingRank) || !Number.isFinite(closingRank)) {
          skipped++
          return
        }

        const institute = row['Institute']
        const program = row['Academic Program Name']
        const quota = row['Quota'] || 'AI'
        const seatType = row['Seat Type']
        const gender = normalizeGender(row['Gender'])

        rows.push({
          collegeName: institute,
          branchName: program,
          exam: 'JEE',
          round,
          state: extractState(institute),
          quota,
          category: mapSeatTypeToCategory(seatType),
          gender,
          year: 2024,
          opening_rank: openingRank,
          closing_rank: closingRank,
          college_type: detectCollegeType(institute),
          fees: 'Not Available',
          isActive: true,
        })
      })
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
  })

  return { rows, processed, skipped }
}

async function importRound({ fileName, round }) {
  const csvPath = path.resolve(__dirname, '..', fileName)
  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV not found: ${csvPath}`)
  }

  console.log(`\n📂 Round ${round}: ${fileName}`)
  const { rows, processed, skipped } = await readCsvRows(csvPath, round)
  console.log(`📊 Parsed: ${processed.toLocaleString()} rows, skipped: ${skipped.toLocaleString()}, valid: ${rows.length.toLocaleString()}`)

  if (rows.length === 0) {
    console.log('⚠️  No valid rows for this round; skipping import.')
    return { imported: 0 }
  }

  console.log(`🗑️  Clearing existing JEE Round ${round} cutoffs...`)
  await CollegeCutoff.deleteMany({ exam: 'JEE', round })

  console.log(`💾 Upserting ${rows.length.toLocaleString()} cutoffs...`)
  const bulkOps = rows.map((cutoff) => ({
    updateOne: {
      filter: {
        collegeName: cutoff.collegeName,
        branchName: cutoff.branchName,
        round: cutoff.round,
        category: cutoff.category,
        quota: cutoff.quota,
        gender: cutoff.gender,
      },
      update: { $set: cutoff },
      upsert: true,
    },
  }))

  const result = await CollegeCutoff.bulkWrite(bulkOps, { ordered: false })
  const imported = (result.upsertedCount || 0) + (result.modifiedCount || 0)
  console.log(`✅ Round ${round} imported/updated: ${imported.toLocaleString()}`)

  return { imported }
}

async function main() {
  if (!MONGO) {
    console.error('❌ Missing MONGO_URI/MONGODB_URI in .env')
    process.exit(1)
  }

  console.log('🔌 Connecting to MongoDB...')
  try {
    await mongoose.connect(MONGO)
  } catch (err) {
    const msg = err?.message || String(err)
    console.error('❌ MongoDB connection failed:', msg)
    console.error('\nFixes to try (Atlas):')
    console.error('- Confirm DB user/password in the connection string')
    console.error('- URL-encode password (e.g. @ becomes %40)')
    console.error('- Atlas → Network Access: allow your IP (or 0.0.0.0/0 for testing)')
    process.exit(1)
  }

  console.log('✅ Connected. Importing JoSAA JEE cutoffs...')

  const rounds = [
    { fileName: '2024_Round_1.csv', round: 1 },
    { fileName: '2024_Round_2.csv', round: 2 },
    { fileName: '2024_Round_3.csv', round: 3 },
    { fileName: '2024_Round_4.csv', round: 4 },
    { fileName: '2024_Round_5.csv', round: 5 },
  ]

  let totalImported = 0
  for (const r of rounds) {
    const { imported } = await importRound(r)
    totalImported += imported
  }

  const total = await CollegeCutoff.countDocuments({ exam: 'JEE' })
  console.log(`\n🎓 Total JEE cutoffs in DB now: ${total.toLocaleString()}`)
  console.log(`✅ Import done. Total imported/updated ops: ${totalImported.toLocaleString()}`)

  await mongoose.connection.close()
}

main().catch((err) => {
  console.error('❌ Import failed:', err)
  process.exit(1)
})
