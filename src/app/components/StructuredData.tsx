import { SiteSettings } from '../types/siteSettings';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mindfulfoundation.org';

interface StructuredDataProps {
  siteSettings?: SiteSettings | null;
  type?: 'Organization' | 'WebSite';
  pageTitle?: string;
  pageDescription?: string;
}

export function StructuredData({
  siteSettings,
  type = 'Organization',
  pageTitle,
  pageDescription,
}: StructuredDataProps) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Mindful Foundation',
    url: baseUrl,
    logo: `${baseUrl}/Mindful Foundation logo.jpeg`,
    description:
      pageDescription ||
      'Empowering Lives. Preventing Harm. Healing Futures. The Mindful Foundation works to prevent harm and support those affected by domestic abuse.',
    sameAs: [
      // Add social media URLs here when available
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Mindful Foundation',
    url: baseUrl,
    description:
      pageDescription ||
      'Empowering Lives. Preventing Harm. Healing Futures. The Mindful Foundation works to prevent harm and support those affected by domestic abuse.',
    ...(pageTitle && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/news?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };

  const schema = type === 'Organization' ? organizationSchema : websiteSchema;

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
