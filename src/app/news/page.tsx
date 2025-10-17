import { getBlogPageData, getAllBlogPosts } from '../lib/sanity';
import Header from '../components/Header';
import Link from 'next/link';
import Image from 'next/image';

export default async function NewsPage() {
  const [newsPageData, newsPosts] = await Promise.all([
    getBlogPageData(),
    getAllBlogPosts(),
  ]);

  if (!newsPageData) {
    return (
      <div className='min-h-screen bg-chalk'>
        <Header />
        <div className='max-w-4xl mx-auto px-6 py-16 text-center'>
          <h1 className='text-3xl font-bold text-mf-blue mb-4'>
            Page Not Found
          </h1>
          <p className='text-gray-600'>
            The news page content could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const { headerHeadline, headerSubheadline } = newsPageData;

  return (
    <div className='min-h-screen bg-chalk'>
      <Header />

      {/* Header Section */}
      <section className='bg-mf-blue text-chalk py-16 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 font-grotesk-medium'>
            {headerHeadline}
          </h1>
          <p className='text-xl md:text-2xl text-mf-green font-grotesk-regular'>
            {headerSubheadline}
          </p>
        </div>
      </section>

      {/* News Articles Section */}
      <section className='py-16 px-6'>
        <div className='max-w-6xl mx-auto'>
          {newsPosts.length === 0 ? (
            <div className='text-center py-16'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4 font-grotesk-medium'>
                No news articles yet
              </h2>
              <p className='text-gray-600 font-grotesk-regular'>
                Check back soon for insights, updates, and stories from The
                Mindful Foundation.
              </p>
            </div>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {newsPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/news/${post.slug.current}`}
                  className='block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group'
                >
                  {post.featuredImage && (
                    <div className='aspect-video relative'>
                      <Image
                        src={post.featuredImage.asset.url}
                        alt={post.featuredImage.alt || post.headline}
                        fill
                        className='object-cover'
                      />
                    </div>
                  )}
                  <div className='p-6'>
                    <div className='mb-3'>
                      <time className='text-sm text-gray-500 font-grotesk-regular'>
                        {new Date(post.publishedAt).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </time>
                    </div>
                    <h2 className='text-xl font-bold text-mf-blue mb-2 font-grotesk-medium group-hover:text-mf-green transition-colors'>
                      {post.headline}
                    </h2>
                    {post.subheadline && (
                      <p className='text-gray-600 mb-3 font-grotesk-regular'>
                        {post.subheadline}
                      </p>
                    )}
                    {post.excerpt && (
                      <p className='text-gray-700 mb-4 font-grotesk-regular line-clamp-3'>
                        {post.excerpt}
                      </p>
                    )}
                    <div className='inline-flex items-center text-mf-green group-hover:text-mf-blue transition-colors font-grotesk-medium'>
                      Read more
                      <svg
                        className='ml-2 w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
