import { connectDB } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuthCheck";
import University from "@/models/University";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Verify admin authentication
  const token = req.headers.authorization?.split(" ")[1];
  const admin = verifyAdminToken(token);

  if (!admin) {
    return res.status(403).json({ message: "Unauthorized - Admin access required" });
  }

  await connectDB();

  const { name, country } = req.body;

  const uni = await University.create({ name, country });

  res.status(201).json({ message: "تمت الإضافة", uni });
}