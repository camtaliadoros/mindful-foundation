import { getPerpetratorProgrammePageData } from '../lib/sanity';
import { renderBlockContent } from '../utils/sanity';
import { CTAButton } from '../utils/cta';
import Header from '../components/Header';
import { ProgrammeFeature } from '../types/perpetratorProgramme';

export default async function PerpetratorProgrammePage() {
  const perpetratorData = await getPerpetratorProgrammePageData();

  if (!perpetratorData) {
    return (
      <div className='min-h-screen bg-chalk'>
        <Header />
        <div className='max-w-2xl mx-auto px-6 py-16 text-center'>
          <h1 className='text-3xl font-bold text-mf-blue mb-4'>
            Page Not Found
          </h1>
          <p className='text-gray-600 md:text-xl'>
            The Perpetrator Programme page content could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const {
    headerHeadline,
    headerSubheadline,
    whyItsNeededTitle,
    whyItsNeeded,
    ourApproachTitle,
    ourApproach,
    whatTheProgrammeProvidesTitle,
    whatTheProgrammeProvides,
    outcomesTitle,
    outcomes,
    expansionTitle,
    expansion,
    callToActionTitle,
    primaryCta,
  } = perpetratorData;

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

      {/* Why It's Needed Section */}
      <section className='py-16 px-6'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8'>
            {whyItsNeededTitle}
          </h2>
          <div className='prose prose-xl max-w-none text-gray-700 font-grotesk-regular [&>*]:text-lg'>
            {renderBlockContent(whyItsNeeded)}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className='bg-[#f8f5ed] py-16 px-6'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8'>
            {ourApproachTitle}
          </h2>
          <div className='prose prose-xl max-w-none text-gray-700 font-grotesk-regular [&>*]:text-lg'>
            {renderBlockContent(ourApproach)}
          </div>
        </div>
      </section>

      {/* What the Programme Provides Section */}
      <section className='py-16 px-6 bg-mf-blue'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl font-bold text-chalk mb-12 text-center '>
            {whatTheProgrammeProvidesTitle}
          </h2>
          <div className='flex flex-wrap justify-center gap-8'>
            {whatTheProgrammeProvides?.map((feature: ProgrammeFeature) => (
              <div
                key={feature._key}
                className='p-6 rounded-lg border border-mf-green w-full md:max-w-72 sm:max-w-60'
              >
                <div className='h-6 w-6 bg-mf-green rounded-full mb-4'></div>
                <h3 className='text-lg md:text-xl font-semibold text-chalk '>
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className='bg-[#f8f5ed] py-16 px-6'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8 '>
            {outcomesTitle}
          </h2>
          <div className='prose prose-xl max-w-none text-gray-700 font-grotesk-regular [&>*]:text-lg'>
            {renderBlockContent(outcomes)}
          </div>
        </div>
      </section>

      {/* Expansion Section */}
      <section className='py-16 px-6'>
        <div className='max-w-2xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8 '>
            {expansionTitle}
          </h2>
          <div className='prose prose-xl max-w-none text-gray-700 font-grotesk-regular [&>*]:text-lg'>
            {renderBlockContent(expansion)}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {primaryCta && (
        (primaryCta.actionType === 'url' && primaryCta.href) ||
        (primaryCta.actionType === 'email' && primaryCta.email) ||
        (primaryCta.actionType === 'pdf' && primaryCta.pdf?.asset?.url)
      ) && (
        <section className='bg-mf-blue text-chalk py-16 px-6'>
          <div className='max-w-2xl mx-auto text-center'>
            <h2 className='text-3xl font-bold mb-8 '>{callToActionTitle}</h2>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <CTAButton cta={primaryCta} darkBackground={true} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
