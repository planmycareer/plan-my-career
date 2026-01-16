#!/usr/bin/env node
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

async function main() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI
  if (!uri) {
    console.error('Set MONGO_URI or MONGODB_URI in env before running.')
    process.exit(1)
  }
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  const db = mongoose.connection.db
  const collName = 'bookings'
  const infos = await db.listCollections({ name: collName }).toArray()
  if (!infos.length) {
    console.log(`Collection '${collName}' does not exist.`)
  } else {
    const info = infos[0]
    console.log('Collection info:')
    console.log(JSON.stringify(info, null, 2))
    // If options has validator, print it
    if (info.options && info.options.validator) {
      console.log('\nValidator:')
      console.log(JSON.stringify(info.options.validator, null, 2))
    } else {
      console.log('\nNo validator found in collection options.')
    }
  }
  await mongoose.connection.close()
}

main().catch(err => { console.error(err); process.exit(1) })
