import Link from "next/link";
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const logoDir = path.join(process.cwd(), 'public', 'logo');
  const files = fs.readdirSync(logoDir).filter(file => /\.(png|jpg|jpeg)$/i.test(file));
  const paths = files.map(file => {
    const name = path.parse(file).name;
    return { params: { id: name } };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const logoDir = path.join(process.cwd(), 'public', 'logo');
  const files = fs.readdirSync(logoDir);
  const file = files.find(f => path.parse(f).name === id);
  if (!file) {
    return { notFound: true };
  }
  const logo = `/logo/${file}`;
  const name = id.charAt(0).toUpperCase() + id.slice(1);
  return { props: { name, logo } };
}

export default function UniversityDetails({ name, logo }) {

  return (
    <>
      {/* UNIVERSITY HERO */}
      <section className="university-hero">
        <div className="container">
          <h1>{name}</h1>
          <Image src={logo} alt={name} width={200} height={150} />
          <p>إسطنبول – تركيا</p>

          <Link href="/student/register" className="btn primary">
            قدّم الآن
          </Link>
        </div>
      </section>

      {/* UNIVERSITY INFO */}
      <section className="university-info">
        <div className="container info-grid">
          <div className="info-card">
            <h4>لغة الدراسة</h4>
            <p>الإنجليزية / التركية</p>
          </div>

          <div className="info-card">
            <h4>الرسوم</h4>
            <p>من 2500$ سنويًا</p>
          </div>

          <div className="info-card">
            <h4>نوع الجامعة</h4>
            <p>خاصة</p>
          </div>

          <div className="info-card">
            <h4>الاعتماد</h4>
            <p>معترف بها</p>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      <section className="university-description">
        <div className="container">
          <h2 className="section-title">عن الجامعة</h2>
          <p>
            جامعة خاصة متميزة في تركيا، تقدم برامج تعليمية قوية
            وبيئة دراسية حديثة مع اعتراف دولي.
          </p>
        </div>
      </section>

      {/* MAJORS */}
      <section className="university-majors">
        <div className="container">
          <h2 className="section-title">التخصصات المتاحة</h2>

          <div className="majors-grid">
            <div className="major-card">هندسة</div>
            <div className="major-card">إدارة أعمال</div>
            <div className="major-card">طب</div>
            <div className="major-card">صيدلة</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>جاهز تبدأ؟</h2>
          <p>سيب الباقي علينا</p>

          <a
            href="https://wa.me/905015959880"
            target="_blank"
            rel="noreferrer"
            className="btn whatsapp"
          >
            تواصل واتساب
          </a>
        </div>
      </section>
    </>
  );
}