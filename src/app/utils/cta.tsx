import React from 'react';
import { CTA } from '../types/homepage';

interface CTAButtonProps {
  cta: CTA;
  className?: string;
  darkBackground?: boolean;
}

export function CTAButton({
  cta,
  className = '',
  darkBackground = false,
}: CTAButtonProps) {
  const { label, actionType, href, email, pdf, style } = cta;

  // Check if button has valid link/file - hide if not
  const hasValidLink = () => {
    switch (actionType) {
      case 'email':
        return !!email;
      case 'pdf':
        return !!(pdf?.asset?.url);
      case 'url':
      default:
        return !!href;
    }
  };

  // Hide button if no valid link/file
  if (!hasValidLink()) {
    return null;
  }

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

    // Dark background styles
    if (darkBackground) {
      switch (style) {
        case 'primary':
          return `${baseClasses} border-2 border-mf-green text-mf-green hover:bg-mf-green hover:text-mf-blue`;
        case 'secondary':
          return `${baseClasses} border-2 border-chalk text-chalk hover:bg-chalk hover:text-mf-blue`;
        case 'link':
          return `${baseClasses} border-2 border-mf-green text-mf-green hover:bg-mf-green hover:text-mf-blue`;
        default:
          return `${baseClasses} border-2 border-mf-green text-mf-green hover:bg-mf-green hover:text-mf-blue`;
      }
    }

    // Light background styles (original)
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
