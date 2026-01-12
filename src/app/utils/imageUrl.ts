import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'ue9tzk13',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for better performance
});

const builder = imageUrlBuilder(client);

export function urlFor(source: { asset: { _ref?: string; _id?: string } }) {
  return builder.image(source);
}

// Optimized hero image URL builder
// Uses Sanity CDN if possible, otherwise falls back to original URL
export function getOptimizedHeroImageUrl(
  asset: { _id?: string; _ref?: string; url: string },
  width: number = 1920,
  height: number = 600
) {
  // For now, use the original URL - Next.js Image component will handle optimization
  // Sanity images are already served from CDN and Next.js will optimize them further
  return asset.url;
}
