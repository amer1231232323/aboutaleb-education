import { withAdminAuth } from "@/lib/withAdminAuth";

function AdminUsers() {
  return (
    <div className="admin-dashboard">
      <h1>إدارة المستخدمين</h1>
      <p>سيتم إضافة إدارة المستخدمين هنا</p>
    </div>
  );
}

export default withAdminAuth(AdminUsers);