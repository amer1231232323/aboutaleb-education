import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const userData = typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (!token || !userData) {
      router.push("/student/login");
      return;
    }

    setUser(JSON.parse(userData));

    // Fetch user applications
    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        }
      } catch (err) {
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  }

  if (loading) return <div className="admin-dashboard"><p>جاري التحميل...</p></div>;
  if (!user) return null;

  return (
    <div className="admin-dashboard">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <div>
          <h1>لوحة تحكم الطالب</h1>
          <p>أهلاً {user.email}</p>
        </div>
        <button
          className="btn error"
          onClick={handleLogout}
          style={{ padding: "8px 16px" }}
        >
          تسجيل خروج
        </button>
      </div>

      <div className="admin-actions">
        <div className="admin-card">
          <h3>عدد التطبيقات</h3>
          <p style={{ fontSize: "28px", fontWeight: "bold", color: "#0070f3" }}>
            {applications.length}
          </p>
        </div>

        <Link href="/universities" className="admin-card" style={{ cursor: "pointer", textDecoration: "none", color: "inherit" }}>
          <h3>استعرض الجامعات</h3>
          <p>تقدم لجامعات جديدة</p>
        </Link>

        <div className="admin-card">
          <h3>حالة التطبيقات</h3>
          <p>{applications.filter((a) => a.status === "pending").length} قيد الانتظار</p>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>تطبيقاتك</h2>
        {applications.length === 0 ? (
          <p>لم تقدم على أي جامعة حتى الآن</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ddd" }}>
                <th style={{ padding: "12px", textAlign: "right" }}>الجامعة</th>
                <th style={{ padding: "12px", textAlign: "right" }}>التاريخ</th>
                <th style={{ padding: "12px", textAlign: "right" }}>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "12px" }}>{app.universityName || "N/A"}</td>
                  <td style={{ padding: "12px" }}>
                    {new Date(app.createdAt).toLocaleDateString("ar-EG")}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "4px",
                        backgroundColor: app.status === "accepted" ? "#4ade80" : app.status === "rejected" ? "#ef4444" : "#fbbf24",
                        color: "white",
                      }}
                    >
                      {app.status === "pending" ? "قيد الانتظار" : app.status === "accepted" ? "مقبول" : "مرفوض"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}