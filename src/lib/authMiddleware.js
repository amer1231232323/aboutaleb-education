import jwt from "jsonwebtoken";

/**
 * Verify any JWT token (admin or student)
 * @param {string} token - JWT token
 * @returns {object|null} Decoded token if valid, null otherwise
 */
export function verifyToken(token) {
    try {
        if (!token) return null;
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
}

/**
 * Get user from request headers
 * @param {object} req - Next.js request object
 * @returns {object|null} User data if authenticated, null otherwise
 */
export function getUserFromRequest(req) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return null;
        return verifyToken(token);
    } catch (err) {
        return null;
    }
}

/**
 * Middleware to protect routes - requires authentication
 * @param {Function} handler - API route handler
 * @returns {Function} Protected handler
 */
export function withAuth(handler) {
    return async (req, res) => {
        const user = getUserFromRequest(req);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Please login"
            });
        }

        req.user = user;
        return handler(req, res);
    };
}

/**
 * Middleware to protect admin routes
 * @param {Function} handler - API route handler
 * @returns {Function} Protected handler
 */
export function withAdminAuth(handler) {
    return async (req, res) => {
        const user = getUserFromRequest(req);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Please login"
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden - Admin access required"
            });
        }

        req.user = user;
        return handler(req, res);
    };
}

/**
 * Middleware to protect student routes
 * @param {Function} handler - API route handler
 * @returns {Function} Protected handler
 */
export function withStudentAuth(handler) {
    return async (req, res) => {
        const user = getUserFromRequest(req);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Please login"
            });
        }

        if (user.role !== "student") {
            return res.status(403).json({
                success: false,
                message: "Forbidden - Student access required"
            });
        }

        req.user = user;
        return handler(req, res);
    };
}
