import { getAboutPageData } from '../lib/sanity';
import { renderBlockContent } from '../utils/sanity';
import { AboutPageData } from '../types/about';
import Image from 'next/image';
import Header from '../components/Header';
import { BlockContent } from '../components/BlockContent';
import { PortableTextBlock } from 'next-sanity';

export default async function AboutPage() {
  const aboutPageData: AboutPageData | null = await getAboutPageData();

  if (!aboutPageData) {
    return (
      <div>
        <h1>Error Loading About Page</h1>
        <p>Unable to load about page content from Sanity.</p>
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
    advisoryBoardTitle,
    advisoryBoard,
    listenAppPartnersTitle,
    listenAppPartners,
    specialThanksTitle,
    specialThanks,
  } = aboutPageData;

  return (
    <div className='min-h-screen'>
      {/* Header */}
      <Header />

      {/* Header Section */}
      <section className='bg-mf-blue py-16 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-chalk mb-4'>
            {headerHeadline}
          </h1>
          <p className='text-2xl text-chalk'>{headerSubheadline}</p>
        </div>
      </section>

      {/* Who We Are Section */}
      {whoWeAre && (
        <section className='bg-white py-16 px-6 md:w-1/2 mx-auto'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
              {whoWeAreTitle || 'Who We Are'}
            </h2>
            <BlockContent content={whoWeAre as PortableTextBlock[]} />
          </div>
        </section>
      )}

      {/* Mission Section */}
      {mission && (
        <section className='bg-chalk py-16 px-6'>
          <div className='max-w-6xl mx-auto'>
            {missionImage ? (
              <div className='grid md:grid-cols-2 gap-12 items-center'>
                <div className='relative h-[400px] rounded-lg overflow-hidden'>
                  <Image
                    src={missionImage.asset.url}
                    alt={missionImage.alt || 'Our Mission'}
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h2 className='text-3xl font-bold text-gray-800 mb-12 text-center'>
                    {missionTitle || 'Our Mission'}
                  </h2>
                  <p className='text-xl text-gray-700 leading-snug font-semibold'>
                    {mission}
                  </p>
                </div>
              </div>
            ) : (
              <div className='max-w-4xl mx-auto text-center'>
                <h2 className='text-3xl font-bold text-gray-800 mb-12 text-center'>
                  {missionTitle || 'Our Mission'}
                </h2>
                <p className='text-lg text-gray-700 leading-relaxed'>
                  {mission}
                </p>
              </div>
            )}
          </div>
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
                  <p className='text-chalk leading-snug'>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {team && (
        <section className='bg-chalk py-16 px-6'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
              {teamTitle || 'The Team'}
            </h2>
            <div className='prose prose-lg max-w-none'>
              {renderBlockContent(team)}
            </div>
          </div>
        </section>
      )}

      {/* Advisory Board Section */}
      {advisoryBoard && advisoryBoard.length > 0 && (
        <section className='bg-white py-16 px-6'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-800 mb-12 text-center'>
              {advisoryBoardTitle || 'Advisory Board'}
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center'>
              {advisoryBoard.map((member) => (
                <div key={member._key} className='flex justify-center'>
                  {member.logo ? (
                    <a
                      href={member.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-transform hover:scale-105'
                    >
                      <Image
                        src={member.logo.asset.url}
                        alt={member.logo.alt || member.name}
                        width={200}
                        height={100}
                        className='max-h-20 w-auto object-contain'
                      />
                    </a>
                  ) : (
                    <div className='text-center'>
                      <h3 className='text-lg font-grotesk-medium text-mf-blue mb-2'>
                        {member.name}
                      </h3>
                      <a
                        href={member.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-mf-green hover:underline'
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ListenApp Partners Section */}
      {listenAppPartners && listenAppPartners.length > 0 && (
        <section className='bg-mf-blue py-16 px-6'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-3xl font-bold text-white mb-12 text-center'>
              {listenAppPartnersTitle || 'ListenApp Partners'}
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center'>
              {listenAppPartners.map((partner) => (
                <div key={partner._key} className='flex justify-center'>
                  {partner.logo ? (
                    <a
                      href={partner.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-transform hover:scale-105'
                    >
                      <Image
                        src={partner.logo.asset.url}
                        alt={partner.logo.alt || partner.name}
                        width={200}
                        height={100}
                        className='max-h-20 w-auto object-contain'
                      />
                    </a>
                  ) : (
                    <div className='text-center'>
                      <h3 className='text-lg font-grotesk-medium text-white mb-2'>
                        {partner.name}
                      </h3>
                      <a
                        href={partner.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-mf-green hover:underline'
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Special Thanks Section */}
      {specialThanks && specialThanks.length > 0 && (
        <section className='bg-chalk py-16 px-6'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-3xl font-bold text-gray-800 mb-12 text-center'>
              {specialThanksTitle || 'Special Thanks'}
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center'>
              {specialThanks.map((thanks) => (
                <div key={thanks._key} className='flex justify-center'>
                  {thanks.logo ? (
                    <a
                      href={thanks.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-transform hover:scale-105'
                    >
                      <Image
                        src={thanks.logo.asset.url}
                        alt={thanks.logo.alt || thanks.name}
                        width={200}
                        height={100}
                        className='max-h-20 w-auto object-contain'
                      />
                    </a>
                  ) : (
                    <div className='text-center'>
                      <h3 className='text-lg font-grotesk-medium text-mf-blue mb-2'>
                        {thanks.name}
                      </h3>
                      <a
                        href={thanks.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-mf-green hover:underline'
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
