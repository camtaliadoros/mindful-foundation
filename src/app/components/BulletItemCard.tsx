'use client';

import { useEffect, useRef, useState } from 'react';

type BulletItemCardProps = {
  backgroundColour: string;
  discColour: string;
  content: string;
  index: number;
};

export const BulletItemCard = ({
  backgroundColour,
  discColour,
  content,
  index,
}: BulletItemCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const delay = index * 100; // 100ms stagger between items

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`${backgroundColour} p-4 rounded-lg flex items-center gap-2 transition-all duration-200 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <div className={`h-3 w-3 ${discColour} rounded-full shrink-0`} />
      <p className='text-gray-700 mt-1 md:text-xl'>{content}</p>
    </div>
  );
};
