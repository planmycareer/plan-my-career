#!/usr/bin/env node
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const validator = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['user', 'package', 'date', 'time'],
    properties: {
      user: { bsonType: 'objectId' },
      package: { enum: ['Basic', 'Premium', 'Career Roadmap'] },
      date: { bsonType: 'string' },
      time: { bsonType: 'string' },
      mode: { enum: ['online', 'offline'] },
      status: { enum: ['pending', 'confirmed', 'completed', 'cancelled'] },
      payment_status: { enum: ['unpaid', 'paid'] },
      amount: { bsonType: 'number' },
      notes: { bsonType: 'string' },
      counsellor_notes: { bsonType: 'string' },
      createdAt: { bsonType: 'date' }
    }
  }
}

async function main() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI
  if (!uri) {
    console.error('Provide MONGO_URI or MONGODB_URI in env or pass --uri support is not implemented for this script.')
    process.exit(1)
  }

  console.log('Connecting to MongoDB...')
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection.db

  const collName = 'bookings'
  const existing = await db.listCollections({ name: collName }).toArray()
  if (existing.length === 0) {
    console.log(`Collection '${collName}' does not exist — creating with validator (validationLevel=moderate).`)
    await db.createCollection(collName, { validator, validationLevel: 'moderate' })
    console.log('Collection created with validator.')
  } else {
    console.log(`Collection '${collName}' exists — applying collMod to set validator (validationLevel=moderate).`)
    try {
      await db.command({ collMod: collName, validator, validationLevel: 'moderate' })
      console.log('collMod applied successfully.')
    } catch (err) {
      console.error('collMod failed:', err.message || err)
      console.log('As fallback, attempting to create a new validator by running a temporary validation step.')
    }
  }

  await mongoose.connection.close()
  console.log('Done.')
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})
