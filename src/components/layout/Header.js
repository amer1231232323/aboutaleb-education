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

  const getLanguageLabel = () => {
    const langLabels = {
      ar: 'العربية',
      tr: 'Türkçe',
      fa: 'فارسی',
      ru: 'Русский',
      fr: 'Français',
      en: 'English'
    };
    return langLabels[i18n.language] || 'العربية';
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleNavClick = (e) => {
    closeMenu();
  };

  return (
    <header className="header">
      <div className="container header-content">

        {/* LOGO */}
        <Link href="/" className="logo">
          <div className="logo-icon logo-container">
            <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
          <Link href="/" className={isActive("/") ? "active" : ""} onClick={handleNavClick}>
            {t('home')}
          </Link>

          <Link
            href="/services"
            className={isActive("/services") ? "active" : ""}
            onClick={handleNavClick}
          >
            {t('services')}
          </Link>

          <Link
            href="/universities"
            className={isActive("/universities") ? "active" : ""}
            onClick={handleNavClick}
          >
            {t('universities')}
          </Link>

          <Link
            href="/contact"
            className={isActive("/contact") ? "active" : ""}
            onClick={handleNavClick}
          >
            {t('contact')}
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="header-actions">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link href="/admin/dashboard" className="btn secondary small">
                  {t('admin')}
                </Link>
              )}
              {user.role !== "admin" && (
                <Link href="/student/dashboard" className="btn secondary small">
                  {t('dashboard')}
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="btn outline small"
              >
                {t('logout')}
              </button>
            </>
          ) : (
            <Link href="/student/register" className="btn primary small">
              {t('apply')}
            </Link>
          )}

          <div className="language-dropdown">
            <button
              className="language-switch"
              onClick={() => setLangOpen(!langOpen)}
            >
              {getLanguageLabel()}
            </button>
            {langOpen && (
              <div className="language-options">
                <button onClick={() => changeLanguage('ar')}>العربية</button>
                <button onClick={() => changeLanguage('tr')}>Türkçe</button>
                <button onClick={() => changeLanguage('fa')}>فارسی</button>
                <button onClick={() => changeLanguage('ru')}>Русский</button>
                <button onClick={() => changeLanguage('fr')}>Français</button>
                <button onClick={() => changeLanguage('en')}>English</button>
              </div>
            )}
          </div>
        </div>

        {/* BURGER */}
        <div className={`burger ${open ? "open" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="nav-overlay active" onClick={closeMenu}></div>
      )}
    </header>
  );
}
