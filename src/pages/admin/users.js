import { useState, useEffect } from "react";
import { withAdminAuth } from "@/lib/withAdminAuth";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      setError("An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/users/${editingUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        setEditingUser(null);
        fetchUsers(); // Refresh the list
      } else {
        setError("Failed to update user");
      }
    } catch (err) {
      setError("An error occurred while updating user");
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchUsers(); // Refresh the list
      } else {
        setError("Failed to delete user");
      }
    } catch (err) {
      setError("An error occurred while deleting user");
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({ name: "", email: "", role: "" });
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <h1>User Management</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1>User Management</h1>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registration Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {editingUser === user._id ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingUser === user._id ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUser === user._id ? (
                    <select
                      value={editForm.role}
                      onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    user.role === "admin" ? "Admin" : "Student"
                  )}
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString("en-US")}</td>
                <td>
                  {editingUser === user._id ? (
                    <>
                      <button onClick={handleSave} className="btn small primary">
                        Save
                      </button>
                      <button onClick={handleCancel} className="btn small secondary">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user)} className="btn small primary">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(user._id)} className="btn small error">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withAdminAuth(AdminUsers);
