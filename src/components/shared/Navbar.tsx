'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Update scrolled state for styling
            setIsScrolled(currentScrollY > 10);

            // Show/hide logic
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling DOWN and past 100px → hide
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
                // Scrolling UP → show
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { title: 'Services', url: '/#services' },
        { title: 'Market Prices', url: '/prices' },
        { title: 'Blog', url: '/blog' },
        { title: 'About Us', url: '/#about' },
        { title: 'Contact', url: '/#contact' }
    ];

    return (
        <nav
            className={`sticky top-0 z-50 w-full border-b border-gray-200/30 transition-all duration-400 ${
                isScrolled ? 'bg-white/89 shadow-sm backdrop-blur-xl' : 'bg-white/89 backdrop-blur-lg'
            } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <div className='mx-auto flex h-15 max-w-7xl items-center px-4'>
                {/* LEFT — Brand with Logo */}
                <div className='flex flex-1 items-center justify-start'>
                    <Link
                        href='/'
                        className='flex items-center gap-2 transition-transform duration-200 hover:scale-105'>
                        {/* Logo Image - REPLACES the green gradient */}
                        <div className='relative h-8 w-8'>
                            <Image
                                src='/images/logo-nav.png'
                                alt='AGROSPACE Logo'
                                fill
                                className='object-contain'
                                sizes='32px'
                                priority
                            />
                        </div>
                        <span className='text-lg font-semibold tracking-wider text-gray-900'>AGROSPACE</span>
                    </Link>
                </div>

                {/* CENTER — Navigation */}
                <div className='hidden flex-none items-center gap-9 md:flex'>
                    {menuItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.url}
                            className='text-[0.95rem] font-medium tracking-wider text-gray-700 transition-transform duration-200 hover:scale-105 hover:text-emerald-700'>
                            {item.title}
                        </Link>
                    ))}
                </div>

                {/* RIGHT — CTA */}
                <div className='flex flex-1 items-center justify-end'>
                    <Button
                        asChild
                        className='inline-flex items-center rounded-full bg-[#0F3D2E] px-8 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-105 hover:bg-[#115140]'>
                        <a href='https://tally.so/r/Y5Pl2z' target='_blank' rel='noopener noreferrer'>
                            Order Now
                        </a>
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
