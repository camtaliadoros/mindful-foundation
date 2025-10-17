import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className='bg-mf-blue text-chalk px-6 py-4 flex items-center justify-between font-grotesk-regular'>
      {/* Logo */}
      <Link href='/' className='flex items-center space-x-3'>
        <Image
          src='/Mindful Foundation logo.jpeg'
          alt='The Mindful Foundation'
          width={240}
          height={80}
          className='h-16 w-auto'
        />
      </Link>

      {/* Navigation */}
      <nav className='flex items-center space-x-8'>
        <Link href='/about' className='hover:text-mf-green transition-colors'>
          About
        </Link>
        <Link
          href='/think-different'
          className='hover:text-mf-green transition-colors'
        >
          Think Different
        </Link>
        <Link
          href='/listen-app'
          className='hover:text-mf-green transition-colors'
        >
          ListenApp
        </Link>
        <Link
          href='/perpetrator-programme'
          className='hover:text-mf-green transition-colors'
        >
          Perpetrator Programme
        </Link>
        <Link href='/news' className='hover:text-mf-green transition-colors'>
          News
        </Link>
        <button className='bg-mf-green text-ash px-6 py-2 rounded-md hover:bg-opacity-90 transition-all font-grotesk-medium'>
          Donate
        </button>
      </nav>
    </header>
  );
}
