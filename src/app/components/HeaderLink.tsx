import Link from 'next/link';

export default function HeaderLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className='relative text-lg hover:text-mf-green transition-colors duration-300 group'
    >
      {children}
      <span className='absolute bottom-0 left-0 w-0 h-0.25 bg-mf-green transition-all duration-300 group-hover:w-full'></span>
    </Link>
  );
}
