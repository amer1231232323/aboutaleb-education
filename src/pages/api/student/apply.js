import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import University from "@/models/University";
import { withStudentAuth } from "@/lib/authMiddleware";

async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        await connectDB();

        const { universityId } = req.body;

        if (!universityId) {
            return res.status(400).json({
                success: false,
                message: "University ID is required"
            });
        }

        // Check if university exists
        const university = await University.findById(universityId);
        if (!university) {
            return res.status(404).json({
                success: false,
                message: "University not found"
            });
        }

        // Check if student already applied to this university
        const existingApplication = await Application.findOne({
            studentId: req.user.userId,
            universityId: universityId,
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied to this university"
            });
        }

        // Create new application
        const application = await Application.create({
            studentId: req.user.userId,
            universityId: universityId,
            universityName: university.name,
            status: "pending",
            notes: "",
        });

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            data: {
                id: application._id,
                universityName: university.name,
                status: application.status,
                appliedAt: application.createdAt,
            },
        });
    } catch (error) {
        console.error("Apply error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export default withStudentAuth(handler);
