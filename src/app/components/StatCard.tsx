export const StatCard = ({
  value,
  description,
}: {
  value: string;
  description: string;
}) => {
  return (
    <div className='text-center'>
      <h3 className='text-4xl font-bold text-mf-blue mb-4'>{value}</h3>
      <p className='text-gray-700'>{description}</p>
    </div>
  );
};
