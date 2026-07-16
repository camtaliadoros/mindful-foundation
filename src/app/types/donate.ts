import { PortableTextBlock } from '@portabletext/types';

export interface DonatePageData {
  _id: string;
  _type: 'donatePage';
  title: string;
  headerHeadline: string;
  headerSubheadline: string;
  body?: PortableTextBlock[];
  paymentMode?: 'link' | 'embed';
  donateUrl?: string;
  buttonLabel?: string;
  stripePublishableKey?: string;
  stripeBuyButtonId?: string;
  securePaymentNote?: string;
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
