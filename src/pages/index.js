import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-text"
          >
            <h1>
              مستقبلك الدراسي في تركيا
              <br />
              <span>يبدأ من هنا</span>
            </h1>

            <p>
              مع <strong>ABOU TALEB</strong>، بنسهّل عليك كل خطوة من اختيار
              الجامعة لحد القبول والمتابعة الكاملة في أفضل الجامعات الخاصة
            </p>

            <div className="hero-buttons">
              <Link href="/universities" className="btn primary">
                استعرض الجامعات
              </Link>

              <Link href="/student/register" className="btn secondary">
                سجّل الآن
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="hero-image"
          >
            <Image
              src="/images/hero.jpg"
              alt="الدراسة في تركيا"
              width={520}
              height={420}
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            لماذا ABOU TALEB؟
          </motion.h2>

          <div className="cards">
            {[
              {
                title: "تسجيل مضمون",
                text: "نساعدك في التسجيل في أفضل الجامعات الخاصة المعتمدة رسميًا",
              },
              {
                title: "متابعة كاملة",
                text: "نرافقك خطوة بخطوة حتى القبول النهائي والسفر",
              },
              {
                title: "دعم حقيقي",
                text: "فريق متخصص جاهز للرد على كل استفساراتك",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
{/* TRUST SECTION */}
      {/* TRUST SECTION */}
      <section className="trust">
        <div className="container trust-grid">
          <div className="trust-item">
            <h3>+50000</h3>
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

{/* STUDENT JOURNEY */}
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
        <p>الجامعات التركية معترف بها عالميًا وفي أغلب الدول العربية</p>
      </div>

      <div className="why-card">
        <h3>تكلفة مناسبة</h3>
        <p>مصاريف الدراسة والمعيشة أقل مقارنة بدول أوروبا</p>
      </div>

      <div className="why-card">
        <h3>تعليم قوي</h3>
        <p>مناهج حديثة وتطبيق عملي مع كوادر تعليمية قوية</p>
      </div>

      <div className="why-card">
        <h3>بيئة آمنة</h3>
        <p>تركيا بلد آمنة ومناسبة للطلاب من كل الجنسيات</p>
      </div>
    </div>
  </div>
</section>

      {/* CTA */}
      <section className="cta">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>ابدأ رحلتك التعليمية الآن</h2>

          <a
            href="https://wa.me/201000000000"
            target="_blank"
            className="btn whatsapp"
          >
            تواصل معنا عبر واتساب
          </a>
        </motion.div>
      </section>
      {/* UNIVERSITIES SECTION */}
<section className="universities">
  <div className="container">
    <h2 className="section-title">الجامعات الخاصة</h2>

    <div className="universities-grid">
      <div className="university-card">
        <img src="/images/university1.jpg" alt="جامعة خاصة" />
        <h3>جامعة خاصة</h3>
        <a href="#" className="btn primary small">
          التفاصيل
        </a>
      </div>

      <div className="university-card">
        <img src="/images/university2.jpg" alt="جامعة خاصة" />
        <h3>جامعة خاصة</h3>
        <a href="#" className="btn primary small">
          التفاصيل
        </a>
      </div>

      <div className="university-card">
        <img src="/images/university3.jpg" alt="جامعة خاصة" />
        <h3>جامعة خاصة</h3>
        <a href="#" className="btn primary small">
          التفاصيل
        </a>
      </div>
    </div>
  </div>
</section>

   {/* TESTIMONIALS */}
<section className="testimonials">
  <div className="container">
    <h2>آراء طلابنا</h2>

    <div className="testimonials-grid">
      <div className="testimonial-card">
        <p>
          "بصراحة ABOU TALEB وفروا عليا وقت ومجهود كبير، من أول اختيار الجامعة
          لحد ما استلمت القبول."
        </p>
        <h4>— أحمد محمد</h4>
        <span>طالب طب – تركيا</span>
      </div>

      <div className="testimonial-card">
        <p>
          "تعامل محترم جدًا ومتابعة مستمرة، حسيت إن في حد معايا خطوة بخطوة."
        </p>
        <h4>— سارة علي</h4>
        <span>طالبة تمريض</span>
      </div>

      <div className="testimonial-card">
        <p>
          "أنصح أي حد حابب يدرس في تركيا يتعامل معاهم، ناس فاهمة وشغلهم منظم."
        </p>
        <h4>— محمود حسن</h4>
        <span>طالب هندسة</span>
      </div>
    </div>
  </div>
</section> 
{/* FOOTER */}
<footer className="footer">
  <div className="container footer-grid">
    <div className="footer-col">
      <h3>ABOU TALEB</h3>
      <p>
        منصة متخصصة في تسجيل الطلاب في الجامعات الخاصة في تركيا، مع متابعة
        كاملة من أول خطوة لحد القبول.
      </p>
    </div>

    <div className="footer-col">
      <h4>روابط سريعة</h4>
      <ul>
        <li><a href="/">الرئيسية</a></li>
        <li><a href="/universities">الجامعات</a></li>
        <li><a href="/contact">تواصل معنا</a></li>
      </ul>
    </div>

    <div className="footer-col">
      <h4>تواصل معنا</h4>
      <p>واتساب: +20 100 000 0000</p>
      <p>البريد: info@aboutaleb.com</p>
    </div>
  </div>

  <div className="footer-bottom">
    © {new Date().getFullYear()} ABOU TALEB. جميع الحقوق محفوظة.
  </div>
</footer>


</>
  );
}