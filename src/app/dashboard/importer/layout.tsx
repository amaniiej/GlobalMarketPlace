// app/dashboard/importer/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Bell,
    Building,
    DollarSign,
    FileText,
    Globe,
    Heart,
    LayoutDashboard,
    Package,
    Search,
    Settings,
    ShoppingCart,
    TrendingUp,
    Users
} from 'lucide-react';

// app/dashboard/importer/layout.tsx

// app/dashboard/importer/layout.tsx

export default function ImporterLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { title: 'Dashboard', href: '/dashboard/importer', icon: LayoutDashboard },
        { title: 'Browse Products', href: '/dashboard/importer/browse', icon: Search },
        { title: 'My Cart', href: '/dashboard/importer/cart', icon: ShoppingCart },
        { title: 'Favorites', href: '/dashboard/importer/favorites', icon: Heart },
        { title: 'Orders', href: '/dashboard/importer/orders', icon: Package },
        { title: 'Exporters', href: '/dashboard/importer/exporters', icon: Globe },
        { title: 'Notifications', href: '/dashboard/importer/notifications', icon: Bell },
        { title: 'Settings', href: '/dashboard/importer/settings', icon: Settings }
    ];

    return (
        <div className='flex min-h-screen bg-linear-to-br from-blue-50 to-white'>
            {/* Importer Sidebar - Blue Theme */}
            <aside className='hidden w-64 border-r border-blue-100 bg-white/80 shadow-sm backdrop-blur-sm md:block'>
                <div className='border-b border-blue-100 p-6'>
                    <div className='flex items-center space-x-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100'>
                            <span className='font-bold text-blue-700'>IB</span>
                            <Globe className='ml-1 h-5 w-5 text-blue-600' />
                        </div>
                        <div>
                            <h2 className='font-bold text-blue-900'>International Importer</h2>
                            <p className='text-xs text-blue-600'>Global Access</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className='flex flex-col space-y-1 p-4'>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                                    isActive
                                        ? 'border-l-4 border-blue-500 bg-blue-50 text-blue-700'
                                        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-900'
                                }`}>
                                <Icon className='h-4 w-4' />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>

                <div className='mt-auto border-t border-blue-100 p-6'>
                    <div className='rounded-lg border border-blue-100 bg-blue-50 p-4'>
                        <p className='text-sm font-medium text-blue-800'>🌍 Global Access</p>
                        <p className='mt-1 text-xs text-blue-600'>Connected to 200+ Ethiopian exporters</p>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className='fixed top-0 right-0 left-0 z-10 border-b border-blue-100 bg-white p-4 md:hidden'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100'>
                            <Globe className='h-4 w-4 text-blue-600' />
                        </div>
                        <span className='font-bold text-blue-900'>Importer Dashboard</span>
                    </div>
                    <button className='rounded-lg bg-blue-100 p-2'>
                        <svg className='h-5 w-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className='flex-1 overflow-auto pt-16 md:pt-0'>{children}</main>
        </div>
    );
}
