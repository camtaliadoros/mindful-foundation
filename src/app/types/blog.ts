import { BlockContent } from './homepage';

export interface BlogPostImage {
  asset: {
    url: string;
  };
  alt?: string;
  caption?: string;
}

export interface BlogPostContentBlock {
  _key: string;
  content: BlockContent[];
  image?: BlogPostImage;
}

export interface BlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  headline: string;
  subheadline?: string;
  featuredImage?: BlogPostImage;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  contentBlocks: BlogPostContentBlock[];
  cta?: {
    _id: string;
    _type: 'articleCTA';
    title: string;
    label?: string;
    actionType?: 'url' | 'email' | 'pdf';
    href?: string;
    email?: string;
    pdf?: {
      asset: {
        url: string;
        originalFilename?: string;
      };
    };
    style?: 'primary' | 'secondary' | 'link';
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

export interface BlogPageData {
  _id: string;
  _type: 'blogPage';
  title: string;
  headerHeadline: string;
  headerSubheadline: string;
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
