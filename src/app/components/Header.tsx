'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import HeaderLink from './HeaderLink';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className='bg-mf-blue text-chalk px-6 py-4 font-grotesk-regular sticky top-0 z-50'>
      <div className='flex items-center justify-between'>
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

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-8'>
          <HeaderLink href='/about'>About</HeaderLink>
          <HeaderLink href='/think-different'>Think Different</HeaderLink>
          <HeaderLink href='/listen-app'>ListenApp</HeaderLink>
          <HeaderLink href='/perpetrator-programme'>
            Perpetrator Programme
          </HeaderLink>
          <HeaderLink href='/news'>News</HeaderLink>
          <button className='px-8 py-3 rounded-full transition-all font-grotesk-medium border-2 border-mf-green text-ash bg-mf-green hover:bg-transparent hover:text-mf-green text-lg'>
            Donate
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className='md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1'
          aria-label='Toggle mobile menu'
        >
          <span
            className={`block w-6 h-0.5 bg-chalk transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-chalk transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-chalk transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <nav
        className={`md:hidden fixed inset-0 top-[73px] bg-mf-blue transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* Navigation Links */}
          <div className='flex-1 px-6 py-8 space-y-6'>
            <Link
              href='/about'
              className='block text-xl hover:text-mf-green transition-colors py-3'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href='/think-different'
              className='block text-xl hover:text-mf-green transition-colors py-3'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Think Different
            </Link>
            <Link
              href='/listen-app'
              className='block text-xl hover:text-mf-green transition-colors py-3'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ListenApp
            </Link>
            <Link
              href='/perpetrator-programme'
              className='block text-xl hover:text-mf-green transition-colors py-3'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Perpetrator Programme
            </Link>
            <Link
              href='/news'
              className='block text-xl hover:text-mf-green transition-colors py-3'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              News
            </Link>
          </div>

          {/* Donate Button - Anchored to Bottom */}
          <div className='px-6 py-6 border-t border-mf-green/20'>
            <button className='w-full bg-mf-green text-ash rounded-full px-6 py-4 hover:bg-opacity-90 transition-all font-grotesk-medium text-lg md:text-xl'>
              Donate
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
