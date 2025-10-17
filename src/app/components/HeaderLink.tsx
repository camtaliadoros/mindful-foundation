import Link from 'next/link';

export default function HeaderLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className='hover:text-mf-green transition-colors'>
      {children}
    </Link>
  );
}
