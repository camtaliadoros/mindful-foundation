'use client';

/**
 * Quick-exit ("safety exit") button. Immediately sends the visitor away from
 * the site to Google. Uses location.replace so the current page is not left in
 * the browser's back history. Rendered in the sticky header so it is reachable
 * from every page without scrolling.
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
      className='flex items-center gap-1.5 px-3 py-2 rounded-full bg-mf-coral text-white text-sm font-grotesk-medium whitespace-nowrap hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-white/70'
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <line x1='18' y1='6' x2='6' y2='18' />
        <line x1='6' y1='6' x2='18' y2='18' />
      </svg>
      Quick exit
    </a>
  );
}
