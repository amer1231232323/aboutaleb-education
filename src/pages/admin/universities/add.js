import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { withAdminAuth } from "@/lib/withAdminAuth";

function AddUniversity() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    city: "",
    type: "",
    website: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/universities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to add university");
      }

      router.push("/admin/universities");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="admin-dashboard">
      <h1>إضافة جامعة جديدة</h1>

      <Link href="/admin/universities">
        <button className="btn secondary" style={{ marginBottom: "20px" }}>
          ← العودة
        </button>
      </Link>

      {error && <div className="error" style={{ marginBottom: "20px" }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
        <div className="form-group">
          <label>اسم الجامعة *</label>
          <input
            type="text"
            name="name"
            placeholder="أدخل اسم الجامعة"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>المدينة</label>
          <input
            type="text"
            name="city"
            placeholder="إسطنبول / أنقرة / إلخ"
            value={form.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>نوع الجامعة</label>
          <input
            type="text"
            name="type"
            placeholder="خاصة / حكومية"
            value={form.type}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>الموقع الإلكتروني</label>
          <input
            type="url"
            name="website"
            placeholder="https://example.com"
            value={form.website}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>الوصف</label>
          <textarea
            name="description"
            placeholder="وصف الجامعة والبرامج المتاحة"
            value={form.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>رابط الصورة</label>
          <input
            type="url"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={form.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? "جاري الإضافة..." : "+ إضافة جامعة"}
        </button>
      </form>
    </div>
  );
}

export default withAdminAuth(AddUniversity);