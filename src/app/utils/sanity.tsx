import { PortableText, PortableTextComponents } from 'next-sanity';
import { urlFor } from './imageUrl';
import Image from 'next/image';
import { BlockContent } from '../types/homepage';

// Components for rendering Portable Text (block content)
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;

      return (
        <div className='my-8'>
          <Image
            src={urlFor(value).width(800).height(600).url()}
            alt={value.alt || 'Image'}
            width={800}
            height={600}
          />
          {value.caption && <p className='text-lg'>{value.caption}</p>}
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => <p className='text-lg'>{children}</p>,
    h2: ({ children }) => <h2 className='text-lg'>{children}</h2>,
    h3: ({ children }) => <h3 className='text-lg'>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className='text-lg'>{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className='text-lg'>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        target={value.openInNewTab ? '_blank' : '_self'}
        rel={value.openInNewTab ? 'noopener noreferrer' : undefined}
        className='text-lg'
      >
        {children}
      </a>
    ),
  },
};

// Helper function to render block content
export function renderBlockContent(content: BlockContent[]) {
  if (!content) return null;

  return <PortableText value={content} components={portableTextComponents} />;
}
