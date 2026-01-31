import jwt from "jsonwebtoken";

/**
 * Unified Authentication Middleware System
 * Consolidates all authentication implementations into a single, secure approach
 */

/**
 * Verify JWT token and return decoded payload
 * @param {string} token - JWT token to verify
 * @returns {object|null} Decoded token payload or null if invalid
 */
export function verifyToken(token) {
    try {
        if (!token) return null;
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return null;
    }
}

/**
 * Extract user information from request headers
 * @param {object} req - Next.js API request object
 * @returns {object|null} User data if authenticated, null otherwise
 */
export function getUserFromRequest(req) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        const token = authHeader.split(" ")[1];
        return verifyToken(token);
    } catch (error) {
        console.error("Failed to get user from request:", error.message);
        return null;
    }
}

/**
 * Check if user has required role
 * @param {object} user - User object from token
 * @param {string} requiredRole - Required role ('admin' or 'student')
 * @returns {boolean} True if user has required role
 */
export function checkRole(user, requiredRole) {
    if (!user || !user.role) return false;
    return user.role === requiredRole;
}

/**
 * Create standardized error response
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @returns {object} Standardized error response
 */
function createErrorResponse(statusCode, message, code) {
    return {
        success: false,
        message,
        error: {
            code,
            timestamp: new Date().toISOString()
        }
    };
}

/**
 * Middleware to protect routes - requires authentication
 * @param {Function} handler - API route handler
 * @returns {Function} Protected handler
 */
export function withAuth(handler) {
    return async (req, res) => {
        try {
            const user = getUserFromRequest(req);

            if (!user) {
                return res.status(401).json(
                    createErrorResponse(401, "Unauthorized - Please login", "AUTH_REQUIRED")
                );
            }

            // Attach user to request object
            req.user = user;
            return handler(req, res);
        } catch (error) {
            console.error("Authentication middleware error:", error);
            return res.status(500).json(
                createErrorResponse(500, "Internal server error", "AUTH_ERROR")
            );
        }
    };
}

/**
 * Middleware to protect admin routes
 * @param {Function} handler - API route handler
 * @returns {Function} Protected handler
 */
export function withAdminAuth(handler) {
    return async (req, res) => {
        try {
            const user = getUserFromRequest(req);

            if (!user) {
                return res.status(401).json(
                    createErrorResponse(401, "Unauthorized - Please login", "AUTH_REQUIRED")
                );
            }

            if (!checkRole(user, "admin")) {
                return res.status(403).json(
                    createErrorResponse(403, "Forbidden - Admin access required", "ADMIN_REQUIRED")
                );
            }

            // Attach user to request object
            req.user = user;
            return handler(req, res);
        } catch (error) {
            console.error("Admin authentication middleware error:", error);
            return res.status(500).json(
                createErrorResponse(500, "Internal server error", "AUTH_ERROR")
            );
        }
    };
}

/**
 * Middleware to protect student routes
 * @param {Function} handler - API route handler
 * @returns {Function} Protected handler
 */
export function withStudentAuth(handler) {
    return async (req, res) => {
        try {
            const user = getUserFromRequest(req);

            if (!user) {
                return res.status(401).json(
                    createErrorResponse(401, "Unauthorized - Please login", "AUTH_REQUIRED")
                );
            }

            if (!checkRole(user, "student")) {
                return res.status(403).json(
                    createErrorResponse(403, "Forbidden - Student access required", "STUDENT_REQUIRED")
                );
            }

            // Attach user to request object
            req.user = user;
            return handler(req, res);
        } catch (error) {
            console.error("Student authentication middleware error:", error);
            return res.status(500).json(
                createErrorResponse(500, "Internal server error", "AUTH_ERROR")
            );
        }
    };
}

/**
 * Verify admin token (legacy compatibility)
 * @param {string} token - JWT token
 * @returns {object|null} Admin user data or null
 */
export function verifyAdminToken(token) {
    const user = verifyToken(token);
    if (!user || !checkRole(user, "admin")) {
        return null;
    }
    return user;
}

/**
 * Security event logger
 * @param {string} event - Event type
 * @param {object} details - Event details
 * @param {object} req - Request object (optional)
 */
export function logSecurityEvent(event, details, req = null) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        event,
        details,
        ip: req?.headers?.['x-forwarded-for'] || req?.connection?.remoteAddress || 'unknown',
        userAgent: req?.headers?.['user-agent'] || 'unknown'
    };

    console.log("Security Event:", JSON.stringify(logEntry));

    // In production, you might want to send this to a logging service
    // or store in a security events database
}

export default {
    verifyToken,
    getUserFromRequest,
    checkRole,
    withAuth,
    withAdminAuth,
    withStudentAuth,
    verifyAdminToken,
    logSecurityEvent
};