// app/dashboard/importer/layout.tsx
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

// app/dashboard/importer/layout.tsx

// app/dashboard/importer/layout.tsx

// app/dashboard/importer/layout.tsx

// app/dashboard/importer/layout.tsx

// Make sure this path is correct

export default function ImporterLayout({ children }: { children: React.ReactNode }) {
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

    // User state - will be populated from Supabase
    const [currentUser, setCurrentUser] = useState<{
        name: string;
        email: string;
    }>({
        name: 'Loading...',
        email: 'Loading...'
    });

    const fontFamily = 'Helvetica, Arial, sans-serif';

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const supabase = createClient();

                // Get current session
                const {
                    data: { session }
                } = await supabase.auth.getSession();

                if (session?.user) {
                    // Get user profile from your profiles table
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
                        // Fallback to auth user data
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
            if (!target.closest('.profile-menu-container')) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const toggleSection = (sectionKey: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionKey]: !prev[sectionKey]
        }));
    };

    const navSections = [
        {
            key: 'dashboard',
            title: '',
            items: [{ title: 'Dashboard', href: '/dashboard/importer', icon: LayoutDashboard }]
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
                { title: 'Shipments', href: '/dashboard/workspace/shipments', icon: Package },
                { title: 'HS Codes', href: '/dashboard/workspace/hs-codes', icon: Search },
                { title: 'Documents', href: '/dashboard/workspace/documents', icon: FileText }
            ]
        },
        {
            key: 'tools',
            title: 'Tools',
            items: [
                { title: 'Landed Cost', href: '/dashboard/tools/landed-cost', icon: Calculator },
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

            // Sign out from Supabase
            const { error } = await supabase.auth.signOut();

            if (error) {
                console.error('Logout error:', error);
                alert('Logout failed. Please try again.');

                return;
            }

            // Close the profile menu
            setShowProfileMenu(false);

            // Redirect to login page
            router.push('/login');
            router.refresh(); // Refresh to update auth state
        } catch (error) {
            console.error('Logout error:', error);
            alert('An error occurred during logout.');
        }
    };

    const handleProfile = () => {
        setShowProfileMenu(false);
        router.push('/dashboard/importer/settings');
    };

    const handleSettings = () => {
        setShowProfileMenu(false);
        router.push('/dashboard/importer/settings');
    };

    const handleBilling = () => {
        setShowProfileMenu(false);
        router.push('/dashboard/importer/billing');
    };

    return (
        <div className='flex min-h-screen bg-gray-50' style={{ fontFamily }}>
            {/* Fixed Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 flex h-screen flex-col transition-all duration-200 ease-out ${sidebarCollapsed ? 'w-14' : 'w-64'} hidden md:flex`}
                style={{
                    fontFamily,
                    backgroundColor: '#071c24',
                    borderRight: '1px solid #0a2733'
                }}>
                {/* Sidebar Header */}
                <div className='shrink-0'>
                    <div
                        className='flex h-14 items-center justify-between px-3'
                        style={{ borderBottom: '1px solid #0a2733' }}>
                        {!sidebarCollapsed ? (
                            <div className='flex items-center space-x-2'>
                                <div
                                    className='flex h-7 w-7 items-center justify-center rounded-md'
                                    style={{ backgroundColor: '#023b52' }}>
                                    <span className='text-xs font-medium text-white'>IH</span>
                                </div>
                                <span className='text-sm font-medium' style={{ color: '#ffffff' }}>
                                    Import Hub
                                </span>
                            </div>
                        ) : (
                            <div
                                className='mx-auto flex h-7 w-7 items-center justify-center rounded-md'
                                style={{ backgroundColor: '#023b52' }}>
                                <span className='text-xs font-medium text-white'>IH</span>
                            </div>
                        )}

                        {/* Toggle Button */}
                        <button
                            onClick={toggleSidebar}
                            className='rounded p-1.5 transition-colors hover:opacity-80'
                            style={{ backgroundColor: '#0a2733', color: '#8fa3b0' }}
                            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
                            {sidebarCollapsed ? (
                                <ChevronRight className='h-4 w-4' />
                            ) : (
                                <ChevronLeft className='h-4 w-4' />
                            )}
                        </button>
                    </div>
                </div>

                {/* Navigation - Scrollable */}
                <div className='flex-1 overflow-y-auto py-2'>
                    <nav className='space-y-0.5 px-1.5'>
                        {navSections.map((section) => {
                            // Dashboard is always visible
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
                                                backgroundColor: isActive ? '#023b52' : 'transparent',
                                                color: isActive ? '#ffffff' : '#b0bec5',
                                                borderLeftColor: isActive ? '#0294c8' : 'transparent',
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

                            // Other sections with collapsible feature
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

                                    {/* Section Items */}
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
                                                        backgroundColor: isActive ? '#023b52' : 'transparent',
                                                        color: isActive ? '#ffffff' : '#b0bec5',
                                                        borderLeftColor: isActive ? '#0294c8' : 'transparent',
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

                {/* Profile Menu at Bottom - Fixed */}
                <div className='profile-menu-container shrink-0' style={{ borderTop: '1px solid #0a2733' }}>
                    <div className='relative p-2'>
                        <div
                            className={`${sidebarCollapsed ? 'flex justify-center' : 'flex items-center justify-between'}`}>
                            {/* User Info (hidden when collapsed) */}
                            {!sidebarCollapsed && (
                                <div className='flex items-center space-x-2'>
                                    <div
                                        className='flex h-6 w-6 items-center justify-center rounded-full'
                                        style={{ backgroundColor: '#0a2733' }}>
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

                            {/* Three-dot Menu Button */}
                            <button
                                onClick={toggleProfileMenu}
                                className={`rounded p-1 transition-colors hover:opacity-90 ${sidebarCollapsed ? '' : 'ml-1'}`}
                                style={{
                                    backgroundColor: showProfileMenu ? '#023b52' : '#0a2733',
                                    color: '#8fa3b0'
                                }}
                                aria-label='Account actions'>
                                <MoreVertical className='h-3.5 w-3.5' />
                            </button>
                        </div>

                        {/* Profile Dropdown Menu */}
                        {showProfileMenu && (
                            <div
                                className={`absolute bottom-full z-50 mb-1 rounded-md border py-1 shadow-lg ${sidebarCollapsed ? 'right-0' : 'right-0'}`}
                                style={{
                                    backgroundColor: '#071c24',
                                    borderColor: '#023b52',
                                    minWidth: '10rem',
                                    bottom: '100%',
                                    marginBottom: '0.25rem'
                                }}
                                onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={handleProfile}
                                    className='flex w-full items-center px-3 py-2 text-left text-xs transition-colors hover:opacity-90'
                                    style={{ color: '#b0bec5' }}>
                                    <User className='mr-2 h-3 w-3' />
                                    Profile
                                </button>
                                <button
                                    onClick={handleSettings}
                                    className='flex w-full items-center px-3 py-2 text-left text-xs transition-colors hover:opacity-90'
                                    style={{ color: '#b0bec5' }}>
                                    <Settings className='mr-2 h-3 w-3' />
                                    Settings
                                </button>
                                <button
                                    onClick={handleBilling}
                                    className='flex w-full items-center px-3 py-2 text-left text-xs transition-colors hover:opacity-90'
                                    style={{ color: '#b0bec5' }}>
                                    <CreditCard className='mr-2 h-3 w-3' />
                                    Billing
                                </button>
                                <div className='my-1' style={{ borderTop: '1px solid #023b52' }}></div>
                                <button
                                    onClick={handleLogout}
                                    className='flex w-full items-center px-3 py-2 text-left text-xs transition-colors hover:opacity-90'
                                    style={{ color: '#ff6b6b' }}>
                                    <LogOut className='mr-2 h-3 w-3' />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div
                className='fixed top-0 right-0 left-0 z-30 flex h-14 items-center justify-between px-4 md:hidden'
                style={{ backgroundColor: '#071c24', borderBottom: '1px solid #0a2733' }}>
                <button
                    onClick={toggleSidebar}
                    className='rounded p-2 hover:opacity-80'
                    style={{ color: '#8fa3b0' }}
                    aria-label='Toggle sidebar'>
                    <Menu className='h-5 w-5' />
                </button>
                <span className='text-sm font-medium' style={{ color: '#ffffff' }}>
                    Import Hub
                </span>
                <button className='rounded p-2 hover:opacity-80' style={{ color: '#8fa3b0' }}>
                    <MoreVertical className='h-5 w-5' />
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarCollapsed && (
                <div className='bg-opacity-30 fixed inset-0 z-30 bg-black md:hidden' onClick={toggleSidebar} />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 flex h-screen w-64 flex-col transition-transform duration-200 ease-out md:hidden ${sidebarCollapsed ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ backgroundColor: '#071c24', borderRight: '1px solid #0a2733' }}>
                <div className='shrink-0'>
                    <div
                        className='flex h-14 items-center justify-between px-4'
                        style={{ borderBottom: '1px solid #0a2733' }}>
                        <div className='flex items-center space-x-2.5'>
                            <div
                                className='flex h-7 w-7 items-center justify-center rounded-md'
                                style={{ backgroundColor: '#023b52' }}>
                                <span className='text-xs font-medium text-white'>IH</span>
                            </div>
                            <span className='text-sm font-medium' style={{ color: '#ffffff' }}>
                                Import Hub
                            </span>
                        </div>
                        <button
                            onClick={toggleSidebar}
                            className='rounded p-1.5 hover:opacity-80'
                            style={{ color: '#8fa3b0' }}
                            aria-label='Close sidebar'>
                            <X className='h-4 w-4' />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation - Scrollable */}
                <div className='flex-1 overflow-y-auto py-2'>
                    <nav className='space-y-0.5 px-2'>
                        {navSections.map((section) => (
                            <div key={section.key} className='mb-2'>
                                <div className='mb-1 px-3'>
                                    <span
                                        className='text-xs font-medium tracking-wider uppercase'
                                        style={{ color: '#8fa3b0' }}>
                                        {section.title}
                                    </span>
                                </div>
                                <div className='space-y-0.5'>
                                    {section.items.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href;

                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setSidebarCollapsed(false)}
                                                className={`flex items-center rounded-md px-3 py-1.5 text-sm font-normal transition-all ${isActive ? 'border-l-2' : ''}`}
                                                style={{
                                                    backgroundColor: isActive ? '#023b52' : 'transparent',
                                                    color: isActive ? '#ffffff' : '#b0bec5',
                                                    borderLeftColor: isActive ? '#0294c8' : 'transparent',
                                                    marginLeft: '0.25rem',
                                                    marginRight: '0.25rem'
                                                }}>
                                                <Icon className='mr-3 h-3.5 w-3.5' />
                                                <span className='text-sm'>{item.title}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* Mobile Profile Menu */}
                <div className='shrink-0' style={{ borderTop: '1px solid #0a2733' }}>
                    <div className='p-3'>
                        <div className='flex items-center space-x-2.5'>
                            <div
                                className='flex h-8 w-8 items-center justify-center rounded-full'
                                style={{ backgroundColor: '#0a2733' }}>
                                <User className='h-4 w-4' style={{ color: '#8fa3b0' }} />
                            </div>
                            <div>
                                <p className='text-sm font-medium' style={{ color: '#ffffff' }}>
                                    {currentUser.name}
                                </p>
                                <p className='text-xs' style={{ color: '#8fa3b0' }}>
                                    {currentUser.email}
                                </p>
                            </div>
                        </div>
                        <div className='mt-3 space-y-1'>
                            <button
                                onClick={handleProfile}
                                className='flex w-full items-center px-2 py-1.5 text-left text-xs hover:opacity-90'
                                style={{ color: '#b0bec5' }}>
                                <User className='mr-2 h-3 w-3' /> Profile
                            </button>
                            <button
                                onClick={handleSettings}
                                className='flex w-full items-center px-2 py-1.5 text-left text-xs hover:opacity-90'
                                style={{ color: '#b0bec5' }}>
                                <Settings className='mr-2 h-3 w-3' /> Settings
                            </button>
                            <button
                                onClick={handleBilling}
                                className='flex w-full items-center px-2 py-1.5 text-left text-xs hover:opacity-90'
                                style={{ color: '#b0bec5' }}>
                                <CreditCard className='mr-2 h-3 w-3' /> Billing
                            </button>
                            <div className='my-1' style={{ borderTop: '1px solid #023b52' }}></div>
                            <button
                                onClick={handleLogout}
                                className='flex w-full items-center px-2 py-1.5 text-left text-xs hover:opacity-90'
                                style={{ color: '#ff6b6b' }}>
                                <LogOut className='mr-2 h-3 w-3' /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`flex-1 overflow-y-auto ${sidebarCollapsed ? 'md:ml-14' : 'md:ml-64'} min-h-screen pt-14 md:pt-0`}>
                <div className='p-4 md:p-6'>{children}</div>
            </main>
        </div>
    );
}
