import { client } from '../sanity/client';
import { HomepageData } from '../types/homepage';

export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    const query = `*[_type == "homepage"][0] {
      _id,
      _type,
      title,
      headerHeadline,
      headerSubheadline,
      mission,
      intro,
      strandsSectionTitle,
      strands[] {
        _key,
        title,
        description,
        internalLink-> {
          _id,
          _type,
          title
        }
      },
      whyItMattersTitle,
      stats[] {
        _key,
        value,
        description
      },
      whyItMattersFootnote,
      testimonialsTitle,
      testimonials[] {
        _key,
        quote,
        author,
        roleOrTitle,
        org
      },
      callToActionTitle,
      primaryCta {
        _key,
        label,
        href,
        style
      },
      secondaryCta {
        _key,
        label,
        href,
        style
      },
      infoPack {
        asset-> {
          url
        },
        originalFilename
      },
      seo {
        title,
        description,
        keywords,
        ogImage
      }
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}
