import { connectDB } from "@/lib/db";
import Application from "@/models/Application";
import University from "@/models/University";
import { withStudentAuth } from "@/lib/authMiddleware";

async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });
    }

    try {
        await connectDB();

        // Get applications for the logged-in student
        const applications = await Application.find({
            studentId: req.user.userId
        })
            .populate("universityId")
            .sort({ createdAt: -1 });

        // Format the response
        const formattedApplications = applications.map(app => ({
            id: app._id,
            university: {
                id: app.universityId?._id,
                name: app.universityId?.name || app.universityName,
                city: app.universityId?.city,
                type: app.universityId?.type,
                image: app.universityId?.image,
                tuition: app.universityId?.tuition,
                programs: app.universityId?.programs,
                language: app.universityId?.language,
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
        console.error("Applications fetch error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export default withStudentAuth(handler);
