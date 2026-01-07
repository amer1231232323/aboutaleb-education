import { connectDB } from "@/lib/db";
import University from "@/models/University";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const universities = await University.find().sort({ createdAt: -1 });
    return res.status(200).json(universities);
  }

  if (req.method === "POST") {
    const { name, city, description, image } = req.body;

    if (!name || !city) {
      return res.status(400).json({ message: "الاسم والمدينة مطلوبين" });
    }

    const uni = await University.create({
      name,
      city,
      description,
      image,
    });

    return res.status(201).json(uni);
  }

  return res.status(405).json({ message: "Method not allowed" });
}