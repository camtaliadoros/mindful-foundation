import { BlockContent } from './homepage';
import { CTA } from './homepage';

export interface CourseModule {
  _key: string;
  title: string;
  description: string;
}

export interface Approach {
  _key: string;
  title: string;
  icon?: {
    asset: {
      url: string;
    };
  };
}

export interface ThinkDifferentPageData {
  _id: string;
  _type: 'thinkDifferentPage';
  title: string;
  missionStatement: string;
  overviewHeadline: string;
  overview: BlockContent[];
  overviewImage: {
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  whyDifferentTitle?: string;
  whyDifferentDescription: BlockContent[];
  whyDifferentApproachesTitle?: string;
  whyDifferentApproaches: Approach[];
  courseStructureTitle?: string;
  courseStructureDescription: BlockContent[];
  modulesTitle?: string;
  modules: CourseModule[];
  courseAimsTitle?: string;
  courseAims: string[];
  courseAimsImage?: {
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  impactTitle?: string;
  impactDescription: BlockContent[];
  impactOutcomes: string[];
  impactStories: BlockContent[];
  trainingTitle?: string;
  trainingDescription: BlockContent[];
  trainingCoversTitle?: string;
  trainingCovers: string[];
  trainingParticipantsReceiveTitle?: string;
  trainingParticipantsReceive: string[];
  trainingDelivery: string;
  ctaTitle?: string;
  ctaButtons: CTA[];
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
