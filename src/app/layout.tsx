import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import HeaderWrapper from './components/HeaderWrapper';
import { getSiteSettings } from './lib/sanity';
import { generateMetadata as generateSiteMetadata } from './utils/metadata';
import { StructuredData } from './components/StructuredData';
import GoogleAdsPageView from './components/GoogleAdsPageView';
import CookieConsent from './components/CookieConsent';

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID || 'AW-18020600681';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-7Y120MYVX9';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return generateSiteMetadata(undefined, siteSettings);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
          strategy='afterInteractive'
        />
        <Script id='gtag-init' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Consent Mode v2 — deny analytics/advertising cookies until the
            // visitor accepts via the cookie banner.
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500,
            });

            // Restore a returning visitor's previous acceptance.
            try {
              if (localStorage.getItem('cookie-consent') === 'granted') {
                gtag('consent', 'update', {
                  ad_storage: 'granted',
                  ad_user_data: 'granted',
                  ad_personalization: 'granted',
                  analytics_storage: 'granted',
                });
              }
            } catch (e) {}

            gtag('js', new Date());
            gtag('config', '${GTAG_ID}');
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <GoogleAdsPageView />
        <div className='min-h-screen bg-chalk'>
          <HeaderWrapper />
          {children}
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}
