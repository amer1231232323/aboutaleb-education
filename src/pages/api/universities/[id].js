import { connectDB } from "@/lib/db";
import University from "@/models/University";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const university = await University.findById(id);
      if (!university) return res.status(404).json({ message: "Not found" });
      return res.status(200).json(university);
    } catch (err) {
      return res.status(500).json({ message: "Error fetching university" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { name, city, type, website, description, image } = req.body;
      const updated = await University.findByIdAndUpdate(
        id,
        { name, city, type, website, description, image },
        { new: true }
      );
      return res.status(200).json(updated);
    } catch (err) {
      return res.status(500).json({ message: "Error updating university" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await University.findByIdAndDelete(id);
      return res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      return res.status(500).json({ message: "Error deleting university" });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}