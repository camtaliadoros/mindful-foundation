import { Metadata } from 'next';
import { getSiteSettings } from '../lib/sanity';
import { generateMetadata as generatePageMetadata } from '../utils/metadata';
import { StructuredData } from '../components/StructuredData';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.themindfulfoundation.org';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return generatePageMetadata(
    {
      title: 'Donate | The Mindful Foundation',
      description:
        'Support The Mindful Foundation. Your donation helps us prevent domestic abuse through trauma-informed education and early intervention.',
      canonical: `${baseUrl}/donate`,
      noIndex: false,
    },
    siteSettings,
    '/donate',
  );
}

export default async function DonatePage() {
  const siteSettings = await getSiteSettings();
  const donateHref = siteSettings?.donateButton?.href;

  return (
    <>
      <StructuredData
        siteSettings={siteSettings}
        type='Organization'
        pageTitle='Donate'
        pageDescription='Support The Mindful Foundation. Your donation helps us prevent domestic abuse through trauma-informed education and early intervention.'
      />

      {/* Page header */}
      <section className='bg-mf-blue py-16 px-6' aria-label='Page header'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-chalk mb-4'>
            Support our work
          </h1>
          <p className='text-2xl text-mf-green'>
            Every donation helps prevent harm and heal futures.
          </p>
        </div>
      </section>

      <main>
        <section className='bg-chalk py-16 px-6'>
          <div className='max-w-3xl mx-auto text-center'>
            <p className='text-lg text-mf-blue/80 leading-relaxed mb-6'>
              The Mindful Foundation works to prevent domestic abuse and harmful
              behaviour through trauma-informed education and early intervention.
              As a registered charity, we rely on the generosity of our supporters
              to reach more people before harm happens.
            </p>
            <p className='text-lg text-mf-blue/80 leading-relaxed mb-10'>
              Your gift &mdash; whatever the size &mdash; directly funds our
              programmes and the people who need them most. Thank you for standing
              with us.
            </p>

            {donateHref ? (
              <a
                href={donateHref}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block bg-mf-green text-ash font-grotesk-medium text-lg md:text-xl rounded-full px-10 py-4 border-2 border-mf-green hover:bg-transparent hover:text-mf-green transition-all'
              >
                {siteSettings?.donateButton?.label || 'Donate Now'}
              </a>
            ) : (
              <p className='text-mf-blue/70'>
                Our donation page is being set up. In the meantime, please{' '}
                <a
                  href='/contact'
                  className='text-mf-blue font-semibold underline underline-offset-2'
                >
                  get in touch
                </a>{' '}
                to support our work.
              </p>
            )}

            <p className='text-sm text-mf-blue/50 leading-relaxed mt-8'>
              Donations are processed securely by Stripe. You will be taken to
              Stripe&apos;s secure checkout to complete your gift.
            </p>

            {/* Divider */}
            <div className='border-t border-mf-blue/10 pt-8 mt-12'>
              <p className='text-sm text-mf-blue/50 leading-relaxed'>
                The Mindful Foundation &mdash; Registered Charity in England and
                Wales No. 1209439.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
