'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export const ScrollAnimatedImage = ({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        // Parallax: move container slower than scroll speed
        const parallaxOffset = (scrollProgress - 0.5) * -100;
        setScrollY(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-[400px] rounded-lg overflow-hidden transition-transform duration-100 ease-out ${className}`}
      style={{
        transform: `translateY(${scrollY}px)`,
      }}
    >
      <Image src={src} alt={alt} fill className='object-cover' />
    </div>
  );
};
