import Link from "next/link";
import Image from "next/image";
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const logoDir = path.join(process.cwd(), 'public', 'logo');
  const files = fs.readdirSync(logoDir).filter(file => /\.(png|jpg|jpeg)$/i.test(file));
  const universities = files.map(file => {
    const parsed = path.parse(file);
    const name = parsed.name;
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    return {
      id: name,
      name: displayName,
      logo: `/logo/${file}`
    };
  });
  return { props: { universities } };
}

export default function UniversitiesPage({ universities }) {
  return (
    <section className="universities">
      <div className="container">
        <h1 className="section-title">الجامعات الخاصة</h1>

        <div className="universities-grid">
          {universities.map((uni) => (
            <div key={uni.id} className="university-card">
              <h3>{uni.name}</h3>
              <Image src={uni.logo} alt={uni.name} width={200} height={150} />
              <Link
                href={`/universities/${uni.id}`}
                className="btn small primary"
              >
                التفاصيل
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
