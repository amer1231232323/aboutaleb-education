import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EditUniversity() {
  const router = useRouter();
  const { id } = router.query;
  const [university, setUniversity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    type: "",
    website: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (id) {
      async function fetchUniversity() {
        try {
          const res = await fetch(`/api/admin/universities/${id}`);
          if (!res.ok) throw new Error("Failed to fetch university");
          const data = await res.json();
          setUniversity(data);
          setFormData({
            name: data.name || "",
            city: data.city || "",
            type: data.type || "",
            website: data.website || "",
            description: data.description || "",
            image: data.image || "",
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      fetchUniversity();
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/admin/universities/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update university");
      alert("تم التحديث بنجاح");
      router.push("/admin/universities");
    } catch (err) {
      alert("حدث خطأ أثناء التحديث");
    }
  }

  async function handleDelete() {
    if (!confirm("هل تريد حذف الجامعة؟")) return;
    try {
      const res = await fetch(`/api/admin/universities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete university");
      alert("تم الحذف بنجاح");
      router.push("/admin/universities");
    } catch (err) {
      alert("حدث خطأ أثناء الحذف");
    }
  }

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;
  if (!university) return <div>الجامعة غير موجودة</div>;

  return (
    <div>
      <h2>تعديل الجامعة</h2>

      <Link href="/admin/universities">
        <button style={{ margin: "10px 0", padding: "8px 14px", background: "#0070f3", color: "#fff" }}>
          العودة إلى القائمة
        </button>
      </Link>

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "20px 0" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>الاسم:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>المدينة:</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>النوع:</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>الموقع الإلكتروني:</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>الوصف:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="4"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>رابط الصورة:</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px", background: "#0070f3", color: "#fff", marginRight: "10px" }}>
          حفظ التغييرات
        </button>

        <button type="button" onClick={handleDelete} style={{ padding: "10px 20px", background: "red", color: "#fff" }}>
          حذف الجامعة
        </button>
      </form>
    </div>
  );
}
