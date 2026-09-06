import Link from 'next/link';
import { faBrain, faHeart, faMobile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const WorkCard = ({
  title,
  description,
  icon,
  href,
}: {
  title?: string;
  description?: string;
  icon: React.ReactNode;
  href?: string;
}) => {
  let iconImage;

  if (icon === 'think-different') {
    iconImage = (
      <FontAwesomeIcon icon={faBrain} className='h-6 w-6 text-mf-green' />
    );
  } else if (icon === 'listen-app') {
    iconImage = (
      <FontAwesomeIcon icon={faMobile} className='h-6 w-6 text-mf-green' />
    );
  } else if (icon === 'perpetrator-programme') {
    iconImage = (
      <FontAwesomeIcon icon={faHeart} className='h-6 w-6 text-mf-green' />
    );
  }

  const content = (
    <>
      <div className='m-4'>{iconImage}</div>
      <h3 className='text-xl font-bold text-white my-2 group-hover:text-mf-green transition-colors'>
        {title}
      </h3>
      <p className='text-white text-center text-lg md:text-xl leading-snug'>
        {description}
      </p>
    </>
  );

  const containerClass =
    'md:p-8 md:[&>*]:text-center flex flex-col items-center justify-center';

  if (href) {
    return (
      <Link
        href={href}
        aria-label={title}
        className={`${containerClass} group rounded-2xl hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-mf-green/60`}
      >
        {content}
      </Link>
    );
  }

  return <div className={containerClass}>{content}</div>;
};
