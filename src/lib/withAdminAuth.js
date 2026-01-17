import { useEffect, useState } from "react";
import { useRouter } from "next/router";

/**
 * Higher-Order Component to protect admin routes
 * Checks for valid admin token and redirects unauthorized users
 */
export function withAdminAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const checkAdminAuth = async () => {
        try {
          // Get token from localStorage
          const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
          const userData = typeof window !== "undefined" ? localStorage.getItem("user") : null;

          if (!token || !userData) {
            router.push("/admin/login");
            return;
          }

          // Parse user data
          const user = JSON.parse(userData);

          // Check if user is admin
          if (user.role !== "admin") {
            setError("Only administrators can access this page");
            setTimeout(() => router.push("/student/dashboard"), 2000);
            return;
          }

          // Verify token with backend
          const response = await fetch("/api/admin/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.push("/admin/login");
            return;
          }

          setIsAuthorized(true);
          setLoading(false);
        } catch (err) {
          console.error("Admin auth check failed:", err);
          setError("Authentication check failed");
          setLoading(false);
        }
      };

      checkAdminAuth();
    }, [router]);

    if (loading) {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div style={{ textAlign: "center" }}>
            <h2>جاري التحقق من الصلاحيات...</h2>
            <p>يرجى الانتظار</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <div style={{ textAlign: "center", color: "red" }}>
            <h2>⚠️ خطأ في الوصول</h2>
            <p>{error}</p>
            <p>جاري إعادة التوجيه...</p>
          </div>
        </div>
      );
    }

    if (!isAuthorized) {
      return null;
    }

    return <Component {...props} />;
  };
}
