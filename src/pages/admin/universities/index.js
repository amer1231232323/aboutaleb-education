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
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/universities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setUniversities(data);
      } else {
        setUniversities([]);
      }
    } catch (err) {
      setUniversities([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Do you want to delete the university?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/universities/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Deleted successfully");
        fetchData();
      } else {
        alert("An error occurred during deletion");
      }
    } catch (err) {
      alert("Connection error");
    }
  }

  return (
    <div className="admin-dashboard">
      <h1>University Management</h1>

      <Link href="/admin/universities/add">
        <button className="btn primary" style={{ marginBottom: "20px" }}>
          + Add New University
        </button>
      </Link>

      {loading ? (
        <p>Loading...</p>
      ) : universities.length === 0 ? (
        <p>No universities. <Link href="/admin/universities/add">Add now</Link></p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ddd", backgroundColor: "#f5f5f5" }}>
              <th style={{ padding: "12px", textAlign: "left" }}>#</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Image</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>City</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Type</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
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
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn error"
                    onClick={() => handleDelete(u._id)}
                    style={{ padding: "6px 12px", fontSize: "14px" }}
                  >
                    Delete
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