import { connectDB } from "@/lib/db";
import User from "@/models/User";
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

        // req.user is set by withStudentAuth middleware
        const student = await User.findById(req.user.userId).select("-password");

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: student._id,
                name: student.name,
                email: student.email,
                phone: student.phone,
                role: student.role,
                createdAt: student.createdAt,
            },
        });
    } catch (error) {
        console.error("Profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export default withStudentAuth(handler);
