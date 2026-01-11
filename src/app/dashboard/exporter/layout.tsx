// app/dashboard/exporter/layout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    BarChart3,
    Building,
    Calculator,
    Coffee,
    CreditCard,
    FileText,
    Globe,
    LayoutDashboard,
    Package,
    Settings,
    Ship,
    TrendingUp,
    Users
} from 'lucide-react';

// app/dashboard/exporter/layout.tsx

// app/dashboard/exporter/layout.tsx

export default function ExporterLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { title: 'Dashboard', href: '/dashboard/exporter', icon: LayoutDashboard },
        { title: 'My Products', href: '/dashboard/exporter/products', icon: Package },
        { title: 'Orders', href: '/dashboard/exporter/orders', icon: FileText },
        { title: 'Buyers', href: '/dashboard/exporter/buyers', icon: Users },
        { title: 'Shipments', href: '/dashboard/exporter/shipments', icon: Ship },
        { title: 'Market Insights', href: '/dashboard/exporter/insights', icon: TrendingUp },
        { title: 'Payments', href: '/dashboard/exporter/payments', icon: CreditCard },
        { title: 'Settings', href: '/dashboard/exporter/settings', icon: Settings }
    ];

    return (
        <div className='flex min-h-screen bg-linear-to-br from-emerald-50 to-white'>
            {/* Exporter Sidebar - Green Theme */}
            <aside className='hidden w-64 border-r border-emerald-100 bg-white/80 shadow-sm backdrop-blur-sm md:block'>
                <div className='border-b border-emerald-100 p-6'>
                    <div className='flex items-center space-x-3'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100'>
                            <span className='font-bold text-emerald-700'>ET</span>
                            <Coffee className='ml-1 h-5 w-5 text-emerald-600' />
                        </div>
                        <div>
                            <h2 className='font-bold text-emerald-900'>Ethiopian Exporter</h2>
                            <p className='text-xs text-emerald-600'>Premium Account</p>
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
                                        ? 'border-l-4 border-emerald-500 bg-emerald-50 text-emerald-700'
                                        : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-900'
                                }`}>
                                <Icon className='h-4 w-4' />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>

                <div className='mt-auto border-t border-emerald-100 p-6'>
                    <div className='rounded-lg border border-emerald-100 bg-emerald-50 p-4'>
                        <p className='text-sm font-medium text-emerald-800'>🇪🇹 Export Ready</p>
                        <p className='mt-1 text-xs text-emerald-600'>Your products are visible to 500+ buyers</p>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className='fixed top-0 right-0 left-0 z-10 border-b border-emerald-100 bg-white p-4 md:hidden'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100'>
                            <Building className='h-4 w-4 text-emerald-600' />
                        </div>
                        <span className='font-bold text-emerald-900'>Exporter Dashboard</span>
                    </div>
                    <button className='rounded-lg bg-emerald-100 p-2'>
                        <svg className='h-5 w-5 text-emerald-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
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
