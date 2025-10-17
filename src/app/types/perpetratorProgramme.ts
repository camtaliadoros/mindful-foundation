import { BlockContent } from './homepage';

export interface ProgrammeFeature {
  _key: string;
  title: string;
}

export interface PerpetratorProgrammePageData {
  _id: string;
  _type: 'perpetratorProgrammePage';
  title: string;
  headerHeadline: string;
  headerSubheadline: string;
  whyItsNeededTitle: string;
  whyItsNeeded: BlockContent[];
  ourApproachTitle: string;
  ourApproach: BlockContent[];
  whatTheProgrammeProvidesTitle: string;
  whatTheProgrammeProvides: ProgrammeFeature[];
  outcomesTitle: string;
  outcomes: BlockContent[];
  expansionTitle: string;
  expansion: BlockContent[];
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
