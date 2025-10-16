import { BlockContent } from './homepage';

export interface LinkableLogo {
  _key: string;
  _type: 'linkableLogo';
  name: string;
  logo: {
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  url: string;
}

export interface ApproachItem {
  _key: string;
  title: string;
  description: string;
}

export interface AboutPageData {
  _id: string;
  _type: 'aboutPage';
  title: string;
  headerHeadline: string;
  headerSubheadline: string;
  whoWeAreTitle?: string;
  whoWeAre: BlockContent[];
  missionTitle?: string;
  mission: string;
  approachTitle?: string;
  approach: ApproachItem[];
  teamTitle?: string;
  team: BlockContent[];
  advisoryBoardTitle?: string;
  advisoryBoard: LinkableLogo[];
  listenAppPartnersTitle?: string;
  listenAppPartners: LinkableLogo[];
  specialThanksTitle?: string;
  specialThanks: LinkableLogo[];
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
