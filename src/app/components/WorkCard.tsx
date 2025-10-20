export const WordCard = ({
  title,
  description,
  icon,
}: {
  title?: string;
  description?: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className='md:p-8 md:[&>*]:text-center'>
      {icon}
      <h3 className='text-xl font-bold text-white mb-4'>{title}</h3>
      <p className='text-white leading-relaxed'>{description}</p>
    </div>
  );
};
