import { withAdminAuth } from "@/lib/withAdminAuth";

function AdminImages() {
  return (
    <div className="admin-dashboard">
      <h1>إدارة الصور</h1>
      <p>سيتم إضافة التحكم في الصور هنا</p>
    </div>
  );
}

export default withAdminAuth(AdminImages);