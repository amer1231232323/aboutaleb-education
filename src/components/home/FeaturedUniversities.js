import Link from "next/link";
import Image from "next/image";

export default function FeaturedUniversities() {
    return (
        <section className="featured-universities">
            <div className="container">
                <h2 className="section-title">Featured Universities</h2>

                <div className="universities-grid">
                    <div className="university-card">
                        <div className="university-logo">
                            <Image src="/images/universities/u1.png" alt="Beykoz University" width={120} height={120} style={{ objectFit: 'contain' }} />
                        </div>
                        <h3>Beykoz<br />University</h3>
                        <span className="university-badge exclusive">Exclusive Partner</span>
                    </div>

                    <div className="university-card">
                        <div className="university-logo">
                            <Image src="/images/universities/u2.png" alt="Istanbul Gelisim University" width={120} height={120} style={{ objectFit: 'contain' }} />
                        </div>
                        <h3>Istanbul Gelisim<br />University</h3>
                        <span className="university-badge official">Official Agency</span>
                    </div>
                </div>

                <div className="universities-cta">
                    <Link href="/universities" className="btn secondary">
                        View All Universities
                    </Link>
                </div>
            </div>
        </section>
    );
}
