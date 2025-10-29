'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Approach } from '../types/thinkDifferent';
import { ApproachBulletIcon } from './Icons';

export const AnimatedApproachItem = ({
  approach,
  index,
}: {
  approach: Approach;
  index: number;
}) => {
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
      key={approach._key || index}
      className={`flex flex-col border-2 border-mf-green p-4 rounded-lg items-start gap-6 transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {approach.icon?.asset?.url ? (
        <Image
          src={approach.icon.asset.url}
          alt={approach.title}
          width={40}
          height={40}
          className='flex-shrink-0'
        />
      ) : (
        <ApproachBulletIcon />
      )}
      <p className='text-gray-700 font-grotesk-medium'>{approach.title}</p>
    </div>
  );
};
