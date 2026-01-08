import { connectDB } from "@/lib/db";
import University from "@/models/University";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const universities = await University.find({});
    return res.status(200).json(universities);
  }

  if (req.method === "POST") {
    const { name, city, type, website, description, image } = req.body;

    const uni = await University.create({
      name,
      city,
      type,
      website,
      description,
      image,
    });

    return res.status(201).json(uni);
  }

  res.status(405).json({ message: "Method not allowed" });
}