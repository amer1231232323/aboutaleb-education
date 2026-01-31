import Link from "next/link";
import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { slugify } from "@/lib/utils";

export async function getServerSideProps({ params }) {
  const { id } = params;
  const logoDir = path.join(process.cwd(), 'public', 'logo');
  const files = fs.readdirSync(logoDir);
  const file = files.find(f => slugify(path.parse(f).name) === id);
  if (!file) {
    return { notFound: true };
  }
  const logo = `/logo/${encodeURIComponent(file)}`;
  const name = path.parse(file).name.charAt(0).toUpperCase() + path.parse(file).name.slice(1);
  return { props: { name, logo } };
}

export default function UniversityDetails({ name, logo }) {

  return (
    <>
      {/* UNIVERSITY HERO */}
      <section className="university-hero">
        <div className="container">
          <h1>{name}</h1>
          <Image src={logo} alt={name} width={200} height={150} style={{ objectFit: 'contain' }} unoptimized />
          <p>Istanbul - Turkey</p>

          <Link href="/student/register" className="btn primary">
            Apply Now
          </Link>
        </div>
      </section>

      {/* UNIVERSITY INFO */}
      <section className="university-info">
        <div className="container info-grid">
          <div className="info-card">
            <h4>Language of Study</h4>
            <p>English / Turkish</p>
          </div>

          <div className="info-card">
            <h4>Tuition Fees</h4>
            <p>From $2500 annually</p>
          </div>

          <div className="info-card">
            <h4>University Type</h4>
            <p>Private</p>
          </div>

          <div className="info-card">
            <h4>Accreditation</h4>
            <p>Accredited</p>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="university-description">
        <div className="container">
          <h2 className="section-title">About the University</h2>
          <p>
            A distinguished private university in Turkey, offering strong educational programs
            and a modern study environment with international recognition.
          </p>
        </div>
      </section>

      {/* MAJORS */}
      <section className="university-majors">
        <div className="container">
          <h2 className="section-title">Programs</h2>

          <div className="majors-grid">
            <div className="major-card">Engineering</div>
            <div className="major-card">Business Administration</div>
            <div className="major-card">Medicine</div>
            <div className="major-card">Pharmacy</div>
          </div>
        </div>
      </section>

      {/* TUITION FEES */}
      <section className="university-tuition">
        <div className="container">
          <h2 className="section-title">Tuition Fees</h2>
          <p>Placeholder for tuition fees information.</p>
        </div>
      </section>

      {/* ADMISSION REQUIREMENTS */}
      <section className="university-admission">
        <div className="container">
          <h2 className="section-title">Admission Requirements</h2>
          <p>Placeholder for admission requirements information.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Start?</h2>
          <p>Leave the rest to us</p>

          <a
            href="https://wa.me/905015959880"
            target="_blank"
            rel="noreferrer"
            className="btn whatsapp"
          >
            Contact WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}