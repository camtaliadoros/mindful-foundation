import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import HeaderWrapper from './components/HeaderWrapper';
import { getSiteSettings } from './lib/sanity';
import { generateMetadata as generateSiteMetadata } from './utils/metadata';
import { StructuredData } from './components/StructuredData';

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID || 'AW-18020600681';

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
            gtag('js', new Date());
            gtag('config', '${GTAG_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className='min-h-screen bg-chalk'>
          <HeaderWrapper />
          {children}
        </div>
      </body>
    </html>
  );
}
