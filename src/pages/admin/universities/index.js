import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { withAdminAuth } from "@/lib/withAdminAuth";

function UniversitiesList() {
  const router = useRouter();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const res = await fetch("/api/admin/universities");
      const data = await res.json();
      setUniversities(data);
    } catch (err) {
      console.error("Error fetching universities:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id) {
    if (!confirm("هل تريد حذف الجامعة؟")) return;

    try {
      const res = await fetch(`/api/admin/universities/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("تم الحذف بنجاح");
        fetchData();
      } else {
        alert("حدث خطأ أثناء الحذف");
      }
    } catch (err) {
      alert("خطأ في الاتصال");
    }
  }

  return (
    <div className="admin-dashboard">
      <h1>إدارة الجامعات</h1>

      <Link href="/admin/universities/add">
        <button className="btn primary" style={{ marginBottom: "20px" }}>
          + إضافة جامعة جديدة
        </button>
      </Link>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : universities.length === 0 ? (
        <p>لا توجد جامعات. <Link href="/admin/universities/add">أضف الآن</Link></p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f5f5f5" }}>
              <th style={{ padding: "12px", textAlign: "right" }}>#</th>
              <th style={{ padding: "12px", textAlign: "right" }}>الصورة</th>
              <th style={{ padding: "12px", textAlign: "right" }}>الاسم</th>
              <th style={{ padding: "12px", textAlign: "right" }}>المدينة</th>
              <th style={{ padding: "12px", textAlign: "right" }}>النوع</th>
              <th style={{ padding: "12px", textAlign: "right" }}>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((u, i) => (
              <tr key={u._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px" }}>{i + 1}</td>
                <td style={{ padding: "12px" }}>
                  {u.image && (
                    <Image
                      src={u.image}
                      alt={u.name}
                      width={60}
                      height={60}
                      style={{ borderRadius: "6px", objectFit: "cover" }}
                    />
                  )}
                </td>
                <td style={{ padding: "12px" }}>{u.name}</td>
                <td style={{ padding: "12px" }}>{u.city || "N/A"}</td>
                <td style={{ padding: "12px" }}>{u.type || "N/A"}</td>
                <td style={{ padding: "12px" }}>
                  <Link href={`/admin/universities/${u._id}`}>
                    <button className="btn secondary" style={{ marginRight: "8px", padding: "6px 12px", fontSize: "14px" }}>
                      تعديل
                    </button>
                  </Link>
                  <button
                    className="btn error"
                    onClick={() => handleDelete(u._id)}
                    style={{ padding: "6px 12px", fontSize: "14px" }}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default withAdminAuth(UniversitiesList);