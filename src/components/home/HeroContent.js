import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function HeroContent() {
  const { t } = useTranslation();

  return (
    <section className="hero-content">
      <div className="container">
        <div className="hero-text">
          <h1 className="hero-title">
            {t('heroTitle')}
            <br />
            <span>{t('heroTitleSpan')}</span>
          </h1>

          <p className="hero-description">
            {t('heroDescription')}
          </p>

          <div className="hero-buttons">
            <Link
              href="/student/register"
              className="btn btn-primary"
            >
              {t('applyNow')}
            </Link>

            <a
              href="https://wa.me/905015959880"
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <FaWhatsapp />
              {t('contactViaWhatsapp')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
