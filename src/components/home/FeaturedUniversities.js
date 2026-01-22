import Link from "next/link";
import Image from "next/image";

export default function FeaturedUniversities() {
    return (
        <section className="featured-universities">
            <div className="container">
                <h2 className="section-title">Featured Universities</h2>

                <div className="universities-grid">
                    <div className="university-card">
                        <h3 className="university-name">Beykoz University</h3>
                        <div className="university-logo">
                            <Image src="/images/universities/u1.png" alt="Beykoz University" width={120} height={120} style={{ objectFit: 'contain' }} />
                        </div>
                        <span className="university-agent">Official Agent</span>
                    </div>

                    <div className="university-card">
                        <h3 className="university-name">Istanbul Gelisim University</h3>
                        <div className="university-logo">
                            <Image src="/images/universities/u2.png" alt="Istanbul Gelisim University" width={120} height={120} style={{ objectFit: 'contain' }} />
                        </div>
                        <span className="university-agent">Official Agent</span>
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
