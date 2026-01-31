import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { withAdminAuth } from "@/lib/unifiedAuth";
import bcrypt from "bcryptjs";

async function handler(req, res) {
    await connectDB();

    const { method } = req;
    const { id } = req.query;

    // Validate user ID
    if (!id || id === 'undefined') {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
            error: {
                code: "INVALID_USER_ID",
                timestamp: new Date().toISOString()
            }
        });
    }

    switch (method) {
        case "GET":
            try {
                const user = await User.findById(id).select('-password');

                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found",
                        error: {
                            code: "USER_NOT_FOUND",
                            timestamp: new Date().toISOString()
                        }
                    });
                }

                return res.status(200).json({
                    success: true,
                    data: user,
                    meta: {
                        timestamp: new Date().toISOString()
                    }
                });
            } catch (err) {
                console.error("Error fetching user:", err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch user",
                    error: {
                        code: "FETCH_ERROR",
                        timestamp: new Date().toISOString()
                    }
                });
            }

        case "PUT":
            try {
                const { name, email, role, phone, password } = req.body;

                // Validate required fields
                if (!name || !email || !role) {
                    return res.status(400).json({
                        success: false,
                        message: "Name, email, and role are required",
                        error: {
                            code: "VALIDATION_ERROR",
                            timestamp: new Date().toISOString()
                        }
                    });
                }

                // Validate role
                if (!['admin', 'student'].includes(role)) {
                    return res.status(400).json({
                        success: false,
                        message: "Role must be either 'admin' or 'student'",
                        error: {
                            code: "INVALID_ROLE",
                            timestamp: new Date().toISOString()
                        }
                    });
                }

                // Check if user exists
                const existingUser = await User.findById(id);
                if (!existingUser) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found",
                        error: {
                            code: "USER_NOT_FOUND",
                            timestamp: new Date().toISOString()
                        }
                    });
                }

                // Check if email is already taken by another user
                if (email !== existingUser.email) {
                    const emailExists = await User.findOne({ email, _id: { $ne: id } });
                    if (emailExists) {
                        return res.status(409).json({
                            success: false,
                            message: "Email is already taken",
                            error: {
                                code: "EMAIL_EXISTS",
                                timestamp: new Date().toISOString()
                            }
                        });
                    }
                }

                // Prepare update data
                const updateData = {
                    name,
                    email,
                    role,
                    phone,
                    updatedAt: new Date()
                };

                // Hash password if provided
                if (password && password.trim() !== '') {
                    if (password.length < 6) {
                        return res.status(400).json({
                            success: false,
                            message: "Password must be at least 6 characters long",
                            error: {
                                code: "WEAK_PASSWORD",
                                timestamp: new Date().toISOString()
                            }
                        });
                    }
                    updateData.password = await bcrypt.hash(password, 12);
                }

                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    updateData,
                    { new: true, runValidators: true }
                ).select('-password');

                return res.status(200).json({
                    success: true,
                    message: "User updated successfully",
                    data: updatedUser,
                    meta: {
                        timestamp: new Date().toISOString()
                    }
                });
            } catch (err) {
                console.error("Error updating user:", err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to update user",
                    error: {
                        code: "UPDATE_ERROR",
                        details: err.message,
                        timestamp: new Date().toISOString()
                    }
                });
            }

        case "DELETE":
            try {
                // Prevent admin from deleting themselves
                if (req.user.userId === id) {
                    return res.status(400).json({
                        success: false,
                        message: "You cannot delete your own account",
                        error: {
                            code: "SELF_DELETE_FORBIDDEN",
                            timestamp: new Date().toISOString()
                        }
                    });
                }

                const user = await User.findById(id);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: "User not found",
                        error: {
                            code: "USER_NOT_FOUND",
                            timestamp: new Date().toISOString()
                        }
                    });
                }

                // Check if this is the last admin
                if (user.role === 'admin') {
                    const adminCount = await User.countDocuments({ role: 'admin' });
                    if (adminCount <= 1) {
                        return res.status(400).json({
                            success: false,
                            message: "Cannot delete the last admin user",
                            error: {
                                code: "LAST_ADMIN_DELETE_FORBIDDEN",
                                timestamp: new Date().toISOString()
                            }
                        });
                    }
                }

                await User.findByIdAndDelete(id);

                return res.status(200).json({
                    success: true,
                    message: "User deleted successfully",
                    meta: {
                        timestamp: new Date().toISOString(),
                        deletedUser: {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    }
                });
            } catch (err) {
                console.error("Error deleting user:", err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to delete user",
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