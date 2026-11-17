import Link from 'next/link';
import { Metadata } from 'next';
import { generateMetadata as generatePageMetadata } from '../utils/metadata';
import { getSiteSettings } from '../lib/sanity';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mindfulfoundation.org';

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  return generatePageMetadata(
    {
      title: 'Beyond Belief | The Mindful Foundation',
      description:
        'Beyond Belief is a trauma-informed support programme for people affected by domestic abuse, coercive control and stalking, helping you recognise abuse, understand its impact and plan a life beyond it.',
      canonical: `${baseUrl}/beyond-belief`,
    },
    siteSettings,
    '/beyond-belief',
  );
}

// Eyebrow colour sampled from the reference design: a slightly duller green
// than --mf-green, used for section numbers on light backgrounds so they
// don't vibrate against the white/chalk page background.
const EYEBROW = '#0e9c74';
// Muted lavender used for body copy on navy backgrounds in the design.
const LAVENDER = '#d9d7ec';

const approachCards = [
  {
    theme: 'Understanding the past',
    question: 'Where you were',
    detail:
      'Recognising your experiences, circumstances and the behaviours you were subjected to.',
  },
  {
    theme: 'Recognising the present',
    question: 'Where you are now',
    detail:
      'Understanding current risks, emotional impacts, your needs and the choices available to you.',
  },
  {
    theme: 'Empowering the future',
    question: 'Where you want to be',
    detail:
      'Setting your own goals, rebuilding independence and making a realistic plan for your future.',
  },
];

const sessions = [
  {
    title: 'Understanding Domestic Abuse',
    points: [
      'Recognising domestic abuse and its different forms',
      'Identifying patterns of abusive behaviour',
      'Understanding power, control and manipulation',
      'Early warning signs and unhealthy relationships',
    ],
  },
  {
    title: 'Types of Abuse',
    points: [
      'Physical, sexual, emotional and psychological abuse',
      'Financial and economic abuse',
      'Digital abuse and controlling behaviours',
      'Recognising less obvious forms of abuse',
    ],
  },
  {
    title: 'Emotional and Psychological Abuse',
    points: [
      'Understanding emotional manipulation',
      'Gaslighting, intimidation and isolation',
      'The impact of humiliation and threats',
      'How abuse affects confidence and self-worth',
    ],
  },
  {
    title: 'Coercive Control and Gaslighting',
    points: [
      'Identifying controlling behaviour patterns',
      'Understanding tactics used by perpetrators',
      'Recognising manipulation and distorted reality',
      'Rebuilding confidence in your own judgement',
    ],
  },
  {
    title: 'Stalking and Cyber Abuse',
    points: [
      'Recognising stalking behaviours and escalation',
      'Digital monitoring and harassment',
      'Risks associated with technology',
      'Safety planning, evidence and reporting',
    ],
  },
  {
    title: 'Understanding Perpetrator Behaviour',
    points: [
      'Abusive attitudes and behavioural patterns',
      'Responsibility and accountability',
      'Manipulation, blame and minimisation',
      'Patterns that may indicate increased risk',
    ],
  },
  {
    title: 'Thoughts, Feelings and Behaviours',
    points: [
      'How thoughts, emotions and responses connect',
      'Understanding the effects of trauma',
      'Recognising survival responses',
      'Emotional awareness and healthier coping',
    ],
  },
  {
    title: 'Impact of Domestic Abuse on Children',
    points: [
      'Children’s experiences of domestic abuse',
      'Emotional and behavioural impacts',
      'The importance of safety and stability',
      'Supporting children through recovery',
    ],
  },
  {
    title: 'Adverse Childhood Experiences and Long-Term Impact',
    points: [
      'Understanding adverse childhood experiences',
      'Trauma and adult wellbeing',
      'Learned behaviours and relationship patterns',
      'Awareness without blame or judgement',
    ],
  },
  {
    title: 'Parenting and Family Relationships',
    points: [
      'The impact of abuse on parenting',
      'Rebuilding positive family relationships',
      'Recognising children’s emotional needs',
      'Safe and supportive parenting approaches',
    ],
  },
  {
    title: 'Post-Separation Abuse and Ongoing Risk',
    points: [
      'Abuse that continues after separation',
      'Harassment, intimidation and control',
      'Risks involving children, finances and legal processes',
      'Practical safeguarding and safety strategies',
    ],
  },
  {
    title: 'Moving Forward',
    points: [
      'Reflecting on your experiences and progress',
      'Recognising strengths and achievements',
      'Setting realistic goals',
      'A personalised action and safety plan',
      'Ongoing support and resources',
    ],
  },
];

