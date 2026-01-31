import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function FeaturedUniversities() {
    const { t } = useTranslation();

    return (
        <section className="featured-universities">
            <div className="container">
                <h2 className="section-title">{t('featuredUniversities')}</h2>

                <div className="universities-grid">
                    <div className="university-card">
                        <h3 className="university-name">{t('beykozUniversity')}</h3>
                        <div className="university-logo logo-container">
                            <img src={`/images/universities/u1.png`} alt={t('beykozUniversity')} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                        </div>
                        <Link href="/universities/beykoz" className="btn details-btn">
                            {t('details')}
                        </Link>
                    </div>

                    <div className="university-card">
                        <h3 className="university-name">{t('istanbulGelisimUniversity')}</h3>
                        <div className="university-logo logo-container">
                            <img src={`/images/universities/u2.png`} alt={t('istanbulGelisimUniversity')} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                        </div>
                        <Link href="/universities/istanbul-gelisim" className="btn details-btn">
                            {t('details')}
                        </Link>
                    </div>
                </div>

                <div className="universities-cta">
                    <Link href="/universities" className="btn secondary">
                        {t('viewAll')}
                    </Link>
                </div>
            </div>
        </section>
    );
}
