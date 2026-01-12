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
export function getOptimizedHeroImageUrl(
  asset: { _id?: string; _ref?: string; url: string },
  width: number = 1920,
  height: number = 600
) {
  // Try to use Sanity CDN with optimizations if we have asset reference
  if (asset._ref) {
    try {
      return builder
        .image({ asset: { _ref: asset._ref } })
        .width(width)
        .height(height)
        .quality(80)
        .format('webp')
        .url();
    } catch (e) {
      // Fall through to fallback
    }
  }
  
  if (asset._id) {
    try {
      // Try with _id if _ref not available
      const ref = asset._id.replace('image-', '');
      return builder
        .image({ asset: { _ref: ref } })
        .width(width)
        .height(height)
        .quality(80)
        .format('webp')
        .url();
    } catch (e) {
      // Fall through to fallback
    }
  }
  
  // Fallback to original URL - Next.js Image will handle optimization
  return asset.url;
}
