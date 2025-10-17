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
            <h1 className='text-5xl md:text-6xl font-bold leading-tight mb-6'>
              <div>Empowering Lives.</div>
              <div>Preventing Harm.</div>
              <div>Healing Futures.</div>
            </h1>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      {mission && (
        <section className='bg-mf-green py-16 px-6'>
          <div className='max-w-4xl mx-auto text-white'>
            <h2 className='text-3xl font-bold text-center mb-8'>Our Mission</h2>
            <div className='prose prose-lg prose-invert max-w-none'>
              {renderBlockContent(mission)}
            </div>
          </div>
        </section>
      )}

      {/* Introduction Section */}
      <section className='bg-chalk py-16 px-6'>
        <div className='max-w-4xl mx-auto text-gray-800'>
          <div className='prose prose-lg'>
            {intro && renderBlockContent(intro)}
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className='bg-mf-blue py-16 px-6'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-white text-center mb-12'>
            Our Work — Three Core Strands
          </h2>

          <div className='grid md:grid-cols-3 gap-8'>
            {/* Think Different */}
            {thinkDifferent && (
              <div className='bg-ash p-8 rounded-lg'>
                <ThinkDifferentIcon />
                <h3 className='text-xl font-bold text-white mb-4'>
                  {thinkDifferent.title}
                </h3>
                <p className='text-white leading-relaxed'>
                  {thinkDifferent.description}
                </p>
              </div>
            )}

            {/* ListenApp */}
            {listenApp && (
              <div className='bg-ash p-8 rounded-lg'>
                <ListenAppIcon />
                <h3 className='text-xl font-bold text-white mb-4'>
                  {listenApp.title}
                </h3>
                <p className='text-white leading-relaxed'>
                  {listenApp.description}
                </p>
              </div>
            )}

            {/* Perpetrator Programme */}
            {perpetratorProgramme && (
              <div className='bg-ash p-8 rounded-lg'>
                <PerpetratorProgrammeIcon />
                <h3 className='text-xl font-bold text-white mb-4'>
                  {perpetratorProgramme.title}
                </h3>
                <p className='text-white leading-relaxed'>
                  {perpetratorProgramme.description}
                </p>
              </div>
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
            <div className='grid md:grid-cols-3 gap-8'>
              {stats.map((stat) => (
                <div key={stat._key} className='text-center'>
                  <h3 className='text-4xl font-bold text-mf-blue mb-4'>
                    {stat.value}
                  </h3>
                  <p className='text-gray-700'>{stat.description}</p>
                </div>
              ))}
            </div>
            {whyItMattersFootnote && (
              <p className='text-center text-gray-600 mt-8'>
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
            <div className='grid md:grid-cols-2 gap-8'>
              {testimonials.map((testimonial) => (
                <div key={testimonial._key} className='bg-ash p-8 rounded-lg'>
                  <blockquote className='text-white text-lg italic mb-4'>
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <cite className='text-mf-green font-semibold'>
                    {testimonial.author}
                    {testimonial.roleOrTitle && `, ${testimonial.roleOrTitle}`}
                    {testimonial.org && ` at ${testimonial.org}`}
                  </cite>
                </div>
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
