import Link from "next/link";

export default function Login() {
  return (
    <section className="auth">
      <div className="container auth-box">
        <h1>تسجيل الدخول</h1>
        <p className="auth-desc">
          ادخل بياناتك لمتابعة طلبك مع <strong>ABOU TALEB</strong>
        </p>

        <form className="auth-form">
          <input type="email" placeholder="البريد الإلكتروني" />
          <input type="password" placeholder="كلمة المرور" />

          <button className="btn primary">دخول</button>
        </form>

        <p className="auth-footer">
          ليس لديك حساب؟{" "}
          <Link href="/student/register">سجّل الآن</Link>
        </p>
      </div>
    </section>
  );
}