const support = [
  'Individual risk and needs assessments',
  'Personalised safety planning',
  'Specialist stalking and coercive control awareness',
  'Support navigating criminal justice and family court processes',
  'Liaison with police, social care and other professionals where appropriate',
  'Contributions to multi-agency safeguarding, including MARAC and strategy meetings',
  'Understanding protective orders and safeguarding measures',
  'Practical support with future planning and recovery',
  'Family-focused support where appropriate and safe',
].map((text, i) => ({ n: String(i + 1).padStart(2, '0'), text }));

const outcomes = [
  'Increased understanding of domestic abuse and coercive control',
  'Improved recognition of risk and harmful behaviour',
  'Greater confidence and emotional awareness',
  'Increased knowledge of safeguarding and protective measures',
  'Better understanding of the impact of abuse on children and families',
  'Stronger personal boundaries and decision-making skills',
  'Individualised safety and future planning',
  'Improved access to professional and community support',
  'Greater independence, resilience and long-term wellbeing',
];

// Mirrors the perpetrator programme page's heading system so the two
// programme pages read as a set.
function SectionTitle({
  num,
  title,
  dark = false,
  centered = false,
}: Readonly<{
  num: string;
  title: string;
  dark?: boolean;
  centered?: boolean;
}>) {
  return (
    <>
      <span
        className='block text-sm font-bold tracking-[0.08em] mb-3'
        style={{ color: dark ? '#30F6BA' : EYEBROW }}
      >
        {num}
      </span>
      <h2
        className={`text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight ${dark ? 'text-chalk' : 'text-mf-blue'}`}
      >
        {title}
      </h2>
      <div
        className={`mt-5 w-12 h-1 rounded-full bg-mf-green ${centered ? 'mx-auto' : ''}`}
      />
    </>
  );
}

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
    <div className='grid gap-8 md:gap-16 md:grid-cols-[minmax(200px,280px)_1fr]'>
      <div>
        <SectionTitle num={num} title={title} />
      </div>
      <div className='space-y-4 text-lg leading-[1.6] text-mf-dark-blue'>
        {children}
      </div>
    </div>
  );
}

