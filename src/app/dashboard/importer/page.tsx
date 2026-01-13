// /home/amanuel/Documents/AGROSPACE Site/src/app/dashboard/importer/page.tsx
'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
    AlertCircle,
    ArrowUpRight,
    BarChart3,
    Calculator,
    CheckCircle,
    ChevronRight,
    DollarSign,
    ExternalLink,
    FileText,
    Globe,
    Package,
    Percent,
    Search,
    Shield,
    Star,
    TrendingDown,
    TrendingUp,
    Zap
} from 'lucide-react';

// /home/amanuel/Documents/AGROSPACE Site/src/app/dashboard/importer/page.tsx

// /home/amanuel/Documents/AGROSPACE Site/src/app/dashboard/importer/page.tsx

// /home/amanuel/Documents/AGROSPACE Site/src/app/dashboard/importer/page.tsx

// /home/amanuel/Documents/AGROSPACE Site/src/app/dashboard/importer/page.tsx

export default function ImporterDashboard() {
    const [savedShipments] = useState(3);
    const [maxShipments] = useState(3);
    const [hsLookups] = useState(18);
    const [maxHsLookups] = useState(20);
    const [fxAlerts] = useState(2);

    // Live market data
    const ecxPrices = [
        { commodity: 'Coffee (Arabica)', price: '3,450 ETB/kg', change: '+2.4%', isUp: true, isSaved: true },
        { commodity: 'Sesame Seeds', price: '5,210 ETB/kg', change: '-1.2%', isUp: false, isSaved: true },
        { commodity: 'Oil Seeds', price: '3,120 ETB/kg', change: '-0.3%', isUp: false, isSaved: false }
    ];

    const fxPairs = [
        { pair: 'USD/ETB', rate: '57.25', change: '+0.15' },
        { pair: 'EUR/ETB', rate: '62.10', change: '-0.08' },
        { pair: 'GBP/ETB', rate: '72.45', change: '+0.22' }
    ];

    const savedShipmentsList = [
        { id: 1, route: 'Addis → Hamburg', incoterm: 'CIF', price: '$12,450', commodity: 'Coffee' },
        { id: 2, route: 'Dire Dawa → Rotterdam', incoterm: 'FOB', price: '$8,720', commodity: 'Sesame' },
        { id: 3, route: 'Hawassa → Antwerp', incoterm: 'EXW', price: '$15,300', commodity: 'Chat' }
    ];

    const savedHsCodes = [
        { code: '0901.11.00', description: 'Coffee, not decaffeinated', duty: 'Free' },
        { code: '1207.40.00', description: 'Sesame seeds', duty: '2.6¢/kg' },
        { code: '1404.90.00', description: 'Chat', duty: 'Free' },
        { code: '0713.33.40', description: 'Kidney beans', duty: '1.5¢/kg' }
    ];

    const essentialTools = [
        {
            title: 'Incoterm Comparator',
            description: 'Compare costs across incoterms',
            icon: Calculator,
            href: '/dashboard/tools/incoterms',
            color: 'bg-blue-50 text-blue-600 border-blue-100'
        },
        {
            title: 'HS Lookup',
            description: 'Search tariff codes & duties',
            icon: Search,
            href: '/dashboard/workspace/hs-codes',
            color: 'bg-green-50 text-green-600 border-green-100'
        },
        {
            title: 'Margin Checker',
            description: 'Calculate profit margins',
            icon: Percent,
            href: '/dashboard/tools/margin',
            color: 'bg-purple-50 text-purple-600 border-purple-100'
        },
        {
            title: 'Document Checklist',
            description: 'Export compliance checklist',
            icon: FileText,
            href: '/dashboard/workspace/documents',
            color: 'bg-amber-50 text-amber-600 border-amber-100'
        }
    ];

    const showUpgradeCTA = hsLookups > maxHsLookups * 0.7 || savedShipments >= maxShipments;

    return (
        <div className='min-h-screen bg-gray-50' style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <div className='mx-auto max-w-7xl'>
                {/* Welcome Header */}
                <div className='mb-6 pt-2'>
                    <h1 className='text-2xl font-medium text-gray-900'>Welcome back, John</h1>
                    <p className='mt-1 text-sm text-gray-500'>Your daily trade dashboard</p>
                </div>

                {/* 1. TOP SIGNAL BAR */}
                <div className='mb-6'>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
                        {/* ECX Coffee Price */}
                        <Link
                            href='/dashboard/markets/ecx'
                            className='rounded-lg border p-4 transition-all hover:border-blue-300 hover:shadow-sm'
                            style={{ backgroundColor: '#023b52', borderColor: '#0a5468' }}>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='mb-1 text-xs' style={{ color: '#8fa3b0' }}>
                                        ECX Coffee
                                    </p>
                                    <p className='text-lg font-medium' style={{ color: '#ffffff' }}>
                                        3,450 ETB/kg
                                    </p>
                                    <div className='mt-1 flex items-center'>
                                        <TrendingUp className='mr-1 h-3 w-3' style={{ color: '#4ade80' }} />
                                        <span className='text-xs' style={{ color: '#4ade80' }}>
                                            +2.4% today
                                        </span>
                                    </div>
                                </div>
                                <BarChart3 className='h-5 w-5' style={{ color: '#60a5fa' }} />
                            </div>
                        </Link>

                        {/* USD/ETB Rate */}
                        <Link
                            href='/dashboard/markets/fx'
                            className='rounded-lg border p-4 transition-all hover:border-blue-300 hover:shadow-sm'
                            style={{ backgroundColor: '#023b52', borderColor: '#0a5468' }}>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='mb-1 text-xs' style={{ color: '#8fa3b0' }}>
                                        USD/ETB
                                    </p>
                                    <p className='text-lg font-medium' style={{ color: '#ffffff' }}>
                                        57.25
                                    </p>
                                    <div className='mt-1 flex items-center'>
                                        <TrendingUp className='mr-1 h-3 w-3' style={{ color: '#4ade80' }} />
                                        <span className='text-xs' style={{ color: '#4ade80' }}>
                                            +0.15
                                        </span>
                                    </div>
                                </div>
                                <Globe className='h-5 w-5' style={{ color: '#4ade80' }} />
                            </div>
                        </Link>

                        {/* Active Alerts */}
                        <Link
                            href='/dashboard/notifications'
                            className='rounded-lg border p-4 transition-all hover:border-blue-300 hover:shadow-sm'
                            style={{ backgroundColor: '#023b52', borderColor: '#0a5468' }}>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='mb-1 text-xs' style={{ color: '#8fa3b0' }}>
                                        Active Alerts
                                    </p>
                                    <p className='text-lg font-medium' style={{ color: '#ffffff' }}>
                                        {fxAlerts} active
                                    </p>
                                    <p className='mt-1 text-xs' style={{ color: '#8fa3b0' }}>
                                        Price & FX triggers
                                    </p>
                                </div>
                                <AlertCircle className='h-5 w-5' style={{ color: '#fbbf24' }} />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* 2. KPI SNAPSHOT */}
                <div className='mb-8'>
                    <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
                        {/* Saved Shipments */}
                        <Link
                            href='/dashboard/workspace/shipments'
                            className='rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-sm'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='mb-1 text-xs text-gray-500'>Saved Shipments</p>
                                    <p className='text-lg font-medium text-gray-900'>
                                        {savedShipments} / {maxShipments}
                                    </p>
                                </div>
                                <Package className='h-5 w-5 text-blue-500' />
                            </div>
                            {savedShipments >= maxShipments && (
                                <div className='mt-2'>
                                    <span className='inline-flex items-center rounded bg-amber-50 px-2 py-1 text-xs text-amber-600'>
                                        <AlertCircle className='mr-1 h-3 w-3' />
                                        Max reached
                                    </span>
                                </div>
                            )}
                        </Link>

                        {/* HS Lookups */}
                        <Link
                            href='/dashboard/workspace/hs-codes'
                            className='rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-sm'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='mb-1 text-xs text-gray-500'>HS Lookups</p>
                                    <p className='text-lg font-medium text-gray-900'>
                                        {hsLookups} / {maxHsLookups}
                                    </p>
                                    <div className='mt-2 h-1.5 w-full rounded-full bg-gray-200'>
                                        <div
                                            className='h-1.5 rounded-full bg-green-500'
                                            style={{ width: `${(hsLookups / maxHsLookups) * 100}%` }}></div>
                                    </div>
                                </div>
                                <Search className='h-5 w-5 text-green-500' />
                            </div>
                        </Link>

                        {/* FX Alerts */}
                        <Link
                            href='/dashboard/markets/fx'
                            className='rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-sm'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='mb-1 text-xs text-gray-500'>FX Alerts</p>
                                    <p className='text-lg font-medium text-gray-900'>{fxAlerts}</p>
                                    <p className='mt-1 text-xs text-gray-500'>Price triggers</p>
                                </div>
                                <AlertCircle className='h-5 w-5 text-purple-500' />
                            </div>
                        </Link>

                        {/* Plan Status */}
                        <div className='rounded-lg border border-gray-200 bg-white p-4'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='mb-1 text-xs text-gray-500'>Plan</p>
                                    <p className='text-lg font-medium text-gray-900'>Free</p>
                                    <p className='mt-1 text-xs text-gray-500'>Basic features</p>
                                </div>
                                <Shield className='h-5 w-5 text-gray-400' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mb-8 space-y-6'>
                    {/* 3. LEFT: LIVE MARKETS PREVIEW */}
                    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 p-4'>
                            <div className='flex items-center justify-between'>
                                <h2 className='font-medium text-gray-900'>ECX Markets</h2>
                                <Link
                                    href='/dashboard/markets/ecx'
                                    className='flex items-center text-sm text-blue-600 hover:text-blue-700'>
                                    View full market
                                    <ArrowUpRight className='ml-1 h-3 w-3' />
                                </Link>
                            </div>
                        </div>

                        <div className='p-4'>
                            <table className='w-full'>
                                <thead>
                                    <tr className='border-b border-gray-100 text-xs text-gray-500'>
                                        <th className='pb-2 text-left font-medium'>Commodity</th>
                                        <th className='pb-2 text-left font-medium'>Price</th>
                                        <th className='pb-2 text-left font-medium'>Change</th>
                                        <th className='pb-2 text-left font-medium'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ecxPrices.map((item, index) => (
                                        <tr key={index} className='border-b border-gray-50 last:border-0'>
                                            <td className='py-3'>
                                                <span className='text-sm text-gray-900'>{item.commodity}</span>
                                            </td>
                                            <td className='py-3'>
                                                <span className='text-sm font-medium text-gray-900'>{item.price}</span>
                                            </td>
                                            <td className='py-3'>
                                                <div className='flex items-center'>
                                                    {item.isUp ? (
                                                        <TrendingUp className='mr-1 h-3 w-3 text-green-500' />
                                                    ) : (
                                                        <TrendingDown className='mr-1 h-3 w-3 text-red-500' />
                                                    )}
                                                    <span
                                                        className={`text-sm ${item.isUp ? 'text-green-600' : 'text-red-600'}`}>
                                                        {item.change}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className='py-3'>
                                                <button className='rounded p-1 hover:bg-gray-100'>
                                                    <Star
                                                        className={`h-4 w-4 ${item.isSaved ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 3. RIGHT: FX WATCHLIST PREVIEW */}
                    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 p-4'>
                            <div className='flex items-center justify-between'>
                                <h2 className='font-medium text-gray-900'>FX Watchlist</h2>
                                <Link
                                    href='/dashboard/markets/fx'
                                    className='flex items-center text-sm text-blue-600 hover:text-blue-700'>
                                    Manage FX
                                    <ArrowUpRight className='ml-1 h-3 w-3' />
                                </Link>
                            </div>
                        </div>

                        <div className='p-4'>
                            <div className='space-y-4'>
                                {fxPairs.map((pair, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center justify-between rounded-lg bg-gray-50 p-3'>
                                        <div>
                                            <p className='font-medium text-gray-900'>{pair.pair}</p>
                                            <p className='mt-0.5 text-xs text-gray-500'>Spot rate</p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-lg font-medium text-gray-900'>{pair.rate}</p>
                                            <div className='mt-0.5 flex items-center justify-end'>
                                                <TrendingUp className='mr-1 h-3 w-3 text-green-500' />
                                                <span className='text-xs text-green-600'>{pair.change}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. MY WORKSPACE */}
                <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
                    {/* Saved Shipments */}
                    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 p-4'>
                            <div className='flex items-center justify-between'>
                                <h2 className='font-medium text-gray-900'>Saved Shipments</h2>
                                <Link
                                    href='/dashboard/workspace/shipments'
                                    className='flex items-center text-sm text-blue-600 hover:text-blue-700'>
                                    View all
                                    <ArrowUpRight className='ml-1 h-3 w-3' />
                                </Link>
                            </div>
                        </div>

                        <div className='p-4'>
                            <div className='space-y-4'>
                                {savedShipmentsList.map((shipment) => (
                                    <div
                                        key={shipment.id}
                                        className='rounded-lg border border-gray-100 p-3 transition-colors hover:border-blue-200'>
                                        <div className='flex items-start justify-between'>
                                            <div>
                                                <p className='font-medium text-gray-900'>{shipment.route}</p>
                                                <div className='mt-2 flex items-center space-x-4'>
                                                    <span className='rounded bg-gray-100 px-2 py-1 text-xs text-gray-600'>
                                                        {shipment.incoterm}
                                                    </span>
                                                    <span className='text-xs text-gray-500'>{shipment.commodity}</span>
                                                </div>
                                            </div>
                                            <div className='text-right'>
                                                <p className='font-medium text-gray-900'>{shipment.price}</p>
                                                <p className='mt-0.5 text-xs text-gray-500'>Total cost</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Saved HS Codes */}
                    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 p-4'>
                            <div className='flex items-center justify-between'>
                                <h2 className='font-medium text-gray-900'>Saved HS Codes</h2>
                                <Link
                                    href='/dashboard/workspace/hs-codes'
                                    className='flex items-center text-sm text-blue-600 hover:text-blue-700'>
                                    View all
                                    <ArrowUpRight className='ml-1 h-3 w-3' />
                                </Link>
                            </div>
                        </div>

                        <div className='p-4'>
                            <div className='space-y-4'>
                                {savedHsCodes.map((hs, index) => (
                                    <div
                                        key={index}
                                        className='rounded-lg border border-gray-100 p-3 transition-colors hover:border-blue-200'>
                                        <div className='flex items-start justify-between'>
                                            <div>
                                                <p className='font-medium text-gray-900'>{hs.code}</p>
                                                <p className='mt-1 text-sm text-gray-600'>{hs.description}</p>
                                            </div>
                                            <div className='text-right'>
                                                <p
                                                    className={`font-medium ${hs.duty === 'Free' ? 'text-green-600' : 'text-amber-600'}`}>
                                                    {hs.duty}
                                                </p>
                                                <p className='mt-0.5 text-xs text-gray-500'>US duty</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. ESSENTIAL TOOLS */}
                <div className='mb-8'>
                    <div className='mb-4 flex items-center justify-between'>
                        <h2 className='font-medium text-gray-900'>Essential Tools</h2>
                        <p className='text-sm text-gray-500'>Quick access to core features</p>
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                        {essentialTools.map((tool, index) => {
                            const Icon = tool.icon;

                            return (
                                <Link
                                    key={index}
                                    href={tool.href}
                                    className={`rounded-lg border bg-white p-4 transition-all hover:shadow-sm ${tool.color} hover:border-current`}>
                                    <div className='flex items-start justify-between'>
                                        <div>
                                            <Icon className='mb-3 h-5 w-5' />
                                            <h3 className='mb-1 font-medium'>{tool.title}</h3>
                                            <p className='text-sm text-gray-600'>{tool.description}</p>
                                        </div>
                                        <ArrowUpRight className='h-4 w-4' />
                                    </div>
                                    <div className='mt-4'>
                                        <span className='text-sm font-medium'>Open tool →</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* 6. UPGRADE CTA (Conditional) */}
                {showUpgradeCTA && (
                    <div className='mb-8 rounded-lg border border-blue-200 bg-linear-to-r from-blue-50 to-indigo-50 p-6'>
                        <div className='flex flex-col items-center justify-between md:flex-row'>
                            <div className='mb-4 md:mb-0'>
                                <div className='mb-2 flex items-center'>
                                    <Zap className='mr-2 h-5 w-5 text-blue-600' />
                                    <h3 className='font-medium text-gray-900'>Unlock Pro Features</h3>
                                </div>
                                <p className='max-w-md text-sm text-gray-600'>
                                    You're getting the most out of the free plan! Upgrade to unlock unlimited HS
                                    lookups, shipment scenarios, and advanced analytics.
                                </p>
                                <div className='mt-3 flex items-center space-x-4'>
                                    <div className='flex items-center'>
                                        <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                                        <span className='text-sm text-gray-700'>Unlimited HS searches</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <CheckCircle className='mr-2 h-4 w-4 text-green-500' />
                                        <span className='text-sm text-gray-700'>Advanced analytics</span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex space-x-3'>
                                <Link
                                    href='/dashboard/billing'
                                    className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700'>
                                    View Pro Plans
                                </Link>
                                <button className='rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'>
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
