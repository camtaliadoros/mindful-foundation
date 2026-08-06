import { Metadata } from 'next';
import { getSiteSettings } from '../lib/sanity';
import { generateMetadata as generatePageMetadata } from '../utils/metadata';
import { StructuredData } from '../components/StructuredData';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.themindfulfoundation.org';


export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  return generatePageMetadata(
    {
      title: 'Privacy Policy | The Mindful Foundation',
      description:
        'How The Mindful Foundation collects, uses, and protects your personal data.',
      canonical: `${baseUrl}/privacy`,
      noIndex: false,
    },
    siteSettings,
    '/privacy',
  );
}

export default async function PrivacyPage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <StructuredData
        siteSettings={siteSettings}
        type='Organization'
        pageTitle='Privacy Policy'
        pageDescription='How The Mindful Foundation collects, uses, and protects your personal data.'
      />

      {/* Page header */}
      <section className='bg-mf-blue py-16 px-6' aria-label='Page header'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-chalk mb-4'>
            Privacy Policy
          </h1>
          <p className='text-2xl text-mf-green'>
            How we handle your personal data.
          </p>
        </div>
      </section>

      <main>
        <section className='bg-chalk py-16 px-6'>
          <div className='max-w-3xl mx-auto prose-styles'>

            <p className='text-sm text-mf-blue/50 mb-12'>
              Last updated: August 2026
            </p>

            {/* 1 */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                1. Who we are
              </h2>
              <p className='text-mf-blue/80 leading-relaxed mb-3'>
                The Mindful Foundation is a registered charity in England and Wales
                (Charity No. 1209439). We are committed to preventing domestic abuse
                and harmful behaviour through trauma-informed education and early
                intervention.
              </p>
              <p className='text-mf-blue/80 leading-relaxed mb-3'>
                For the purposes of UK data protection law, The Mindful Foundation
                is the <strong className='text-mf-blue'>Data Controller</strong> of
                personal information collected through this website.
              </p>
              <p className='text-mf-blue/80 leading-relaxed'>
                If you have any questions about this policy or how we handle your
                data, please contact us at{' '}
                <a
                  href='mailto:info@themindfulfoundation.org'
                  className='text-mf-blue font-semibold underline underline-offset-2'
                >
                  info@themindfulfoundation.org
                </a>
                .
              </p>
            </div>

            {/* 2 */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                2. What personal data we collect
              </h2>
              <p className='text-mf-blue/80 leading-relaxed mb-4'>
                We only collect personal data that you voluntarily provide to us.
                This includes:
              </p>

              <div className='mb-4'>
                <h3 className='text-lg font-bold text-mf-blue mb-2'>
                  Contact form
                </h3>
                <p className='text-mf-blue/80 leading-relaxed'>
                  When you use our contact form, we collect your first name, last
                  name, email address, the subject of your enquiry, your
                  organisation (if provided), and the content of your message.
                </p>
              </div>

              <div className='mb-4'>
                <h3 className='text-lg font-bold text-mf-blue mb-2'>
                  Website usage data
                </h3>
                <p className='text-mf-blue/80 leading-relaxed'>
                  We may collect anonymised technical data about how visitors use
                  our website, such as pages visited and time spent on the site.
                  This data cannot be used to identify you personally.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                3. How we use your data
              </h2>
              <p className='text-mf-blue/80 leading-relaxed mb-3'>
                We use the personal data you provide solely to:
              </p>
              <ul className='list-disc list-inside space-y-2 text-mf-blue/80 leading-relaxed mb-3 pl-2'>
                <li>Respond to your enquiry or request for support</li>
                <li>Connect you with the right member of our team</li>
                <li>
                  Improve our services and communications where you have given
                  consent
                </li>
              </ul>
              <p className='text-mf-blue/80 leading-relaxed'>
                We will never use your data for unsolicited marketing, and we will
                never sell your data to third parties.
              </p>
            </div>

            {/* 4 */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                4. Legal basis for processing
              </h2>
              <p className='text-mf-blue/80 leading-relaxed mb-3'>
                Under the UK General Data Protection Regulation (UK GDPR), we rely
                on the following lawful bases:
              </p>
              <ul className='list-disc list-inside space-y-2 text-mf-blue/80 leading-relaxed pl-2'>
                <li>
                  <strong className='text-mf-blue'>Consent</strong> — where you
                  have ticked the consent box on our contact form.
                </li>
                <li>
                  <strong className='text-mf-blue'>Legitimate interests</strong>{' '}
                  — to respond to your enquiry and manage our charitable
                  activities, where this does not override your rights.
                </li>
              </ul>
            </div>

            {/* 5 */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                5. How long we keep your data
              </h2>
              <p className='text-mf-blue/80 leading-relaxed mb-3'>
                We retain contact form submissions for up to{' '}
                <strong className='text-mf-blue'>12 months</strong> after your
                enquiry is resolved, after which it is securely deleted unless we
                are required by law to retain it longer.
              </p>
              <p className='text-mf-blue/80 leading-relaxed'>
                If you request that we delete your data earlier, we will do so
                unless we are legally obliged to retain it.
              </p>
            </div>

            {/* 6 */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                6. Who we share your data with
              </h2>
              <p className='text-mf-blue/80 leading-relaxed mb-4'>
                We do not sell or share your personal data with third parties for
                their own purposes. We use the following trusted service providers
                to operate our website, who process data only on our behalf:
              </p>
              <ul className='list-disc list-inside space-y-2 text-mf-blue/80 leading-relaxed pl-2'>
                <li>
                  <strong className='text-mf-blue'>Netlify</strong> — website
                  hosting and form submission handling (USA, EU-US Data Privacy
                  Framework)
                </li>
                <li>
                  <strong className='text-mf-blue'>Sanity</strong> — content
                  management system (USA, standard contractual clauses)
                </li>
                <li>
                  <strong className='text-mf-blue'>Google</strong> — website
                  analytics (Google Analytics) and advertising measurement
                  (Google Ads), used only where you have given consent (USA,
                  EU-US Data Privacy Framework)
                </li>
              </ul>
              <p className='text-mf-blue/80 leading-relaxed mt-4'>
                All providers are contractually required to protect your data and
                may not use it for any other purpose.
              </p>
            </div>

            {/* 7 */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                7. Cookies
              </h2>
              <p className='text-mf-blue/80 leading-relaxed mb-3'>
                We use{' '}
                <strong className='text-mf-blue'>essential cookies</strong> that
                are necessary for the site to function. These are always active
                and do not require your consent.
              </p>
              <p className='text-mf-blue/80 leading-relaxed mb-3'>
                With your consent, we also use{' '}
                <strong className='text-mf-blue'>analytics cookies</strong>{' '}
                (Google Analytics) to understand how visitors use our site, and{' '}
                <strong className='text-mf-blue'>advertising cookies</strong>{' '}
                (Google Ads) to measure the performance of our campaigns. These
                are not set unless you accept them via our cookie banner.
              </p>
              <p className='text-mf-blue/80 leading-relaxed'>
                You can withdraw your consent at any time by clearing this
                site&apos;s cookies and site data in your browser, which will
                prompt the cookie banner to appear again on your next visit.
                Declining non-essential cookies will not affect your ability to
                use the site.
              </p>
            </div>

            {/* 8 */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                8. Your rights
              </h2>
              <p className='text-mf-blue/80 leading-relaxed mb-4'>
                Under UK GDPR, you have the right to:
              </p>
              <ul className='list-disc list-inside space-y-2 text-mf-blue/80 leading-relaxed pl-2'>
                <li>
                  <strong className='text-mf-blue'>Access</strong> — request a
                  copy of the personal data we hold about you
                </li>
                <li>
                  <strong className='text-mf-blue'>Rectification</strong> —
                  request correction of inaccurate data
                </li>
                <li>
                  <strong className='text-mf-blue'>Erasure</strong> — request
                  deletion of your data (&quot;right to be forgotten&quot;)
                </li>
                <li>
                  <strong className='text-mf-blue'>Restriction</strong> — request
                  that we limit how we use your data
                </li>
                <li>
                  <strong className='text-mf-blue'>Portability</strong> — request
                  your data in a portable format
                </li>
                <li>
                  <strong className='text-mf-blue'>Objection</strong> — object to
                  our processing of your data based on legitimate interests
                </li>
                <li>
                  <strong className='text-mf-blue'>Withdraw consent</strong> — at
                  any time, where processing is based on consent
                </li>
              </ul>
              <p className='text-mf-blue/80 leading-relaxed mt-4'>
                To exercise any of these rights, please contact us at{' '}
                <a
                  href='mailto:info@themindfulfoundation.org'
                  className='text-mf-blue font-semibold underline underline-offset-2'
                >
                  info@themindfulfoundation.org
                </a>
                . We will respond within 30 days.
              </p>
            </div>

            {/* 9 */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                9. How we protect your data
              </h2>
              <p className='text-mf-blue/80 leading-relaxed'>
                We take appropriate technical and organisational measures to
                protect your personal data against unauthorised access, loss, or
                misuse. All data transmitted via our contact form is encrypted in
                transit using HTTPS.
              </p>
            </div>

            {/* 10 */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                10. Complaints
              </h2>
              <p className='text-mf-blue/80 leading-relaxed mb-3'>
                If you are unhappy with how we have handled your personal data,
                please contact us first at{' '}
                <a
                  href='mailto:info@themindfulfoundation.org'
                  className='text-mf-blue font-semibold underline underline-offset-2'
                >
                  info@themindfulfoundation.org
                </a>{' '}
                and we will do our best to resolve your concern.
              </p>
              <p className='text-mf-blue/80 leading-relaxed'>
                You also have the right to lodge a complaint with the{' '}
                <strong className='text-mf-blue'>
                  Information Commissioner&apos;s Office (ICO)
                </strong>
                , the UK&apos;s data protection regulator, at{' '}
                <a
                  href='https://ico.org.uk'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-mf-blue font-semibold underline underline-offset-2'
                >
                  ico.org.uk
                </a>{' '}
                or by calling 0303 123 1113.
              </p>
            </div>

            {/* 11 */}
            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                11. Changes to this policy
              </h2>
              <p className='text-mf-blue/80 leading-relaxed'>
                We may update this Privacy Policy from time to time. The date at
                the top of this page will always reflect when it was last revised.
                We encourage you to review this page periodically.
              </p>
            </div>

            {/* Divider */}
            <div className='border-t border-mf-blue/10 pt-8'>
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
