import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

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
            {t('heroTitle')}
            <br />
            <span>{t('heroTitleSpan')}</span>
          </h1>

          <p>
            {t('heroDescription')}
          </p>

          <div className="hero-buttons">
            <Link href="/student/register" className="btn primary">
              {t('applyNow')}
            </Link>

            <a
              href="https://wa.me/905015959880"
              target="_blank"
              rel="noreferrer"
              className="btn whatsapp"
            >
              <FaWhatsapp /> {t('contactViaWhatsapp')}
            </a>
          </div>
        </div>

        <div className="hero-image">
          <Image src="/images/hero.jpg" alt={t('studentsInTurkey')} fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </motion.section>
  );
}
