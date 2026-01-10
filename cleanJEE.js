import mongoose from 'mongoose';
import CollegeCutoff from './server/models/CollegeCutoff.js';

async function cleanJEE() {
  await mongoose.connect('mongodb://127.0.0.1:27017/career-web');
  const deleted = await CollegeCutoff.deleteMany({ exam: 'JEE' });
  console.log(`\n🗑️  Deleted ${deleted.deletedCount} JEE cutoffs (removing duplicates)\n`);
  process.exit(0);
}

cleanJEE();
