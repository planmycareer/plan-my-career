import mongoose from 'mongoose';

async function checkMongoAuth() {
  try {
    console.log('\n🔍 Checking MongoDB Authentication Status...\n');
    
    // Try connecting without credentials
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/career-web');
    
    console.log('✅ Connected to MongoDB: career-web database');
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log(`🔐 Authentication: ${conn.connection.user ? 'ENABLED (user: ' + conn.connection.user + ')' : 'DISABLED (no auth required)'}`);
    
    // Check database stats
    const admin = conn.connection.db.admin();
    const serverInfo = await admin.serverInfo();
    
    console.log(`\n📊 MongoDB Server Info:`);
    console.log(`   Version: ${serverInfo.version}`);
    console.log(`   Connection: Local MongoDB (no credentials needed)`);
    
    // Check collections
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`\n📚 Collections in 'career-web' database:`);
    collections.forEach(col => {
      console.log(`   - ${col.name}`);
    });
    
    // Check user count
    const User = mongoose.model('User', new mongoose.Schema({}), 'users');
    const userCount = await User.countDocuments();
    console.log(`\n👥 Total Users: ${userCount}`);
    
    const CollegeCutoff = mongoose.model('CollegeCutoff', new mongoose.Schema({}), 'collegecutoffs');
    const cutoffCount = await CollegeCutoff.countDocuments();
    console.log(`🎓 Total Cutoffs: ${cutoffCount}`);
    
    console.log('\n✅ Summary: Your MongoDB is running WITHOUT authentication (local development mode)\n');
    
    process.exit(0);
  } catch (error) {
    if (error.message.includes('Authentication failed')) {
      console.log('❌ MongoDB requires authentication!');
      console.log('   Your database has auth enabled.');
      console.log('   You need to provide username and password in connection string.');
    } else {
      console.error('❌ Error:', error.message);
    }
    process.exit(1);
  }
}

checkMongoAuth();
