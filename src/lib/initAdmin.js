import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

/**
 * Initialize default admin account
 * This function is safe to run multiple times - it checks for existing admin
 * 
 * Admin Credentials:
 * Email: admin@amer.com
 * Password: 100200300
 * 
 * @returns {Promise<Object>} Result object with status and message
 */
export async function initializeAdminAccount() {
  try {
    await connectDB();

    const adminEmail = 'admin@amer.com';
    const adminPassword = '100200300';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('✅ Admin account already exists:', adminEmail);
      return {
        success: true,
        message: 'Admin account already exists',
        existed: true,
      };
    }

    // Hash password with bcrypt (10 rounds)
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
      phone: '',
    });

    console.log('✅ Admin account created successfully:', adminEmail);
    console.log('   Email:', adminEmail);
    console.log('   Password: 100200300');
    console.log('   Role:', admin.role);

    return {
      success: true,
      message: 'Admin account created successfully',
      created: true,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    };
  } catch (error) {
    console.error('❌ Error initializing admin account:', error.message);
    return {
      success: false,
      message: 'Failed to initialize admin account',
      error: error.message,
    };
  }
}

/**
 * Check if admin account exists
 * @returns {Promise<boolean>}
 */
export async function adminExists() {
  try {
    await connectDB();
    const admin = await User.findOne({ email: 'admin@amer.com' });
    return !!admin;
  } catch (error) {
    console.error('Error checking admin existence:', error);
    return false;
  }
}

/**
 * Verify admin credentials (for testing)
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<boolean>}
 */
export async function verifyAdminCredentials(email, password) {
  try {
    await connectDB();
    const admin = await User.findOne({ email, role: 'admin' });
    
    if (!admin) {
      return false;
    }

    const isValid = await bcrypt.compare(password, admin.password);
    return isValid;
  } catch (error) {
    console.error('Error verifying admin credentials:', error);
    return false;
  }
}

export default initializeAdminAccount;
