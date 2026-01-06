import Image from 'next/image';
import { LinkableLogo } from '../types/about';

export const LogoSection = ({
  colourScheme,
  title,
  logos,
}: {
  colourScheme: 'light' | 'dark';
  title: string;
  logos: LinkableLogo[];
}) => {
  const backgroundColor = colourScheme === 'light' ? 'bg-white' : 'bg-mf-blue';
  const textColor = colourScheme === 'light' ? 'text-gray-800' : 'text-white';
  const titleColor = colourScheme === 'light' ? 'text-gray-800' : 'text-white';
  const linkColor = colourScheme === 'light' ? 'text-mf-blue' : 'text-mf-green';
  const linkHoverColor =
    colourScheme === 'light' ? 'text-mf-dark-green' : 'text-mf-dark-blue';

  return (
    <>
      {logos && logos.length > 0 && (
        <section className={`${backgroundColor} py-16 px-6`}>
          <div className='max-w-6xl mx-auto'>
            <h2
              className={`${titleColor} text-3xl font-bold mb-12 text-center`}
            >
              {title || 'Advisory Board'}
            </h2>
            <div className='flex flex-wrap gap-12 items-center justify-center max-w-3xl mx-auto'>
              {logos.map((member) => (
                <div key={member._key} className='flex justify-center max-w-30'>
                  {member.logo ? (
                    <a
                      href={member.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-transform hover:scale-105'
                    >
                      <Image
                        src={member.logo.asset.url}
                        alt={member.logo.alt || member.name}
                        width={200}
                        height={100}
                        className='max-h-20 w-auto object-contain'
                      />
                    </a>
                  ) : (
                    <div className='text-center'>
                      <h3
                        className={`text-lg md:text-xl font-grotesk-medium ${textColor} mb-2`}
                      >
                        {member.name}
                      </h3>
                      <a
                        href={member.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={`${linkColor} hover:${linkHoverColor} hover:underline`}
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
