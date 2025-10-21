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
      'px-8 py-3 rounded-full transition-all font-grotesk-medium text-xl';

    switch (style) {
      case 'primary':
        return `${baseClasses} border-2 border-mf-green text-ash hover:bg-mf-green`;
      case 'secondary':
        return `${baseClasses} border-2 border-mf-blue text-mf-blue hover:bg-mf-blue hover:text-chalk`;
      case 'link':
        return `${baseClasses} border-2 border-mf-green text-ash hover:bg-mf-green  `;
      default:
        return `${baseClasses} border-2 border-mf-green text-ash hover:bg-mf-green  `;
    }
  };

  return (
    <a {...linkProps} className={`${getStyleClasses()} ${className}`}>
      {label}
    </a>
  );
}
