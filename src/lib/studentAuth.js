import jwt from "jsonwebtoken";

/**
 * Verify student JWT token
 * @param {string} token - JWT token
 * @returns {object|null} Decoded token if valid student, null otherwise
 */
export function verifyStudentToken(token) {
    try {
        if (!token) return null;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user has student role
        if (decoded.role !== "student") {
            return null;
        }

        return decoded;
    } catch (err) {
        return null;
    }
}

/**
 * Check if request is from authenticated student
 * @param {object} req - Next.js request object
 * @returns {object|null} Student data if authenticated, null otherwise
 */
export function getStudentFromRequest(req) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return null;

        return verifyStudentToken(token);
    } catch (err) {
        return null;
    }
}

/**
 * Verify student token for client-side auth
 * @param {string} token - JWT token from localStorage
 * @returns {boolean} True if valid student token
 */
export function isValidStudentToken(token) {
    return verifyStudentToken(token) !== null;
}
