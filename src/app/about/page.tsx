import { getAboutPageData } from '../lib/sanity';
import { renderBlockContent } from '../utils/sanity';
import { AboutPageData } from '../types/about';
import Image from 'next/image';
import Link from 'next/link';

export default async function AboutPage() {
  const aboutPageData: AboutPageData | null = await getAboutPageData();

  if (!aboutPageData) {
    return (
      <div>
        <h1>Error Loading About Page</h1>
        <p>Unable to load about page content from Sanity.</p>
      </div>
    );
  }

  const {
    headerHeadline,
    headerSubheadline,
    whoWeAreTitle,
    whoWeAre,
    missionTitle,
    mission,
    approachTitle,
    approach,
    teamTitle,
    team,
    advisoryBoardTitle,
    advisoryBoard,
    listenAppPartnersTitle,
    listenAppPartners,
    specialThanksTitle,
    specialThanks,
  } = aboutPageData;

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

      {/* Who We Are Section */}
      {whoWeAre && (
        <section>
          <h2>{whoWeAreTitle || 'Who We Are'}</h2>
          {renderBlockContent(whoWeAre)}
        </section>
      )}

      {/* Mission Section */}
      {mission && (
        <section>
          <h2>{missionTitle || 'Our Mission'}</h2>
          <p>{mission}</p>
        </section>
      )}

      {/* Approach Section */}
      {approach && approach.length > 0 && (
        <section>
          <h2>{approachTitle || 'Our Approach'}</h2>
          <div>
            {approach.map((item) => (
              <div key={item._key}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Team Section */}
      {team && (
        <section>
          <h2>{teamTitle || 'The Team'}</h2>
          {renderBlockContent(team)}
        </section>
      )}

      {/* Advisory Board Section */}
      {advisoryBoard && advisoryBoard.length > 0 && (
        <section>
          <h2>{advisoryBoardTitle || 'Advisory Board'}</h2>
          <div>
            {advisoryBoard.map((member) => (
              <div key={member._key}>
                {member.logo ? (
                  <a
                    href={member.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Image
                      src={member.logo.asset.url}
                      alt={member.logo.alt || member.name}
                      width={200}
                      height={100}
                    />
                  </a>
                ) : (
                  <div>
                    <h3>{member.name}</h3>
                    <a
                      href={member.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ListenApp Partners Section */}
      {listenAppPartners && listenAppPartners.length > 0 && (
        <section>
          <h2>{listenAppPartnersTitle || 'ListenApp Partners'}</h2>
          <div>
            {listenAppPartners.map((partner) => (
              <div key={partner._key}>
                {partner.logo ? (
                  <a
                    href={partner.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Image
                      src={partner.logo.asset.url}
                      alt={partner.logo.alt || partner.name}
                      width={200}
                      height={100}
                    />
                  </a>
                ) : (
                  <div>
                    <h3>{partner.name}</h3>
                    <a
                      href={partner.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Special Thanks Section */}
      {specialThanks && specialThanks.length > 0 && (
        <section>
          <h2>{specialThanksTitle || 'Special Thanks'}</h2>
          <div>
            {specialThanks.map((thanks) => (
              <div key={thanks._key}>
                {thanks.logo ? (
                  <a
                    href={thanks.url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Image
                      src={thanks.logo.asset.url}
                      alt={thanks.logo.alt || thanks.name}
                      width={200}
                      height={100}
                    />
                  </a>
                ) : (
                  <div>
                    <h3>{thanks.name}</h3>
                    <a
                      href={thanks.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
