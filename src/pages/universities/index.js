import Link from "next/link";
import universities from "@/data/universities";

export default function UniversitiesPage() {
  return (
    <section className="universities">
      <div className="container">
        <h1 className="section-title">الجامعات الخاصة</h1>

        <div className="universities-grid">
          {universities.map((uni) => (
            <div key={uni.id} className="university-card">
              <img src={uni.logo} alt={uni.name} />
              <h3>{uni.name}</h3>

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