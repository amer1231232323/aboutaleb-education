import { useTranslation } from "react-i18next";
import { FaGraduationCap, FaCity, FaDollarSign, FaLanguage } from "react-icons/fa";

export default function WhyStudy() {
    const { t } = useTranslation();

    return (
        <section className="why-study">
            <div className="container">
                <h2 className="section-title">{t('whyStudyInTurkey')}</h2>

                <div className="why-grid">
                    <div className="why-card">
                        <div className="why-icon">
                            <FaGraduationCap />
                        </div>
                        <h3>Strong Universities</h3>
                        <p>Top-ranked universities with international accreditation.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">
                            <FaCity />
                        </div>
                        <h3>International City</h3>
                        <p>Istanbul bridges Europe and Asia with multicultural experiences.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">
                            <FaDollarSign />
                        </div>
                        <h3>Affordable Tuition</h3>
                        <p>Competitive fees compared to Europe, USA, and UK.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-icon">
                            <FaLanguage />
                        </div>
                        <h3>English Programs</h3>
                        <p>English language programs for Bachelor, Master, PhD.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
