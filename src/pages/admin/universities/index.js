import { useEffect, useState } from "react";
import Link from "next/link";

export default function UniversitiesList() {
  const [universities, setUniversities] = useState([]);

  async function fetchData() {
    const res = await fetch("/api/admin/universities");
    const data = await res.json();
    setUniversities(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id) {
    if (!confirm("هل تريد حذف الجامعة؟")) return;

    const res = await fetch(`/api/admin/universities/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("تم الحذف بنجاح");
      fetchData();
    } else {
      alert("حدث خطأ أثناء الحذف");
    }
  }

  return (
    <div>
      <h2>قائمة الجامعات</h2>

      <Link href="/admin/universities/add">
        <button style={{ margin: "10px 0", padding: "8px 14px", background: "#0070f3", color: "#fff" }}>
          + إضافة جامعة جديدة
        </button>
      </Link>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>الصورة</th>
            <th>الاسم</th>
            <th>المدينة</th>
            <th>النوع</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {universities.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>لا توجد جامعات</td></tr>
          ) : (
            universities.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>
                  <img src={u.image} width="70" style={{ borderRadius: "4px" }} />
                </td>
                <td>{u.name}</td>
                <td>{u.city}</td>
                <td>{u.type}</td>
                <td>
                  <Link href={`/admin/universities/edit/${u._id}`}>
                    <button style={{ marginRight: "5px" }}>تعديل</button>
                  </Link>
                  <button onClick={() => handleDelete(u._id)} style={{ background: "red", color: "#fff" }}>
                    حذف
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}