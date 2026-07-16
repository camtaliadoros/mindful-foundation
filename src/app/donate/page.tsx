import { Metadata } from 'next';
import { getDonatePageData, getSiteSettings } from '../lib/sanity';
import { DonatePageData } from '../types/donate';
import { generateMetadata as generatePageMetadata } from '../utils/metadata';
import { StructuredData } from '../components/StructuredData';
import { BlockContent } from '../components/BlockContent';
import StripeBuyButton from '../components/StripeBuyButton';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.themindfulfoundation.org';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const [donatePageData, siteSettings] = await Promise.all([
    getDonatePageData(),
    getSiteSettings(),
  ]);

  return generatePageMetadata(
    {
      title: donatePageData?.seo?.title || 'Donate | The Mindful Foundation',
      description:
        donatePageData?.seo?.description ||
        'Support The Mindful Foundation. Your donation helps us prevent domestic abuse through trauma-informed education and early intervention.',
      keywords: donatePageData?.seo?.keywords,
      ogImage: donatePageData?.seo?.ogImage,
      canonical: `${baseUrl}/donate`,
      noIndex: false,
    },
    siteSettings,
    '/donate',
  );
}

export default async function DonatePage() {
  const [donatePageData, siteSettings]: [DonatePageData | null, Awaited<ReturnType<typeof getSiteSettings>>] =
    await Promise.all([getDonatePageData(), getSiteSettings()]);

  const headline = donatePageData?.headerHeadline ?? 'Support our work';
  const subheadline =
    donatePageData?.headerSubheadline ??
    'Every donation helps prevent harm and heal futures.';

  // Payment configuration. Falls back to the Stripe link in site settings.
  const paymentMode = donatePageData?.paymentMode ?? 'link';
  const donateHref = donatePageData?.donateUrl ?? siteSettings?.donateButton?.href;
  const buttonLabel =
    donatePageData?.buttonLabel ?? siteSettings?.donateButton?.label ?? 'Donate Now';
  const securePaymentNote =
    donatePageData?.securePaymentNote ??
    'Donations are processed securely by Stripe. You will be taken to Stripe’s secure checkout to complete your gift.';

  const canEmbed =
    paymentMode === 'embed' &&
    !!donatePageData?.stripePublishableKey &&
    !!donatePageData?.stripeBuyButtonId;

  return (
    <>
      <StructuredData
        siteSettings={siteSettings}
        type='Organization'
        pageTitle={headline}
        pageDescription={subheadline}
      />

      {/* Page header */}
      <section className='bg-mf-blue py-16 px-6' aria-label='Page header'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-chalk mb-4'>
            {headline}
          </h1>
          <p className='text-2xl text-mf-green'>{subheadline}</p>
        </div>
      </section>

      <main>
        <section className='bg-chalk py-16 px-6'>
          <div className='max-w-3xl mx-auto text-center'>
            {donatePageData?.body ? (
              <div className='prose-styles text-mf-blue/80 mb-10 [&_p]:text-lg [&_p]:leading-relaxed'>
                <BlockContent content={donatePageData.body} />
              </div>
            ) : (
              <>
                <p className='text-lg text-mf-blue/80 leading-relaxed mb-6'>
                  The Mindful Foundation works to prevent domestic abuse and harmful
                  behaviour through trauma-informed education and early intervention.
                  As a registered charity, we rely on the generosity of our
                  supporters to reach more people before harm happens.
                </p>
                <p className='text-lg text-mf-blue/80 leading-relaxed mb-10'>
                  Your gift &mdash; whatever the size &mdash; directly funds our
                  programmes and the people who need them most. Thank you for
                  standing with us.
                </p>
              </>
            )}

            {canEmbed ? (
              <StripeBuyButton
                buyButtonId={donatePageData!.stripeBuyButtonId!}
                publishableKey={donatePageData!.stripePublishableKey!}
              />
            ) : donateHref ? (
              <a
                href={donateHref}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block bg-mf-green text-ash font-grotesk-medium text-lg md:text-xl rounded-full px-10 py-4 border-2 border-mf-green hover:bg-transparent hover:text-mf-green transition-all'
              >
                {buttonLabel}
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

            {securePaymentNote && (
              <p className='text-sm text-mf-blue/50 leading-relaxed mt-8'>
                {securePaymentNote}
              </p>
            )}

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
