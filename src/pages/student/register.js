import Link from "next/link";

export default function Register() {
  return (
    <section className="auth">
      <div className="container auth-box">
        <h1>تسجيل طالب جديد</h1>
        <p className="auth-desc">
          املأ البيانات وسيتواصل معك فريق <strong>ABOU TALEB</strong>
        </p>

        <form className="auth-form">
          <input type="text" placeholder="الاسم الكامل" />
          <input type="email" placeholder="البريد الإلكتروني" />
          <input type="tel" placeholder="رقم الهاتف" />
          <input type="text" placeholder="التخصص المطلوب" />

          <button className="btn primary">تسجيل الآن</button>
        </form>

        <p className="auth-footer">
          لديك حساب بالفعل؟{" "}
          <Link href="/student/login">تسجيل الدخول</Link>
        </p>
      </div>
    </section>
  );
}