import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { withAdminApiAuth } from "@/lib/withAdminApiAuth";

async function handler(req, res) {
    await connectDB();

    const { id } = req.query;

    if (req.method === "PUT") {
        try {
            const { name, email, role } = req.body;

            if (!name || !email || !role) {
                return res.status(400).json({
                    success: false,
                    message: "Name, email, and role are required",
                });
            }

            // Check if email is already taken by another user
            const existingUser = await User.findOne({ email, _id: { $ne: id } });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use",
                });
            }

            const updatedUser = await User.findByIdAndUpdate(
                id,
                { name, email, role },
                { new: true }
            ).select("-password");

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                user: updatedUser,
            });
        } catch (error) {
            console.error("Error updating user:", error);
            return res.status(500).json({
                success: false,
                message: "Server error",
            });
        }
    } else if (req.method === "DELETE") {
        try {
            const deletedUser = await User.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "User deleted successfully",
            });
        } catch (error) {
            console.error("Error deleting user:", error);
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
