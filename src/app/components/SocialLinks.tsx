import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SocialLinks = () => {
  return (
    <section className='bg-mf-dark-blue py-10 px-6'>
      <div className='max-w-4xl mx-auto flex flex-col items-center gap-4'>
        <p className='text-white font-bold'>Follow us</p>
        <div className='flex gap-6'>
          <a
            href='https://www.instagram.com/mindful_foundation'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Mindful Foundation on Instagram'
            className='text-white hover:text-mf-green transition-colors'
          >
            <FontAwesomeIcon icon={faInstagram} className='h-8 w-8' />
          </a>
          <a
            href='https://www.linkedin.com/company/the-mindful-foundation'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Mindful Foundation on LinkedIn'
            className='text-white hover:text-mf-green transition-colors'
          >
            <FontAwesomeIcon icon={faLinkedin} className='h-8 w-8' />
          </a>
        </div>
      </div>
    </section>
  );
};
