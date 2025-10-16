import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'ue9tzk13',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}
