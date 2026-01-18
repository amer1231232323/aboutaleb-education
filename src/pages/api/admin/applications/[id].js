import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import { withAdminAuth } from "@/lib/authMiddleware";

async function handler(req, res) {
    await connectDB();

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Application ID is required"
        });
    }

    if (req.method === "GET") {
        try {
            const application = await Application.findById(id)
                .populate("studentId", "name email phone")
                .populate("universityId");

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found"
                });
            }

            return res.status(200).json({
                success: true,
                data: {
                    id: application._id,
                    student: {
                        id: application.studentId?._id,
                        name: application.studentId?.name,
                        email: application.studentId?.email,
                        phone: application.studentId?.phone,
                    },
                    university: {
                        id: application.universityId?._id,
                        name: application.universityId?.name || application.universityName,
                        city: application.universityId?.city,
                        type: application.universityId?.type,
                        tuition: application.universityId?.tuition,
                        programs: application.universityId?.programs,
                        language: application.universityId?.language,
                    },
                    status: application.status,
                    notes: application.notes,
                    appliedAt: application.createdAt,
                    updatedAt: application.updatedAt,
                },
            });
        } catch (error) {
            console.error("Get application error:", error);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }

    if (req.method === "PUT") {
        try {
            const { status, notes } = req.body;

            const updateData = {};
            if (status) updateData.status = status;
            if (notes !== undefined) updateData.notes = notes;

            const application = await Application.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            )
                .populate("studentId", "name email phone")
                .populate("universityId");

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Application updated successfully",
                data: {
                    id: application._id,
                    status: application.status,
                    notes: application.notes,
                    updatedAt: application.updatedAt,
                },
            });
        } catch (error) {
            console.error("Update application error:", error);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }

    if (req.method === "DELETE") {
        try {
            const application = await Application.findByIdAndDelete(id);

            if (!application) {
                return res.status(404).json({
                    success: false,
                    message: "Application not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Application deleted successfully",
            });
        } catch (error) {
            console.error("Delete application error:", error);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }

    return res.status(405).json({
        success: false,
        message: "Method not allowed"
    });
}

export default withAdminAuth(handler);
