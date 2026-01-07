import jwt from "jsonwebtoken";

export function adminAuth(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "غير مصرح" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "ممنوع" });
    }

    return decoded;
  } catch {
    return res.status(401).json({ message: "توكن غير صالح" });
  }
}