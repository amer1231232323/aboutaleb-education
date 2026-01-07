import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
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

    // فحص بسيط قبل الإرسال
    if (!form.email || !form.password) {
      setError("من فضلك املأ جميع البيانات");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "حصل خطأ أثناء إنشاء الحساب");
        setLoading(false);
        return;
      }

      /**
       * ملاحظة:
       * الأفضل أمنيًا إن Register ما يعملش Login تلقائي
       * علشان كده هنحوّل المستخدم على صفحة تسجيل الدخول
       */
      router.push("/student/login");
    } catch (err) {
      setError("حصل خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="container auth-box">
        <h1>إنشاء حساب</h1>
        <p>سجّل بياناتك وابدأ رحلتك الجامعية</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn primary" disabled={loading}>
            {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
          </button>
        </form>

        <p className="auth-link">
          معاك حساب؟ <Link href="/student/login">تسجيل الدخول</Link>
        </p>
      </div>
    </section>
  );
}