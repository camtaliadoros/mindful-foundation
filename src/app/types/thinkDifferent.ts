import { BlockContent } from './homepage';
import { CTA } from './homepage';

export interface CourseModule {
  _key: string;
  title: string;
  description: string;
}

export interface ThinkDifferentPageData {
  _id: string;
  _type: 'thinkDifferentPage';
  title: string;
  missionStatement: string;
  overviewHeadline: string;
  overview: BlockContent[];
  whyDifferentTitle?: string;
  whyDifferentDescription: BlockContent[];
  whyDifferentApproachesTitle?: string;
  whyDifferentApproaches: string[];
  courseStructureTitle?: string;
  courseStructureDescription: BlockContent[];
  modulesTitle?: string;
  modules: CourseModule[];
  courseAimsTitle?: string;
  courseAims: string[];
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
