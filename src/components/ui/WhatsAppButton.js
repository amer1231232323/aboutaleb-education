import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    const handleClick = () => {
        const phoneNumber = "905015959880"; // Replace with actual number
        const message = "Hello, I would like to inquire about your services.";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    };

    return (
        <button
            className="whatsapp-float"
            onClick={handleClick}
            aria-label="Contact via WhatsApp"
        >
            <FaWhatsapp size={24} />
        </button>
    );
}
