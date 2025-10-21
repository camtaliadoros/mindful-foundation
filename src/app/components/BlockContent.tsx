import { PortableTextBlock } from '@portabletext/types';
import { PortableText } from 'next-sanity';
import { portableTextComponents } from '../utils/sanity';

export const BlockContent = ({ content }: { content: PortableTextBlock[] }) => {
  return (
    <div className='prose prose-lg max-w-none text-center space-y-3'>
      <PortableText value={content} components={portableTextComponents} />
    </div>
  );
};
