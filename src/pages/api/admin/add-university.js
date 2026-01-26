import { connectDB } from "@/lib/db";
import { verifyAdminToken } from "@/lib/adminAuthCheck";
import University from "@/models/University";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ 
      success: false,
      message: "Method not allowed" 
    });
  }

  try {
    // Verify admin authentication
    const token = req.headers.authorization?.split(" ")[1];
    const admin = verifyAdminToken(token);

    if (!admin) {
      return res.status(403).json({ 
        success: false,
        message: "Unauthorized - Admin access required" 
      });
    }

    await connectDB();

    const { name, country } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({ 
        success: false,
        message: "University name is required" 
      });
    }

    const uni = await University.create({ name, country });

    return res.status(201).json({ 
      success: true,
      message: "University added successfully", 
      data: uni 
    });
  } catch (error) {
    console.error("Add university error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Failed to add university",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}