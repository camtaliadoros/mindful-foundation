import Link from 'next/link';
import { getListenAppPageData } from '../lib/sanity';
import { renderBlockContent } from '../utils/sanity';
import { CTAButton, resolveCtaHref, isInternalHref } from '../utils/cta';
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
          <p className='text-mf-dark-blue md:text-xl'>
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
    whatItIsCta,
    whatItIsSignpost,
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

  const requestAccessHref = resolveCtaHref(whatItIsCta);
  const signpostHref = resolveCtaHref(whatItIsSignpost?.cta);
  const requestAccessBtnClass =
    'inline-flex items-center gap-2 bg-mf-green text-mf-blue font-grotesk-medium text-lg md:text-xl rounded-full px-10 pt-4 pb-3! mb-0! hover:brightness-105 transition-all focus:outline-none focus:ring-2 focus:ring-mf-green/60';

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
        <section className='py-16 md:py-24 px-6'>
          <div className='max-w-2xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold text-mf-blue mb-10 text-center tracking-tight'>
              {whatItIsTitle}
            </h2>
            <div className='[&>*]:text-mf-dark-blue max-w-none space-y-5 font-grotesk-regular [&_p]:text-lg [&_p]:leading-relaxed'>
              {renderBlockContent(whatItIs)}
            </div>

            {/* Primary action */}
            {whatItIsCta?.label && requestAccessHref && (
              <div className='mt-12 text-center'>
                {isInternalHref(requestAccessHref) ? (
                  <Link href={requestAccessHref} className={requestAccessBtnClass}>
                    {whatItIsCta.label}
                    <span aria-hidden='true'>&rarr;</span>
                  </Link>
                ) : (
                  <a href={requestAccessHref} className={requestAccessBtnClass}>
                    {whatItIsCta.label}
                    <span aria-hidden='true'>&rarr;</span>
                  </a>
                )}
              </div>
            )}

            {/* Signpost for a different audience */}
            {whatItIsSignpost &&
              (whatItIsSignpost.text ||
                (whatItIsSignpost.cta?.label && signpostHref)) && (
                <div className='mt-12 pt-8 border-t border-mf-blue/10 flex items-start gap-4'>
                  <span
                    aria-hidden='true'
                    className='flex-shrink-0 w-10 h-10 rounded-xl bg-mf-green/15 grid place-items-center mt-0.5'
                  >
                    <svg width='20' height='20' viewBox='0 0 22 22' fill='none' className='text-mf-green'>
                      <path
                        d='M11 3 20 7l-9 4-9-4 9-4Z'
                        stroke='currentColor'
                        strokeWidth='1.8'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M5.5 9v4.2c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8V9'
                        stroke='currentColor'
                        strokeWidth='1.8'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </span>
                  <div className='text-mf-dark-blue font-grotesk-regular leading-relaxed'>
                    {whatItIsSignpost.text && <p>{whatItIsSignpost.text}</p>}
                    {whatItIsSignpost.cta?.label &&
                      signpostHref &&
                      (isInternalHref(signpostHref) ? (
                        <Link
                          href={signpostHref}
                          className='inline-block mt-2 text-mf-blue font-semibold border-b-2 border-mf-green pb-0.5 hover:border-mf-blue transition-colors'
                        >
                          {whatItIsSignpost.cta.label}
                          <span
                            className='text-mf-green whitespace-nowrap'
                            aria-hidden='true'
                          >
                            &nbsp;&rarr;
                          </span>
                        </Link>
                      ) : (
                        <a
                          href={signpostHref}
                          className='inline-block mt-2 text-mf-blue font-semibold border-b-2 border-mf-green pb-0.5 hover:border-mf-blue transition-colors'
                        >
                          {whatItIsSignpost.cta.label}
                          <span
                            className='text-mf-green whitespace-nowrap'
                            aria-hidden='true'
                          >
                            &nbsp;&rarr;
                          </span>
                        </a>
                      ))}
                  </div>
                </div>
              )}
          </div>
        </section>

        {/* Why It Matters Section */}
        <section className='bg-white py-16 px-6'>
          <div className='max-w-2xl mx-auto'>
            <h2 className='text-3xl font-bold text-mf-blue mb-8 text-center'>
              {whyItMattersTitle}
            </h2>
            <div className='[&>*]:text-mf-dark-blue space-y-3 max-w-none  [&>*]:text-lg'>
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
