export type DonateButton = {
  label: string;
  href: string;
};

export type SiteSettings = {
  _id: string;
  _type: 'siteSettings';
  siteName?: string;
  donateButton?: DonateButton;
};
