import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { withAdminAuth } from "@/lib/withAdminAuth";

function EditUniversity() {
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
          const token = localStorage.getItem("token");
          const res = await fetch(`/api/admin/universities/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
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
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/universities/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update university");
      alert("Updated successfully");
      router.push("/admin/universities");
    } catch (err) {
      alert("An error occurred during update");
    }
  }

  async function handleDelete() {
    if (!confirm("Do you want to delete the university?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/universities/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete university");
      alert("Deleted successfully");
      router.push("/admin/universities");
    } catch (err) {
      alert("An error occurred during deletion");
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!university) return <div>University not found</div>;

  return (
    <div>
      <h2>Edit University</h2>

      <Link href="/admin/universities">
        <button style={{ margin: "10px 0", padding: "8px 14px", background: "#0070f3", color: "#fff" }}>
          Back to list
        </button>
      </Link>

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "20px 0" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>City:</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Type:</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Website:</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="4"
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Image URL:</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px", background: "#0070f3", color: "#fff", marginRight: "10px" }}>
          Save Changes
        </button>

        <button type="button" onClick={handleDelete} style={{ padding: "10px 20px", background: "red", color: "#fff" }}>
          Delete University
        </button>
      </form>
    </div>
  );
}

export default withAdminAuth(EditUniversity);
