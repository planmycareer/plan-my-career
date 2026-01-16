#!/usr/bin/env node
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

function parseArgs() {
  const args = process.argv.slice(2)
  const out = {}
  args.forEach(a => {
    if (a === '--dry') out.dry = true
    else if (a === '--apply') out.apply = true
    else if (a.startsWith('--uri=')) out.uri = a.split('=')[1]
    else if (a.startsWith('--limit=')) out.limit = parseInt(a.split('=')[1], 10)
    else if (a === '--help' || a === '-h') out.help = true
  })
  return out
}

function usage() {
  console.log(`Usage: node scripts/migrateBookings.mjs [--dry] [--apply] [--uri=<MONGODB_URI>] [--limit=N]

Description:
  Safe migration to set missing Booking.package fields to 'Basic'.
  Default mode is dry-run (no changes). Use --apply to modify documents.

Examples (PowerShell):
  # Dry-run (reads env or --uri):
  node scripts/migrateBookings.mjs --dry --uri="<YOUR_MONGO_URI>"

  # Apply changes (destructive):
  node scripts/migrateBookings.mjs --apply --uri="<YOUR_MONGO_URI>"

Important:
  1) Take a mongodump backup before --apply.
  2) This script only updates missing/null/empty 'package' fields and lists bookings missing date/time for manual review.
`)
}

async function main() {
  const args = parseArgs()
  if (args.help) {
    usage();
    process.exit(0)
  }

  const uri = args.uri || process.env.MONGO_URI || process.env.MONGODB_URI
  if (!uri) {
    console.log('No MongoDB URI provided. Set MONGO_URI / MONGODB_URI in env, or pass --uri.');
    usage()
    process.exit(0)
  }

  const apply = !!args.apply
  const dry = !apply
  const limit = args.limit || 10

  console.log(`Connecting to MongoDB... (dry-run=${dry})`)
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  // Import the Booking model after mongoose is connected
  const { default: Booking } = await import('../server/models/Booking.js')

  // Find bookings with missing/empty/null package
  const packageQuery = { $or: [ { package: { $exists: false } }, { package: null }, { package: '' } ] }
  const missingPackageCount = await Booking.countDocuments(packageQuery)
  console.log(`Found ${missingPackageCount} bookings with missing package`)

  const sampleMissing = await Booking.find(packageQuery).limit(limit).lean()
  if (sampleMissing.length) {
    console.log('Sample documents with missing package:')
    sampleMissing.forEach(d => console.log(`  id=${d._id} user=${d.user} date=${d.date} time=${d.time}`))
  }

  if (missingPackageCount === 0) {
    console.log('No package fixes needed.')
  } else if (apply) {
    const res = await Booking.updateMany(packageQuery, { $set: { package: 'Basic' } })
    console.log(`Applied package default: matched=${res.matchedCount} modified=${res.modifiedCount}`)
  } else {
    console.log('Dry-run: no changes applied. Re-run with --apply to update documents.')
  }

  // Also list bookings missing date/time (these are potentially invalid; do not auto-fill)
  const missingDateTimeQuery = { $or: [ { date: { $exists: false } }, { date: null }, { date: '' }, { time: { $exists: false } }, { time: null }, { time: '' } ] }
  const missingDTCount = await Booking.countDocuments(missingDateTimeQuery)
  console.log(`Found ${missingDTCount} bookings missing date or time (listed below, please review)`)
  const sampleDT = await Booking.find(missingDateTimeQuery).limit(limit).lean()
  sampleDT.forEach(d => console.log(`  id=${d._id} user=${d.user} package=${d.package} date='${d.date}' time='${d.time}'`))

  await mongoose.connection.close()
  console.log('Done.')
}

main().catch(err => {
  console.error('Migration script error:', err)
  process.exit(1)
})
