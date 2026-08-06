'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getStoredConsent, setConsent } from '../utils/gtag';

/**
 * Cookie consent banner wired to Google Consent Mode v2. Analytics and
 * advertising storage default to 'denied' (set in layout.tsx); this banner
 * only grants them once the visitor accepts. Shown until a choice is made.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show the banner if the visitor hasn't already chosen.
    if (getStoredConsent() === null) setVisible(true);
  }, []);

  const choose = (choice: 'granted' | 'denied') => {
    setConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role='dialog'
      aria-live='polite'
      aria-label='Cookie consent'
      className='fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6'
    >
      <div className='max-w-4xl mx-auto bg-white border border-mf-blue/15 rounded-2xl shadow-lg p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4'>
        <p className='text-sm text-mf-blue/80 leading-relaxed flex-1'>
          We use essential cookies to make our site work. With your consent, we
          also use analytics and advertising cookies to understand how the site
          is used and improve it. See our{' '}
          <Link
            href='/privacy'
            className='text-mf-blue font-semibold underline underline-offset-2'
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className='flex gap-3 flex-shrink-0'>
          <button
            type='button'
            onClick={() => choose('denied')}
            className='px-6 py-2.5 rounded-full text-sm font-grotesk-medium border-2 border-mf-blue/20 text-mf-blue hover:border-mf-blue/40 transition-all'
          >
            Decline
          </button>
          <button
            type='button'
            onClick={() => choose('granted')}
            className='px-6 py-2.5 rounded-full text-sm font-grotesk-medium border-2 border-mf-green bg-mf-green text-ash hover:bg-transparent hover:text-mf-green transition-all'
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
