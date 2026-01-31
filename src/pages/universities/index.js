import { useTranslation } from "react-i18next";
import fs from 'fs';
import path from 'path';
import UniversityCard from "@/components/universities/UniversityCard";
import { slugify } from "@/lib/utils";

export async function getServerSideProps() {
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
  const { t } = useTranslation();

  return (
    <section className="universities">
      <div className="container">
        <h1 className="section-title">{t('privateUniversities')}</h1>

        <div className="universities-grid">
          {universities.map((uni) => (
            <UniversityCard key={uni.id} name={uni.name} slug={uni.slug} logo={uni.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}
