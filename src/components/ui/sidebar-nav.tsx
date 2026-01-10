// src/components/ui/sidebar-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

import { LucideIcon } from 'lucide-react';

// src/components/ui/sidebar-nav.tsx

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items: {
        href: string;
        title: string;
        icon: LucideIcon;
    }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
    const pathname = usePathname();

    return (
        <nav className={cn('flex space-x-2 p-4 lg:flex-col lg:space-y-1 lg:space-x-0', className)} {...props}>
            {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-slate-100 hover:text-slate-900',
                            isActive
                                ? 'border-l-4 border-emerald-500 bg-emerald-50 text-emerald-700'
                                : 'text-slate-600 hover:text-slate-900'
                        )}>
                        <Icon className='h-4 w-4' />
                        {item.title}
                    </Link>
                );
            })}
        </nav>
    );
}
