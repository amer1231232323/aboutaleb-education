import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import User from "@/models/User";
import University from "@/models/University";
import { withAdminAuth } from "@/lib/authMiddleware";

async function handler(req, res) {
    await connectDB();

    if (req.method === "GET") {
        try {
            // Get all applications with student and university details
            const applications = await Application.find()
                .populate("studentId", "name email phone")
                .populate("universityId")
                .sort({ createdAt: -1 });

            const formattedApplications = applications.map(app => ({
                id: app._id,
                student: {
                    id: app.studentId?._id,
                    name: app.studentId?.name,
                    email: app.studentId?.email,
                    phone: app.studentId?.phone,
                },
                university: {
                    id: app.universityId?._id,
                    name: app.universityId?.name || app.universityName,
                    city: app.universityId?.city,
                    type: app.universityId?.type,
                },
                status: app.status,
                notes: app.notes,
                appliedAt: app.createdAt,
                updatedAt: app.updatedAt,
            }));

            return res.status(200).json({
                success: true,
                count: formattedApplications.length,
                data: formattedApplications,
            });
        } catch (error) {
            console.error("Get applications error:", error);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    }

    if (req.method === "POST") {
        try {
            const { studentId, universityId, status, notes } = req.body;

            if (!studentId || !universityId) {
                return res.status(400).json({
                    success: false,
                    message: "Student ID and University ID are required"
                });
            }

            // Verify student exists
            const student = await User.findById(studentId);
            if (!student || student.role !== "student") {
                return res.status(404).json({
                    success: false,
                    message: "Student not found"
                });
            }

            // Verify university exists
            const university = await University.findById(universityId);
            if (!university) {
                return res.status(404).json({
                    success: false,
                    message: "University not found"
                });
            }

            // Check for duplicate application
            const existingApp = await Application.findOne({
                studentId,
                universityId,
            });

            if (existingApp) {
                return res.status(400).json({
                    success: false,
                    message: "Application already exists for this student and university"
                });
            }

            // Create application
            const application = await Application.create({
                studentId,
                universityId,
                universityName: university.name,
                status: status || "pending",
                notes: notes || "",
            });

            return res.status(201).json({
                success: true,
                message: "Application created successfully",
                data: application,
            });
        } catch (error) {
            console.error("Create application error:", error);
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
