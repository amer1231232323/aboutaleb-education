import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { logSecurityEvent } from "@/lib/unifiedAuth";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed",
            error: {
                code: "METHOD_NOT_ALLOWED",
                timestamp: new Date().toISOString()
            }
        });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        logSecurityEvent("ADMIN_LOGIN_ATTEMPT", { email, reason: "Missing credentials" }, req);
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
            error: {
                code: "MISSING_CREDENTIALS",
                timestamp: new Date().toISOString()
            }
        });
    }

    try {
        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            logSecurityEvent("ADMIN_LOGIN_FAILED", { email, reason: "User not found" }, req);
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                error: {
                    code: "INVALID_CREDENTIALS",
                    timestamp: new Date().toISOString()
                }
            });
        }

        // Check if user is admin
        if (user.role !== "admin") {
            logSecurityEvent("ADMIN_LOGIN_FAILED", { email, reason: "Not admin role" }, req);
            return res.status(403).json({
                success: false,
                message: "Access denied - Admin only",
                error: {
                    code: "ACCESS_DENIED",
                    timestamp: new Date().toISOString()
                }
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            logSecurityEvent("ADMIN_LOGIN_FAILED", { email, reason: "Invalid password" }, req);
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                error: {
                    code: "INVALID_CREDENTIALS",
                    timestamp: new Date().toISOString()
                }
            });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Update last login
        await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });

        logSecurityEvent("ADMIN_LOGIN_SUCCESS", { email, userId: user._id }, req);

        return res.status(200).json({
            success: true,
            message: "Admin login successful",
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                redirectUrl: "/admin/dashboard",
            },
            meta: {
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error("Admin login error:", error);
        logSecurityEvent("ADMIN_LOGIN_ERROR", { email, error: error.message }, req);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: {
                code: "SERVER_ERROR",
                timestamp: new Date().toISOString()
            }
        });
    }
}
