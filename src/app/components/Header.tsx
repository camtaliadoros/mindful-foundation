import Link from 'next/link';

export default function Header() {
  return (
    <header className='bg-mf-blue text-chalk px-6 py-4 flex items-center justify-between font-grotesk-regular'>
      {/* Logo */}
      <div className='flex items-center space-x-3'>
        <div className='w-10 h-10 border-2 border-mf-green rounded-full flex items-center justify-center'>
          <div className='w-6 h-6 border-2 border-mf-green rounded-full relative'>
            <div className='absolute top-1 left-1 w-2 h-2 bg-mf-green rounded-full'></div>
          </div>
        </div>
        <span className='text-xl font-grotesk-medium'>
          The Mindful Foundation
        </span>
      </div>

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
          href='/listenapp'
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
        <button className='bg-mf-green text-ash px-6 py-2 rounded-md hover:bg-opacity-90 transition-all font-grotesk-medium'>
          Donate
        </button>
      </nav>
    </header>
  );
}
