import { getListenAppPageData } from '../lib/sanity';
import { renderBlockContent } from '../utils/sanity';
import { CTAButton } from '../utils/cta';
import Header from '../components/Header';
import { Feature } from '../types/listenApp';

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
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 font-grotesk-medium'>
            {headerHeadline}
          </h1>
          <p className='text-xl md:text-2xl text-mf-green font-grotesk-regular'>
            {headerSubheadline}
          </p>
        </div>
      </section>

      {/* What It Is Section */}
      <section className='py-16 px-6'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8 font-grotesk-medium'>
            {whatItIsTitle}
          </h2>
          <div className='prose prose-lg max-w-none text-gray-700 font-grotesk-regular'>
            {renderBlockContent(whatItIs)}
          </div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className='bg-[#f8f5ed] py-16 px-6'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8 font-grotesk-medium'>
            {whyItMattersTitle}
          </h2>
          <div className='prose prose-lg max-w-none text-gray-700 font-grotesk-regular'>
            {renderBlockContent(whyItMatters)}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 px-6'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-12 text-center font-grotesk-medium'>
            {featuresTitle}
          </h2>
          <div className='grid md:grid-cols-2 gap-8'>
            {features?.map((feature: Feature) => (
              <div
                key={feature._key}
                className='bg-white p-6 rounded-lg shadow-sm border border-gray-200'
              >
                <h3 className='text-xl font-semibold text-mf-blue mb-3 font-grotesk-medium'>
                  {feature.title}
                </h3>
                <p className='text-gray-700 font-grotesk-regular'>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className='bg-[#f8f5ed] py-16 px-6'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8 font-grotesk-medium'>
            {partnersTitle}
          </h2>
          <div className='prose prose-lg max-w-none text-gray-700 font-grotesk-regular'>
            {renderBlockContent(partners)}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='bg-mf-blue text-chalk py-16 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-8 font-grotesk-medium'>
            {callToActionTitle}
          </h2>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {primaryCta && <CTAButton cta={primaryCta} />}
            {secondaryCta && <CTAButton cta={secondaryCta} />}
          </div>
        </div>
      </section>
    </>
  );
}
