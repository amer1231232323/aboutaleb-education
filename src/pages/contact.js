export default function Contact() {
  return (
    <section className="contact">
      <div className="container contact-grid">

        {/* INFO */}
        <div className="contact-info">
          <h1>Contact Us</h1>
          <p>
            The <strong>ABOU TALEB</strong> team is ready to answer all your inquiries
            and help you start your academic journey in Turkey.
          </p>

          <ul>
            <li>📞 WhatsApp +90 501 595 9880</li>
            <li>📧 Email: info@aboutaleb.com</li>
            <li>📍 Turkey - Istanbul</li>
          </ul>
        </div>

        {/* FORM */}
        <form className="contact-form">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="tel" placeholder="Phone Number" />
          <textarea placeholder="Write your message here"></textarea>

          <button className="btn primary">Send Message</button>
        </form>

      </div>
    </section>
  );
}