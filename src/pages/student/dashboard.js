import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const userData = typeof window !== "undefined" ? localStorage.getItem("user") : null;

    if (!token || !userData) {
      router.push("/student/login");
      return;
    }

    const parsedUser = JSON.parse(userData);

    // Verify user is a student
    if (parsedUser.role !== "student") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/student/login");
      return;
    }

    setUser(parsedUser);

    // Fetch student profile and applications
    const fetchData = async () => {
      try {
        // Fetch profile
        const profileRes = await fetch("/api/student/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData.data);
        }

        // Fetch applications
        const appsRes = await fetch("/api/student/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (appsRes.ok) {
          const appsData = await appsRes.json();
          setApplications(appsData.data || []);
        } else {
          setError("Failed to load applications");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An error occurred while loading your data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  }

  function getStatusText(status) {
    const statusMap = {
      pending: "قيد الانتظار",
      accepted: "مقبول",
      rejected: "مرفوض",
      missing_documents: "وثائق ناقصة"
    };
    return statusMap[status] || status;
  }

  function getStatusClass(status) {
    return `application-status ${status}`;
  }

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-main">
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ fontSize: "18px", color: "#666" }}>جاري التحميل...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const pendingCount = applications.filter(app => app.status === "pending").length;
  const acceptedCount = applications.filter(app => app.status === "accepted").length;
  const rejectedCount = applications.filter(app => app.status === "rejected").length;
  const missingDocsCount = applications.filter(app => app.status === "missing_documents").length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>لوحة تحكم الطالب</h1>
            <p>
              أهلاً {profile?.name || user.name || user.email}
              {profile?.email && ` (${profile.email})`}
            </p>
          </div>
          <div className="dashboard-actions">
            <Link href="/universities" className="btn primary">
              استعرض الجامعات
            </Link>
            <button className="btn error" onClick={handleLogout}>
              تسجيل خروج
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: "16px",
            marginBottom: "24px",
            backgroundColor: "#fee",
            color: "#c00",
            borderRadius: "8px",
            border: "1px solid #fcc"
          }}>
            {error}
          </div>
        )}

        {/* Statistics */}
        <div className="dashboard-stats">
          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon" style={{ background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)" }}>
              📚
            </div>
            <div className="dashboard-stat-label">إجمالي التطبيقات</div>
            <div className="dashboard-stat-value">{applications.length}</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}>
              ⏳
            </div>
            <div className="dashboard-stat-label">قيد الانتظار</div>
            <div className="dashboard-stat-value">{pendingCount}</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon" style={{ background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }}>
              ✅
            </div>
            <div className="dashboard-stat-label">مقبول</div>
            <div className="dashboard-stat-value">{acceptedCount}</div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon" style={{ background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)" }}>
              ❌
            </div>
            <div className="dashboard-stat-label">مرفوض</div>
            <div className="dashboard-stat-value">{rejectedCount}</div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="dashboard-table">
          <div className="dashboard-table-header">
            <h2 className="dashboard-table-title">تطبيقاتك الجامعية</h2>
            {missingDocsCount > 0 && (
              <span style={{
                padding: "6px 12px",
                backgroundColor: "#fef3c7",
                color: "#92400e",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600"
              }}>
                {missingDocsCount} تطبيق يحتاج وثائق
              </span>
            )}
          </div>

          {applications.length === 0 ? (
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎓</div>
              <h3 style={{ marginBottom: "8px", color: "#374151" }}>لم تقدم على أي جامعة حتى الآن</h3>
              <p style={{ color: "#6b7280", marginBottom: "24px" }}>
                ابدأ رحلتك الأكاديمية بالتقديم على الجامعات المتاحة
              </p>
              <Link href="/universities" className="btn primary">
                استعرض الجامعات المتاحة
              </Link>
            </div>
          ) : (
            <div className="student-applications">
              {applications.map((app) => (
                <div key={app.id} className={`application-card ${app.status}`}>
                  <div className="application-header">
                    <div>
                      {app.university?.image && (
                        <div style={{ marginBottom: "12px" }}>
                          <Image
                            src={app.university.image}
                            alt={app.university.name}
                            width={60}
                            height={60}
                            style={{ borderRadius: "8px", objectFit: "cover" }}
                          />
                        </div>
                      )}
                      <h3 className="application-university">
                        {app.university?.name || "جامعة غير محددة"}
                      </h3>
                      {app.university?.city && (
                        <p className="application-program">
                          📍 {app.university.city}
                        </p>
                      )}
                    </div>
                    <span className={getStatusClass(app.status)}>
                      {getStatusText(app.status)}
                    </span>
                  </div>

                  <div className="application-info">
                    <div className="application-info-item">
                      <span className="application-info-label">تاريخ التقديم</span>
                      <span className="application-info-value">
                        {new Date(app.appliedAt).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </span>
                    </div>

                    {app.university?.type && (
                      <div className="application-info-item">
                        <span className="application-info-label">نوع الجامعة</span>
                        <span className="application-info-value">{app.university.type}</span>
                      </div>
                    )}

                    {app.university?.language && (
                      <div className="application-info-item">
                        <span className="application-info-label">لغة الدراسة</span>
                        <span className="application-info-value">{app.university.language}</span>
                      </div>
                    )}

                    {app.university?.tuition && (
                      <div className="application-info-item">
                        <span className="application-info-label">الرسوم السنوية</span>
                        <span className="application-info-value">{app.university.tuition}</span>
                      </div>
                    )}
                  </div>

                  {app.university?.programs && app.university.programs.length > 0 && (
                    <div style={{ marginBottom: "16px" }}>
                      <span className="application-info-label" style={{ display: "block", marginBottom: "8px" }}>
                        البرامج المتاحة
                      </span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {app.university.programs.map((program, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: "4px 12px",
                              backgroundColor: "#f3f4f6",
                              borderRadius: "12px",
                              fontSize: "13px",
                              color: "#374151"
                            }}
                          >
                            {program}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {app.notes && (
                    <div style={{
                      padding: "12px",
                      backgroundColor: "#fef3c7",
                      borderRadius: "8px",
                      borderLeft: "3px solid #f59e0b",
                      marginTop: "12px"
                    }}>
                      <span className="application-info-label" style={{ display: "block", marginBottom: "4px" }}>
                        ملاحظات الإدارة
                      </span>
                      <p style={{ margin: 0, color: "#92400e", fontSize: "14px" }}>
                        {app.notes}
                      </p>
                    </div>
                  )}

                  {app.university?.id && (
                    <div className="application-actions" style={{ marginTop: "16px" }}>
                      <Link
                        href={`/universities/${app.university.id}`}
                        className="btn primary"
                        style={{ textDecoration: "none", textAlign: "center" }}
                      >
                        عرض تفاصيل الجامعة
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
