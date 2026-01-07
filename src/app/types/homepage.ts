export interface StrandItem {
  _key: string;
  title: string;
  description?: string;
  internalLink?: {
    _id: string;
    _type: string;
    title: string;
  };
}

export interface Stat {
  _key: string;
  value: string;
  description: string;
}

export interface Testimonial {
  _key: string;
  quote: string;
  author: string;
  roleOrTitle?: string;
  org?: string;
}

export interface CTA {
  _key: string;
  label: string;
  actionType: 'url' | 'email' | 'pdf';
  href?: string;
  email?: string;
  pdf?: {
    asset: {
      url: string;
      originalFilename?: string;
    };
  };
  style: 'primary' | 'secondary' | 'link';
}

// Block content type for rich text
export interface BlockContent {
  _type: 'block';
  _key: string;
  children: Array<{
    _type: 'span';
    _key: string;
    text: string;
    marks?: string[];
  }>;
  style?: string;
  listItem?: string;
  markDefs?: Array<{
    _type: string;
    _key: string;
    href?: string;
    openInNewTab?: boolean;
  }>;
}

export interface HomepageData {
  _id: string;
  _type: 'homepage';
  title: string;
  headerHeadline: string;
  headerSubheadline: string;
  heroImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  mission: BlockContent[]; // blockContent
  intro: BlockContent[]; // blockContent
  strandsSectionTitle?: string;
  strands: StrandItem[];
  whyItMattersTitle?: string;
  stats: Stat[];
  whyItMattersFootnote?: string;
  testimonialsTitle?: string;
  testimonials: Testimonial[];
  callToActionTitle?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: {
      asset: {
        url: string;
      };
    };
  };
}
