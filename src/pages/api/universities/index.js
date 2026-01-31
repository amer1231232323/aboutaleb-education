import { connectDB } from "@/lib/db";
import University from "@/models/University";

export default async function handler(req, res) {
  try {
    await connectDB();

    const { method } = req;

    switch (method) {
      case "GET":
        try {
          const { page = 1, limit = 20, search, type, city, featured } = req.query;

          // Build query filters for public access
          const filters = { isActive: true };
          if (search) {
            filters.$or = [
              { name: { $regex: search, $options: 'i' } },
              { nameAr: { $regex: search, $options: 'i' } },
              { city: { $regex: search, $options: 'i' } }
            ];
          }
          if (type) filters.type = type;
          if (city) filters.city = city;
          if (featured === 'true') filters.featured = true;

          // Calculate pagination
          const skip = (parseInt(page) - 1) * parseInt(limit);

          // Get universities with pagination
          const universities = await University.find(filters)
            .select('-__v') // Remove version field
            .sort({ featured: -1, name: 1 })
            .skip(skip)
            .limit(parseInt(limit));

          // Get total count for pagination
          const total = await University.countDocuments(filters);
          const totalPages = Math.ceil(total / parseInt(limit));

          return res.status(200).json({
            success: true,
            data: universities,
            meta: {
              timestamp: new Date().toISOString(),
              pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages,
                hasNext: parseInt(page) < totalPages,
                hasPrev: parseInt(page) > 1
              }
            }
          });
        } catch (error) {
          console.error("Error fetching universities:", error);
          return res.status(500).json({
            success: false,
            message: "Failed to fetch universities",
            error: {
              code: "FETCH_ERROR",
              timestamp: new Date().toISOString()
            }
          });
        }

      default:
        return res.status(405).json({
          success: false,
          message: "Method not allowed",
          error: {
            code: "METHOD_NOT_ALLOWED",
            timestamp: new Date().toISOString()
          }
        });
    }
  } catch (error) {
    console.error("Universities API error:", error);
    return res.status(500).json({
      success: false,
      message: "Database operation failed",
      error: {
        code: "DATABASE_ERROR",
        timestamp: new Date().toISOString(),
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }
    });
  }
}