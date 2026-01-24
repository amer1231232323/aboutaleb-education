import Link from "next/link";
import Image from "next/image";
import fs from 'fs';
import path from 'path';
import UniversityCard from "@/components/universities/UniversityCard";

function slugify(name) {
  let slug = name;
  if (slug.endsWith(" ÜNİVERSİTESİ")) {
    slug = slug.slice(0, -" ÜNİVERSİTESİ".length);
  }
  slug = slug.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, "-");
  return slug;
}

export async function getStaticProps() {
  const logoDir = path.join(process.cwd(), 'public', 'logo');
  const files = fs.readdirSync(logoDir).filter(file => /\.(png|jpg|jpeg)$/i.test(file));
  const universities = files.map(file => {
    const parsed = path.parse(file);
    const name = parsed.name;
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);
    const slug = slugify(name);
    return {
      id: name,
      name: displayName,
      slug: slug,
      logo: `/logo/${file}`
    };
  });
  return { props: { universities } };
}

export default function UniversitiesPage({ universities }) {
  return (
    <section className="universities">
      <div className="container">
        <h1 className="section-title">Private Universities</h1>

        <div className="universities-grid">
          {universities.map((uni) => (
            <UniversityCard key={uni.id} name={uni.name} slug={uni.slug} logo={uni.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
