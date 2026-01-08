import connectDB from "@/lib/db";
import University from "@/models/University";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

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