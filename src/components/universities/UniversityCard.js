import Link from "next/link";
import Image from "next/image";

const UniversityCard = ({ name, slug, logo }) => {
    return (
        <div className="university-card">
            {/* 1. University Name - Top, horizontal, centered */}
            <h3 className="university-name">{name}</h3>

            {/* 2. University Logo - Centered, large */}
            <div className="university-logo">
                <Image
                    src={logo}
                    alt={name}
                    width={500}
                    height={400}
                    style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
                />
            </div>

            {/* 3. Details Button - Centered under logo */}
            <Link href={`/universities/${slug}`} className="btn small primary">
                Details
            </Link>
        </div>
    );
};

export default UniversityCard;
