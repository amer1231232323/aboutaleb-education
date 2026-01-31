import Link from "next/link";
import { useTranslation } from "react-i18next";

const UniversityCard = ({ name, slug, logo }) => {
    const { t } = useTranslation();

    return (
        <div className="university-card">
            {/* 1. University Name - Top, horizontal, centered */}
            <h3 className="university-name">{name}</h3>

            {/* 2. University Logo - Centered, large */}
            <div className="university-logo logo-container">
                <img
                    src={logo}
                    alt={name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center'
                    }}
                />
            </div>

            {/* 3. Details Button - Centered under logo */}
            <Link href={`/universities/${slug}`} className="btn small primary">
                {t('details')}
            </Link>
        </div>
    );
};

export default UniversityCard;
