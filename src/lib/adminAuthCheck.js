import jwt from "jsonwebtoken";

/**
 * Verify admin JWT token
 * @param {string} token - JWT token
 * @returns {object|null} Decoded token if valid admin, null otherwise
 */
export function verifyAdminToken(token) {
  try {
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user has admin role
    if (decoded.role !== "admin") {
      return null;
    }

    return decoded;
  } catch (err) {
    return null;
  }
}

/**
 * Check if request is from authenticated admin
 * @param {object} req - Next.js request object
 * @returns {object|null} Admin data if authenticated, null otherwise
 */
export function getAdminFromRequest(req) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;

    return verifyAdminToken(token);
  } catch (err) {
    return null;
  }
}

/**
 * Verify admin token for client-side auth
 * @param {string} token - JWT token from localStorage
 * @returns {boolean} True if valid admin token
 */
export function isValidAdminToken(token) {
  return verifyAdminToken(token) !== null;
}
