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

            // Show/hide logic - FIXED VERSION
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling DOWN and past 100px → hide
                setIsVisible(false);
            } else {
                // Scrolling UP or at top → show
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { title: 'Services', url: '/#services' },
        { title: 'Analytics Tools', url: '/AnalyticsTools' },
        { title: 'Blog', url: '/blog' },
        { title: 'About Us', url: '/#about' },
        { title: 'Contact', url: '/#contact' }
    ];

    return (
        <nav
            className={`fixed top-0 right-0 left-0 z-50 w-full border-b border-gray-200/30 transition-all duration-400 ${
                isScrolled ? 'bg-white/70 shadow-sm backdrop-blur-xl' : 'bg-white/70 backdrop-blur-lg'
            } ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
            style={{
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.7)'
            }}>
            <div className='mx-auto flex h-14 max-w-7xl items-center px-4'>
                {/* LEFT — Brand with Logo */}
                <div className='flex flex-1 items-center justify-start'>
                    <Link href='/' className='flex items-center transition-transform duration-200 hover:scale-105'>
                        <div className='relative h-16 w-16'>
                            <Image
                                src='/images/logo-nav.png'
                                alt='AGROSPACE Logo'
                                fill
                                className='object-contain'
                                sizes='64px'
                                priority
                            />
                        </div>
                        <span className='-ml-2 text-lg font-semibold tracking-wider text-gray-900'>AGROSPACE</span>
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

                {/* RIGHT — AUTH BUTTONS */}
                <div className='flex flex-1 items-center justify-end gap-3'>
                    {/* I am an Importer */}
                    <Button
                        asChild
                        variant='outline'
                        size='sm'
                        className='hidden rounded-full border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 md:inline-flex'>
                        <Link href='/signup/importer'>I am an Importer</Link>
                    </Button>

                    {/* I am an Exporter */}
                    <Button
                        asChild
                        variant='outline'
                        size='sm'
                        className='hidden rounded-full border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 md:inline-flex'>
                        <Link href='/signup/exporter'>I am an Exporter</Link>
                    </Button>

                    {/* Sign In */}
                    <Button asChild size='sm' className='rounded-full bg-emerald-600 text-white hover:bg-emerald-700'>
                        <Link href='/login'>Log In</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
