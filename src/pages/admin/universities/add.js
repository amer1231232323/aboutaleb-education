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
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/universities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      <h1>Add New University</h1>

      <Link href="/admin/universities">
        <button className="btn secondary" style={{ marginBottom: "20px" }}>
          ← Back
        </button>
      </Link>

      {error && <div className="error" style={{ marginBottom: "20px" }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
        <div className="form-group">
          <label>University Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Enter university name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder="Istanbul / Ankara / etc"
            value={form.city}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>University Type</label>
          <input
            type="text"
            name="type"
            placeholder="Private / Public"
            value={form.type}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Website</label>
          <input
            type="url"
            name="website"
            placeholder="https://example.com"
            value={form.website}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Description of the university and available programs"
            value={form.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="url"
            name="image"
            placeholder="https://example.com/image.jpg"
            value={form.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn primary" disabled={loading}>
          {loading ? "Adding..." : "Add University"}
        </button>
      </form>
    </div>
  );
}

export default withAdminAuth(AddUniversity);