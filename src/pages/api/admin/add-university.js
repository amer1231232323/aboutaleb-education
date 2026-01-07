import { connectDB } from "@/lib/db";
import { adminAuth } from "@/lib/adminAuth";
import University from "@/models/University";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  adminAuth(req, res); // 🔐 حماية

  await connectDB();

  const { name, country } = req.body;

  const uni = await University.create({ name, country });

  res.status(201).json({ message: "تمت الإضافة", uni });
}