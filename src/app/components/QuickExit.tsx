'use client';

/**
 * Quick-exit ("safety exit") button. Immediately sends the visitor away from
 * the site to Google. Uses location.replace so the current page is not left in
 * the browser's back history. Fixed to the bottom-right so it is reachable from
 * every page at any scroll position.
 */
export default function QuickExit() {
  const handleExit = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // replace() drops the current entry so Back doesn't return to this page.
    window.location.replace('https://www.google.com');
  };

  return (
    <a
      href='https://www.google.com'
      onClick={handleExit}
      aria-label='Quick exit — leave this site now'
      className='fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2 px-5 py-3 rounded-full bg-mf-coral text-white text-sm md:text-base font-grotesk-medium leading-none whitespace-nowrap shadow-lg hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-white/80'
    >
      <svg
        width='15'
        height='15'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
        className='block shrink-0'
      >
        <line x1='18' y1='6' x2='6' y2='18' />
        <line x1='6' y1='6' x2='18' y2='18' />
      </svg>
      <span className='leading-none'>Quick exit</span>
    </a>
  );
}
