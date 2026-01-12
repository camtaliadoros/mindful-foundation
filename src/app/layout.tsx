import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import HeaderWrapper from './components/HeaderWrapper';
import { getSiteSettings } from './lib/sanity';
import { generateMetadata as generateSiteMetadata } from './utils/metadata';
import { StructuredData } from './components/StructuredData';

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
