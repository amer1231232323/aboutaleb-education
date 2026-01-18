import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import { withAuth } from "@/lib/authMiddleware";

async function handler(req, res) {
    await connectDB();

    if (req.method === "GET") {
        try {
            // If admin, return all applications
            // If student, return only their applications
            const query = req.user.role === "admin"
                ? {}
                : { studentId: req.user.userId };

            const applications = await Application.find(query)
                .populate("universityId")
                .populate("studentId", "name email")
                .sort({ createdAt: -1 });

            return res.status(200).json({
                success: true,
                count: applications.length,
                data: applications,
            });
        } catch (err) {
            console.error("Get applications error:", err);
            return res.status(500).json({
                success: false,
                message: "Error fetching applications"
            });
        }
    }

    if (req.method === "POST") {
        try {
            // Only students can create applications for themselves
            // Admins should use the admin API
            if (req.user.role !== "student") {
                return res.status(403).json({
                    success: false,
                    message: "Only students can create applications"
                });
            }

            const application = await Application.create({
                ...req.body,
                studentId: req.user.userId, // Force the studentId to be the logged-in user
            });

            return res.status(201).json({
                success: true,
                message: "Application created successfully",
                data: application,
            });
        } catch (err) {
            console.error("Create application error:", err);
            return res.status(500).json({
                success: false,
                message: "Error creating application"
            });
        }
    }

    return res.status(405).json({
        success: false,
        message: "Method not allowed"
    });
}

export default withAuth(handler);
