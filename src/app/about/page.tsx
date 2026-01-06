import { getAboutPageData } from '../lib/sanity';
import { AboutPageData } from '../types/about';
import { renderBlockContent } from '../utils/sanity';

import { PortableTextBlock } from 'next-sanity';
import { BlockContent } from '../components/BlockContent';
import { CTA } from '../components/CTA';
import { LogoSection } from '../components/LogoSection';
import { ScrollAnimatedImage } from '../components/ScrollAnimatedImage';
import TwoColumnSection from '../components/TwoColumnSection';

export default async function AboutPage() {
  const aboutPageData: AboutPageData | null = await getAboutPageData();

  if (!aboutPageData) {
    return (
      <div>
        <h1>Error Loading About Page</h1>
        <p className='md:text-xl'>Unable to load about page content from Sanity.</p>
      </div>
    );
  }

  const {
    headerHeadline,
    headerSubheadline,
    whoWeAreTitle,
    whoWeAre,
    missionTitle,
    mission,
    missionImage,
    approachTitle,
    approach,
    teamTitle,
    team,
    teamImage,
    advisoryBoardTitle,
    advisoryBoard,
    listenAppPartnersTitle,
    listenAppPartners,
    specialThanksTitle,
    specialThanks,
  } = aboutPageData;

  return (
    <>
      {/* Header Section */}
      <section className='bg-mf-blue py-16 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-chalk mb-4'>
            {headerHeadline}
          </h1>
          <p className='text-2xl text-mf-green'>{headerSubheadline}</p>
        </div>
      </section>

      {/* Who We Are Section */}
      {whoWeAre && (
        <section className='bg-white py-16 px-6 mx-auto'>
          <div className='max-w-4xl md:w-1/2 mx-auto'>
            <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
              {whoWeAreTitle || 'Who We Are'}
            </h2>
            <BlockContent content={whoWeAre as PortableTextBlock[]} />
          </div>
        </section>
      )}

      {/* Mission Section */}
      {mission && (
        <section className='bg-chalk py-16'>
          {missionImage ? (
            <TwoColumnSection>
              <div>
                <h2 className='text-3xl font-bold text-gray-800 mb-12 text-center'>
                  {missionTitle || 'Our Mission'}
                </h2>
                <p className='text-xl text-gray-700 leading-snug font-semibold'>
                  {mission}
                </p>
              </div>
              <ScrollAnimatedImage
                src={missionImage.asset.url}
                alt={missionImage.alt || 'Our Mission'}
              />
            </TwoColumnSection>
          ) : (
            <div className='max-w-4xl mx-auto text-center'>
              <h2 className='text-3xl font-bold text-gray-800 mb-12 text-center'>
                {missionTitle || 'Our Mission'}
              </h2>
              <p className='text-lg md:text-xl text-gray-700 leading-relaxed'>{mission}</p>
            </div>
          )}
        </section>
      )}

      {/* Approach Section */}
      {approach && approach.length > 0 && (
        <section className='bg-mf-blue py-16 px-6'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-chalk mb-12 text-center'>
              {approachTitle || 'Our Approach'}
            </h2>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {approach.map((item) => (
                <div
                  key={item._key}
                  className='bg-mf-dark-blue p-6 rounded-xl space-y-4'
                >
                  <div className='h-5 w-5 bg-mf-blue rounded-full'></div>
                  <h3 className='text-xl font-bold text-mf-green mb-4'>
                    {item.title}
                  </h3>
                  <p className='text-chalk text-lg md:text-xl leading-snug'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {team && (
        <section className=' bg-chalk py-16 '>
          <TwoColumnSection>
            {teamImage && (
              <ScrollAnimatedImage
                src={teamImage.asset.url}
                alt={teamImage.alt || 'The Team'}
              />
            )}
            <div>
              <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
                {teamTitle || 'The Team'}
              </h2>
              <div>{renderBlockContent(team)}</div>
            </div>
          </TwoColumnSection>
        </section>
      )}

      {/* Advisory Board Section */}
      <LogoSection
        colourScheme='light'
        title={advisoryBoardTitle || 'Advisory Board'}
        logos={advisoryBoard}
      />

      {/* ListenApp Partners Section */}
      <LogoSection
        colourScheme='dark'
        title={listenAppPartnersTitle || 'ListenApp Partners'}
        logos={listenAppPartners}
      />

      {/* Special Thanks Section */}
      <LogoSection
        colourScheme='light'
        title={specialThanksTitle || 'Special Thanks'}
        logos={specialThanks}
      />

      {/* {CTA Block} */}
      <CTA />
    </>
  );
}
