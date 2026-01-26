import { useState } from 'react';
import Image from 'next/image';

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const slides = [
    '/slide1.jpg',
    '/slide2.jpg',
    '/slide3.jpg',
    '/slide4.jpg'
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="image-slider">
      <div className="slider-container">
        <div className="slider-wrapper">
          <Image
            src={slides[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="slider-image"
            width={1920}
            height={600}
            priority
            style={{ objectFit: 'contain' }}
          />
        </div>

        <button 
          className="slider-button slider-button-prev" 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          &#10094;
        </button>

        <button 
          className="slider-button slider-button-next" 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#10095;
        </button>

        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
