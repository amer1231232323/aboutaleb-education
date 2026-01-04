import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        {/* LOGO */}
        <Link href="/" className="logo">
          ABOU <span>TALEB</span>
        </Link>

        {/* NAV */}
        <nav className="nav">
          <Link href="/">الرئيسية</Link>
          <Link href="/universities">الجامعات</Link>
          <Link href="/contact">تواصل معنا</Link>
        </nav>

        {/* SOCIAL */}
        <div className="social">
          <a
            href="https://wa.me/201000000000"
            target="_blank"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>

          <a
            href="https://instagram.com/"
            target="_blank"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://facebook.com/"
            target="_blank"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
        </div>
      </div>
    </header>
  );
}