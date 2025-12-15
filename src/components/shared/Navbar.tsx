'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function Navbar() {
    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'What We Do', href: '#services' },
        { name: 'Blog Posts', href: '/blog' },
        { name: 'Price Updates', href: '/pricesUpdates' },
        { name: 'About Us', href: '#about' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <nav className='sticky top-0 z-50 border-b bg-white'>
            <div className='container mx-auto flex h-16 items-center justify-between px-4'>
                {/* Logo */}
                <div className='flex items-center gap-3'>
                    <div className='h-10 w-10 rounded-lg bg-green-600' />
                    <div>
                        <div className='text-xl font-bold text-gray-900'>AGROSPACE</div>
                        <div className='text-sm text-gray-500'>Ethiopian Agricultural Export</div>
                    </div>
                </div>

                {/* Navigation Links */}
                <div className='hidden items-center gap-8 md:flex'>
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className='text-gray-700 hover:text-green-600'>
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Order Now Button */}
                <Button className='bg-green-600 hover:bg-green-700'>
                    <Link href='https://tally.so/r/Y5Pl2z' target='_blank'>
                        Order Now
                    </Link>
                </Button>
            </div>
        </nav>
    );
}
