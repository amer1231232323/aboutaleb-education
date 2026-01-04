import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>تواصل معنا | ABOU TALEB</title>
      </Head>

      <section className="contact-page">
        <div className="container">
          {/* TITLE */}
          <h1 className="page-title">تواصل معنا</h1>
          <p className="page-desc">
            فريق <strong>ABOU TALEB</strong> جاهز يرد على كل استفساراتك بخصوص
            الدراسة في تركيا
          </p>

          <div className="contact-grid">
            {/* INFO */}
            <div className="contact-info">
              <h3>بيانات التواصل</h3>

              <p>
                📞 واتساب:
                <br />
                <a
                  href="https://wa.me/905457886024"
                  target="_blank"
                  rel="noreferrer"
                >
                  +90 545 788 6024
                </a>
              </p>

              <p>
                📧 البريد الإلكتروني:
                <br />
                <a href="mailto:info@aboutaleb.com">
                  info@aboutaleb.com
                </a>
              </p>

              <p>🌍 تابعنا على السوشيال ميديا</p>
            </div>

            {/* FORM */}
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();

                const name = e.target.name.value;
                const email = e.target.email.value;
                const phone = e.target.phone.value;
                const message = e.target.message.value;

                const text = `
الاسم: ${name}
البريد: ${email}
واتساب: ${phone}
الرسالة: ${message}
                `;

                const url = `https://wa.me/905457886024?text=${encodeURIComponent(
                  text
                )}`;

                window.open(url, "_blank");
              }}
            >
              <h3>أرسل لنا رسالة</h3>

              <input
                type="text"
                name="name"
                placeholder="الاسم الكامل"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="رقم واتساب"
                required
              />

              <textarea
                name="message"
                placeholder="اكتب رسالتك هنا..."
                rows="5"
                required
              ></textarea>

              <button type="submit" className="btn primary">
                إرسال عبر واتساب
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}