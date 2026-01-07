import { connectDB } from "@/lib/db";
import University from "@/models/University";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { name, city } = req.body;

    if (!name || !city) {
      return res.status(400).json({ message: "بيانات ناقصة" });
    }

    const uni = await University.create({ name, city });
    return res.status(201).json(uni);
  }

  if (req.method === "GET") {
    const universities = await University.find();
    return res.status(200).json(universities);
  }

  return res.status(405).json({ message: "Method not allowed" });
}