import Link from "next/link";

export default function UniversityDetails() {
  return (
    <>
      {/* UNIVERSITY HERO */}
      <section className="university-hero">
        <div className="container">
          <h1>جامعة خاصة رقم 2</h1>
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
            href="https://wa.me/201000000000"
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