import { getHomepageData } from './lib/sanity';
import { renderBlockContent } from './utils/sanity';
import { HomepageData } from './types/homepage';
import Link from 'next/link';

export default async function Home() {
  const homepageData: HomepageData | null = await getHomepageData();

  if (!homepageData) {
    return (
      <div>
        <h1>Error Loading Homepage</h1>
        <p>Unable to load homepage content.</p>
      </div>
    );
  }

  const {
    headerHeadline,
    headerSubheadline,
    mission,
    intro,
    strandsSectionTitle,
    strands,
    whyItMattersTitle,
    stats,
    whyItMattersFootnote,
    testimonialsTitle,
    testimonials,
    callToActionTitle,
    primaryCta,
    secondaryCta,
    infoPack,
  } = homepageData;

  return (
    <div>
      {/* Navigation */}
      <nav>
        <Link href='/'>Home</Link> | <Link href='/about'>About</Link>
      </nav>

      {/* Header Section */}
      <header>
        <h1>{headerHeadline}</h1>
        <p>{headerSubheadline}</p>
      </header>

      {/* Mission Section */}
      {mission && (
        <section>
          <h2>Mission</h2>
          {renderBlockContent(mission)}
        </section>
      )}

      {/* Intro Section */}
      {intro && (
        <section>
          <h2>Introduction</h2>
          {renderBlockContent(intro)}
        </section>
      )}

      {/* Strands Section */}
      {strands && strands.length > 0 && (
        <section>
          <h2>{strandsSectionTitle || 'Our Work'}</h2>
          <div>
            {strands.map((strand) => (
              <div key={strand._key}>
                <h3>{strand.title}</h3>
                {strand.description && <p>{strand.description}</p>}
                {strand.internalLink && (
                  <a href={`/${strand.internalLink._id}`}>
                    Learn more about {strand.title}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Stats Section */}
      {stats && stats.length > 0 && (
        <section>
          <h2>{whyItMattersTitle || 'Why It Matters'}</h2>
          <div>
            {stats.map((stat) => (
              <div key={stat._key}>
                <h3>{stat.value}</h3>
                <p>{stat.description}</p>
              </div>
            ))}
          </div>
          {whyItMattersFootnote && <p>{whyItMattersFootnote}</p>}
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section>
          <h2>{testimonialsTitle || 'Testimonials'}</h2>
          <div>
            {testimonials.map((testimonial) => (
              <div key={testimonial._key}>
                <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
                <cite>
                  <strong>{testimonial.author}</strong>
                  {testimonial.roleOrTitle && `, ${testimonial.roleOrTitle}`}
                  {testimonial.org && ` at ${testimonial.org}`}
                </cite>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section>
        <h2>{callToActionTitle || 'Get Involved'}</h2>
        <div>
          {primaryCta && <a href={primaryCta.href}>{primaryCta.label}</a>}
          {secondaryCta && <a href={secondaryCta.href}>{secondaryCta.label}</a>}
          {infoPack && (
            <a href={infoPack.asset.url} download>
              Download Info Pack
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
