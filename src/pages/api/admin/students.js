import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Application from "@/models/Application";
import { withAdminAuth } from "@/lib/authMiddleware";

async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        await connectDB();

        // Get all students
        const students = await User.find({ role: "student" })
            .select("-password")
            .sort({ createdAt: -1 });

        // Get applications for each student
        const studentsWithApplications = await Promise.all(
            students.map(async (student) => {
                const applications = await Application.find({
                    studentId: student._id
                })
                    .populate("universityId", "name city type")
                    .sort({ createdAt: -1 });

                return {
                    id: student._id,
                    name: student.name,
                    email: student.email,
                    phone: student.phone,
                    registeredAt: student.createdAt,
                    applicationsCount: applications.length,
                    applications: applications.map(app => ({
                        id: app._id,
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
                    })),
                };
            })
        );

        return res.status(200).json({
            success: true,
            count: studentsWithApplications.length,
            data: studentsWithApplications,
        });
    } catch (error) {
        console.error("Get students error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export default withAdminAuth(handler);
