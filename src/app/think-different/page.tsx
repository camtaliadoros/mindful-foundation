import { getThinkDifferentPageData } from '../lib/sanity';
import { renderBlockContent } from '../utils/sanity';
import { ThinkDifferentPageData } from '../types/thinkDifferent';
import Header from '../components/Header';
import { CTAButton } from '../utils/cta';

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
            <p className='text-xl text-gray-600'>
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
    overviewHeadline,
    overview,
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
    impactTitle,
    impactDescription,
    impactOutcomes,
    impactStories,
    trainingTitle,
    trainingDescription,
    trainingCoversTitle,
    trainingCovers,
    trainingParticipantsReceiveTitle,
    trainingParticipantsReceive,
    trainingDelivery,
    ctaTitle,
    ctaButtons,
  } = pageData;

  return (
    <div className='min-h-screen'>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className='bg-mf-blue py-16 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-chalk mb-6'>
            {title}
          </h1>
          <div className='text-xl text-chalk leading-relaxed max-w-3xl mx-auto'>
            {missionStatement}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className='bg-chalk py-16 px-6'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8 text-center'>
            {overviewHeadline}
          </h2>
          <div className='prose prose-lg max-w-none'>
            {overview && renderBlockContent(overview)}
          </div>
        </div>
      </section>

      {/* Why It's Different Section */}
      <section className='bg-white py-16 px-6'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8 text-center'>
            {whyDifferentTitle || "Why It's Different"}
          </h2>
          <div className='prose prose-lg max-w-none mb-8'>
            {whyDifferentDescription &&
              renderBlockContent(whyDifferentDescription)}
          </div>
          {whyDifferentApproaches && whyDifferentApproaches.length > 0 && (
            <div className='mb-8'>
              <h3 className='text-xl font-bold text-mf-blue mb-6'>
                {whyDifferentApproachesTitle || 'The course draws on:'}
              </h3>
              <div className='grid md:grid-cols-2 gap-4 mb-6'>
                {whyDifferentApproaches.map((approach, index) => (
                  <div key={index} className='bg-chalk p-6 rounded-lg'>
                    <p className='text-gray-700 font-grotesk-medium'>
                      {approach}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Course Structure Section */}
      <section className='bg-chalk py-16 px-6'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8 text-center'>
            {courseStructureTitle || 'Course Structure'}
          </h2>
          <div className='prose prose-lg max-w-none mb-12'>
            {courseStructureDescription &&
              renderBlockContent(courseStructureDescription)}
          </div>
          {modules && modules.length > 0 && (
            <div>
              <h3 className='text-2xl font-bold text-mf-blue mb-8 text-center'>
                {modulesTitle || 'Modules include:'}
              </h3>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {modules.map((module) => (
                  <div
                    key={module._key}
                    className='bg-white p-6 rounded-lg shadow-sm'
                  >
                    <h3 className='text-xl font-bold text-mf-blue mb-3'>
                      {module.title}
                    </h3>
                    <p className='text-gray-700'>{module.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Course Aims Section */}
      <section className='bg-white py-16 px-6'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-12 text-center'>
            {courseAimsTitle || 'Course Aims'}
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            {courseAims.map((aim, index) => (
              <div key={index} className='bg-chalk p-6 rounded-lg'>
                <p className='text-gray-700'>{aim}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className='bg-mf-blue py-16 px-6'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold text-chalk mb-8 text-center'>
            {impactTitle || 'Impact So Far'}
          </h2>
          <div className='prose prose-lg max-w-none mb-12 text-chalk'>
            {impactDescription && renderBlockContent(impactDescription)}
          </div>

          {impactOutcomes && impactOutcomes.length > 0 && (
            <div className='grid md:grid-cols-2 gap-6 mb-12'>
              {impactOutcomes.map((outcome, index) => (
                <div key={index} className='bg-ash p-6 rounded-lg'>
                  <p className='text-chalk'>{outcome}</p>
                </div>
              ))}
            </div>
          )}

          <div className='prose prose-lg max-w-none text-chalk'>
            {impactStories && renderBlockContent(impactStories)}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section className='bg-chalk py-16 px-6'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8 text-center'>
            {trainingTitle || 'Training for Educators & Staff'}
          </h2>
          <div className='prose prose-lg max-w-none mb-8'>
            {trainingDescription && renderBlockContent(trainingDescription)}
          </div>

          {trainingCovers && trainingCovers.length > 0 && (
            <div className='mb-8'>
              <h3 className='text-xl font-bold text-mf-blue mb-4'>
                {trainingCoversTitle || 'Training covers:'}
              </h3>
              <div className='grid md:grid-cols-2 gap-4'>
                {trainingCovers.map((cover, index) => (
                  <div key={index} className='bg-white p-4 rounded-lg'>
                    <p className='text-gray-700'>{cover}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {trainingParticipantsReceive &&
            trainingParticipantsReceive.length > 0 && (
              <div className='mb-8'>
                <h3 className='text-xl font-bold text-mf-blue mb-4'>
                  {trainingParticipantsReceiveTitle || 'Participants receive:'}
                </h3>
                <div className='grid md:grid-cols-2 gap-4'>
                  {trainingParticipantsReceive.map((item, index) => (
                    <div key={index} className='bg-white p-4 rounded-lg'>
                      <p className='text-gray-700'>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <div className='bg-white p-6 rounded-lg'>
            <h3 className='text-xl font-bold text-mf-blue mb-4'>Delivery</h3>
            <p className='text-gray-700'>{trainingDelivery}</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='bg-white py-16 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-mf-blue mb-8'>
            {ctaTitle ||
              'Bring Think Different to your school, organisation, or community.'}
          </h2>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {ctaButtons.map((button) => (
              <CTAButton key={button._key} cta={button} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
