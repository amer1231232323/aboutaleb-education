import { connectDB } from "@/lib/db";
import { withAdminAuth } from "@/lib/unifiedAuth";
import University from "@/models/University";
import { createSuccessResponse, createErrorResponse, sendResponse } from "@/lib/responseFormatter";

async function handler(req, res) {
  if (req.method !== "POST") {
    return sendResponse(res, createErrorResponse(
      "Method not allowed",
      "METHOD_NOT_ALLOWED",
      405
    ));
  }

  try {
    await connectDB();

    const { name, country, city, type } = req.body;

    // Validate required fields
    if (!name) {
      return sendResponse(res, createErrorResponse(
        "University name is required",
        "VALIDATION_ERROR",
        400
      ));
    }

    const universityData = {
      name,
      city: city || country, // Use city if provided, otherwise use country for backward compatibility
      type: type || "public"
    };

    const uni = await University.create(universityData);

    return sendResponse(res, createSuccessResponse(
      uni,
      "University added successfully"
    ), 201);
  } catch (error) {
    console.error("Add university error:", error);
    return sendResponse(res, createErrorResponse(
      "Failed to add university",
      "CREATE_ERROR",
      500,
      process.env.NODE_ENV === 'development' ? error.message : null
    ));
  }
}

export default withAdminAuth(handler);