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
    logSecurityEvent("LOGIN_ATTEMPT", { email, reason: "Missing credentials" }, req);
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
    const db = await connectDB();

    if (!db) {
      return res.status(503).json({
        success: false,
        message: "Database unavailable. Please try again later.",
        error: {
          code: "DATABASE_UNAVAILABLE",
          timestamp: new Date().toISOString()
        }
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      logSecurityEvent("LOGIN_FAILED", { email, reason: "User not found" }, req);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
        error: {
          code: "INVALID_CREDENTIALS",
          timestamp: new Date().toISOString()
        }
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      logSecurityEvent("LOGIN_FAILED", { email, reason: "Invalid password" }, req);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
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

    logSecurityEvent("LOGIN_SUCCESS", { email, userId: user._id, role: user.role }, req);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        redirectUrl: user.role === "admin" ? "/admin/dashboard" : "/student/dashboard",
      },
      meta: {
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    logSecurityEvent("LOGIN_ERROR", { email, error: error.message }, req);
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
