import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <h1>
              مستقبلك الدراسي في تركيا
              <br />
              <span>يبدأ من هنا</span>
            </h1>

            <p>
              مع <strong>ABOU TALEB</strong> بنسهّل عليك كل خطوة من اختيار
              الجامعة لحد القبول والمتابعة الكاملة.
            </p>

            <div className="hero-buttons">
              <Link href="/universities" className="btn primary">
                استعرض الجامعات
              </Link>

              <Link href="/student/register" className="btn secondary">
                سجّل الآن
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img src="/images/hero.jpg" alt="الدراسة في تركيا" />
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust">
        <div className="container trust-grid">
          <div className="trust-item">
            <h3>50000+</h3>
            <p>طالب تم تسجيلهم بنجاح</p>
          </div>

          <div className="trust-item">
            <h3>100%</h3>
            <p>جامعات خاصة معتمدة</p>
          </div>

          <div className="trust-item">
            <h3>متابعة كاملة</h3>
            <p>من أول اختيار الجامعة حتى القبول</p>
          </div>

          <div className="trust-item">
            <h3>بدون تعقيد</h3>
            <p>شفافية تامة وخطوات واضحة</p>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="journey">
        <div className="container">
          <h2 className="section-title">رحلتك معنا خطوة بخطوة</h2>

          <div className="journey-grid">
            <div className="journey-step">
              <span>1</span>
              <h3>تواصل معنا</h3>
              <p>تواصل مع فريقنا واحصل على استشارة مجانية</p>
            </div>

            <div className="journey-step">
              <span>2</span>
              <h3>اختيار الجامعة</h3>
              <p>نرشح لك أفضل جامعة مناسبة لتخصصك وميزانيتك</p>
            </div>

            <div className="journey-step">
              <span>3</span>
              <h3>تجهيز الأوراق</h3>
              <p>نساعدك في تجهيز كل المستندات المطلوبة</p>
            </div>

            <div className="journey-step">
              <span>4</span>
              <h3>التقديم والمتابعة</h3>
              <p>نقدّم لك ونتابع الطلب لحد صدور القبول</p>
            </div>

            <div className="journey-step">
              <span>5</span>
              <h3>استلام القبول</h3>
              <p>تستلم قبولك الجامعي وتبدأ رحلتك التعليمية</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY TURKEY */}
      <section className="why-turkey">
        <div className="container">
          <h2 className="section-title">ليه الدراسة في تركيا؟</h2>

          <div className="why-grid">
            <div className="why-card">
              <h3>جامعات معترف بها</h3>
              <p>الجامعات التركية معترف بها دوليًا</p>
            </div>

            <div className="why-card">
              <h3>تكلفة مناسبة</h3>
              <p>مصاريف أقل مقارنة بأوروبا</p>
            </div>

            <div className="why-card">
              <h3>تعليم قوي</h3>
              <p>مناهج حديثة وتطبيق عملي</p>
            </div>

            <div className="why-card">
              <h3>بيئة آمنة</h3>
              <p>بلد مناسب للطلاب العرب</p>
            </div>
          </div>
        </div>
      </section>

      {/* UNIVERSITIES PREVIEW */}
      <section className="universities-preview">
        <div className="container">
          <h2 className="section-title">أشهر الجامعات الخاصة</h2>

          <div className="universities-grid">
            <div className="university-card">
              <img src="/images/universities/u1.png" alt="جامعة" />
              <h3>جامعة خاصة</h3>
              <Link href="/universities" className="btn small primary">
                التفاصيل
              </Link>
            </div>

            <div className="university-card">
              <img src="/images/universities/u2.png" alt="جامعة" />
              <h3>جامعة خاصة</h3>
              <Link href="/universities" className="btn small primary">
                التفاصيل
              </Link>
            </div>

            <div className="university-card">
              <img src="/images/universities/default.png" alt="جامعة" />
              <h3>جامعة خاصة</h3>
              <Link href="/universities" className="btn small primary">
                التفاصيل
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>ابدأ رحلتك الدراسية الآن</h2>
          <p>تواصل معنا واحصل على استشارة مجانية</p>

          <a
            href="https://wa.me/905015959880"
            target="_blank"
            className="btn whatsapp"
          >
            تواصل عبر واتساب
          </a>
        </div>
      </section>
    </>
  );
}