import { getPerpetratorProgrammePageData } from '../lib/sanity';
import { renderBlockContent } from '../utils/sanity';
import { CTAButton } from '../utils/cta';
import Header from '../components/Header';
import { ProgrammeFeature } from '../types/perpetratorProgramme';
import { CTA } from '../types/homepage';
import ExpansionResults from './ExpansionResults';

// Numbered, two-column layout used for the prose sections (title + rule on
// the left, body copy on the right) to echo the editorial split in the
// reference design.
function SplitSection({
  num,
  title,
  children,
}: Readonly<{
  num: string;
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div className='max-w-5xl mx-auto grid gap-8 md:gap-16 md:grid-cols-[minmax(200px,280px)_1fr]'>
      <div>
        <span className='block text-sm font-bold tracking-[0.08em] text-[#0f9d6f] mb-3'>
          {num}
        </span>
        <h2 className='text-3xl md:text-4xl font-bold text-mf-blue leading-[1.1] tracking-tight'>
          {title}
        </h2>
        <div className='mt-5 w-12 h-1 rounded-full bg-mf-green' />
      </div>
      <div
        className='max-w-none space-y-4 text-mf-dark-blue font-grotesk-regular [&>*]:text-lg
          [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-mf-blue [&_h2]:mt-8 [&_h2]:mb-1
          [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:text-mf-blue [&_h3]:mt-10 [&_h3]:mb-1
          [&_strong]:text-mf-blue [&_strong]:font-semibold
          [&_blockquote]:not-italic [&_blockquote]:text-mf-blue [&_blockquote]:font-semibold
          [&_blockquote]:bg-mf-green/10 [&_blockquote]:rounded-xl [&_blockquote]:px-5 [&_blockquote]:py-4'
      >
        {children}
      </div>
    </div>
  );
}

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
          <p className='text-mf-dark-blue md:text-xl'>
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
    secondaryCta,
  } = perpetratorData;

  const ctaHasValidLink = (cta?: CTA) =>
    !!cta &&
    ((cta.actionType === 'internal' && cta.internalLink) ||
      (cta.actionType === 'url' && cta.href) ||
      (cta.actionType === 'email' && cta.email) ||
      (cta.actionType === 'pdf' && cta.pdf?.asset?.url));

  return (
    <>
      {/* Header Section */}
      <section
        className='bg-mf-blue text-chalk py-20 md:py-28 px-6 text-center'
        aria-label='Page header'
      >
        <div className='max-w-2xl mx-auto'>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]'>
            {headerHeadline}
          </h1>
          <p className='mt-6 text-xl md:text-2xl text-mf-green font-grotesk-regular'>
            {headerSubheadline}
          </p>
        </div>
      </section>

      <main>
        {/* Why It's Needed Section */}
        <section className='py-16 md:py-24 px-6 bg-chalk'>
          <SplitSection num='01' title={whyItsNeededTitle}>
            {renderBlockContent(whyItsNeeded)}
          </SplitSection>
        </section>

        {/* Our Approach Section */}
        <section className='py-16 md:py-24 px-6 bg-white'>
          <SplitSection num='02' title={ourApproachTitle}>
            {renderBlockContent(ourApproach)}
          </SplitSection>
        </section>

        {/* What the Programme Provides Section */}
        <section className='py-16 md:py-24 px-6 bg-chalk'>
          <div className='max-w-5xl mx-auto'>
            <div className='text-center mb-14'>
              <span className='block text-sm font-bold tracking-[0.08em] text-[#0f9d6f] mb-3'>
                03
              </span>
              <h2 className='text-3xl md:text-4xl font-bold text-mf-blue tracking-tight'>
                {whatTheProgrammeProvidesTitle}
              </h2>
              <div className='mt-5 w-12 h-1 rounded-full bg-mf-green mx-auto' />
            </div>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
              {whatTheProgrammeProvides?.map(
                (feature: ProgrammeFeature, index: number) => (
                  <div
                    key={feature._key}
                    className='bg-white rounded-2xl p-6 flex flex-col gap-4 shadow-[0_6px_16px_-10px_rgba(38,34,79,0.35)] transition-all duration-200 hover:-translate-y-2 hover:shadow-[0_22px_36px_-16px_rgba(38,34,79,0.45)]'
                  >
                    <div className='h-10 w-10 rounded-[11px] bg-mf-green/15 flex items-center justify-center text-[#0f9d6f] font-bold text-sm'>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className='text-lg font-semibold text-mf-blue leading-snug'>
                      {feature.title}
                    </h3>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Outcomes Section */}
        <section className='py-16 md:py-24 px-6 bg-mf-green/10'>
          <SplitSection num='04' title={outcomesTitle}>
            {renderBlockContent(outcomes)}
          </SplitSection>
        </section>

        {/* Expansion Section (incl. pilot writeup, results and principles) */}
        <ExpansionResults title={expansionTitle} content={expansion} />

        {/* Call to Action Section */}
        {(ctaHasValidLink(primaryCta) || ctaHasValidLink(secondaryCta)) && (
          <section className='bg-chalk text-mf-blue py-16 md:py-20 px-6'>
            <div className='max-w-2xl mx-auto text-center'>
              <h2 className='text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-10'>
                {callToActionTitle}
              </h2>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                {primaryCta && ctaHasValidLink(primaryCta) && (
                  <CTAButton cta={primaryCta} darkBackground={false} />
                )}
                {secondaryCta && ctaHasValidLink(secondaryCta) && (
                  <CTAButton cta={secondaryCta} darkBackground={false} />
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
