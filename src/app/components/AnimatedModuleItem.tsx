'use client';

import { useEffect, useRef, useState } from 'react';
import { CourseModule } from '../types/thinkDifferent';

export const AnimatedModuleItem = ({
  module,
  index,
}: {
  module: CourseModule;
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
      key={module._key}
      className={`bg-mf-dark-blue p-6 rounded-lg shadow-sm flex gap-6 transition-all duration-200 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
      }`}
    >
      <div className='h-6 w-6 bg-mf-blue rounded-full flex-shrink-0' />
      <div>
        <h3 className='text-xl font-bold text-chalk '>{module.title}</h3>
        <p className='text-chalk'>{module.description}</p>
      </div>
    </div>
  );
};
