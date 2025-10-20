export const TestimonialCard = ({
  key,
  author,
  title,
  organisation,
  quote,
}: {
  author: string;
  title?: string;
  organisation?: string;
  quote: string;
  key: string;
}) => {
  return (
    <div className='h-full flex flex-col'>
      <div
        key={key}
        className='bg-mf-dark-blue p-8 rounded-xl h-full flex flex-col justify-between space-y-4'
      >
        <div className='h-5 w-5 bg-mf-blue rounded-full'></div>
        <blockquote className='text-white text-sm italic mb-4 flex-grow'>
          &ldquo;{quote}&rdquo;
        </blockquote>
        <p className='text-mf-green font-semibold text-sm mt-auto'>
          {author}
          {title && `, ${title}`}
          {organisation && ` at ${organisation}`}
        </p>
      </div>
    </div>
  );
};
