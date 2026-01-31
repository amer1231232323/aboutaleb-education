import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function PremiumSlider() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Ensure first slide is always visible
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  const slides = [
    {
      image: '/slide1.jpg',
      title: t('heroTitle'),
      subtitle: t('heroTitleSpan'),
      description: t('heroDescription'),
      primaryButton: {
        text: t('applyNow'),
        href: '/student/register'
      },
      secondaryButton: {
        text: t('contactViaWhatsapp'),
        href: 'https://wa.me/905015959880'
      }
    },
    {
      image: '/slide2.jpg',
      title: t('heroTitle'),
      subtitle: t('heroTitleSpan'),
      description: t('heroDescription'),
      primaryButton: {
        text: t('applyNow'),
        href: '/student/register'
      },
      secondaryButton: {
        text: t('contactViaWhatsapp'),
        href: 'https://wa.me/905015959880'
      }
    },
    {
      image: '/slide3.jpg',
      title: t('heroTitle'),
      subtitle: t('heroTitleSpan'),
      description: t('heroDescription'),
      primaryButton: {
        text: t('applyNow'),
        href: '/student/register'
      },
      secondaryButton: {
        text: t('contactViaWhatsapp'),
        href: 'https://wa.me/905015959880'
      }
    },
    {
      image: '/slide4.jpg',
      title: t('heroTitle'),
      subtitle: t('heroTitleSpan'),
      description: t('heroDescription'),
      primaryButton: {
        text: t('applyNow'),
        href: '/student/register'
      },
      secondaryButton: {
        text: t('contactViaWhatsapp'),
        href: 'https://wa.me/905015959880'
      }
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    // Temporarily disabled auto-transition to fix Fast Refresh issues
    // const interval = setInterval(() => {
    //   setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    // }, 5000);

    // return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="premium-slider">
      <div className="slider-container">
        {/* Slides */}
        <div className="slides-wrapper">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="slide-image">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  onError={(e) => {
                    // Silently handle errors without console logs to prevent Fast Refresh issues
                    e.target.style.display = 'none';
                  }}
                />
                <div className="slide-overlay"></div>
              </div>

              <div className="slide-content">
                <div className="container">
                  <div className="slide-text">
                    <h1 className="slide-title">
                      {slide.title}
                      <br />
                      <span>{slide.subtitle}</span>
                    </h1>

                    <p className="slide-description">
                      {slide.description}
                    </p>

                    <div className="slide-buttons">
                      <Link
                        href={slide.primaryButton.href}
                        className="btn btn-primary"
                      >
                        {slide.primaryButton.text}
                      </Link>

                      <a
                        href={slide.secondaryButton.href}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-whatsapp"
                      >
                        <FaWhatsapp />
                        {slide.secondaryButton.text}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <button
          className="slider-nav slider-nav-prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          className="slider-nav slider-nav-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
