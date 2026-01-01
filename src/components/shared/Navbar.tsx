// components/shared/Navbar.tsx
'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { SignUpModal } from './SignUpModal';
import { Calculator, ChevronDown, FileText, Globe, TrendingUp } from 'lucide-react';

// components/shared/Navbar.tsx

// components/shared/Navbar.tsx

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showAnalyticsDropdown, setShowAnalyticsDropdown] = useState(false);
    const [currentHash, setCurrentHash] = useState('');
    const lastScrollY = useRef(0);
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Analytics tools menu items
    const analyticsTools = [
        {
            title: 'Price Trends',
            url: '/AnalyticsTools#price-trends',
            icon: <TrendingUp className='h-3.5 w-3.5' />
        },
        {
            title: 'Incoterms',
            url: '/AnalyticsTools#incoterms',
            icon: <FileText className='h-3.5 w-3.5' />
        },
        {
            title: 'HS Code Lookup',
            url: '/AnalyticsTools#hs-code',
            icon: <Calculator className='h-3.5 w-3.5' />
        },
        {
            title: 'Currency Exchange',
            url: '/AnalyticsTools#currency-exchange',
            icon: <Globe className='h-3.5 w-3.5' />
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 10);

            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track hash changes for active navigation
    useEffect(() => {
        const handleHashChange = () => {
            setCurrentHash(window.location.hash);
        };

        // Check initial hash
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowAnalyticsDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        { title: 'Features', url: '/#Features', hash: '#Features' },
        { title: 'Analytics Tools', url: '/AnalyticsTools', hash: '' },
        { title: 'Blog', url: '/blog', hash: '' },
        { title: 'About Us', url: '/#about', hash: '#about' },
        { title: 'Contact', url: '/#contact', hash: '#contact' }
    ];

    // Check if current page is active
    const isActivePage = (url: string, hash: string = '') => {
        // For hash links (like #contact, #services, #about)
        if (hash && pathname === '/') {
            return currentHash === hash;
        }

        // For regular pages
        if (url === '/') return pathname === '/';

        return pathname.startsWith(url);
    };

    return (
        <>
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
                            <span className='-ml-2 text-lg font-semibold tracking-wider text-gray-900 transition-colors duration-200 hover:text-emerald-700'>
                                AGROSPACE
                            </span>
                        </Link>
                    </div>

                    {/* CENTER — Navigation */}
                    <div className='hidden flex-none items-center gap-8 md:flex'>
                        {menuItems.map((item) => (
                            <div key={item.title} className='relative'>
                                {item.title === 'Analytics Tools' ? (
                                    // Analytics Tools with dropdown
                                    <div ref={dropdownRef} className='relative'>
                                        <button
                                            onClick={() => setShowAnalyticsDropdown(!showAnalyticsDropdown)}
                                            className={`flex items-center gap-1 text-[0.95rem] font-medium tracking-wider transition-all duration-200 hover:scale-105 hover:text-emerald-700 ${
                                                isActivePage(item.url, item.hash)
                                                    ? 'font-semibold text-emerald-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                                                    : 'text-gray-700'
                                            }`}>
                                            {item.title}
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform duration-200 ${
                                                    showAnalyticsDropdown ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {showAnalyticsDropdown && (
                                            <div className='absolute top-full left-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white/95 shadow-xl backdrop-blur-xl'>
                                                <div className='p-2'>
                                                    {analyticsTools.map((tool) => (
                                                        <Link
                                                            key={tool.title}
                                                            href={tool.url}
                                                            onClick={() => setShowAnalyticsDropdown(false)}
                                                            className='flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-all hover:bg-emerald-50 hover:text-emerald-700'>
                                                            <div className='flex h-7 w-7 items-center justify-center rounded-md bg-emerald-100 text-emerald-600'>
                                                                {tool.icon}
                                                            </div>
                                                            <span className='font-medium'>{tool.title}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // Regular menu items
                                    <Link
                                        href={item.url}
                                        className={`text-[0.95rem] font-medium tracking-wider transition-all duration-200 hover:scale-105 hover:text-emerald-700 ${
                                            isActivePage(item.url, item.hash)
                                                ? 'font-semibold text-emerald-600 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                                                : 'text-gray-700'
                                        }`}>
                                        {item.title}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* RIGHT — AUTH BUTTONS */}
                    <div className='flex flex-1 items-center justify-end gap-3'>
                        <Button
                            asChild
                            variant='outline'
                            size='sm'
                            className='hidden rounded-full border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 md:inline-flex'>
                            <Link href='/login'>Log In</Link>
                        </Button>

                        <Button
                            size='sm'
                            className='hidden rounded-full bg-emerald-600 text-white hover:bg-emerald-700 md:inline-flex'
                            onClick={() => setShowSignUpModal(true)}>
                            Sign Up
                        </Button>
                    </div>
                </div>
            </nav>

            <SignUpModal isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)} />
        </>
    );
};

export default Navbar;
