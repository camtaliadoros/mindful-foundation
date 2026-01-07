import { getSiteSettings } from '../lib/sanity';
import Header from './Header';

export default async function HeaderWrapper() {
  const siteSettings = await getSiteSettings();
  const donateButton = siteSettings?.donateButton || null;

  return <Header donateButton={donateButton} />;
}
