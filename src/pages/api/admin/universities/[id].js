import { connectDB } from "@/lib/db";
import University from "@/models/University";
import { withAdminAuth } from "@/lib/unifiedAuth";

async function handler(req, res) {
  await connectDB();

  const { method } = req;
  const { id } = req.query;

  // Validate university ID
  if (!id || id === 'undefined') {
    return res.status(400).json({
      success: false,
      message: "University ID is required",
      error: {
        code: "INVALID_UNIVERSITY_ID",
        timestamp: new Date().toISOString()
      }
    });
  }

  switch (method) {
    case "GET":
      try {
        const university = await University.findById(id);

        if (!university) {
          return res.status(404).json({
            success: false,
            message: "University not found",
            error: {
              code: "UNIVERSITY_NOT_FOUND",
              timestamp: new Date().toISOString()
            }
          });
        }

        return res.status(200).json({
          success: true,
          data: university,
          meta: {
            timestamp: new Date().toISOString()
          }
        });
      } catch (err) {
        console.error("Error fetching university:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to fetch university",
          error: {
            code: "FETCH_ERROR",
            timestamp: new Date().toISOString()
          }
        });
      }

    case "PUT":
      try {
        const {
          name,
          nameAr,
          city,
          cityAr,
          type,
          description,
          descriptionAr,
          website,
          email,
          phone,
          address,
          programs,
          tuitionFee,
          applicationFee,
          currency,
          gpaRequirement,
          languageTest,
          documents,
          featured,
          isActive
        } = req.body;

        // Validate required fields
        if (!name || !city || !type) {
          return res.status(400).json({
            success: false,
            message: "Name, city, and type are required",
            error: {
              code: "VALIDATION_ERROR",
              timestamp: new Date().toISOString()
            }
          });
        }

        // Check if university exists
        const existingUniversity = await University.findById(id);
        if (!existingUniversity) {
          return res.status(404).json({
            success: false,
            message: "University not found",
            error: {
              code: "UNIVERSITY_NOT_FOUND",
              timestamp: new Date().toISOString()
            }
          });
        }

        // Check if name/city combination is already taken by another university
        if (name !== existingUniversity.name || city !== existingUniversity.city) {
          const duplicateUniversity = await University.findOne({
            name,
            city,
            _id: { $ne: id }
          });
          if (duplicateUniversity) {
            return res.status(409).json({
              success: false,
              message: "University with this name already exists in this city",
              error: {
                code: "DUPLICATE_UNIVERSITY",
                timestamp: new Date().toISOString()
              }
            });
          }
        }

        const updateData = {
          name,
          nameAr,
          city,
          cityAr,
          type,
          description,
          descriptionAr,
          contact: {
            website,
            email,
            phone,
            address
          },
          programs: programs || [],
          fees: {
            tuition: tuitionFee,
            application: applicationFee,
            currency: currency || 'USD'
          },
          requirements: {
            gpa: gpaRequirement,
            languageTest,
            documents: documents || []
          },
          featured: featured || false,
          isActive: isActive !== undefined ? isActive : true,
          updatedAt: new Date()
        };

        const updatedUniversity = await University.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );

        return res.status(200).json({
          success: true,
          message: "University updated successfully",
          data: updatedUniversity,
          meta: {
            timestamp: new Date().toISOString()
          }
        });
      } catch (err) {
        console.error("Error updating university:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to update university",
          error: {
            code: "UPDATE_ERROR",
            details: err.message,
            timestamp: new Date().toISOString()
          }
        });
      }

    case "DELETE":
      try {
        const university = await University.findById(id);
        if (!university) {
          return res.status(404).json({
            success: false,
            message: "University not found",
            error: {
              code: "UNIVERSITY_NOT_FOUND",
              timestamp: new Date().toISOString()
            }
          });
        }

        // Check if university has applications before deleting
        // This would require importing the Application model
        // For now, we'll just delete the university

        await University.findByIdAndDelete(id);

        return res.status(200).json({
          success: true,
          message: "University deleted successfully",
          meta: {
            timestamp: new Date().toISOString(),
            deletedUniversity: {
              id: university._id,
              name: university.name,
              city: university.city
            }
          }
        });
      } catch (err) {
        console.error("Error deleting university:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to delete university",
          error: {
            code: "DELETE_ERROR",
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
}

export default withAdminAuth(handler);