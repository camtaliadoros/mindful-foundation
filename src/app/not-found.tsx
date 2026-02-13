import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen bg-chalk flex items-center justify-center px-6'>
      <div className='max-w-2xl mx-auto text-center'>
        <h1 className='text-6xl md:text-8xl font-bold text-mf-blue mb-4 font-grotesk-medium'>
          404
        </h1>
        <h2 className='text-3xl md:text-4xl font-bold text-mf-dark-blue mb-6 font-grotesk-medium'>
          Page Not Found
        </h2>
        <p className='text-lg md:text-xl text-mf-dark-blue mb-8 font-grotesk-regular'>
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page
          may have been moved or doesn&apos;t exist.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className='px-8 py-3 rounded-full transition-all font-grotesk-medium border-2 border-mf-green text-ash bg-mf-green hover:bg-transparent hover:text-mf-green text-lg'
          >
            Go to Homepage
          </Link>
          <Link
            href='/news'
            className='px-8 py-3 rounded-full transition-all font-grotesk-medium border-2 border-mf-blue text-mf-blue hover:bg-mf-blue hover:text-chalk text-lg'
          >
            View News
          </Link>
        </div>
        <div className='mt-12 pt-8 border-t border-gray-300'>
          <p className='text-lg text-mf-dark-blue font-grotesk-regular mb-4'>
            You might also be interested in:
          </p>
          <nav className='flex flex-wrap justify-center gap-4'>
            <Link
              href='/about'
              className='text-lg text-mf-blue hover:text-mf-green transition-colors font-grotesk-medium'
            >
              About
            </Link>
            <Link
              href='/think-different'
              className='text-lg text-mf-blue hover:text-mf-green transition-colors font-grotesk-medium'
            >
              Think Different
            </Link>
            <Link
              href='/listen-app'
              className='text-lg text-mf-blue hover:text-mf-green transition-colors font-grotesk-medium'
            >
              ListenApp
            </Link>
            <Link
              href='/perpetrator-programme'
              className='text-lg text-mf-blue hover:text-mf-green transition-colors font-grotesk-medium'
            >
              Perpetrator Programme
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}


