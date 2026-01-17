#!/usr/bin/env node

/**
 * Setup Script - Make a user an admin
 * Usage: node scripts/make-admin.js <email>
 * 
 * This script connects to MongoDB and sets the admin role for a user
 */

import mongoose from 'mongoose';
import User from '../src/models/User.js';

const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide an email address');
  console.log('Usage: node scripts/make-admin.js your-email@example.com');
  process.exit(1);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable not set');
  process.exit(1);
}

async function makeAdmin() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);

    console.log(`🔍 Finding user: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
      console.error(`❌ User not found: ${email}`);
      process.exit(1);
    }

    if (user.role === 'admin') {
      console.log(`⚠️  User is already an admin: ${email}`);
      process.exit(0);
    }

    console.log(`👤 Current role: ${user.role}`);
    console.log(`📝 Setting role to: admin`);

    user.role = 'admin';
    await user.save();

    console.log(`✅ Successfully set admin role for: ${email}`);
    console.log(`🎉 User ${email} can now access the admin panel`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

makeAdmin();
