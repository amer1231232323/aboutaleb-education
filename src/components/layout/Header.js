import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [langOpen, setLangOpen] = useState(false);

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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-content">

        {/* LOGO */}
        <Link href="/" className="logo">
          <div className="logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
              <path d="M20 10L20 30M15 20L25 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-name">ABOU-TALEB</span>
            <span className="logo-subtitle">EDUCATION</span>
          </div>
        </Link>

        {/* NAV */}
        <nav className={`nav ${open ? "open" : ""}`}>
          <Link href="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>

          <Link
            href="/services"
            className={isActive("/services") ? "active" : ""}
          >
            Services
          </Link>

          <Link
            href="/universities"
            className={isActive("/universities") ? "active" : ""}
          >
            Universities
          </Link>

          <Link
            href="/contact"
            className={isActive("/contact") ? "active" : ""}
          >
            Contact
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="header-actions">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link href="/admin/dashboard" className="btn secondary small">
                  Admin
                </Link>
              )}
              {user.role !== "admin" && (
                <Link href="/student/dashboard" className="btn secondary small">
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="btn outline small"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/student/register" className="btn primary small">
              Apply
            </Link>
          )}

          <div className="language-dropdown">
            <button
              className="language-switch"
              onClick={() => setLangOpen(!langOpen)}
            >
              + AR - EN-GB
            </button>
            {langOpen && (
              <div className="language-options">
                <button onClick={() => changeLanguage('ar')}>العربية</button>
                <button onClick={() => changeLanguage('tr')}>Türkçe</button>
                <button onClick={() => changeLanguage('fa')}>فارسی</button>
                <button onClick={() => changeLanguage('ru')}>Русский</button>
                <button onClick={() => changeLanguage('fr')}>Français</button>
              </div>
            )}
          </div>
        </div>

        {/* BURGER */}
        <div className={`burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  );
}
