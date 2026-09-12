import { BlockContent } from '../types/homepage';

// The "expansion" field is authored in Sanity as a single free-text block
// containing the pilot writeup, a bulleted stats list and a closing
// blockquote of principles, with the sub-headings simply bolded inline
// rather than modelled as separate fields. This parses that raw portable
// text into the pieces the redesigned layout renders (bars, highlight
// cards, quote cards) without altering any of the underlying copy.

const KNOWN_HEADINGS = new Set([
  'Pilot: HMP Liverpool',
  'Overview of Results',
  'Programme Principles',
]);

interface Bar {
  pct: string;
  pctValue: number;
  label: string;
}

interface Highlight {
  big: string;
  text: string;
}

interface ParsedExpansion {
  intro: string[];
  pilotHeading: string;
  pilotParagraphs: string[];
  resultsHeading: string;
  resultsIntro: string[];
  bars: Bar[];
  highlights: Highlight[];
  resultsClosing: string[];
  principlesHeading: string;
  principles: string[];
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function parseExpansion(blocks: BlockContent[]): ParsedExpansion {
  const parsed: ParsedExpansion = {
    intro: [],
    pilotHeading: '',
    pilotParagraphs: [],
    resultsHeading: '',
    resultsIntro: [],
    bars: [],
    highlights: [],
    resultsClosing: [],
    principlesHeading: '',
    principles: [],
  };

  let bucket: 'intro' | 'pilot' | 'results' = 'intro';
  let barsStarted = false;

  const pushParagraphs = (text: string) => {
    const paras = splitParagraphs(text);
    if (paras.length === 0) return;
    if (bucket === 'intro') parsed.intro.push(...paras);
    else if (bucket === 'pilot') parsed.pilotParagraphs.push(...paras);
    else if (!barsStarted) parsed.resultsIntro.push(...paras);
    else parsed.resultsClosing.push(...paras);
  };

  for (const block of blocks ?? []) {
    if (block.style === 'blockquote') {
      const text = block.children.map((c) => c.text).join('');
      parsed.principles.push(...splitParagraphs(text));
      continue;
    }

    if (block.listItem === 'bullet') {
      const strongChild = block.children.find((c) => c.marks?.includes('strong'));
      const fullText = block.children
        .map((c) => c.text)
        .join('')
        .trim();

      const improvementMatch = strongChild?.text
        .trim()
        .match(/^([\d.]+)%\s*improvement$/i);
      if (improvementMatch && strongChild) {
        const label = block.children
          .filter((c) => c !== strongChild)
          .map((c) => c.text)
          .join('')
          .trim();
        parsed.bars.push({
          pct: improvementMatch[1],
          pctValue: parseFloat(improvementMatch[1]),
          label,
        });
        barsStarted = true;
        continue;
      }

      const rangeMatch = fullText.match(/from\s+([\d.]+)%\s*to\s*([\d.]+)%/i);
      if (rangeMatch) {
        parsed.highlights.push({
          big: `${rangeMatch[1]}% → ${rangeMatch[2]}%`,
          text: fullText,
        });
        continue;
      }

      const reducedMatch = fullText.match(/reduced by\s*([\d.]+)%/i);
      if (reducedMatch) {
        parsed.highlights.push({
          big: `↓ ${reducedMatch[1]}%`,
          text: fullText,
        });
        continue;
      }

      pushParagraphs(fullText);
      continue;
    }

    for (const child of block.children) {
      const trimmed = child.text.trim();
      if (child.marks?.includes('strong') && KNOWN_HEADINGS.has(trimmed)) {
        if (trimmed === 'Pilot: HMP Liverpool') {
          bucket = 'pilot';
          parsed.pilotHeading = trimmed;
        } else if (trimmed === 'Overview of Results') {
          bucket = 'results';
          parsed.resultsHeading = trimmed;
        } else if (trimmed === 'Programme Principles') {
          parsed.principlesHeading = trimmed;
        }
        continue;
      }
      pushParagraphs(child.text);
    }
  }

  return parsed;
}

function highlightStrong(text: string) {
  // Renders the quoted "Always"/"Rarely"/"Never" phrases in-line as bold,
  // mirroring the emphasis the CMS content already carries.
  const parts = text.split(/(“[^”]*”)/g);
  return parts.map((part, i) =>
    part.startsWith('“') ? (
      <strong key={i} className='text-mf-blue font-semibold'>
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function ExpansionResults({
  title,
  content,
}: Readonly<{
  title: string;
  content: BlockContent[];
}>) {
  const data = parseExpansion(content);
  const maxPct = Math.max(1, ...data.bars.map((b) => b.pctValue));

  return (
    <>
      {/* Expansion intro */}
      <section className='py-16 md:py-24 px-6 bg-white'>
        <div className='max-w-5xl mx-auto grid gap-8 md:gap-16 md:grid-cols-[minmax(200px,280px)_1fr]'>
          <div>
            <span className='block text-sm font-bold tracking-[0.08em] text-[#0f9d6f] mb-3'>
              05
            </span>
            <h2 className='text-3xl md:text-4xl font-bold text-mf-blue leading-[1.1] tracking-tight'>
              {title}
            </h2>
            <div className='mt-5 w-12 h-1 rounded-full bg-mf-green' />
          </div>
          <div className='max-w-none space-y-4 text-mf-dark-blue font-grotesk-regular text-lg'>
            {data.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot: HMP Liverpool */}
      {data.pilotParagraphs.length > 0 && (
        <section className='pb-16 md:pb-24 px-6 bg-white'>
          <div className='max-w-5xl mx-auto'>
            <span className='inline-flex items-center gap-2 bg-mf-blue text-chalk font-semibold text-sm px-4 py-2 rounded-full mb-8'>
              <span className='w-2 h-2 rounded-full bg-mf-green' aria-hidden='true' />
              {data.pilotHeading}
            </span>
            <div className='grid gap-8 md:gap-16 md:grid-cols-[minmax(200px,280px)_1fr]'>
              <div>
                <h3 className='text-2xl md:text-3xl font-bold text-mf-blue leading-tight tracking-tight'>
                  {data.pilotHeading}
                </h3>
                <div className='mt-5 w-12 h-1 rounded-full bg-mf-green' />
              </div>
              <div className='max-w-none space-y-4 text-mf-dark-blue font-grotesk-regular text-lg'>
                {data.pilotParagraphs.map((p, i) => (
                  <p
                    key={i}
                    className={
                      i === data.pilotParagraphs.length - 1
                        ? 'bg-mf-green/10 rounded-xl px-5 py-4 text-base text-mf-blue/80'
                        : undefined
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Overview of Results */}
      {(data.bars.length > 0 || data.resultsIntro.length > 0) && (
        <section className='pb-16 md:pb-24 px-6 bg-white'>
          <div className='max-w-5xl mx-auto bg-chalk rounded-3xl p-6 sm:p-10 md:p-14'>
            <h3 className='text-2xl md:text-3xl font-bold text-mf-blue tracking-tight'>
              {data.resultsHeading || 'Overview of Results'}
            </h3>
            {data.resultsIntro.map((p, i) => (
              <p key={i} className='mt-4 text-mf-blue font-medium text-lg max-w-2xl'>
                {p}
              </p>
            ))}

            {data.bars.length > 0 && (
              <div className='mt-10 flex flex-col gap-7'>
                {data.bars.map((bar, i) => (
                  <div key={i}>
                    <div className='flex items-baseline gap-3 flex-wrap'>
                      <span className='text-3xl md:text-4xl font-bold text-mf-blue tracking-tight'>
                        {bar.pct}%
                      </span>
                      <span className='text-mf-dark-blue text-base md:text-lg'>
                        {bar.label}
                      </span>
                    </div>
                    <div className='mt-3 h-3 rounded-full bg-mf-blue/10 overflow-hidden'>
                      <div
                        className='h-full rounded-full bg-mf-green animate-mf-bar-grow'
                        style={{
                          width: `${Math.min(100, (bar.pctValue / maxPct) * 92)}%`,
                          animationDelay: `${i * 90}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {data.highlights.length > 0 && (
              <div className='mt-10 grid sm:grid-cols-2 gap-5'>
                {data.highlights.map((hl, i) => (
                  <div key={i} className='bg-white rounded-2xl p-6'>
                    <div className='text-2xl md:text-3xl font-bold text-mf-blue tracking-tight'>
                      {hl.big}
                    </div>
                    <p className='mt-3 text-mf-dark-blue'>{highlightStrong(hl.text)}</p>
                  </div>
                ))}
              </div>
            )}

            {data.resultsClosing.map((p, i) => (
              <p key={i} className='mt-8 text-mf-dark-blue text-lg max-w-3xl'>
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Programme Principles */}
      {data.principles.length > 0 && (
        <section className='py-16 md:py-24 px-6 bg-mf-blue'>
          <div className='max-w-5xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold text-chalk text-center tracking-tight mb-14'>
              {data.principlesHeading || 'Programme Principles'}
            </h2>
            <div className='grid md:grid-cols-3 gap-5'>
              {data.principles.map((quote, i) => (
                <figure
                  key={i}
                  className='bg-white/5 rounded-2xl p-8 flex flex-col gap-4'
                >
                  <span className='text-mf-green text-5xl font-bold leading-none' aria-hidden='true'>
                    &ldquo;
                  </span>
                  <blockquote className='text-chalk text-xl font-semibold leading-snug'>
                    {quote}
                  </blockquote>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
