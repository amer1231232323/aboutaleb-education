import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = () => {
      const userData = typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    checkUser();
  }, []);

  const isActive = (path) => router.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <header className="header">
      <div className="container header-content">

        {/* LOGO */}
        <Link href="/" className="logo">
          ABOU <span>TALEB</span>
        </Link>

        {/* NAV */}
        <nav className={`nav ${open ? "open" : ""}`}>
          <Link href="/" className={isActive("/") ? "active" : ""}>
            الرئيسية
          </Link>

          <Link
            href="/universities"
            className={isActive("/universities") ? "active" : ""}
          >
            الجامعات
          </Link>

          <Link
            href="/contact"
            className={isActive("/contact") ? "active" : ""}
          >
            تواصل معنا
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link href="/admin/dashboard" className="btn secondary small">
                  الإدارة
                </Link>
              )}
              {user.role !== "admin" && (
                <Link href="/student/dashboard" className="btn secondary small">
                  لوحتي
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="btn outline small"
                style={{ cursor: "pointer", border: "none", background: "transparent" }}
              >
                خروج
              </button>
            </>
          ) : (
            <>
              <Link href="/student/login" className="btn secondary small">
                دخول
              </Link>
              <Link href="/student/register" className="btn primary small">
                سجل الآن
              </Link>
            </>
          )}

          <a
            href="https://wa.me/905015959880"
            target="_blank"
            rel="noreferrer"
            className="btn whatsapp small"
          >
            واتساب
          </a>

          {/* Language Switch */}
          <button className="language-switch">
            EN
          </button>
        </nav>

        {/* BURGER */}
        <div className="burger" onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}