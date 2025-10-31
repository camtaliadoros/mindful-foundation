type BulletItemCardProps = {
  backgroundColour: string;
  discColour: string;
  content: string;
  key: number;
};

export const BulletItemCard = ({
  backgroundColour,
  discColour,
  content,
  key,
}: BulletItemCardProps) => {
  return (
    <div
      key={key}
      className={`${backgroundColour} p-4 rounded-lg flex items-center gap-2`}
    >
      <div className={`h-3 w-3 ${discColour} rounded-full shrink-0`} />
      <p className='text-gray-700 mt-1'>{content}</p>
    </div>
  );
};
