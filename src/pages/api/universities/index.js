import { connectDB } from "@/lib/db";
import University from "@/models/University";

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "GET") {
      const universities = await University.find({}).sort({ name: 1 });
      return res.status(200).json({ 
        success: true,
        count: universities.length,
        data: universities 
      });
    }

    if (req.method === "POST") {
      const { name, city, type, website, description, image } = req.body;

      // Validate required fields
      if (!name) {
        return res.status(400).json({ 
          success: false,
          message: "University name is required" 
        });
      }

      const uni = await University.create({
        name,
        city,
        type,
        website,
        description,
        image,
      });

      return res.status(201).json({ 
        success: true,
        message: "University created successfully",
        data: uni 
      });
    }

    return res.status(405).json({ 
      success: false,
      message: "Method not allowed" 
    });
  } catch (error) {
    console.error("Universities API error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Database operation failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}