'use client';

import Link from 'next/link';

export default function FeaturedUniversities() {
  const universities = [
    {
      name: "Boğaziçi University",
      logo: "/logo/BOGAZICI.jpg",
      status: "Exclusive Partner"
    },
    {
      name: "Middle East Technical University",
      logo: "/logo/METU.jpg", 
      status: "Official Agency"
    },
    {
      name: "Sabancı University",
      logo: "/logo/SABANCI.jpg",
      status: "Exclusive Partner"
    },
    {
      name: "Koç University",
      logo: "/logo/KOC.jpg",
      status: "Official Agency"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Universities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Partner with Turkey's most prestigious universities for your academic journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {universities.map((university, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100"
            >
              <div className="h-24 flex items-center justify-center mb-4">
                <img
                  src={university.logo}
                  alt={university.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {university.name}
              </h3>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                university.status === "Exclusive Partner" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-blue-100 text-blue-800"
              }`}>
                {university.status}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/universities"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View All Universities
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
