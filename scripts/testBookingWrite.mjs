#!/usr/bin/env node
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Types } from 'mongoose'
dotenv.config()

function parseArgs() {
  const args = process.argv.slice(2)
  const out = {}
  args.forEach(a => {
    if (a === '--create') out.create = true
    else if (a === '--list') out.list = true
    else if (a.startsWith('--uri=')) out.uri = a.split('=')[1]
    else if (a === '--help' || a === '-h') out.help = true
  })
  return out
}

async function main() {
  const args = parseArgs()
  if (args.help) {
    console.log('Usage: node scripts/testBookingWrite.mjs [--list] [--create] [--uri=<MONGO_URI>]')
    process.exit(0)
  }
  const uri = args.uri || process.env.MONGO_URI || process.env.MONGODB_URI
  if (!uri) {
    console.error('Provide MONGO_URI or MONGODB_URI in env or --uri')
    process.exit(1)
  }
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  const { default: Booking } = await import('../server/models/Booking.js')

  if (args.create) {
    console.log('Attempting test insert...')
    try {
  const testUserId = new Types.ObjectId()
      const doc = await Booking.create({ user: testUserId, date: '2099-01-01', time: '10:00', mode: 'online' })
      console.log('Inserted test booking:', doc)
    } catch (err) {
      console.error('Insert failed:', err)
    }
  }

  if (args.list || !args.create) {
    const docs = await Booking.find().lean()
    console.log(`Bookings count: ${docs.length}`)
    docs.forEach(d => console.log(JSON.stringify(d)))
  }

  await mongoose.connection.close()
}

main().catch(err => { console.error(err); process.exit(1) })
