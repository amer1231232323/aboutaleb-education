import { verifyAdminToken } from "@/lib/adminAuthCheck";

/**
 * API Route to verify admin authentication
 * Used by protected routes to verify token validity
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = verifyAdminToken(token);

    if (!decoded) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    return res.status(200).json({
      valid: true,
      user: {
        id: decoded.id || decoded.userId,
        email: decoded.email,
        role: decoded.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
