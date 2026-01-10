// In app/dashboard/exporter/layout.tsx - REPLACE the SidebarNav import with:
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ... then replace <SidebarNav items={navItems} /> with:

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
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}>
                <Icon className='h-4 w-4' />
                {item.title}
            </Link>
        );
    })}
</nav>;
