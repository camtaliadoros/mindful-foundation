'use client';

import { useEffect, useRef, useState } from 'react';

export const AnimatedStatCard = ({
  value,
  description,
  delay = 0,
}: {
  value: string;
  description: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`text-center transition-all duration-600 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <h3
        className={`text-4xl font-bold text-mf-coral mb-4 transition-all duration-800 ease-out ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{
          transitionDelay: isVisible ? '200ms' : '0ms',
        }}
      >
        {value}
      </h3>
      <p
        className={`text-mf-dark-blue transition-all duration-600 ease-out text-lg md:text-xl leading-snug ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
        style={{
          transitionDelay: isVisible ? '400ms' : '0ms',
        }}
      >
        {description}
      </p>
    </div>
  );
};
