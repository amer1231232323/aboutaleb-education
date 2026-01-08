import { connectDB } from "@/lib/db";
import University from "@/models/University";

export default async function handler(req, res) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const universities = await University.find().sort({ createdAt: -1 });
        return res.status(200).json(universities);
      } catch (err) {
        return res.status(500).json({ message: "خطأ في السيرفر" });
      }

    case "POST":
      try {
        const uni = await University.create(req.body);
        return res.status(201).json(uni);
      } catch (err) {
        return res.status(500).json({ message: "خطأ أثناء الإضافة" });
      }

    case "PUT":
      try {
        const { id } = req.query;
        const updated = await University.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updated);
      } catch (err) {
        return res.status(500).json({ message: "خطأ أثناء التعديل" });
      }

    case "DELETE":
      try {
        const { id } = req.query;
        await University.findByIdAndDelete(id);
        return res.status(200).json({ message: "تم الحذف بنجاح" });
      } catch (err) {
        return res.status(500).json({ message: "خطأ أثناء الحذف" });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}