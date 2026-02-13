import { PortableTextBlock } from '@portabletext/types';
import { PortableText } from 'next-sanity';
import { portableTextComponents } from '../utils/sanity';

export const BlockContent = ({ content }: { content: PortableTextBlock[] }) => {
  return (
    <div className='prose prose-2xl [&>*]:text-lg md:[&>*]:text-xl max-w-none text-center space-y-3 text-mf-dark-blue'>
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
};
