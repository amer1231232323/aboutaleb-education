import Link from "next/link";
import Image from "next/image";
import { FaGraduationCap, FaCity, FaDollarSign, FaLanguage, FaBook, FaFileAlt, FaPassport, FaHome, FaPlane, FaHandshake } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
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
      </section>

      {/* WHY STUDY IN TURKEY */}
      <section className="why-study">
        <div className="container">
          <h2 className="section-title">Why Study in Turkey?</h2>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">
                <FaGraduationCap />
              </div>
              <h3>Strong Universities</h3>
              <p>Top-ranked universities hold with international accreditation to registers.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <FaCity />
              </div>
              <h3>International City</h3>
              <p>Istanbul 5 seen multicuspia Intercalleming Europa, to Asia.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <FaDollarSign />
              </div>
              <h3>Affordable Tuition</h3>
              <p>Competitive fees, compared Europe, USA, and US Uk.</p>
            </div>

            <div className="why-card">
              <div className="why-icon">
                <FaLanguage />
              </div>
              <h3>English Programs</h3>
              <p>Relang int Bilugh hesertines for Bachelor, Master, Phd.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED UNIVERSITIES */}
      <section className="featured-universities">
        <div className="container">
          <h2 className="section-title">Featured Universities</h2>

          <div className="universities-grid">
            <div className="university-card">
              <div className="university-logo">
                <Image src="/images/universities/u1.png" alt="Beykoz University" width={120} height={120} style={{ objectFit: 'contain' }} />
              </div>
              <h3>Beykoz<br />UNIVERSITY</h3>
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

      {/* OUR SERVICES */}
      <section className="our-services">
        <div className="container">
          <h2 className="section-title">Our Services</h2>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <FaGraduationCap />
              </div>
              <h3>University Admission</h3>
              <p>Phrase universities admission-international admission.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaFileAlt />
              </div>
              <h3>Document Review</h3>
              <p>Cile omitea admisy ven documents for remints.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaPassport />
              </div>
              <h3>Visa Guidance</h3>
              <p>Support Inte stdance anter rach risa quidelty.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaHome />
              </div>
              <h3>Residence Permit</h3>
              <p>Support for student residence permits after arrivas.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaBook />
              </div>
              <h3>Translation & Notary</h3>
              <p>OR, Dip translation and notary support, whtin required.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaHandshake />
              </div>
              <h3>Trancational Counsil</h3>
              <p>Rrointernional trasster for bachelor, Master, and Bl.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaGraduationCap />
              </div>
              <h3>Educational Conseling</h3>
              <p>Infermatiuon gluance to Vain meetes, and Plov</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <FaPlane />
              </div>
              <h3>Travel to Turkey</h3>
              <p>Set flune tutchorial journey in Bastheiul.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}