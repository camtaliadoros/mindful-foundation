import { client } from '../sanity/client';
import { HomepageData } from '../types/homepage';
import { AboutPageData } from '../types/about';
import { ThinkDifferentPageData } from '../types/thinkDifferent';
import { ListenAppPageData } from '../types/listenApp';

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
        actionType,
        href,
        email,
        pdf {
          asset-> {
            url,
            originalFilename
          }
        },
        style
      },
      secondaryCta {
        _key,
        label,
        actionType,
        href,
        email,
        pdf {
          asset-> {
            url,
            originalFilename
          }
        },
        style
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

export async function getAboutPageData(): Promise<AboutPageData | null> {
  try {
    const query = `*[_type == "aboutPage"][0] {
      _id,
      _type,
      title,
      headerHeadline,
      headerSubheadline,
      whoWeAreTitle,
      whoWeAre,
      missionTitle,
      mission,
      approachTitle,
      approach[] {
        _key,
        title,
        description
      },
      teamTitle,
      team,
      advisoryBoardTitle,
      advisoryBoard[] {
        _key,
        _type,
        name,
        logo {
          asset-> {
            _ref,
            url
          },
          alt
        },
        url
      },
      listenAppPartnersTitle,
      listenAppPartners[] {
        _key,
        _type,
        name,
        logo {
          asset-> {
            _ref,
            url
          },
          alt
        },
        url
      },
      specialThanksTitle,
      specialThanks[] {
        _key,
        _type,
        name,
        logo {
          asset-> {
            _ref,
            url
          },
          alt
        },
        url
      },
      seo {
        title,
        description,
        keywords,
        ogImage {
          asset-> {
            url
          }
        }
      }
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching about page data:', error);
    return null;
  }
}

export async function getThinkDifferentPageData(): Promise<ThinkDifferentPageData | null> {
  try {
    const query = `*[_type == "thinkDifferentPage"][0] {
      _id,
      _type,
      title,
      missionStatement,
      overviewHeadline,
      overview,
      whyDifferentTitle,
      whyDifferentDescription,
      whyDifferentApproachesTitle,
      whyDifferentApproaches,
      courseStructureTitle,
      courseStructureDescription,
      modulesTitle,
      modules[] {
        _key,
        title,
        description
      },
      courseAimsTitle,
      courseAims,
      impactTitle,
      impactDescription,
      impactOutcomes,
      impactStories,
      trainingTitle,
      trainingDescription,
      trainingCoversTitle,
      trainingCovers,
      trainingParticipantsReceiveTitle,
      trainingParticipantsReceive,
      trainingDelivery,
      ctaTitle,
      ctaButtons[] {
        _key,
        label,
        actionType,
        href,
        email,
        pdf {
          asset-> {
            url,
            originalFilename
          }
        },
        style
      },
      seo {
        title,
        description,
        keywords,
        ogImage {
          asset-> {
            url
          }
        }
      }
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching Think Different page data:', error);
    return null;
  }
}

export async function getListenAppPageData(): Promise<ListenAppPageData | null> {
  try {
    const query = `*[_type == "listenAppPage"][0] {
      _id,
      _type,
      title,
      headerHeadline,
      headerSubheadline,
      whatItIsTitle,
      whatItIs,
      whyItMattersTitle,
      whyItMatters,
      featuresTitle,
      features[] {
        _key,
        title,
        description
      },
      partnersTitle,
      partners,
      callToActionTitle,
      primaryCta {
        _key,
        label,
        actionType,
        href,
        email,
        pdf {
          asset-> {
            url,
            originalFilename
          }
        },
        style
      },
      secondaryCta {
        _key,
        label,
        actionType,
        href,
        email,
        pdf {
          asset-> {
            url,
            originalFilename
          }
        },
        style
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
    console.error('Error fetching ListenApp page data:', error);
    return null;
  }
}
