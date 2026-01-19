import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container hero-content">
        <div className="hero-text">
          <h1>
            Your Path to Turkish
            <br />
            <span>Universities Starts Here</span>
          </h1>

          <p>
            Fast Admissions, International Support,
            <br />
            and Exclusive University Partnerships.
          </p>

          <div className="hero-buttons">
            <Link href="/student/register" className="btn primary">
              Apply Now
            </Link>

            <a
              href="https://wa.me/905015959880"
              target="_blank"
              rel="noreferrer"
              className="btn whatsapp"
            >
              <FaWhatsapp /> Contact via WhatsApp
            </a>
          </div>
        </div>

        <div className="hero-image">
          <Image src="/images/hero.jpg" alt="Students in Turkey" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </motion.section>
  );
}
 