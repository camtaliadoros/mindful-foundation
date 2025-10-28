import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug } from '../../lib/sanity';
import { CTAButton } from '../../utils/cta';
import { renderBlockContent } from '../../utils/sanity';

interface NewsArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const {
    headline,
    subheadline,
    featuredImage,
    publishedAt,
    contentBlocks,
    cta,
  } = post;

  return (
    <>
      {/* Header Section */}
      <section className='bg-mf-blue text-chalk py-16 px-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-4'>
            <Link
              href='/news'
              className='inline-flex items-center text-mf-green hover:text-chalk transition-colors font-grotesk-medium'
            >
              <svg
                className='mr-2 w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              Back to News
            </Link>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 font-grotesk-medium'>
            {headline}
          </h1>
          {subheadline && (
            <p className='text-xl md:text-2xl text-mf-green font-grotesk-regular mb-4'>
              {subheadline}
            </p>
          )}
          <div className='text-chalk/80 font-grotesk-regular'>
            <time>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {featuredImage && (
        <section className='py-8 px-6'>
          <div className='max-w-4xl mx-auto'>
            <div className='aspect-video relative rounded-lg overflow-hidden'>
              <Image
                src={featuredImage.asset.url}
                alt={featuredImage.alt || headline}
                fill
                className='object-cover'
              />
            </div>
            {featuredImage.caption && (
              <p className='text-center text-gray-600 mt-4 font-grotesk-regular'>
                {featuredImage.caption}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Content Blocks */}
      <section className='py-16 px-6'>
        <div className='max-w-4xl mx-auto'>
          {contentBlocks?.map((block) => (
            <div key={block._key} className='mb-12'>
              {/* Content */}
              <div className='prose prose-lg max-w-none text-gray-700 font-grotesk-regular mb-8'>
                {renderBlockContent(block.content)}
              </div>

              {/* Optional Image */}
              {block.image && (
                <div className='my-8'>
                  <div className='aspect-video relative rounded-lg overflow-hidden'>
                    <Image
                      src={block.image.asset.url}
                      alt={block.image.alt || 'News article image'}
                      fill
                      className='object-cover'
                    />
                  </div>
                  {block.image.caption && (
                    <p className='text-center text-gray-600 mt-4 font-grotesk-regular'>
                      {block.image.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      {cta && (
        <section className='bg-[#f8f5ed] py-16 px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <CTAButton cta={cta} />
            </div>
          </div>
        </section>
      )}

      {/* Back to News */}
      <section className='py-8 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <Link
            href='/news'
            className='inline-flex items-center text-mf-green hover:text-mf-blue transition-colors font-grotesk-medium'
          >
            <svg
              className='mr-2 w-4 h-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
            Back to News
          </Link>
        </div>
      </section>
    </>
  );
}
