import Link from "next/link";
import Image from "next/image";
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
                        <div className="university-logo">
                            <Image src="/images/universities/u1.png" alt={t('beykozUniversity')} width={120} height={120} style={{ objectFit: 'contain' }} />
                        </div>
                        <span className="university-agent">{t('officialAgent')}</span>
                    </div>

                    <div className="university-card">
                        <h3 className="university-name">{t('istanbulGelisimUniversity')}</h3>
                        <div className="university-logo">
                            <Image src="/images/universities/u2.png" alt={t('istanbulGelisimUniversity')} width={120} height={120} style={{ objectFit: 'contain' }} />
                        </div>
                        <span className="university-agent">{t('officialAgent')}</span>
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
