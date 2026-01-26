import { connectDB } from "@/lib/db";
import University from "@/models/University";
import { verifyAdminToken } from "@/lib/adminAuthCheck";

export default async function handler(req, res) {
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
    const { id } = req.query;

    // Validate ID
    if (!id) {
      return res.status(400).json({ 
        success: false,
        message: "University ID is required" 
      });
    }

    if (req.method === "GET") {
      const university = await University.findById(id);
      if (!university) {
        return res.status(404).json({ 
          success: false,
          message: "University not found" 
        });
      }
      return res.status(200).json({ 
        success: true,
        data: university 
      });
    }

    if (req.method === "PUT") {
      const updated = await University.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      
      if (!updated) {
        return res.status(404).json({ 
          success: false,
          message: "University not found" 
        });
      }
      
      return res.status(200).json({ 
        success: true,
        message: "University updated successfully",
        data: updated 
      });
    }

    if (req.method === "DELETE") {
      const deleted = await University.findByIdAndDelete(id);
      
      if (!deleted) {
        return res.status(404).json({ 
          success: false,
          message: "University not found" 
        });
      }
      
      return res.status(200).json({ 
        success: true,
        message: "University deleted successfully" 
      });
    }

    return res.status(405).json({ 
      success: false,
      message: "Method not allowed" 
    });
  } catch (error) {
    console.error("University operation error:", error);
    return res.status(500).json({ 
      success: false,
      message: "Database operation failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
