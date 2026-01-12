// Grant test user access to career-test service

import mongoose from 'mongoose';
import Payment from './server/models/Payment.js';
import User from './server/models/User.js';

const MONGO_URI = 'mongodb://localhost:27017/career-web';

async function grantTestAccess() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Find test user
    const testUser = await User.findOne({ email: 'test@example.com' });
    if (!testUser) {
      console.log('❌ Test user not found');
      process.exit(1);
    }

    console.log('Found test user:', testUser.email);

    // Check if payment already exists
    const existingPayment = await Payment.findOne({
      user: testUser._id,
      service: 'career-test'
    });

    if (existingPayment) {
      console.log('✅ Test user already has access to career-test');
      console.log('Payment ID:', existingPayment._id);
      console.log('Status:', existingPayment.status);
    } else {
      // Create payment record
      const payment = await Payment.create({
        user: testUser._id,
        service: 'career-test',
        amount: 0, // Free for testing
        status: 'completed',
        paymentMethod: 'razorpay',
        transactionId: `TEST-${Date.now()}`,
        orderId: `ORDER-TEST-${Date.now()}`,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        paidAt: new Date(),
        isActive: true
      });

      console.log('✅ Created payment record for test user');
      console.log('Payment ID:', payment._id);
    }

    console.log('\n✅ Test user now has access to career-test service');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

grantTestAccess();
