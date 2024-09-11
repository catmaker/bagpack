// components/Banner.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Banner.module.scss";

interface Slide {
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface BannerProps {
  slides: Slide[];
  interval?: number; // Interval between slides in milliseconds
}

const Banner: React.FC<BannerProps> = ({ slides, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setIsFading(false);
      }, 500);
    }, interval);

    return () => clearTimeout(timer);
  }, [currentIndex, interval, slides.length]);

  const nextSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      setIsFading(false);
    }, 500);
  };

  const prevSlide = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + slides.length) % slides.length,
      );
      setIsFading(false);
    }, 500);
  };

  return (
    <div className={styles.banner}>
      {slides.map((slide, index) => (
        <div
          key={slide.title}
          className={`${styles.imageContainer} ${index === currentIndex ? styles.fadeIn : styles.fadeOut}`}
        >
          <Image
            src={slide.imageUrl}
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}
      <div className={styles.textContainer}>
        <h1>{slides[currentIndex].title}</h1>
        <p>{slides[currentIndex].subtitle}</p>
      </div>
      <button className={styles.prevButton} type="button" onClick={prevSlide}>
        ‹
      </button>
      <button className={styles.nextButton} type="button" onClick={nextSlide}>
        ›
      </button>
    </div>
  );
};

export default Banner;
