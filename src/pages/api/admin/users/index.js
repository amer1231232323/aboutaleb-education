import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { withAdminAuth } from "@/lib/unifiedAuth";

async function handler(req, res) {
    await connectDB();

    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const { page = 1, limit = 10, search, role } = req.query;

                // Build query filters
                const filters = {};
                if (search) {
                    filters.$or = [
                        { name: { $regex: search, $options: 'i' } },
                        { email: { $regex: search, $options: 'i' } }
                    ];
                }
                if (role && ['admin', 'student'].includes(role)) {
                    filters.role = role;
                }

                // Calculate pagination
                const skip = (parseInt(page) - 1) * parseInt(limit);

                // Get users with pagination
                const users = await User.find(filters)
                    .select("-password")
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(parseInt(limit));

                // Get total count for pagination
                const total = await User.countDocuments(filters);
                const totalPages = Math.ceil(total / parseInt(limit));

                // Get role statistics
                const roleStats = await User.aggregate([
                    { $group: { _id: "$role", count: { $sum: 1 } } }
                ]);

                return res.status(200).json({
                    success: true,
                    data: users,
                    meta: {
                        timestamp: new Date().toISOString(),
                        pagination: {
                            page: parseInt(page),
                            limit: parseInt(limit),
                            total,
                            totalPages,
                            hasNext: parseInt(page) < totalPages,
                            hasPrev: parseInt(page) > 1
                        },
                        statistics: {
                            total,
                            roles: roleStats.reduce((acc, stat) => {
                                acc[stat._id] = stat.count;
                                return acc;
                            }, {})
                        }
                    }
                });
            } catch (error) {
                console.error("Error fetching users:", error);
                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch users",
                    error: {
                        code: "FETCH_ERROR",
                        timestamp: new Date().toISOString()
                    }
                });
            }

        case "POST":
            try {
                const { name, email, password, role, phone } = req.body;

                // Validate required fields
                if (!name || !email || !password || !role) {
                    return res.status(400).json({
                        success: false,
                        message: "Name, email, password, and role are required",
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

                // Validate password strength
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

                // Check if user already exists
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(409).json({
                        success: false,
                        message: "User with this email already exists",
                        error: {
                            code: "USER_EXISTS",
                            timestamp: new Date().toISOString()
                        }
                    });
                }

                // Hash password
                const bcrypt = require("bcryptjs");
                const hashedPassword = await bcrypt.hash(password, 12);

                // Create user
                const userData = {
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    phone,
                    isActive: true
                };

                const user = await User.create(userData);

                // Return user without password
                const { password: _, ...userWithoutPassword } = user.toObject();

                return res.status(201).json({
                    success: true,
                    message: "User created successfully",
                    data: userWithoutPassword,
                    meta: {
                        timestamp: new Date().toISOString()
                    }
                });
            } catch (error) {
                console.error("Error creating user:", error);
                return res.status(500).json({
                    success: false,
                    message: "Failed to create user",
                    error: {
                        code: "CREATE_ERROR",
                        details: error.message,
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
