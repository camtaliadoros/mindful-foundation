import { faBrain, faHeart, faMobile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const WorkCard = ({
  title,
  description,
  icon,
}: {
  title?: string;
  description?: string;
  icon: React.ReactNode;
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

  return (
    <div className='md:p-8 md:[&>*]:text-center flex flex-col items-center justify-center'>
      <div className='m-4'>{iconImage}</div>
      <h3 className='text-xl font-bold text-white my-2'>{title}</h3>
      <p className='text-white text-center text-lg md:text-xl leading-snug'>
        {description}
      </p>
    </div>
  );
};
