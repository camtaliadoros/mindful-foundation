import { getHomepageData } from './lib/sanity';
import { renderBlockContent } from './utils/sanity';
import { HomepageData } from './types/homepage';
import Header from './components/Header';
import {
  ThinkDifferentIcon,
  ListenAppIcon,
  PerpetratorProgrammeIcon,
} from './components/Icons';
import { CTAButton } from './utils/cta';
import { WordCard } from './components/WorkCard';
import { AnimatedStatCard } from './components/AnimatedStatCard';
import { TestimonialCard } from './components/TestimonialCard';

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
    headerHeadline,
    headerSubheadline,
    mission,
    intro,
    strandsSectionTitle,
    strands,
    whyItMattersTitle,
    stats,
    whyItMattersFootnote,
    testimonialsTitle,
    testimonials,
    callToActionTitle,
    primaryCta,
    secondaryCta,
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

  return (
    <div className='min-h-screen'>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section
        className='relative h-[600px] bg-cover bg-center'
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className='absolute inset-0 bg-black bg-opacity-40'></div>
        <div className='relative z-10 h-full flex items-center px-6'>
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

      {/* Mission Section */}
      {mission && (
        <section className='bg-chalk py-16 px-6'>
          <div className='max-w-4xl mx-auto text-gray-800 md:w-1/2 space-y-6'>
            <h2 className='text-3xl font-bold text-center mb-8'>Our Mission</h2>
            <div className='prose prose-lg prose-invert max-w-none font-extrabold text-2xl text-centre'>
              {renderBlockContent(mission)}
            </div>
            <div className='prose prose-lg [&>*]:space-y-3'>
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
          <h3 className='text-center text-white/80 text-lg mt-2 mb-12 font-bold'>
            Three Core Strands
          </h3>

          <div className='grid md:grid-cols-3 gap-8 lg:w-3/4 mx-auto'>
            {/* Think Different */}
            {thinkDifferent && (
              <WordCard
                title={thinkDifferent.title}
                description={thinkDifferent.description}
                icon={<ThinkDifferentIcon />}
              />
            )}

            {/* ListenApp */}
            {listenApp && (
              <WordCard
                title={listenApp.title}
                description={listenApp.description}
                icon={<ListenAppIcon />}
              />
            )}

            {/* Perpetrator Programme */}
            {perpetratorProgramme && (
              <WordCard
                title={perpetratorProgramme.title}
                description={perpetratorProgramme.description}
                icon={<PerpetratorProgrammeIcon />}
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
              <p className='text-center text-gray-600 mt-8 font-extrabold text-xl animate-mf-fade-in'>
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
      <section className='bg-[#f8f5ed] py-16 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-gray-800 mb-8'>
            {callToActionTitle || 'Together, we can build safer futures.'}
          </h2>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {primaryCta && <CTAButton cta={primaryCta} />}
            {secondaryCta && <CTAButton cta={secondaryCta} />}
          </div>
        </div>
      </section>
    </div>
  );
}
