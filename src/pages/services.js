import Link from "next/link";
import { FaGraduationCap, FaFileAlt, FaPassport, FaHome, FaBook, FaHandshake, FaPlane } from "react-icons/fa";

const services = [
    {
        id: 1,
        icon: FaGraduationCap,
        title: "University Admission",
        description: "Complete guidance through the university admission process. We help you choose the right program and handle all international admission procedures.",
        features: ["Program selection", "Application assistance", "Admission letter processing"]
    },
    {
        id: 2,
        icon: FaFileAlt,
        title: "Document Review",
        description: "Professional review and preparation of all required documents for university admission and visa applications.",
        features: ["Document verification", "Translation services", "Notarization support"]
    },
    {
        id: 3,
        icon: FaPassport,
        title: "Visa Guidance",
        description: "Comprehensive support for Turkish student visa applications, including document preparation and embassy procedures.",
        features: ["Visa application", "Embassy appointments", "Document preparation"]
    },
    {
        id: 4,
        icon: FaHome,
        title: "Residence Permit",
        description: "Assistance with residence permit applications after arrival in Turkey, ensuring legal stay throughout your studies.",
        features: ["Permit applications", "Document collection", "Renewal assistance"]
    },
    {
        id: 5,
        icon: FaBook,
        title: "Translation & Notary",
        description: "Professional translation and notarization services for all academic and official documents.",
        features: ["Document translation", "Notarization", "Apostille services"]
    },
    {
        id: 6,
        icon: FaHandshake,
        title: "Transactional Council",
        description: "Expert counseling for international transfers, credit recognition, and academic pathway planning.",
        features: ["Credit transfer", "Academic counseling", "Pathway planning"]
    },
    {
        id: 7,
        icon: FaGraduationCap,
        title: "Educational Counseling",
        description: "Personalized educational guidance to help you make informed decisions about your academic future in Turkey.",
        features: ["Career counseling", "Academic planning", "Study abroad advice"]
    },
    {
        id: 8,
        icon: FaPlane,
        title: "Travel to Turkey",
        description: "Complete travel support including airport transfers, accommodation arrangements, and orientation programs.",
        features: ["Airport pickup", "Accommodation", "Orientation programs"]
    }
];

export default function ServicesPage() {
    return (
        <section className="services-page">
            <div className="container">
                <div className="services-header">
                    <h1 className="section-title">Our Services</h1>
                    <p className="services-subtitle">
                        Comprehensive support for your journey to study in Turkey. From admission to graduation, we&apos;re here to help every step of the way.
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service) => {
                        const IconComponent = service.icon;
                        return (
                            <div key={service.id} className="service-detail-card">
                                <div className="service-detail-icon">
                                    <IconComponent />
                                </div>
                                <h3>{service.title}</h3>
                                <p className="service-description">{service.description}</p>

                                <div className="service-features">
                                    <h4>What&apos;s Included:</h4>
                                    <ul>
                                        {service.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                <Link href="/contact" className="btn primary small">
                                    Get Started
                                </Link>
                            </div>
                        );
                    })}
                </div>

                <div className="services-cta">
                    <div className="cta-content">
                        <h2>Ready to Start Your Journey?</h2>
                        <p>Contact us today to begin your application process and get personalized guidance for studying in Turkey.</p>
                        <div className="cta-buttons">
                            <Link href="/student/register" className="btn primary">
                                Apply Now
                            </Link>
                            <Link href="/contact" className="btn secondary">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
