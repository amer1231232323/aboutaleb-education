import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          ابدأ رحلتك الدراسية في <span>تركيا</span>
        </h1>

        <p>
          مع ABOU TALEB نساعدك تختار الجامعة المناسبة،
          ونكون معاك خطوة بخطوة لحد القبول والسفر
        </p>

        <div className="hero-buttons">
          <Link href="/universities" className="btn primary">
            تصفح الجامعات
          </Link>

          <Link href="/contact" className="btn outline">
            تواصل معنا
          </Link>
        </div>
      </div>

      <div className="hero-image">
        <Image
          src="/hero.png"
          alt="Study in Turkey"
          width={500}
          height={500}
          priority
        />
      </div>
    </section>
  );
}