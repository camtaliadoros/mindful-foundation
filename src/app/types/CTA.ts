export type CTABlockData = {
  _id: string;
  _type: string;
  callToActionTitle: string;
  primaryCta: CTA;
  secondaryCta: CTA;
};

export type CTA = {
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
