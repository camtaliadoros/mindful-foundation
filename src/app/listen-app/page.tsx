import { getListenAppPageData } from '../lib/sanity';
import { renderBlockContent } from '../utils/sanity';
import { CTAButton } from '../utils/cta';
import Header from '../components/Header';
import { Feature } from '../types/listenApp';
import { LogoSection } from '../components/LogoSection';
import Image from 'next/image';
import {
  faHeadphones,
  faBell,
  faUserShield,
  faComments,
  faCircleCheck,
  faShield,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default async function ListenAppPage() {
  const listenAppData = await getListenAppPageData();

  if (!listenAppData) {
    return (
      <div className='min-h-screen bg-chalk'>
        <Header />
        <div className='max-w-4xl mx-auto px-6 py-16 text-center'>
          <h1 className='text-3xl font-bold text-mf-blue mb-4'>
            Page Not Found
          </h1>
          <p className='text-gray-600 md:text-xl'>
            The ListenApp page content could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const {
    headerHeadline,
    headerSubheadline,
    whatItIsTitle,
    whatItIs,
    whyItMattersTitle,
    whyItMatters,
    featuresTitle,
    features,
    partnersTitle,
    partners,
    listenAppPartners,
    specialThanksTitle,
    specialThanks,
    callToActionTitle,
    primaryCta,
    secondaryCta,
  } = listenAppData;

  return (
    <>
      {/* Header Section */}
      <section
        className='bg-mf-blue text-chalk py-16 px-6'
        aria-label='Page header'
      >
        <div className='max-w-2xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            {headerHeadline}
          </h1>
          <p className='text-xl md:text-2xl text-mf-green font-grotesk-regular'>
            {headerSubheadline}
          </p>
        </div>
      </section>

      <main>
        {/* What It Is Section */}
        <section className='py-16 px-6'>
          <div className='max-w-2xl mx-auto'>
            <h2 className='text-3xl font-bold text-mf-blue mb-8'>
              {whatItIsTitle}
            </h2>
            <div className='prose prose-xl max-w-none text-gray-700 font-grotesk-regular [&>*]:text-lg'>
              {renderBlockContent(whatItIs)}
            </div>
          </div>
        </section>

        {/* Why It Matters Section */}
        <section className='bg-white py-16 px-6'>
          <div className='max-w-2xl mx-auto'>
            <h2 className='text-3xl font-bold text-mf-blue mb-8'>
              {whyItMattersTitle}
            </h2>
            <div className='prose prose-xl max-w-none text-gray-700 [&>*]:text-lg'>
              {renderBlockContent(whyItMatters)}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-16 px-6 bg-mf-blue'>
          <div className='max-w-4xl mx-auto'>
            <h2 className='text-3xl font-bold text-chalk mb-12 text-center'>
              {featuresTitle}
            </h2>
            {/* <div className='max-w-2xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8'> */}
            <div className='max-w-2xl mx-auto flex flex-wrap justify-center gap-8'>
              {features?.map((feature: Feature, index: number) => {
                const iconMap = [
                  faHeadphones,
                  faBell,
                  faUserShield,
                  faComments,
                  faCircleCheck,
                  faShield,
                ];
                const icon = iconMap[index % iconMap.length];
                return (
                  <div
                    key={feature._key}
                    className='bg-mf-dark-blue p-6 rounded-lg space-y-2 flex flex-col items-center w-full sm:max-w-48'
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className='h-8 w-8 text-mf-green mb-6'
                    />
                    <h3 className='text-xl font-semibold text-chalk text-center'>
                      {feature.title}
                    </h3>
                    <p className='text-chalk font-grotesk-regular text-center md:text-xl'>
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className='bg-mf-dark-blue py-16 px-6'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-3xl font-bold text-white mb-8 text-center'>
              {partnersTitle}
            </h2>
            <div className='prose prose-xl text-center text-white font-grotesk-regular [&>*]:text-lg mb-12 max-w-2xl mx-auto'>
              {renderBlockContent(partners)}
            </div>
            {listenAppPartners && (
              <div className='flex flex-wrap gap-16 items-center justify-center max-w-2xl mx-auto'>
                {listenAppPartners.logos.map((logo) => (
                  <div key={logo._key} className='flex justify-center max-w-30'>
                    {logo.logo ? (
                      <a
                        href={logo.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='transition-transform hover:scale-105'
                      >
                        <Image
                          src={logo.logo.asset.url}
                          alt={logo.logo.alt || logo.name}
                          width={200}
                          height={100}
                          className='max-h-20 min-h-10 w-auto object-contain'
                        />
                      </a>
                    ) : (
                      <div className='text-center'>
                        <h3 className='text-lg md:text-xl font-grotesk-medium text-white mb-2'>
                          {logo.name}
                        </h3>
                        <a
                          href={logo.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='text-mf-green hover:text-mf-dark-green hover:underline'
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Special Thanks Section */}
        {specialThanks && (
          <LogoSection
            colourScheme='light'
            title={specialThanksTitle || 'Special Thanks'}
            logos={specialThanks.logos}
          />
        )}

        {/* Call to Action Section */}
        {((primaryCta &&
          ((primaryCta.actionType === 'url' && primaryCta.href) ||
            (primaryCta.actionType === 'email' && primaryCta.email) ||
            (primaryCta.actionType === 'pdf' && primaryCta.pdf?.asset?.url))) ||
          (secondaryCta &&
            ((secondaryCta.actionType === 'url' && secondaryCta.href) ||
              (secondaryCta.actionType === 'email' && secondaryCta.email) ||
              (secondaryCta.actionType === 'pdf' &&
                secondaryCta.pdf?.asset?.url)))) && (
          <section className='bg-mf-blue text-chalk py-16 px-6'>
            <div className='max-w-2xl mx-auto text-center'>
              <h2 className='text-2xl font-bold mb-8 '>{callToActionTitle}</h2>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                {primaryCta && (
                  <CTAButton cta={primaryCta} darkBackground={true} />
                )}
                {secondaryCta && (
                  <CTAButton cta={secondaryCta} darkBackground={true} />
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
