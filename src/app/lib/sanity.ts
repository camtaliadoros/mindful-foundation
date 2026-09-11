import { client } from '../sanity/client';
import { HomepageData } from '../types/homepage';
import { AboutPageData } from '../types/about';
import { ThinkDifferentPageData } from '../types/thinkDifferent';
import { ListenAppPageData } from '../types/listenApp';
import { PerpetratorProgrammePageData } from '../types/perpetratorProgramme';
import { BlogPost, BlogPageData } from '../types/blog';
import { CTABlockData } from '../types/CTA';
import { SiteSettings } from '../types/siteSettings';

export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    const query = `*[_type == "homepage"][0] {
      _id,
      _type,
      title,
      headerHeadline,
      headerSubheadline,
      heroImage {
        asset-> {
          _id,
          _ref,
          url
        },
        alt
      },
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
      seo {
        title,
        description,
        keywords,
        ogImage
      }
    }`;

    const data = await client.fetch(query, {}, {
      next: { revalidate: 3600, tags: ['sanity', 'homepage'] }
    });
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
      listenAppPartners-> {
        _id,
        _type,
        title,
        colourScheme,
        logos[] {
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
        }
      },
      specialThanksTitle,
      specialThanks-> {
        _id,
        _type,
        title,
        colourScheme,
        logos[] {
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
        }
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

    const data = await client.fetch(query, {}, {
      next: { revalidate: 3600, tags: ['sanity', 'aboutPage'] }
    });
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
      heroBanner {
        stats[] {
          _key,
          value,
          description
        },
        enquiryCta {
          label,
          actionType,
          internalLink-> {
            _type,
            "slug": slug.current
          },
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
        signpostText,
        signpostSubtext,
        signpostLink {
          label,
          actionType,
          internalLink-> {
            _type,
            "slug": slug.current
          },
          href,
          email,
          pdf {
            asset-> {
              url,
              originalFilename
            }
          },
          style
        }
      },
      overviewHeadline,
      overview,
      overviewImage {
        asset-> {
          _ref,
          url
        },
        alt
      },
      whyDifferentTitle,
      whyDifferentDescription,
      whyDifferentApproachesTitle,
      whyDifferentApproaches[] {
        _key,
        title,
        icon {
          asset-> {
            url
          }
        }
      },
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
      courseAimsImage {
        asset-> {
          _ref,
          url
        },
        alt
      },
      impactTitle,
      impactDescription,
      impactOutcomesLabel,
      impactOutcomes,
      impactStories,
      impactSupport {
        heading,
        cta {
          label,
          actionType,
          internalLink-> {
            _type,
            "slug": slug.current
          },
          href,
          email,
          pdf {
            asset-> {
              url,
              originalFilename
            }
          },
          style
        }
      },
      trainingTitle,
      trainingDescription,
      trainingCoversTitle,
      trainingCovers,
      trainingParticipantsReceiveTitle,
      trainingParticipantsReceive,
      trainingDelivery,
      trainingButton {
        label,
        actionType,
        internalLink-> {
          _type,
          "slug": slug.current
        },
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
      ctaTitle,
      ctaButtons[] {
        _key,
        label,
        actionType,
        internalLink-> {
          _type,
          "slug": slug.current
        },
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

    const data = await client.fetch(query, {}, {
      next: { revalidate: 3600, tags: ['sanity', 'thinkDifferentPage'] }
    });
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
      whatItIsCta {
        label,
        actionType,
        internalLink-> {
          _type,
          "slug": slug.current
        },
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
      whatItIsSignpost {
        text,
        cta {
          label,
          actionType,
          internalLink-> {
            _type,
            "slug": slug.current
          },
          href,
          email,
          pdf {
            asset-> {
              url,
              originalFilename
            }
          },
          style
        }
      },
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
      listenAppPartners-> {
        _id,
        _type,
        title,
        colourScheme,
        logos[] {
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
        }
      },
      specialThanksTitle,
      specialThanks-> {
        _id,
        _type,
        title,
        colourScheme,
        logos[] {
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
        }
      },
      callToActionTitle,
      primaryCta {
        _key,
        label,
        actionType,
        internalLink-> {
          _type,
          "slug": slug.current
        },
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
        internalLink-> {
          _type,
          "slug": slug.current
        },
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
      donatePrompt {
        text,
        cta {
          label,
          actionType,
          internalLink-> {
            _type,
            "slug": slug.current
          },
          href,
          email,
          pdf {
            asset-> {
              url,
              originalFilename
            }
          },
          style
        }
      },
      seo {
        title,
        description,
        keywords,
        ogImage
      }
    }`;

    const data = await client.fetch(query, {}, {
      next: { revalidate: 3600, tags: ['sanity', 'listenAppPage'] }
    });
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
        internalLink-> {
          _type,
          "slug": slug.current
        },
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

    const data = await client.fetch(query, {}, {
      next: { revalidate: 3600, tags: ['sanity', 'perpetratorProgrammePage'] }
    });
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

    const data = await client.fetch(query, {}, {
      next: { revalidate: 3600, tags: ['sanity', 'blogPage'] }
    });
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

    const data = await client.fetch(query, {}, {
      next: { revalidate: 3600, tags: ['sanity', 'blogPost'] }
    });
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
      articleCTA-> {
        _id,
        _type,
        title,
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

    const data = await client.fetch(query, { slug }, {
      next: { revalidate: 3600, tags: ['sanity', 'blogPost'] }
    });
    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const query = `*[_type == "siteSettings"][0] {
      _id,
      _type,
      siteName,
      defaultSeo {
        title,
        description,
        keywords
      },
      socialImage {
        asset-> {
          url
        }
      },
      twitterHandle,
      donateButton {
        label,
        href
      }
    }`;

    const data = await client.fetch(query, {}, {
      next: { revalidate: 3600, tags: ['sanity', 'siteSettings'] }
    });
    return data;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export async function getCTABlockData(): Promise<CTABlockData | null> {
  try {
    const query = `*[_type == "CTABlock"][0] {
      _id,
      _type,
      callToActionTitle,
      primaryCta {
        _key,
        label,
        actionType,
        internalLink-> {
          _type,
          "slug": slug.current
        },
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
        internalLink-> {
          _type,
          "slug": slug.current
        },
        href,
        email,
        pdf {
          asset-> {
            url,
            originalFilename
          }
        },
        style
      }
    }`;
    const data = await client.fetch(query, {}, {
      next: { revalidate: 3600, tags: ['sanity', 'CTABlock'] }
    });
    return data;
  } catch (error) {
    console.error('Error fetching CTABlock data:', error);
    return null;
  }
}

export async function getContactPageData(): Promise<import('../types/contact').ContactPageData | null> {
  try {
    const query = `*[_type == "contactPage"][0] {
      _id,
      _type,
      title,
      headerHeadline,
      headerSubheadline,
      introText,
      email,
      successHeading,
      successMessage,
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

    const data = await client.fetch(query, {}, {
      next: { revalidate: 3600, tags: ['sanity', 'contactPage'] },
    });
    return data;
  } catch (error) {
    console.error('Error fetching contact page data:', error);
    return null;
  }
}

export async function getDonatePageData(): Promise<import('../types/donate').DonatePageData | null> {
  try {
    const query = `*[_type == "donatePage"][0] {
      _id,
      _type,
      title,
      headerHeadline,
      headerSubheadline,
      body,
      paymentMode,
      donateUrl,
      buttonLabel,
      stripePublishableKey,
      stripeBuyButtonId,
      securePaymentNote,
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

    const data = await client.fetch(query, {}, {
      next: { revalidate: 3600, tags: ['sanity', 'donatePage'] },
    });
    return data;
  } catch (error) {
    console.error('Error fetching donate page data:', error);
    return null;
  }
}
