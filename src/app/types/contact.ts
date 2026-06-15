export interface ContactPageData {
  _id: string;
  _type: 'contactPage';
  title: string;
  headerHeadline: string;
  headerSubheadline: string;
  introText?: string;
  email: string;
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
