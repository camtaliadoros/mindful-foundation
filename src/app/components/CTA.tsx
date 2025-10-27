import { getCTABlockData } from '../lib/sanity';
import { CTABlockData } from '../types/CTA';
import { CTAButton } from '../utils/cta';

export const CTA = async () => {
  const CTAData: CTABlockData | null = await getCTABlockData();

  if (!CTAData) {
    return (
      <div>
        <p>Unable to load content.</p>
      </div>
    );
  }
  const { callToActionTitle, primaryCta, secondaryCta } = CTAData;

  return (
    <section className='bg-[#f8f5ed] py-16 px-6'>
      <div className='max-w-4xl mx-auto text-center'>
        <h2 className='text-3xl font-bold text-gray-800 mb-8'>
          {callToActionTitle || 'Together, we can build safer futures.'}
        </h2>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          {primaryCta && <CTAButton cta={primaryCta} />}
          {secondaryCta && <CTAButton cta={secondaryCta} />}
        </div>
      </div>
    </section>
  );
};
