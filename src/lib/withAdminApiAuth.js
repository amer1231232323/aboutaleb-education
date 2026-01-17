import { verifyAdminToken } from "./adminAuthCheck";

/**
 * Middleware wrapper for admin-only API routes
 * Checks for valid admin token in Authorization header
 * 
 * Usage:
 * export default withAdminApiAuth(handler);
 */
export function withAdminApiAuth(handler) {
  return async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const admin = verifyAdminToken(token);

      if (!admin) {
        return res.status(403).json({ message: "Unauthorized - Admin access required" });
      }

      // Attach admin info to request for use in handler
      req.admin = admin;

      // Call the actual handler
      return handler(req, res);
    } catch (error) {
      console.error("Admin API auth error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
}

/**
 * Verify admin token from request
 * Returns true if token is valid and user has admin role
 */
export function isAdminRequest(req) {
  const token = req.headers.authorization?.split(" ")[1];
  return verifyAdminToken(token) !== null;
}

/**
 * Get admin info from request
 * Returns admin data or null
 */
export function getAdminInfo(req) {
  const token = req.headers.authorization?.split(" ")[1];
  return verifyAdminToken(token);
}
