import { connectDB } from "@/lib/db";
import University from "@/models/University";
import { verifyAdminToken } from "@/lib/adminAuthCheck";

export default async function handler(req, res) {
  // Verify admin authentication
  const token = req.headers.authorization?.split(" ")[1];
  const admin = verifyAdminToken(token);

  if (!admin) {
    return res.status(403).json({ message: "Unauthorized - Admin access required" });
  }

  await connectDB();
  const { id } = req.query;

  if (req.method === "GET") {
    const university = await University.findById(id);
    if (!university) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(university);
  }

  if (req.method === "PUT") {
    const updated = await University.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    await University.findByIdAndDelete(id);
    return res.status(200).json({ message: "Deleted" });
  }

  res.status(405).json({ message: "Method not allowed" });
}
