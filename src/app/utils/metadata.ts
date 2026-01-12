import { Metadata } from 'next';
import { SiteSettings } from '../types/siteSettings';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mindfulfoundation.org';
const siteName = 'The Mindful Foundation';
const defaultDescription =
  'Empowering Lives. Preventing Harm. Healing Futures. The Mindful Foundation works to prevent harm and support those affected by domestic abuse.';

export function generateMetadata(
  pageMetadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: { asset: { url: string } };
    noIndex?: boolean;
    canonical?: string;
  },
  siteSettings?: SiteSettings | null,
  path?: string
): Metadata {
  const title = pageMetadata?.title || siteSettings?.defaultSeo?.title || siteName;
  const description =
    pageMetadata?.description ||
    siteSettings?.defaultSeo?.description ||
    defaultDescription;
  const keywords = pageMetadata?.keywords || siteSettings?.defaultSeo?.keywords || [];
  const ogImage =
    pageMetadata?.ogImage?.asset?.url ||
    siteSettings?.socialImage?.asset?.url ||
    `${baseUrl}/Mindful Foundation logo.jpeg`;
  const twitterHandle = siteSettings?.twitterHandle;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    robots: pageMetadata?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: pageMetadata?.canonical || (path ? `${baseUrl}${path}` : baseUrl),
      siteName,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      ...(twitterHandle && { creator: `@${twitterHandle.replace('@', '')}` }),
    },
    alternates: {
      canonical: pageMetadata?.canonical || (path ? `${baseUrl}${path}` : baseUrl),
    },
  };
}
