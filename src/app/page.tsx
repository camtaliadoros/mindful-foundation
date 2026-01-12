import { AnimatedStatCard } from './components/AnimatedStatCard';
import { CTA } from './components/CTA';
import { TestimonialCard } from './components/TestimonialCard';
import { WorkCard } from './components/WorkCard';
import { getHomepageData, getSiteSettings } from './lib/sanity';
import { HomepageData } from './types/homepage';
import { renderBlockContent } from './utils/sanity';
import Image from 'next/image';
import { generateMetadata as generatePageMetadata } from './utils/metadata';
import { Metadata } from 'next';
import { StructuredData } from './components/StructuredData';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mindfulfoundation.org';

export async function generateMetadata(): Promise<Metadata> {
  const [homepageData, siteSettings] = await Promise.all([
    getHomepageData(),
    getSiteSettings(),
  ]);

  return generatePageMetadata(
    {
      title: homepageData?.seo?.title,
      description: homepageData?.seo?.description,
      keywords: homepageData?.seo?.keywords,
      ogImage: homepageData?.seo?.ogImage,
      canonical: baseUrl,
    },
    siteSettings,
    '/'
  );
}

export default async function Home() {
  const homepageData: HomepageData | null = await getHomepageData();

  if (!homepageData) {
    return (
      <div>
        <h1>Error Loading Homepage</h1>
        <p>Unable to load homepage content.</p>
      </div>
    );
  }

  const {
    headerSubheadline,
    heroImage,
    mission,
    intro,
    strands,
    whyItMattersTitle,
    stats,
    whyItMattersFootnote,
    testimonialsTitle,
    testimonials,
  } = homepageData;

  // Get the three core strands
  const thinkDifferent = strands?.find((strand) =>
    strand.title.toLowerCase().includes('think different')
  );
  const listenApp = strands?.find((strand) =>
    strand.title.toLowerCase().includes('listenapp')
  );
  const perpetratorProgramme = strands?.find((strand) =>
    strand.title.toLowerCase().includes('perpetrator')
  );

  // Split the headerSubheadline into an array of strings
  const headerSubheadlineArray = headerSubheadline?.split('. ') || [];
  const siteSettings = await getSiteSettings();

  return (
    <>
      <StructuredData
        siteSettings={siteSettings}
        type='WebSite'
        pageTitle='The Mindful Foundation'
        pageDescription='Empowering Lives. Preventing Harm. Healing Futures.'
      />
      {/* Hero Section */}
      <section
        className='relative h-[600px] bg-mf-blue overflow-hidden'
        aria-label='Hero section'
      >
        {heroImage && (
          <Image
            src={heroImage.asset.url}
            alt={heroImage.alt || 'Hero section background'}
            fill
            priority
            fetchPriority='high'
            className='object-cover'
            sizes='100vw'
            quality={80}
            style={{ zIndex: 0 }}
          />
        )}
        <div
          className='absolute inset-0 hero-overlay'
          style={{ zIndex: 1 }}
        ></div>
        <div
          className='absolute top-0 left-0 z-10 h-full flex items-center px-6'
          style={{ zIndex: 2 }}
        >
          <div className='text-white max-w-2xl'>
            <h1 className='text-5xl md:text-6xl font-bold leading-tight mb-6 animate-mf-fade-up'>
              {headerSubheadlineArray.map((line, index) => (
                <div key={index}>
                  {line +
                    (index < headerSubheadlineArray.length - 1 ? '.' : '')}
                </div>
              ))}
            </h1>
          </div>
        </div>
      </section>

      <main>
        {/* Mission Section */}
        {mission && (
          <section className='bg-chalk py-16 px-6'>
            <div className='max-w-4xl mx-auto text-gray-800 md:w-1/2 space-y-6'>
              <h2 className='text-4xl font-bold text-center mb-8'>
                Our Mission
              </h2>
              <div className='prose prose-lg prose-invert max-w-none font-extrabold [&>*]:text-lg md:[&>*]:text-xl '>
                {renderBlockContent(mission)}
              </div>
              <div className='prose prose-xl [&>*]:text-lg'>
                {intro && renderBlockContent(intro)}
              </div>
            </div>
          </section>
        )}

        {/* Our Work Section */}
        <section className='bg-mf-blue py-16 px-6'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-3xl font-bold text-white text-center mb-2'>
              Our Work
            </h2>
            <h3 className='text-center text-white/80 text-xl mt-2 mb-12 font-bold'>
              Three Core Strands
            </h3>

            <div className='grid md:grid-cols-3 gap-8 lg:w-3/4 mx-auto'>
              {/* Think Different */}
              {thinkDifferent && (
                <WorkCard
                  title={thinkDifferent.title}
                  description={thinkDifferent.description}
                  icon='think-different'
                />
              )}

              {/* ListenApp */}
              {listenApp && (
                <WorkCard
                  title={listenApp.title}
                  description={listenApp.description}
                  icon='listen-app'
                />
              )}

              {/* Perpetrator Programme */}
              {perpetratorProgramme && (
                <WorkCard
                  title={perpetratorProgramme.title}
                  description={perpetratorProgramme.description}
                  icon='perpetrator-programme'
                />
              )}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {stats && stats.length > 0 && (
          <section className='bg-chalk py-16 px-6'>
            <div className='max-w-4xl mx-auto'>
              <h2 className='text-3xl font-bold text-gray-800 text-center mb-12'>
                {whyItMattersTitle || 'Why It Matters'}
              </h2>
              <div className='grid md:grid-cols-2 md:gap-x-16 gap-16 w-3/4 mx-auto'>
                {stats.map((stat, index) => (
                  <AnimatedStatCard
                    key={stat._key}
                    value={stat.value}
                    description={stat.description}
                    delay={index * 200}
                  />
                ))}
              </div>
              {whyItMattersFootnote && (
                <p className='text-center text-gray-600 mt-8 font-extrabold text-2xl animate-mf-fade-in'>
                  {whyItMattersFootnote}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {testimonials && testimonials.length > 0 && (
          <section className='bg-mf-blue py-16 px-6'>
            <div className='max-w-4xl mx-auto'>
              <h2 className='text-3xl font-bold text-white text-center mb-12'>
                {testimonialsTitle || 'Testimonials'}
              </h2>
              <div className='grid md:grid-cols-4 gap-8 '>
                {testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial._key}
                    author={testimonial.author}
                    title={testimonial.roleOrTitle}
                    organisation={testimonial.org}
                    quote={testimonial.quote}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action Section */}
        <CTA />
      </main>
    </>
  );
}
