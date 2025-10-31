import { getListenAppPageData } from '../lib/sanity';
import { renderBlockContent } from '../utils/sanity';
import { CTAButton } from '../utils/cta';
import Header from '../components/Header';
import { Feature } from '../types/listenApp';
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
          <p className='text-gray-600'>
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
    callToActionTitle,
    primaryCta,
    secondaryCta,
  } = listenAppData;

  return (
    <>
      {/* Header Section */}
      <section className='bg-mf-blue text-chalk py-16 px-6'>
        <div className='max-w-2xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4'>
            {headerHeadline}
          </h1>
          <p className='text-xl md:text-2xl text-mf-green font-grotesk-regular'>
            {headerSubheadline}
          </p>
        </div>
      </section>

      {/* What It Is Section */}
      <section className='py-16 px-6'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8'>
            {whatItIsTitle}
          </h2>
          <div className='prose prose-lg max-w-none text-gray-700 font-grotesk-regular'>
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
          <div className='prose prose-lg max-w-none text-gray-700 '>
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
                  <p className='text-chalk font-grotesk-regular text-center'>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className='bg-[#f8f5ed] py-16 px-6'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8'>
            {partnersTitle}
          </h2>
          <div className='prose prose-lg max-w-none text-gray-700 font-grotesk-regular'>
            {renderBlockContent(partners)}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='bg-mf-blue text-chalk py-16 px-6'>
        <div className='max-w-2xl mx-auto text-center'>
          <h2 className='text-2xl font-bold mb-8 '>{callToActionTitle}</h2>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {primaryCta && <CTAButton cta={primaryCta} darkBackground={true} />}
            {secondaryCta && (
              <CTAButton cta={secondaryCta} darkBackground={true} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
