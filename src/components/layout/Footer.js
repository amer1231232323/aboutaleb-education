import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        <div className="footer-col">
          <h3>ABOU TALEB</h3>
          <p>
            منصة متخصصة في تسجيل الطلاب بالجامعات الخاصة في تركيا
            مع متابعة كاملة من البداية حتى القبول.
          </p>
        </div>

        <div className="footer-col">
          <h4>روابط سريعة</h4>
          <ul>
            <li><Link href="/">الرئيسية</Link></li>
            <li><Link href="/universities">الجامعات</Link></li>
            <li><Link href="/contact">تواصل معنا</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>تواصل معنا</h4>
          <p>واتساب  905015959880</p>
          <p>info@aboutaleb.com</p>

          <div className="social-media">
            <a href="#" className="social-link"><FaFacebookF /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaTwitter /></a>
            <a href="#" className="social-link"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ABOU TALEB –  تصميم محمد عامر تواصل 01096125379 جميع الحقوق محفوظة
      </div>
    </footer>
  );
}