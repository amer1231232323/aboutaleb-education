import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { withAdminApiAuth } from "@/lib/withAdminApiAuth";

async function handler(req, res) {
    await connectDB();

    if (req.method === "GET") {
        try {
            const users = await User.find({}).select("-password").sort({ createdAt: -1 });
            return res.status(200).json({
                success: true,
                users,
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    } else {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }
}

export default withAdminApiAuth(handler);
