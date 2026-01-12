import { BlockContent } from './homepage';
import { LogoSection } from './about';

export interface Feature {
  _key: string;
  title: string;
  description: string;
}

export interface ListenAppPageData {
  _id: string;
  _type: 'listenAppPage';
  title: string;
  headerHeadline: string;
  headerSubheadline: string;
  whatItIsTitle: string;
  whatItIs: BlockContent[];
  whyItMattersTitle: string;
  whyItMatters: BlockContent[];
  featuresTitle: string;
  features: Feature[];
  partnersTitle: string;
  partners: BlockContent[];
  listenAppPartners?: LogoSection | null;
  specialThanksTitle?: string;
  specialThanks?: LogoSection | null;
  callToActionTitle: string;
  primaryCta?: {
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
  };
  secondaryCta?: {
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
  };
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
