import { getContactPageData, getSiteSettings } from '../lib/sanity';
import { ContactPageData } from '../types/contact';
import { generateMetadata as generatePageMetadata } from '../utils/metadata';
import { Metadata } from 'next';
import { StructuredData } from '../components/StructuredData';
import ContactForm from './ContactForm';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.themindfulfoundation.org';

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const [contactPageData, siteSettings] = await Promise.all([
    getContactPageData(),
    getSiteSettings(),
  ]);

  return generatePageMetadata(
    {
      title: contactPageData?.seo?.title,
      description: contactPageData?.seo?.description,
      keywords: contactPageData?.seo?.keywords,
      ogImage: contactPageData?.seo?.ogImage,
      canonical: `${baseUrl}/contact`,
    },
    siteSettings,
    '/contact',
  );
}

export default async function ContactPage() {
  const contactPageData: ContactPageData | null = await getContactPageData();
  const siteSettings = await getSiteSettings();

  const headline = contactPageData?.headerHeadline ?? 'Contact Us';
  const subheadline = contactPageData?.headerSubheadline ?? "We'd love to hear from you.";
  const introText =
    contactPageData?.introText ??
    "Whether you're seeking support, looking to partner with us, or want to learn more about our work -- reach out and we'll get back to you within 2-3 working days.";
  const email = contactPageData?.email ?? 'info@themindfulfoundation.org';
  const successHeading = contactPageData?.successHeading ?? 'Message sent';
  const successMessage =
    contactPageData?.successMessage ??
    'Thank you for reaching out. We aim to respond within 2-3 working days.';

  return (
    <>
      <StructuredData
        siteSettings={siteSettings}
        type='Organization'
        pageTitle={headline}
        pageDescription={subheadline}
      />

      {/* Hidden form for Netlify build-time detection.
           ContactForm (client component) submits via fetch so Netlify can't
           detect it at build time. This static markup lets the build bot
           register the form; the client component handles actual submissions. */}
      <form name='contact' data-netlify='true' netlify-honeypot='bot-field' hidden aria-hidden='true'>
        <input type='hidden' name='form-name' value='contact' />
        <input name='bot-field' />
        <input name='firstName' />
        <input name='lastName' />
        <input name='email' type='email' />
        <input name='subject' />
        <input name='organisation' />
        <textarea name='message'></textarea>
        <input name='consent' type='checkbox' />
      </form>

      {/* Page header -- matches all inner pages */}
      <section className='bg-mf-blue py-16 px-6' aria-label='Page header'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='text-4xl md:text-5xl font-bold text-chalk mb-4'>
            {headline}
          </h1>
          <p className='text-2xl text-mf-green'>{subheadline}</p>
        </div>
      </section>

      <main>
        <section className='bg-chalk py-16 px-6' aria-label='Contact'>
          <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start'>

            {/* Left -- info */}
            <div>
              <h2 className='text-2xl font-bold text-mf-blue mb-4'>
                How can we help?
              </h2>
              <p className='text-mf-blue/70 leading-relaxed mb-8'>
                {introText}
              </p>

              <div className='mb-6'>
                <p className='text-xs font-bold tracking-widest uppercase text-mf-green mb-1'>
                  General Enquiries
                </p>
                <a
                  href={`mailto:${email}`}
                  className='text-mf-blue font-semibold border-b-2 border-mf-green pb-0.5 hover:text-mf-dark-blue transition-colors'
                >
                  {email}
                </a>
              </div>

            </div>

            {/* Right -- form */}
            <ContactForm successHeading={successHeading} successMessage={successMessage} />

          </div>
        </section>
      </main>
    </>
  );
}
