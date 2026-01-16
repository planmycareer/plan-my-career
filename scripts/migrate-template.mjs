#!/usr/bin/env node
// Generic migration template. Copy to create specific collection migrations.
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

async function main() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI
  if (!uri) {
    console.error('Set MONGO_URI or pass --uri; this template expects env.')
    process.exit(1)
  }
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  // Example: import your model after connecting
  // const { default: Model } = await import('../server/models/ModelName.js')

  // Implement your find/update logic below.
  // Keep migrations idempotent. Always support a dry-run where you only list changes.

  await mongoose.connection.close()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
