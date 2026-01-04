import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import universities from "@/data/universities";

export default function UniversityDetails() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  const university =
    universities.find((u) => u.id === id) || {
      name: "جامعة غير معروفة",
      city: "تركيا",
      about: "سيتم إضافة التفاصيل قريبًا.",
    };

  return (
    <>
      <Head>
        <title>{university.name} | ABOU TALEB</title>
      </Head>

      <section className="university-details">
        <div className="container">

          {/* ===== TOP LAYOUT ===== */}
          <div className="university-top">

            {/* LOGO (LEFT + STICKY) */}
            <div className="university-logo">
              <img
                src="/images/universities/default-logo.png"
                alt={university.name}
              />
            </div>

            {/* MAIN CONTENT (CENTER) */}
            <div className="university-main">
              <h1>{university.name}</h1>
              <p className="city">{university.city}</p>

              <a
                href="https://wa.me/905457886024"
                target="_blank"
                rel="noreferrer"
                className="btn primary"
              >
                قدّم الآن
              </a>

              {/* ABOUT – يظهر فوق */}
              <div className="about-top">
                <h2>نبذة عن الجامعة</h2>
                <p>{university.about}</p>
              </div>

              {/* PDF FILE */}
              <div className="university-section">
                <h2>ملف التخصصات والرسوم</h2>
                <a
                  href="https://www.mediafire.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn primary"
                >
                  تحميل الملف PDF
                </a>
              </div>

              {/* CTA */}
              <div className="university-cta">
                <p>للحصول على التفاصيل الكاملة والتقديم:</p>
                <a
                  href="https://wa.me/905457886024"
                  target="_blank"
                  rel="noreferrer"
                  className="btn whatsapp"
                >
                  تواصل معنا عبر واتساب
                </a>
              </div>

              {/* BACK */}
              <div className="back-link">
                <Link href="/universities">← العودة إلى الجامعات</Link>
              </div>
              </div>
            </div>
  
          </div>
        </section>
      </>
    );
  }