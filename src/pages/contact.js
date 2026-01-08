export default function Contact() {
  return (
    <section className="contact">
      <div className="container contact-grid">

        {/* INFO */}
        <div className="contact-info">
          <h1>تواصل معنا</h1>
          <p>
            فريق <strong>ABOU TALEB</strong> جاهز يرد على كل استفساراتك
            ويساعدك تبدأ رحلتك الدراسية في تركيا.
          </p>

          <ul>
            <li>📞 واتساب  90 501 595 9880</li>
            <li>📧 البريد: info@aboutaleb.com</li>
            <li>📍 تركيا – إسطنبول</li>
          </ul>
        </div>

        {/* FORM */}
        <form className="contact-form">
          <input type="text" placeholder="الاسم بالكامل" />
          <input type="email" placeholder="البريد الإلكتروني" />
          <input type="tel" placeholder="رقم الهاتف" />
          <textarea placeholder="اكتب رسالتك هنا"></textarea>

          <button className="btn primary">إرسال الرسالة</button>
        </form>

      </div>
    </section>
  );
}