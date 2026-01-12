export type DonateButton = {
  label: string;
  href: string;
};

export type SiteSettings = {
  _id: string;
  _type: 'siteSettings';
  siteName?: string;
  defaultSeo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  socialImage?: {
    asset: {
      url: string;
    };
  };
  twitterHandle?: string;
  donateButton?: DonateButton;
};