function CenteredHeader({
  num,
  title,
  dark = false,
  children,
}: Readonly<{
  num: string;
  title: string;
  dark?: boolean;
  children?: React.ReactNode;
}>) {
  return (
    <div className='text-center mb-14 max-w-2xl mx-auto'>
      <SectionTitle num={num} title={title} dark={dark} centered />
      {children && (
        <div
          className={`mt-6 text-lg leading-[1.6] ${dark ? '' : 'text-mf-dark-blue'}`}
          style={dark ? { color: LAVENDER } : undefined}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width='26'
      height='26'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#30F6BA'
      strokeWidth='2.4'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      className='shrink-0 mt-px'
    >
      <path d='M5 12.5l4.5 4.5L19 7.5' />
    </svg>
  );
}

const primaryBtnClass =
  'inline-flex items-center gap-2 bg-mf-green text-mf-blue font-grotesk-medium text-lg rounded-full px-8 pt-4 pb-3! mb-0! hover:brightness-105 transition-all focus:outline-none focus:ring-2 focus:ring-mf-green/60';
const outlineOnDarkBtnClass =
  'inline-flex items-center gap-2 bg-transparent border-2 border-mf-green text-chalk font-grotesk-medium text-lg rounded-full px-8 pt-4 pb-3! mb-0! hover:bg-mf-green hover:text-mf-blue transition-all focus:outline-none focus:ring-2 focus:ring-mf-green/60';

export default function BeyondBeliefPage() {
  return (
    <>
      {/* Hero */}
      <section
        className='bg-mf-blue text-chalk py-20 md:py-28 px-6 text-center'
        aria-label='Page header'
      >
        <div className='max-w-2xl mx-auto flex flex-col items-center'>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]'>
            Beyond Belief
          </h1>
          <p className='mt-6 text-xl md:text-2xl text-mf-green'>
            A life beyond what you were made to believe was possible.
          </p>
          <Link href='/contact' className={`${primaryBtnClass} mt-10`}>
            Enquire about Beyond Belief
          </Link>
        </div>
      </section>

      <main>
        {/* 01 What It Is */}
        <section className='py-16 md:py-24 px-6 bg-chalk'>
          <div className='max-w-5xl mx-auto'>
            <SplitSection num='01' title='What It Is'>
              <p>
                When you&rsquo;ve lived with abuse, hope can feel like the
                first thing taken. Beyond Belief is a trauma-informed,
                person-centred support programme for people affected by
                domestic abuse, coercive control, stalking and other harmful
                behaviour.
              </p>
              <p>
                It brings together education, emotional understanding, risk
                awareness, safeguarding and practical support, helping you
                recognise abuse, understand its impact and make informed
                decisions about your future.
              </p>
              <p>
                Every person&rsquo;s circumstances, level of risk and
                recovery journey are different. Support starts with yours,
                at your pace.
              </p>
            </SplitSection>
          </div>
        </section>

        {/* 02 Our Approach */}
        <section className='py-16 md:py-24 px-6 bg-white'>
          <div className='max-w-5xl mx-auto'>
            <CenteredHeader num='02' title='Our Approach'>
              <p>
                We help you understand the behaviour of those responsible
                for abuse, without ever placing responsibility for their
                actions on you. The programme is built around three
                questions:
              </p>
            </CenteredHeader>
            <div className='grid gap-5 md:grid-cols-3'>
              {approachCards.map((card) => (
                <div
                  key={card.theme}
                  className='bg-mf-blue text-chalk rounded-2xl p-8'
                >
                  <p className='text-base font-bold text-mf-green'>
                    {card.theme}
                  </p>
                  <h3 className='mt-3 mb-3 text-2xl md:text-[28px] font-bold leading-[1.1] tracking-tight'>
                    {card.question}
                  </h3>
                  <p
                    className='text-lg leading-[1.6]'
                    style={{ color: LAVENDER }}
                  >
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 The 12-Session Programme */}
        <section id='programme' className='py-16 md:py-24 px-6 bg-chalk'>
          <div className='max-w-5xl mx-auto'>
            <CenteredHeader num='03' title='The 12-Session Programme'>
              <p>
                Each session builds understanding and confidence step by
                step, from recognising abuse to planning a life beyond it.
              </p>
            </CenteredHeader>
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {sessions.map((session, index) => (
                <article
                  key={session.title}
                  className='bg-white rounded-2xl p-7 flex flex-col gap-3.5 shadow-[0_6px_16px_-10px_rgba(38,34,79,0.35)]'
                >
                  <p className='text-[34px] font-bold tracking-[-0.04em] text-mf-blue'>
                    {String(index + 1).padStart(2, '0')}
                    <span className='ml-1 text-mf-green'>.</span>
                  </p>
                  <h3 className='text-[22px] font-bold leading-[1.2] tracking-[-0.03em] text-mf-blue'>
                    {session.title}
                  </h3>
                  <ul className='pl-[18px] text-base leading-[1.55] text-mf-blue flex flex-col gap-1.5 list-disc'>
                    {session.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 04 Individual Support & Safeguarding */}
        <section className='py-16 md:py-24 px-6 bg-white'>
          <div className='max-w-5xl mx-auto'>
            <SplitSection num='04' title='Individual Support & Safeguarding'>
              <p>
                Beyond Belief isn&rsquo;t limited to the sessions. We look
                at your whole situation (the risks you face, your emotional
                needs and your practical challenges) and support you through
                them.
              </p>
              <ol className='!mt-8 list-none'>
              {support.map((item) => (
                <li
                  key={item.n}
                  className='flex gap-5 items-baseline py-4 border-t border-[#dcdbe6] last:border-b'
                >
                  <span
                    className='shrink-0 min-w-[24px] text-sm font-bold tracking-[0.08em]'
                    style={{ color: EYEBROW }}
                  >
                    {item.n}
                  </span>
                  <span className='text-lg font-medium leading-[1.5] text-mf-blue'>
                    {item.text}
                  </span>
                </li>
              ))}
              </ol>
            </SplitSection>
          </div>
        </section>

        {/* 05 Outcomes */}
        <section className='py-16 md:py-24 px-6 bg-mf-blue text-chalk'>
          <div className='max-w-5xl mx-auto'>
            <CenteredHeader num='05' title='Outcomes' dark>
              <p>
                What we aim for every person who takes part in Beyond
                Belief:
              </p>
            </CenteredHeader>
            <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {outcomes.map((outcome) => (
                <div
                  key={outcome}
                  className='border border-[#4a4578] rounded-2xl p-6 flex gap-4 items-start'
                >
                  <CheckIcon />
                  <span className='text-lg font-medium leading-[1.45]'>
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
            <p className='mt-16 text-center text-2xl md:text-[32px] font-bold leading-[1.2] tracking-tight'>
              Understanding the past. Recognising the present.{' '}
              <span className='text-mf-green'>Empowering the future.</span>
            </p>
          </div>
        </section>

        {/* 06 Professional Expertise */}
        <section className='py-16 md:py-24 px-6 bg-chalk'>
          <div className='max-w-5xl mx-auto'>
            <SplitSection num='06' title='Professional Expertise'>
              <p>
                Beyond Belief draws on extensive professional experience in
                domestic abuse victim support, safeguarding, high-risk case
                management, stalking awareness, multi-agency working and
                behaviour-change interventions.
              </p>
              <p>
                This includes direct victim support, safeguarding
                leadership, prison-based interventions and working
                alongside statutory agencies to manage complex risk.
              </p>
              <p>
                Beyond Belief is the specialist victim support strand of The
                Mindful Foundation, alongside{' '}
                <Link href='/think-different' className='font-semibold'>
                  Think Different
                </Link>
                ,{' '}
                <Link href='/listen-app' className='font-semibold'>
                  ListenApp
                </Link>{' '}
                and our{' '}
                <Link href='/perpetrator-programme' className='font-semibold'>
                  Inside Power
                </Link>{' '}
                behaviour-change programme, addressing domestic abuse through
                prevention, safeguarding, accountability and recovery.
              </p>
            </SplitSection>
          </div>
        </section>

        {/* Closing Call to Action */}
        <section className='bg-mf-blue text-chalk py-16 md:py-20 px-6'>
          <div className='max-w-2xl mx-auto text-center flex flex-col items-center'>
            <h2 className='text-3xl md:text-4xl font-bold leading-tight tracking-tight'>
              You don&rsquo;t have to work it out alone.
            </h2>
            <p className='mt-6 text-xl leading-[1.6] text-mf-green'>
              Get in touch about joining Beyond Belief, or to refer someone
              you&rsquo;re supporting.
            </p>
            <div className='mt-12 flex flex-wrap gap-4 justify-center'>
              <Link href='/contact' className={primaryBtnClass}>
                Enquire Now
              </Link>
              <Link href='/contact' className={outlineOnDarkBtnClass}>
                Make a Referral
              </Link>
            </div>
            <p
              className='mt-14 text-base leading-[1.6]'
              style={{ color: LAVENDER }}
            >
              In immediate danger? Call 999. If you can&rsquo;t speak, press
              55. National Domestic Abuse Helpline: 0808 2000 247 (free,
              24/7).
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
