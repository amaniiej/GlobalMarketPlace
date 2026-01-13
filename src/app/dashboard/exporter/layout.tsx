// app/dashboard/exporter/layout.tsx
'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

import {
    BarChart3,
    Calculator,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    CreditCard,
    DollarSign,
    FileText,
    LayoutDashboard,
    LogOut,
    Menu,
    MoreVertical,
    Package,
    Percent,
    Search,
    Settings,
    TrendingUp,
    User,
    Users,
    X
} from 'lucide-react';

// app/dashboard/exporter/layout.tsx

export default function ExporterLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        markets: true,
        workspace: true,
        tools: true,
        network: false
    });

    const [currentUser, setCurrentUser] = useState<{ name: string; email: string }>({
        name: 'Loading...',
        email: 'Loading...'
    });

    const fontFamily = 'Helvetica, Arial, sans-serif';

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const supabase = createClient();
                const {
                    data: { session }
                } = await supabase.auth.getSession();

                if (session?.user) {
                    const { data: profile, error } = await supabase
                        .from('profiles')
                        .select('full_name, email')
                        .eq('id', session.user.id)
                        .single();

                    if (!error && profile) {
                        setCurrentUser({
                            name: profile.full_name || session.user.email?.split('@')[0] || 'User',
                            email: profile.email || session.user.email || ''
                        });
                    } else {
                        setCurrentUser({
                            name: session.user.email?.split('@')[0] || 'User',
                            email: session.user.email || ''
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.profile-menu-container')) setShowProfileMenu(false);
        };
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleSection = (sectionKey: string) => {
        setExpandedSections((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
    };

    const navSections = [
        {
            key: 'dashboard',
            title: '',
            items: [{ title: 'Dashboard', href: '/dashboard/exporter', icon: LayoutDashboard }]
        },
        {
            key: 'markets',
            title: 'Markets',
            items: [
                { title: 'ECX Prices', href: '/dashboard/markets/ecx', icon: BarChart3 },
                { title: 'FX Rates', href: '/dashboard/markets/fx', icon: DollarSign }
            ]
        },
        {
            key: 'workspace',
            title: 'Workspace',
            items: [
                { title: 'Orders', href: '/dashboard/workspace/orders', icon: Package },
                { title: 'HS Codes', href: '/dashboard/workspace/hs-codes', icon: Search },
                { title: 'Documents', href: '/dashboard/workspace/documents', icon: FileText }
            ]
        },
        {
            key: 'tools',
            title: 'Tools',
            items: [
                { title: 'Profit Calculator', href: '/dashboard/tools/profit', icon: Calculator },
                { title: 'Incoterms', href: '/dashboard/tools/incoterms', icon: TrendingUp },
                { title: 'Margin Checker', href: '/dashboard/tools/margin', icon: Percent }
            ]
        }
    ];

    const toggleSidebar = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSidebarCollapsed(!sidebarCollapsed);
        setShowProfileMenu(false);
    };

    const toggleProfileMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setShowProfileMenu(!showProfileMenu);
    };

    const handleLogout = async () => {
        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setShowProfileMenu(false);
            router.push('/login');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleProfile = () => {
        setShowProfileMenu(false);
        router.push('/dashboard/exporter/settings');
    };
    const handleSettings = () => {
        setShowProfileMenu(false);
        router.push('/dashboard/exporter/settings');
    };
    const handleBilling = () => {
        setShowProfileMenu(false);
        router.push('/dashboard/exporter/billing');
    };

    return (
        <div className='flex min-h-screen bg-gray-50' style={{ fontFamily }}>
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 flex h-screen flex-col transition-all duration-200 ease-out ${sidebarCollapsed ? 'w-14' : 'w-64'} hidden md:flex`}
                style={{ fontFamily, backgroundColor: '#012116', borderRight: '1px solid #023b2d' }}>
                <div className='shrink-0'>
                    <div
                        className='flex h-14 items-center justify-between px-3'
                        style={{ borderBottom: '1px solid #023b2d' }}>
                        {!sidebarCollapsed ? (
                            <div className='flex items-center space-x-2'>
                                <div
                                    className='flex h-7 w-7 items-center justify-center rounded-md'
                                    style={{ backgroundColor: '#023b2d' }}>
                                    <span className='text-xs font-medium text-white'>EX</span>
                                </div>
                                <span className='text-sm font-medium' style={{ color: '#ffffff' }}>
                                    Export Hub
                                </span>
                            </div>
                        ) : (
                            <div
                                className='mx-auto flex h-7 w-7 items-center justify-center rounded-md'
                                style={{ backgroundColor: '#023b2d' }}>
                                <span className='text-xs font-medium text-white'>EX</span>
                            </div>
                        )}
                        <button
                            onClick={toggleSidebar}
                            className='rounded p-1.5 transition-colors hover:opacity-80'
                            style={{ backgroundColor: '#023b2d', color: '#8fa3b0' }}>
                            {sidebarCollapsed ? (
                                <ChevronRight className='h-4 w-4' />
                            ) : (
                                <ChevronLeft className='h-4 w-4' />
                            )}
                        </button>
                    </div>
                </div>

                <div className='flex-1 overflow-y-auto py-2'>
                    <nav className='space-y-0.5 px-1.5'>
                        {navSections.map((section) => {
                            if (section.key === 'dashboard') {
                                const item = section.items[0];
                                const Icon = item.icon;
                                const isActive = pathname === item.href;

                                return (
                                    <div key={section.key} className='mb-3'>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center rounded-md px-2.5 py-1.5 text-sm font-normal transition-all ${sidebarCollapsed ? 'justify-center' : ''} ${isActive ? 'border-l-2' : ''}`}
                                            style={{
                                                backgroundColor: isActive ? '#023b2d' : 'transparent',
                                                color: isActive ? '#ffffff' : '#b0bec5',
                                                borderLeftColor: isActive ? '#02946c' : 'transparent',
                                                marginLeft: sidebarCollapsed ? '0' : '0.25rem',
                                                marginRight: sidebarCollapsed ? '0' : '0.25rem'
                                            }}
                                            title={sidebarCollapsed ? item.title : ''}>
                                            <Icon className={`h-4 w-4 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                                            {!sidebarCollapsed && <span className='text-sm'>{item.title}</span>}
                                        </Link>
                                    </div>
                                );
                            }

                            return (
                                <div key={section.key} className='mb-2'>
                                    {!sidebarCollapsed && (
                                        <button
                                            onClick={() => toggleSection(section.key)}
                                            className='flex w-full items-center justify-between px-3 py-1.5 text-xs font-medium hover:opacity-90'
                                            style={{ color: '#8fa3b0' }}>
                                            <span className='tracking-wider uppercase'>{section.title}</span>
                                            {expandedSections[section.key] ? (
                                                <ChevronUp className='h-3 w-3' />
                                            ) : (
                                                <ChevronDown className='h-3 w-3' />
                                            )}
                                        </button>
                                    )}
                                    <div
                                        className={`${!sidebarCollapsed && !expandedSections[section.key] ? 'hidden' : ''} space-y-0.5`}>
                                        {section.items.map((item) => {
                                            const Icon = item.icon;
                                            const isActive = pathname === item.href;

                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={`flex items-center rounded-md px-2.5 py-1.5 text-sm font-normal transition-all ${sidebarCollapsed ? 'justify-center' : ''} ${isActive ? 'border-l-2' : ''}`}
                                                    style={{
                                                        backgroundColor: isActive ? '#023b2d' : 'transparent',
                                                        color: isActive ? '#ffffff' : '#b0bec5',
                                                        borderLeftColor: isActive ? '#02946c' : 'transparent',
                                                        marginLeft: sidebarCollapsed ? '0' : '0.25rem',
                                                        marginRight: sidebarCollapsed ? '0' : '0.25rem'
                                                    }}
                                                    title={sidebarCollapsed ? item.title : ''}>
                                                    <Icon className={`h-3.5 w-3.5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                                                    {!sidebarCollapsed && <span className='text-sm'>{item.title}</span>}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* Profile Menu */}
                <div className='profile-menu-container shrink-0' style={{ borderTop: '1px solid #023b2d' }}>
                    <div className='relative p-2'>
                        <div
                            className={`${sidebarCollapsed ? 'flex justify-center' : 'flex items-center justify-between'}`}>
                            {!sidebarCollapsed && (
                                <div className='flex items-center space-x-2'>
                                    <div
                                        className='flex h-6 w-6 items-center justify-center rounded-full'
                                        style={{ backgroundColor: '#023b2d' }}>
                                        <User className='h-3 w-3' style={{ color: '#8fa3b0' }} />
                                    </div>
                                    <div className='min-w-0 flex-1'>
                                        <p className='truncate text-xs font-medium' style={{ color: '#ffffff' }}>
                                            {currentUser.name}
                                        </p>
                                        <p className='truncate text-xs' style={{ color: '#8fa3b0' }}>
                                            {currentUser.email}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={toggleProfileMenu}
                                className={`rounded p-1 transition-colors hover:opacity-90 ${sidebarCollapsed ? '' : 'ml-1'}`}
                                style={{ backgroundColor: showProfileMenu ? '#023b2d' : '#023b2d', color: '#8fa3b0' }}>
                                <MoreVertical className='h-3.5 w-3.5' />
                            </button>
                        </div>

                        {showProfileMenu && (
                            <div
                                className={`absolute bottom-full z-50 mb-1 rounded-md border py-1 shadow-lg ${sidebarCollapsed ? 'right-0' : 'right-0'}`}
                                style={{ backgroundColor: '#012116', borderColor: '#023b2d', minWidth: '10rem' }}
                                onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={handleProfile}
                                    className='flex w-full items-center px-3 py-2 text-left text-xs transition-colors hover:opacity-90'
                                    style={{ color: '#b0bec5' }}>
                                    <User className='mr-2 h-3 w-3' /> Profile
                                </button>
                                <button
                                    onClick={handleSettings}
                                    className='flex w-full items-center px-3 py-2 text-left text-xs transition-colors hover:opacity-90'
                                    style={{ color: '#b0bec5' }}>
                                    <Settings className='mr-2 h-3 w-3' /> Settings
                                </button>
                                <button
                                    onClick={handleBilling}
                                    className='flex w-full items-center px-3 py-2 text-left text-xs transition-colors hover:opacity-90'
                                    style={{ color: '#b0bec5' }}>
                                    <CreditCard className='mr-2 h-3 w-3' /> Billing
                                </button>
                                <div className='my-1' style={{ borderTop: '1px solid #023b2d' }}></div>
                                <button
                                    onClick={handleLogout}
                                    className='flex w-full items-center px-3 py-2 text-left text-xs transition-colors hover:opacity-90'
                                    style={{ color: '#ff6b6b' }}>
                                    <LogOut className='mr-2 h-3 w-3' /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            <main
                className={`flex-1 overflow-y-auto ${sidebarCollapsed ? 'md:ml-14' : 'md:ml-64'} min-h-screen pt-14 md:pt-0`}>
                <div className='p-4 md:p-6'>{children}</div>
            </main>
        </div>
    );
}
