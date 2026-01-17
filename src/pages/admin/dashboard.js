import { useRouter } from "next/router";
import { withAdminAuth } from "@/lib/withAdminAuth";

function AdminDashboard() {
  const router = useRouter();

  return (
    <div className="admin-dashboard">
      <h1>لوحة تحكم الأدمن</h1>

      <div className="admin-actions">
        <div className="admin-card" onClick={() => router.push("/admin/universities")}>
          <h3>إدارة الجامعات</h3>
          <p>إضافة وتعديل الجامعات</p>
        </div>

        <div className="admin-card" onClick={() => router.push("/admin/images")}>
          <h3>إدارة الصور</h3>
          <p>التحكم في صور الموقع</p>
        </div>

        <div className="admin-card" onClick={() => router.push("/admin/users")}>
          <h3>إدارة المستخدمين</h3>
          <p>عرض وتعديل المستخدمين</p>
        </div>
      </div>
    </div>
  );
}

export default withAdminAuth(AdminDashboard);