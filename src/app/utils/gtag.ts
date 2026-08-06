// Google Ads (gtag.js) helpers. The base tag is loaded in src/app/layout.tsx.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// localStorage key holding the visitor's cookie choice ('granted' | 'denied').
export const CONSENT_STORAGE_KEY = 'cookie-consent';

export type ConsentChoice = 'granted' | 'denied';

/**
 * Applies a consent choice to Google Consent Mode and persists it, so Google
 * Ads and GA4 only set cookies once the visitor has accepted.
 */
export function setConsent(choice: ConsentChoice) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Storage may be unavailable (private mode); consent still updates for this page.
  }

  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

/** Reads the stored consent choice, or null if the visitor hasn't chosen yet. */
export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

// Google Ads conversion action for a successful contact/lead form submission.
const CONTACT_CONVERSION_SEND_TO = 'AW-18020600681/T06YCJqd-tAcEOmW8pBD';

// Google Ads conversion action for a page view.
const PAGE_VIEW_CONVERSION_SEND_TO = 'AW-18020600681/OaM5CKH6ts0cEOmW8pBD';

/**
 * Fires the Google Ads page view conversion. Called on first load and on every
 * client-side route change by <GoogleAdsPageView />.
 */
export function reportPageViewConversion() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: PAGE_VIEW_CONVERSION_SEND_TO,
  });
}

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
