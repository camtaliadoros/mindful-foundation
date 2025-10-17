import React from 'react';
import { CTA } from '../types/homepage';

interface CTAButtonProps {
  cta: CTA;
  className?: string;
}

export function CTAButton({ cta, className = '' }: CTAButtonProps) {
  const { label, actionType, href, email, pdf, style } = cta;

  // Generate the appropriate props based on action type
  const getLinkProps = () => {
    switch (actionType) {
      case 'email':
        return {
          href: `mailto:${email}`,
          target: undefined,
          rel: undefined,
        };
      case 'pdf':
        return {
          href: pdf?.asset.url,
          target: '_blank',
          rel: 'noopener noreferrer',
          download: pdf?.asset.originalFilename || 'download.pdf',
        };
      case 'url':
      default:
        return {
          href: href,
          target: '_blank',
          rel: 'noopener noreferrer',
        };
    }
  };

  const linkProps = getLinkProps();

  // Generate CSS classes based on style
  const getStyleClasses = () => {
    const baseClasses =
      'px-8 py-3 rounded-md transition-all font-grotesk-medium';

    switch (style) {
      case 'primary':
        return `${baseClasses} bg-mf-green text-ash hover:bg-opacity-90`;
      case 'secondary':
        return `${baseClasses} border-2 border-mf-blue text-mf-blue hover:bg-mf-blue hover:text-chalk`;
      case 'link':
        return `${baseClasses} border-2 border-mf-green text-mf-green hover:bg-mf-green hover:text-ash`;
      default:
        return `${baseClasses} bg-mf-green text-ash hover:bg-opacity-90`;
    }
  };

  return (
    <a {...linkProps} className={`${getStyleClasses()} ${className}`}>
      {label}
    </a>
  );
}
