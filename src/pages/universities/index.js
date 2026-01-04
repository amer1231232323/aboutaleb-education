import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const universities = Array.from({ length: 41 }, (_, i) => ({
  id: `university-${i + 1}`,
  name: `جامعة رقم ${i + 1}`,
  logo: "/images/universities/logo.png", // هتغيّرها بعدين
}));

export default function Universities() {
  return (
    <>
      <Head>
        <title>الجامعات الخاصة | ABOU TALEB</title>
      </Head>

      <section className="universities-page">
        <div className="container">
          <h1 className="page-title">الجامعات الخاصة في تركيا</h1>
          <p className="page-desc">
            استعرض قائمة الجامعات الخاصة واختر الجامعة المناسبة لك
          </p>

          <div className="universities-grid">
            {universities.map((uni) => (
              <div key={uni.id} className="university-card">
                {/* LOGO */}
                <div className="university-logo">
                  <Image
                    src={uni.logo}
                    alt={uni.name}
                    width={90}
                    height={90}
                  />
                </div>

                <h3>{uni.name}</h3>

                <Link
                  href={`/universities/${uni.id}`}
                  className="btn primary small"
                >
                  التفاصيل
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}