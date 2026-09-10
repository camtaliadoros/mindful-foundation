import Link from 'next/link';
import { AnimatedApproachItem } from '../components/AnimatedApproachItem';
import { AnimatedModuleItem } from '../components/AnimatedModuleItem';
import { BulletItemCard } from '../components/BulletItemCard';
import Header from '../components/Header';
import { HeartIcon } from '../components/Icons';
import { ScrollAnimatedImage } from '../components/ScrollAnimatedImage';
import TwoColumnSection from '../components/TwoColumnSection';
import { getThinkDifferentPageData } from '../lib/sanity';
import { ThinkDifferentPageData } from '../types/thinkDifferent';
import { CTAButton, resolveCtaHref, isInternalHref } from '../utils/cta';
import { renderBlockContent } from '../utils/sanity';


function ArrowRightIcon() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      className='block shrink-0 -translate-y-[0.1em]'
    >
      <line x1='5' y1='12' x2='19' y2='12' />
      <polyline points='12 5 19 12 12 19' />
    </svg>
  );
}

function CheckTickIcon() {
  return (
    <span
      aria-hidden='true'
      className='flex-shrink-0 w-6 h-6 rounded-full bg-mf-green grid place-items-center mt-0.5'
    >
      <svg width='13' height='13' viewBox='0 0 14 14' fill='none'>
        <path
          d='M2.5 7.5 5.5 10.5 11.5 3.5'
          stroke='#181634'
          strokeWidth='2.2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </span>
  );
}

function ChatHeartIcon() {
  return (
    <svg
      width='26'
      height='26'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      className='text-mf-green'
    >
      <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' />
      <path d='M12 13.5c-1.2-1.1-2.5-1.7-2.5-3a1.5 1.5 0 0 1 2.5-1 1.5 1.5 0 0 1 2.5 1c0 1.3-1.3 1.9-2.5 3z' />
    </svg>
  );
}

