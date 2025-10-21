import { client } from '../sanity/client';
import { HomepageData } from '../types/homepage';
import { AboutPageData } from '../types/about';
import { ThinkDifferentPageData } from '../types/thinkDifferent';
import { ListenAppPageData } from '../types/listenApp';
import { PerpetratorProgrammePageData } from '../types/perpetratorProgramme';
import { BlogPost, BlogPageData } from '../types/blog';

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
      missionImage {
        asset-> {
          _ref,
          url
        },
        alt
      },
      approachTitle,
      approach[] {
        _key,
        title,
        description
      },
      teamTitle,
      team,
      teamImage {
        asset-> {
          _ref,
          url
        },
        alt
      },
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

export async function getPerpetratorProgrammePageData(): Promise<PerpetratorProgrammePageData | null> {
  try {
    const query = `*[_type == "perpetratorProgrammePage"][0] {
      _id,
      _type,
      title,
      headerHeadline,
      headerSubheadline,
      whyItsNeededTitle,
      whyItsNeeded,
      ourApproachTitle,
      ourApproach,
      whatTheProgrammeProvidesTitle,
      whatTheProgrammeProvides[] {
        _key,
        title
      },
      outcomesTitle,
      outcomes,
      expansionTitle,
      expansion,
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
    console.error('Error fetching Perpetrator Programme page data:', error);
    return null;
  }
}

export async function getBlogPageData(): Promise<BlogPageData | null> {
  try {
    const query = `*[_type == "blogPage"][0] {
      _id,
      _type,
      title,
      headerHeadline,
      headerSubheadline,
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
    console.error('Error fetching blog page data:', error);
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const query = `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      _type,
      title,
      headline,
      subheadline,
      featuredImage {
        asset-> {
          url
        },
        alt,
        caption
      },
      slug,
      publishedAt,
      excerpt
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      headline,
      subheadline,
      featuredImage {
        asset-> {
          url
        },
        alt,
        caption
      },
      slug,
      publishedAt,
      excerpt,
      contentBlocks[] {
        _key,
        content,
        image {
          asset-> {
            url
          },
          alt,
          caption
        }
      },
      cta {
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

    const data = await client.fetch(query, { slug });
    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}
