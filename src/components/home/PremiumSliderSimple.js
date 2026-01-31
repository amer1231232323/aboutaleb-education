import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function PremiumSliderSimple() {
  const { t } = useTranslation();

  return (
    <section className="premium-slider">
      <div className="slider-container">
        {/* Single slide for testing */}
        <div className="slides-wrapper">
          <div className="slide active">
            <div className="slide-image">
              <img
                src="/slide1.jpg"
                alt="Study in Turkey"
                loading="eager"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              <div className="slide-overlay"></div>
            </div>

            <div className="slide-content">
              <div className="container">
                <div className="slide-text">
                  <h1 className="slide-title">
                    {t('heroTitle')}
                    <br />
                    <span>{t('heroTitleSpan')}</span>
                  </h1>

                  <p className="slide-description">
                    {t('heroDescription')}
                  </p>

                  <div className="slide-buttons">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