export default async function ThinkDifferentPage() {
  const pageData: ThinkDifferentPageData | null =
    await getThinkDifferentPageData();

  if (!pageData) {
    return (
      <div className='min-h-screen'>
        <Header />
        <div className='bg-chalk py-16 px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold text-mf-blue mb-4'>
              Error Loading Think Different Page
            </h1>
            <p className='text-xl text-mf-dark-blue'>
              Unable to load Think Different content from Sanity.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const {
    title,
    missionStatement,
    heroBanner,
    overviewHeadline,
    overview,
    overviewImage,
    whyDifferentTitle,
    whyDifferentDescription,
    whyDifferentApproachesTitle,
    whyDifferentApproaches,
    courseStructureTitle,
    courseStructureDescription,
    modulesTitle,
    modules,
    courseAimsTitle,
    courseAims,
    courseAimsImage,
    impactTitle,
    impactDescription,
    impactOutcomesLabel,
    impactOutcomes,
    impactRipple,
    impactStories,
    impactSupport,
    trainingTitle,
    trainingDescription,
    trainingCoversTitle,
    trainingCovers,
    trainingParticipantsReceiveTitle,
    trainingParticipantsReceive,
    trainingDelivery,
    trainingButton,
    ctaTitle,
    ctaButtons,
  } = pageData;

  const enquiryHref = resolveCtaHref(heroBanner?.enquiryCta);
  const signpostHref = resolveCtaHref(heroBanner?.signpostLink);
  const supportHref = resolveCtaHref(impactSupport?.cta);
  // Guard against legacy/partial data (e.g. stats stored without a value).
  const bannerStats = (heroBanner?.stats ?? []).filter((s) => s?.value);

  // pb-*! / mb-0! override a global rule (a[class*='rounded-full']) that forces
  // padding-bottom:6px + margin-bottom:4px. Bottom padding is kept a touch less
  // than the top so the text (which rides slightly high in its line-box) reads
  // optically centred in the pill.
  const enquiryBtnClass =
    'inline-flex items-center gap-2 bg-mf-green text-mf-blue font-grotesk-medium text-lg rounded-full px-8 pt-4 pb-3! mb-0! hover:brightness-105 transition-all focus:outline-none focus:ring-2 focus:ring-mf-green/60';
  const signpostBtnClass =
    'inline-flex items-center gap-2 bg-mf-blue text-white font-grotesk-medium rounded-full px-6 pt-3 pb-2! mb-0! hover:brightness-125 transition-all focus:outline-none focus:ring-2 focus:ring-mf-blue/50';
  const supportBtnClass =
    'inline-flex items-center gap-2 bg-mf-green text-mf-blue font-grotesk-medium text-lg rounded-full px-8 pt-4 pb-3! mb-0! hover:brightness-105 transition-all focus:outline-none focus:ring-2 focus:ring-mf-green/60';

  return (
    <>
      {/* Hero Section */}
      <section className='bg-mf-blue py-16 px-6' aria-label='Page header'>
        <div className='max-w-2xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-chalk mb-6'>
            {title}
          </h1>
          <div className='text-xl text-mf-green leading-relaxed max-w-3xl mx-auto'>
            {missionStatement}
          </div>
        </div>
      </section>

      <main>
        {/* Key stats + enquiry (directly below hero) */}
        {heroBanner &&
          (bannerStats.length > 0 ||
            heroBanner.enquiryCta?.label) && (
            <section className='bg-chalk pt-14 pb-16 px-6'>
              <div className='max-w-5xl mx-auto'>
                {/* Key stats */}
                {bannerStats.length > 0 && (
                  <div className='grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-mf-blue/15'>
                    {bannerStats.map((stat, index) => (
                      <div
                        key={stat._key ?? index}
                        className='flex flex-col items-center text-center px-6 py-6'
                      >
                        <span className='text-5xl md:text-6xl font-bold text-mf-blue leading-none'>
                          {stat.value.split('+').map((part, i, arr) => (
                            <span key={i}>
                              {part}
                              {i < arr.length - 1 && (
                                <span className='text-mf-green'>+</span>
                              )}
                            </span>
                          ))}
                        </span>
                        <span className='mt-3 text-mf-blue text-lg'>
                          {stat.description}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Enquiry CTA */}
                {heroBanner.enquiryCta?.label && enquiryHref && (
                  <div className='flex justify-center mt-12'>
                    {isInternalHref(enquiryHref) ? (
                      <Link href={enquiryHref} className={enquiryBtnClass}>
                        {heroBanner.enquiryCta.label}
                        <ArrowRightIcon />
                      </Link>
                    ) : (
                      <a href={enquiryHref} className={enquiryBtnClass}>
                        {heroBanner.enquiryCta.label}
                        <ArrowRightIcon />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

        {/* ListenApp signpost band */}
        {(heroBanner?.signpostText ||
          heroBanner?.signpostSubtext ||
          (heroBanner?.signpostLink?.label && signpostHref)) && (
          <section className='bg-mf-green/15 py-8 px-6'>
            <div className='max-w-5xl mx-auto flex flex-col md:flex-row md:items-center gap-6'>
              <div className='flex items-center gap-5 flex-1'>
                <div className='flex-shrink-0 w-14 h-14 rounded-2xl bg-mf-blue flex items-center justify-center'>
                  <ChatHeartIcon />
                </div>
                <div>
                  {heroBanner?.signpostText && (
                    <h2 className='text-xl md:text-2xl font-bold text-mf-blue'>
                      {heroBanner.signpostText}
                    </h2>
                  )}
                  {heroBanner?.signpostSubtext && (
                    <p className='text-mf-blue/70 mt-1'>
                      {heroBanner.signpostSubtext}
                    </p>
                  )}
                </div>
              </div>
              {heroBanner?.signpostLink?.label && signpostHref && (
                <div className='flex-shrink-0'>
                  {isInternalHref(signpostHref) ? (
                    <Link href={signpostHref} className={signpostBtnClass}>
                      {heroBanner.signpostLink.label}
                      <ArrowRightIcon />
                    </Link>
                  ) : (
                    <a href={signpostHref} className={signpostBtnClass}>
                      {heroBanner.signpostLink.label}
                      <ArrowRightIcon />
                    </a>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Overview Section */}
        <section className='bg-chalk py-16 px-12'>
          {overviewImage ? (
            <TwoColumnSection>
              <div>
                <h2 className='text-3xl font-bold text-mf-blue mb-8'>
                  {overviewHeadline}
                </h2>
                <div className='max-w-none [&>*]:text-mf-dark-blue'>
                  {overview && renderBlockContent(overview)}
                </div>
              </div>
              <ScrollAnimatedImage
                src={overviewImage.asset.url}
                alt={overviewImage.alt || 'Our Mission'}
              />
            </TwoColumnSection>
          ) : (
            <div className='max-w-2xl mx-auto'>
              <h2 className='text-3xl font-bold text-mf-dark-blue mb-8 text-center'>
                {overviewHeadline}
              </h2>
              <div className='[&>*]:text-mf-dark-blue max-w-none [&>*]:text-lg'>
                {overview && renderBlockContent(overview)}
              </div>
            </div>
          )}
        </section>

        {/* Why It's Different Section */}
        <section className='bg-white py-16 px-6'>
          <div className='max-w-2xl mx-auto flex flex-col items-center'>
            <h2 className='text-3xl font-bold text-mf-dark-blue mb-8 text-center '>
              {whyDifferentTitle || "Why It's Different"}
            </h2>
            <div className='[&>*]:text-mf-dark-blue space-y-3 max-w-2xl mb-8 text-center [&>*]:text-lg'>
              {whyDifferentDescription &&
                renderBlockContent(whyDifferentDescription)}
            </div>
            {whyDifferentApproaches && whyDifferentApproaches.length > 0 && (
              <div className='mb-8'>
                <h3 className='text-xl font-bold text-mf-blue mb-6'>
                  {whyDifferentApproachesTitle || 'The course draws on:'}
                </h3>
                <div className='grid md:grid-cols-2 gap-4 mb-6 '>
                  {whyDifferentApproaches.map((approach, index) => (
                    <AnimatedApproachItem
                      key={approach._key || index}
                      approach={approach}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Course Structure Section */}
        <section className='bg-mf-blue py-16 px-6'>
          <div className='max-w-2xl mx-auto'>
            <h2 className='text-3xl font-bold text-chalk mb-8 text-center'>
              {courseStructureTitle || 'Course Structure'}
            </h2>
            <div className='space-y-3 max-w-none mb-12 text-chalk text-center [&>*]:text-lg'>
              {courseStructureDescription &&
                renderBlockContent(courseStructureDescription)}
            </div>
            {modules && modules.length > 0 && (
              <div>
                <h3 className='text-2xl font-bold text-chalk mb-8 text-center'>
                  {modulesTitle || 'Modules include:'}
                </h3>
                <div className='flex flex-col gap-6'>
                  {modules.map((module, index) => (
                    <AnimatedModuleItem
                      key={module._key}
                      module={module}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Course Aims Section */}
        <section className='bg-white py-16 px-6'>
          <div className='max-w-6xl mx-auto'>
            <h2 className='text-3xl font-bold text-mf-blue mb-12 text-center'>
              {courseAimsTitle || 'Course Aims'}
            </h2>
            {courseAimsImage ? (
              <TwoColumnSection>
                <ScrollAnimatedImage
                  src={courseAimsImage.asset.url}
                  alt={courseAimsImage.alt || 'Course Aims'}
                />
                <div>
                  <div className='flex flex-col space-y-3'>
                    {courseAims.map((aim, index) => (
                      <div
                        key={index}
                        className='flex items-start md:items-center gap-2'
                      >
                        <div className='mt-1 md:mt-0 bg-mf-blue h-3 w-3 shrink-0 rounded-full' />
                        <p className='md:mt-1.5 text-mf-blue md:text-xl'>
                          {aim}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TwoColumnSection>
            ) : (
              <div className='grid md:grid-cols-2 gap-6'>
                {courseAims.map((aim, index) => (
                  <div key={index} className='bg-chalk p-6 rounded-lg'>
                    <p className='text-mf-dark-blue md:text-xl'>{aim}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Impact Section */}
        <section className='bg-chalk py-16 md:py-24 px-6'>
          <div className='max-w-5xl mx-auto'>
            <h2 className='text-3xl md:text-5xl font-bold text-mf-blue tracking-tight leading-tight'>
              {impactTitle || 'Impact So Far'}
            </h2>

            {/* Lead */}
            <div className='mt-8 max-w-3xl space-y-4 [&_p]:text-mf-blue/90 [&_p]:text-lg [&_strong]:text-mf-blue [&_strong]:font-bold'>
              {impactDescription && renderBlockContent(impactDescription)}
            </div>

            {/* Measured outcomes */}
            {impactOutcomes && impactOutcomes.length > 0 && (
              <div className='mt-12'>
                {impactOutcomesLabel && (
                  <p className='font-bold text-mf-blue'>{impactOutcomesLabel}</p>
                )}
                <div className='mt-5 grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-x-10 max-w-4xl'>
                  {impactOutcomes.map((outcome, index) => (
                    <div
                      key={index}
                      className='flex items-start gap-3.5 bg-white border border-mf-blue/10 rounded-2xl px-5 py-4'
                    >
                      <CheckTickIcon />
                      <span className='text-mf-blue font-medium leading-snug'>
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ripple pull-quote */}
            {impactRipple &&
              (impactRipple.before ||
                impactRipple.after ||
                impactRipple.caption) && (
                <figure className='mt-14 border-l-4 border-mf-green pl-6 md:pl-10 max-w-3xl'>
                  {(impactRipple.before || impactRipple.after) && (
                    <div className='flex flex-wrap items-center gap-x-5 gap-y-2 text-2xl md:text-4xl font-bold text-mf-blue tracking-tight'>
                      {impactRipple.before && <span>{impactRipple.before}</span>}
                      {impactRipple.before && impactRipple.after && (
                        <span className='text-mf-green' aria-hidden='true'>
                          &rarr;
                        </span>
                      )}
                      {impactRipple.after && <span>{impactRipple.after}</span>}
                    </div>
                  )}
                  {impactRipple.caption && (
                    <figcaption className='mt-4 text-mf-blue/70 max-w-2xl'>
                      {impactRipple.caption}
                    </figcaption>
                  )}
                </figure>
              )}

            {/* Discussion */}
            <div className='mt-12 max-w-3xl space-y-4 [&_p]:text-mf-blue/90 [&_p]:text-lg'>
              {impactStories && renderBlockContent(impactStories)}
            </div>

            {/* Supporter / donate panel */}
            {impactSupport &&
              (impactSupport.heading ||
                (impactSupport.cta?.label && supportHref)) && (
                <div className='mt-16 relative overflow-hidden bg-mf-blue text-white rounded-[28px] px-7 md:px-16 py-12 md:py-16 text-center'>
                  <div className='mx-auto mb-6 w-[52px] h-[52px] rounded-2xl bg-mf-green/15 grid place-items-center'>
                    <svg width='26' height='26' viewBox='0 0 26 26' fill='none' aria-hidden='true'>
                      <path
                        d='M13 22C6 17.5 2.5 14 2.5 9.6 2.5 6.4 5 4 8 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3 0 5.5 2.4 5.5 5.6C23.5 14 20 17.5 13 22Z'
                        fill='#30F6BA'
                      />
                    </svg>
                  </div>
                  {impactSupport.heading && (
                    <h3 className='text-2xl md:text-4xl font-bold leading-tight tracking-tight max-w-2xl mx-auto'>
                      {impactSupport.heading}
                    </h3>
                  )}
                  {impactSupport.cta?.label && supportHref && (
                    <div className='mt-8 flex justify-center'>
                      {isInternalHref(supportHref) ? (
                        <Link href={supportHref} className={supportBtnClass}>
                          {impactSupport.cta.label}
                          <ArrowRightIcon />
                        </Link>
                      ) : (
                        <a href={supportHref} className={supportBtnClass}>
                          {impactSupport.cta.label}
                          <ArrowRightIcon />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
          </div>
        </section>

        {/* Training Section */}
        <section className='bg-white py-16 px-6'>
          <div className='max-w-2xl mx-auto'>
            <h2 className='text-3xl font-bold text-mf-blue mb-8 text-center'>
              {trainingTitle || 'Training for Educators & Staff'}
            </h2>
            <div className='[&>*]:text-mf-dark-blue space-y-3 max-w-none mb-8 [&>*]:text-lg'>
              {trainingDescription && renderBlockContent(trainingDescription)}
            </div>

            {trainingCovers && trainingCovers.length > 0 && (
              <div className='mb-8'>
                <h3 className='text-xl font-bold text-mf-blue mb-4'>
                  {trainingCoversTitle || 'Training covers:'}
                </h3>
                <div className='grid gap-4'>
                  {trainingCovers.map((cover, index) => (
                    <BulletItemCard
                      key={index}
                      backgroundColour='bg-chalk'
                      discColour='bg-mf-blue'
                      content={cover}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            )}

            {trainingParticipantsReceive &&
              trainingParticipantsReceive.length > 0 && (
                <div className='mb-8'>
                  <h3 className='text-xl font-bold text-mf-blue mb-4'>
                    {trainingParticipantsReceiveTitle ||
                      'Participants receive:'}
                  </h3>
                  <div className='grid gap-4'>
                    {trainingParticipantsReceive.map((item, index) => (
                      <BulletItemCard
                        key={index}
                        backgroundColour='bg-chalk'
                        discColour='bg-mf-blue'
                        content={item}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}

            <div className='bg-white p-6 rounded-lg mb-8'>
              <h3 className='text-xl font-bold text-mf-blue mb-4'>Delivery</h3>
              <p className='text-mf-dark-blue md:text-xl'>{trainingDelivery}</p>
            </div>

            {trainingButton && (
              <div className='text-center'>
                <a
                  href={`mailto:${trainingButton.emailAddress}?subject=${encodeURIComponent(trainingButton.emailSubject)}`}
                  className='inline-block px-8 py-3 rounded-full transition-all font-grotesk-medium text-xl border-2 border-mf-blue text-mf-blue hover:bg-mf-blue hover:text-white'
                >
                  {trainingButton.label}
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        {ctaButtons &&
          ctaButtons.some(
            (button) =>
              (button.actionType === 'url' && button.href) ||
              (button.actionType === 'email' && button.email) ||
              (button.actionType === 'pdf' && button.pdf?.asset?.url),
          ) && (
            <section className='bg-mf-blue py-16 px-6'>
              <div className='max-w-4xl mx-auto text-center'>
                <h2 className='text-3xl font-bold text-chalk mb-8'>
                  {ctaTitle ||
                    'Bring Think Different to your school, organisation, or community.'}
                </h2>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  {ctaButtons.map((button) => (
                    <CTAButton
                      key={button._key}
                      cta={button}
                      darkBackground={true}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
      </main>
    </>
  );
}
