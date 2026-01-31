import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `Name: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/905015959880?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact">
      <div className="container contact-grid">

        {/* INFO */}
        <div className="contact-info">
          <h1>{t('contactUs')}</h1>
          <p>
            {t('teamReady')}
          </p>

          <ul>
            <li>📞 {t('whatsapp')} +90 501 595 9880</li>
            <li>📧 {t('email')}: info@aboutaleb.com</li>
            <li>📍 {t('turkeyIstanbul')}</li>
          </ul>
        </div>

        {/* FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="fullName"
            placeholder={t('fullName')} 
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input 
            type="email" 
            name="email"
            placeholder={t('emailAddress')} 
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input 
            type="tel" 
            name="phone"
            placeholder={t('phoneNumber')} 
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea 
            name="message"
            placeholder={t('writeMessage')}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="btn primary">{t('sendMessage')}</button>
        </form>

      </div>
    </section>
  );
}