import { useEffect, useState } from "react";
import { withAdminAuth } from "@/lib/withAdminAuth";

function ApplicationsManagement() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ status: "", notes: "" });

    async function fetchApplications() {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("/api/admin/applications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (res.ok) {
                setApplications(data.data || []);
            } else {
                setApplications([]);
            }
        } catch (err) {
            setApplications([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, []);

    function getStatusText(status) {
        const statusMap = {
            pending: "قيد الانتظار",
            accepted: "مقبول",
            rejected: "مرفوض",
            missing_documents: "وثائق ناقصة"
        };
        return statusMap[status] || status;
    }

    function getStatusColor(status) {
        const colorMap = {
            pending: "#f59e0b",
            accepted: "#10b981",
            rejected: "#ef4444",
            missing_documents: "#8b5cf6"
        };
        return colorMap[status] || "#6b7280";
    }

    async function handleStatusUpdate(id, newStatus) {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/admin/applications/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                alert("تم تحديث الحالة بنجاح");
                fetchApplications();
            } else {
                alert("حدث خطأ أثناء التحديث");
            }
        } catch (err) {
            alert("خطأ في الاتصال");
        }
    }

    function startEditing(app) {
        setEditingId(app.id);
        setEditForm({ status: app.status, notes: app.notes });
    }

    function cancelEditing() {
        setEditingId(null);
        setEditForm({ status: "", notes: "" });
    }

    async function saveEditing(id) {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/admin/applications/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(editForm),
            });

            if (res.ok) {
                alert("تم الحفظ بنجاح");
                setEditingId(null);
                fetchApplications();
            } else {
                alert("حدث خطأ أثناء الحفظ");
            }
        } catch (err) {
            alert("خطأ في الاتصال");
        }
    }

    async function handleDelete(id) {
        if (!confirm("هل تريد حذف هذا الطلب؟")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`/api/admin/applications/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                alert("تم الحذف بنجاح");
                fetchApplications();
            } else {
                alert("حدث خطأ أثناء الحذف");
            }
        } catch (err) {
            alert("خطأ في الاتصال");
        }
    }

    return (
        <div className="admin-dashboard">
            <h1>إدارة الطلبات الجامعية</h1>

            {loading ? (
                <p>جاري التحميل...</p>
            ) : applications.length === 0 ? (
                <p>لا توجد طلبات حتى الآن.</p>
            ) : (
                <div className="applications-table-container">
                    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                        <thead>
                            <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f5f5f5" }}>
                                <th style={{ padding: "12px", textAlign: "right" }}>#</th>
                                <th style={{ padding: "12px", textAlign: "right" }}>الطالب</th>
                                <th style={{ padding: "12px", textAlign: "right" }}>الجامعة</th>
                                <th style={{ padding: "12px", textAlign: "right" }}>الحالة</th>
                                <th style={{ padding: "12px", textAlign: "right" }}>تاريخ التقديم</th>
                                <th style={{ padding: "12px", textAlign: "right" }}>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app, i) => (
                                <tr key={app.id} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "12px" }}>{i + 1}</td>
                                    <td style={{ padding: "12px" }}>
                                        <div>
                                            <div style={{ fontWeight: "bold" }}>{app.student?.name || "غير محدد"}</div>
                                            <div style={{ fontSize: "14px", color: "#666" }}>{app.student?.email}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        <div>
                                            <div style={{ fontWeight: "bold" }}>{app.university?.name || "غير محدد"}</div>
                                            {app.university?.city && (
                                                <div style={{ fontSize: "14px", color: "#666" }}>📍 {app.university.city}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        {editingId === app.id ? (
                                            <select
                                                value={editForm.status}
                                                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                                style={{ padding: "4px", borderRadius: "4px", border: "1px solid #ccc" }}
                                            >
                                                <option value="pending">قيد الانتظار</option>
                                                <option value="accepted">مقبول</option>
                                                <option value="rejected">مرفوض</option>
                                                <option value="missing_documents">وثائق ناقصة</option>
                                            </select>
                                        ) : (
                                            <span
                                                style={{
                                                    padding: "4px 8px",
                                                    borderRadius: "12px",
                                                    color: "white",
                                                    backgroundColor: getStatusColor(app.status),
                                                    fontSize: "12px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {getStatusText(app.status)}
                                            </span>
                                        )}
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        {new Date(app.appliedAt).toLocaleDateString("ar-EG")}
                                    </td>
                                    <td style={{ padding: "12px" }}>
                                        {editingId === app.id ? (
                                            <div style={{ display: "flex", gap: "8px" }}>
                                                <button
                                                    className="btn primary"
                                                    onClick={() => saveEditing(app.id)}
                                                    style={{ padding: "6px 12px", fontSize: "14px" }}
                                                >
                                                    حفظ
                                                </button>
                                                <button
                                                    className="btn secondary"
                                                    onClick={cancelEditing}
                                                    style={{ padding: "6px 12px", fontSize: "14px" }}
                                                >
                                                    إلغاء
                                                </button>
                                            </div>
                                        ) : (
                                            <div style={{ display: "flex", gap: "8px" }}>
                                                <button
                                                    className="btn secondary"
                                                    onClick={() => startEditing(app)}
                                                    style={{ padding: "6px 12px", fontSize: "14px" }}
                                                >
                                                    تعديل
                                                </button>
                                                <button
                                                    className="btn error"
                                                    onClick={() => handleDelete(app.id)}
                                                    style={{ padding: "6px 12px", fontSize: "14px" }}
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default withAdminAuth(ApplicationsManagement);
