#!/usr/bin/env node

// Quick Setup Script - Run this after updating .env with MongoDB Atlas credentials

import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI

console.log('🔍 Checking MongoDB Atlas Connection...\n')

async function testConnection() {
  try {
    console.log('📡 Connecting to MongoDB Atlas...')
    
    if (!MONGO_URI || MONGO_URI.includes('YOUR_USERNAME')) {
      console.error('❌ ERROR: Please update .env file with your MongoDB Atlas credentials!')
      console.log('\n📝 Steps:')
      console.log('1. Open .env file')
      console.log('2. Replace MONGO_URI with your Atlas connection string')
      console.log('3. Format: mongodb+srv://username:password@cluster.mongodb.net/database')
      console.log('4. Run this script again: node setup.js\n')
      process.exit(1)
    }
    
    await mongoose.connect(MONGO_URI)
    console.log('✅ MongoDB Atlas Connected Successfully!\n')
    
    // List databases
    const admin = mongoose.connection.db.admin()
    const { databases } = await admin.listDatabases()
    console.log('📊 Available Databases:')
    databases.forEach(db => {
      console.log(`   - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`)
    })
    
    console.log('\n✅ Setup Complete! Ready to seed database.')
    console.log('\n🚀 Next Steps:')
    console.log('   1. Run: node seedQuestions.js')
    console.log('   2. Run: node seedCutoffs.js')
    console.log('   3. Run: npm start')
    console.log('\n')
    
    await mongoose.connection.close()
    process.exit(0)
    
  } catch (error) {
    console.error('❌ Connection Failed:', error.message)
    console.log('\n💡 Common Issues:')
    console.log('   - Wrong username/password in connection string')
    console.log('   - Network access not configured (add 0.0.0.0/0 in Atlas)')
    console.log('   - Cluster not ready yet (wait 2-3 minutes after creation)')
    console.log('   - Connection string format incorrect\n')
    process.exit(1)
  }
}

testConnection()
