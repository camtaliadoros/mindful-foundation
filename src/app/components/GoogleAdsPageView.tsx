'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { reportPageViewConversion } from '../utils/gtag';

/**
 * Fires the Google Ads page view conversion on first load and on every
 * client-side route change. Renders nothing.
 */
export default function GoogleAdsPageView() {
  const pathname = usePathname();

  useEffect(() => {
    reportPageViewConversion();
  }, [pathname]);

  return null;
}
