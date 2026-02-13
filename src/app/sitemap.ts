import { MetadataRoute } from 'next';
import { client } from './sanity/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Canonical production URL for all sitemap entries
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://www.themindfulfoundation.org';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/think-different`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/listen-app`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/perpetrator-programme`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Dynamic pages - News articles
  try {
    const newsQuery = `*[_type == "article"] {
      "slug": slug.current,
      _updatedAt
    }`;
    const newsArticles = await client.fetch(newsQuery);

    const newsPages: MetadataRoute.Sitemap = (newsArticles || []).map(
      (article: { slug: string; _updatedAt: string }) => ({
        url: `${baseUrl}/news/${article.slug}`,
        lastModified: new Date(article._updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })
    );

    return [...staticPages, ...newsPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}
