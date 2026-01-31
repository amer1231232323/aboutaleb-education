import { withAdminAuth } from '@/lib/unifiedAuth';

async function handler(req, res) {
    // This endpoint is protected by unified admin auth
    return res.status(200).json({
        success: true,
        message: 'Unified authentication working correctly',
        user: req.user,
        timestamp: new Date().toISOString()
    });
}

export default withAdminAuth(handler);