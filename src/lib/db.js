import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn('⚠️ WARNING: MONGODB_URI is not set in environment variables.');
  console.warn('Database connections will fail at runtime.');
}

/**
 * Global cache for MongoDB connection
 * Prevents multiple connections in serverless environments (Vercel)
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB with connection pooling and caching
 * Safe for serverless environments like Vercel
 * @returns {Promise<typeof mongoose>} Mongoose connection
 */
export async function connectDB() {
  // Validate environment variable
  if (!MONGODB_URI) {
    console.log('🔌 Database disabled - MONGODB_URI not set');
    return null;
  }

  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection if none exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        return mongoose;
      })
      .catch((error) => {
        cached.promise = null;
        console.error('❌ MongoDB connection error:', error.message);
        console.log('🔌 Continuing without database connection...');
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.log('🔌 Database connection failed, continuing without database...');
    return null;
  }

  return cached.conn;
}

/**
 * Disconnect from MongoDB (useful for testing)
 */
export async function disconnectDB() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('MongoDB disconnected');
  }
}

/**
 * Get connection status
 */
export function getConnectionStatus() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[mongoose.connection.readyState] || 'unknown';
}

export default connectDB;