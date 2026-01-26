import { initializeAdminAccount } from '@/lib/initAdmin';

/**
 * API Route: Initialize Admin Account
 * 
 * Endpoint: POST /api/admin/init
 * 
 * This route creates the default admin account if it doesn't exist.
 * It's safe to call multiple times - it will not create duplicates.
 * 
 * Security: This route can be called without authentication for initial setup,
 * but it only creates the admin if one doesn't already exist.
 * 
 * After first use, you may want to disable this route in production.
 */
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    // Initialize admin account
    const result = await initializeAdminAccount();

    if (result.success && result.created) {
      return res.status(201).json({
        success: true,
        message: 'Admin account created successfully',
        admin: {
          email: 'admin@amer.com',
          role: 'admin',
          note: 'Use these credentials to log in at /admin/login',
        },
      });
    }

    if (result.success && result.existed) {
      return res.status(200).json({
        success: true,
        message: 'Admin account already exists',
        note: 'No action needed',
      });
    }

    // If we get here, something went wrong
    return res.status(500).json({
      success: false,
      message: result.message || 'Failed to initialize admin account',
    });
  } catch (error) {
    console.error('Init admin error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during admin initialization',
    });
  }
}
