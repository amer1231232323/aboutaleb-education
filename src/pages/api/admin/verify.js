import { withAdminAuth } from "@/lib/unifiedAuth";

async function handler(req, res) {
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

  // If we reach here, the middleware has already verified the admin token
  return res.status(200).json({
    success: true,
    message: "Admin token verified",
    data: {
      user: {
        id: req.user.userId,
        role: req.user.role
      }
    },
    meta: {
      timestamp: new Date().toISOString()
    }
  });
}

export default withAdminAuth(handler);