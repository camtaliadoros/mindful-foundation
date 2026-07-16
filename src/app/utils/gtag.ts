// Google Ads (gtag.js) helpers. The base tag is loaded in src/app/layout.tsx.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Ads conversion action for a successful contact/lead form submission.
const CONTACT_CONVERSION_SEND_TO = 'AW-18020600681/T06YCJqd-tAcEOmW8pBD';

/**
 * Fires the Google Ads conversion event for a completed contact form submission.
 * Safe to call even if gtag hasn't loaded (e.g. blocked by an ad blocker).
 */
export function reportContactConversion() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: CONTACT_CONVERSION_SEND_TO,
    value: 1.0,
    currency: 'USD',
  });
}
