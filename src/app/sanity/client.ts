import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'ue9tzk13',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});
