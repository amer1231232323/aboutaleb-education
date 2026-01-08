import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (path) => router.pathname === path;

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

          <a
            href="https://wa.me/905015959880"
            target="_blank"
            className="btn whatsapp small"
          >
            واتساب
          </a>
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