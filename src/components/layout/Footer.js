import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">

        <div className="footer-col">
          <h3>ABOU-TALEB EDUCATION</h3>
          <p>
            Private admissions advice can start with
            Exclusive University Partnerships.
          </p>
        </div>

        <div className="footer-col">
          <h4>Pages</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/universities">Services</Link></li>
            <li><Link href="/universities">Universities</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link href="/universities">University Admission</Link></li>
            <li><Link href="/universities">Document Review</Link></li>
            <li><Link href="/universities">Visa Guidance</Link></li>
            <li><Link href="/universities">Residence Permit</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>WhatsApp: +90 501 595 9880</p>
          <p>Email: info@aboutaleb.com</p>
          <p>Istanbul, Turkey</p>

          <div className="social-media">
            <a href="#" className="social-link" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="social-link" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="social-link" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="social-link" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ABOU-TALEB EDUCATION. All rights reserved.
      </div>
    </footer>
  );
}
