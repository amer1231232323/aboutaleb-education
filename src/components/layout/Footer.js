export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        
        <div className="footer-col">
          <h3>ABOU TALEB</h3>
          <p>
            منصة متخصصة في تسجيل الطلاب بالجامعات الخاصة في تركيا
            مع متابعة كاملة من البداية حتى القبول.
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
          <p>info@aboutaleb.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ABOU TALEB – جميع الحقوق محفوظة
      </div>
    </footer>
  );
}