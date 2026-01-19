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
      console.error("Error fetching users:", err);
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
      console.error("Error updating user:", err);
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
      console.error("Error deleting user:", err);
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
        <h1>إدارة المستخدمين</h1>
        <p>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1>إدارة المستخدمين</h1>

      {error && (
        <div style={{ color: "red", marginBottom: "20px" }}>
          {error}
        </div>
      )}

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>الدور</th>
              <th>تاريخ التسجيل</th>
              <th>الإجراءات</th>
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
                      <option value="student">طالب</option>
                      <option value="admin">مدير</option>
                    </select>
                  ) : (
                    user.role === "admin" ? "مدير" : "طالب"
                  )}
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString("ar-EG")}</td>
                <td>
                  {editingUser === user._id ? (
                    <>
                      <button onClick={handleSave} className="btn small primary">
                        حفظ
                      </button>
                      <button onClick={handleCancel} className="btn small secondary">
                        إلغاء
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user)} className="btn small primary">
                        تعديل
                      </button>
                      <button onClick={() => handleDelete(user._id)} className="btn small error">
                        حذف
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
