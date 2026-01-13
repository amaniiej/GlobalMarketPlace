// /src/app/dashboard/exporter/page.tsx
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

// /src/app/dashboard/exporter/page.tsx

export default function ExporterDashboard() {
    const [savedShipments] = useState(2);
    const [maxShipments] = useState(5);
    const [hsLookups] = useState(10);
    const [maxHsLookups] = useState(20);
    const [fxAlerts] = useState(1);

    // Live market data for exporters
    const ecxPrices = [
        { commodity: 'Coffee (Robusta)', price: '3,800 ETB/kg', change: '+1.8%', isUp: true, isSaved: true },
        { commodity: 'Sesame Seeds', price: '5,500 ETB/kg', change: '+0.5%', isUp: true, isSaved: false },
        { commodity: 'Oil Seeds', price: '3,050 ETB/kg', change: '-0.8%', isUp: false, isSaved: true }
    ];

    const fxPairs = [
        { pair: 'USD/ETB', rate: '57.50', change: '+0.10' },
        { pair: 'EUR/ETB', rate: '62.50', change: '+0.15' },
        { pair: 'GBP/ETB', rate: '72.80', change: '+0.10' }
    ];

    const savedShipmentsList = [
        { id: 1, route: 'Addis → Dubai', incoterm: 'FOB', price: '$15,000', commodity: 'Coffee' },
        { id: 2, route: 'Dire Dawa → Istanbul', incoterm: 'CIF', price: '$10,200', commodity: 'Sesame' }
    ];

    const savedHsCodes = [
        { code: '0901.21.00', description: 'Coffee, decaffeinated', duty: 'Free' },
        { code: '1207.99.00', description: 'Other sesame seeds', duty: '2.0¢/kg' }
    ];

    const essentialTools = [
        {
            title: 'Incoterm Comparator',
            description: 'Compare export costs across incoterms',
            icon: Calculator,
            href: '/dashboard/exporter/tools/incoterms',
            color: 'bg-blue-50 text-blue-600 border-blue-100'
        },
        {
            title: 'HS Lookup',
            description: 'Search tariff codes & export duties',
            icon: Search,
            href: '/dashboard/exporter/workspace/hs-codes',
            color: 'bg-green-50 text-green-600 border-green-100'
        },
        {
            title: 'Margin Checker',
            description: 'Calculate profit margins',
            icon: Percent,
            href: '/dashboard/exporter/tools/margin',
            color: 'bg-purple-50 text-purple-600 border-purple-100'
        },
        {
            title: 'Document Checklist',
            description: 'Export compliance checklist',
            icon: FileText,
            href: '/dashboard/exporter/workspace/documents',
            color: 'bg-amber-50 text-amber-600 border-amber-100'
        }
    ];

    const showUpgradeCTA = hsLookups > maxHsLookups * 0.7 || savedShipments >= maxShipments;

    return (
        <div className='min-h-screen bg-gray-50' style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            <div className='mx-auto max-w-7xl'>
                {/* Welcome Header */}
                <div className='mb-6 pt-2'>
                    <h1 className='text-2xl font-medium text-gray-900'>Welcome back, Jane</h1>
                    <p className='mt-1 text-sm text-gray-500'>Your daily export dashboard</p>
                </div>

                {/* 1. TOP SIGNAL BAR */}
                <div className='mb-6'>
                    <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
                        <Link
                            href='/dashboard/exporter/markets/ecx'
                            className='rounded-lg border p-4 transition-all hover:border-blue-300 hover:shadow-sm'
                            style={{ backgroundColor: '#023b52', borderColor: '#0a5468' }}>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='mb-1 text-xs' style={{ color: '#8fa3b0' }}>
                                        ECX Coffee
                                    </p>
                                    <p className='text-lg font-medium' style={{ color: '#ffffff' }}>
                                        3,800 ETB/kg
                                    </p>
                                    <div className='mt-1 flex items-center'>
                                        <TrendingUp className='mr-1 h-3 w-3 text-green-500' />
                                        <span className='text-xs text-green-600'>+1.8% today</span>
                                    </div>
                                </div>
                                <BarChart3 className='h-5 w-5' style={{ color: '#60a5fa' }} />
                            </div>
                        </Link>

                        <Link
                            href='/dashboard/exporter/markets/fx'
                            className='rounded-lg border p-4 transition-all hover:border-blue-300 hover:shadow-sm'
                            style={{ backgroundColor: '#023b52', borderColor: '#0a5468' }}>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='mb-1 text-xs' style={{ color: '#8fa3b0' }}>
                                        USD/ETB
                                    </p>
                                    <p className='text-lg font-medium' style={{ color: '#ffffff' }}>
                                        57.50
                                    </p>
                                    <div className='mt-1 flex items-center'>
                                        <TrendingUp className='mr-1 h-3 w-3 text-green-500' />
                                        <span className='text-xs text-green-600'>+0.10</span>
                                    </div>
                                </div>
                                <Globe className='h-5 w-5' style={{ color: '#4ade80' }} />
                            </div>
                        </Link>

                        <Link
                            href='/dashboard/exporter/notifications'
                            className='rounded-lg border p-4 transition-all hover:border-blue-300 hover:shadow-sm'
                            style={{ backgroundColor: '#023b52', borderColor: '#0a5468' }}>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='mb-1 text-xs' style={{ color: '#8fa3b0' }}>
                                        Active Alerts
                                    </p>
                                    <p className='text-lg font-medium text-white'>{fxAlerts} active</p>
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
                            href='/dashboard/exporter/workspace/shipments'
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
                            href='/dashboard/exporter/workspace/hs-codes'
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
                            href='/dashboard/exporter/markets/fx'
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

                {/* 3. WORKSPACE & TOOLS */}
                <div className='mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2'>
                    {/* Saved Shipments */}
                    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white'>
                        <div className='border-b border-gray-200 p-4'>
                            <div className='flex items-center justify-between'>
                                <h2 className='font-medium text-gray-900'>Saved Shipments</h2>
                                <Link
                                    href='/dashboard/exporter/workspace/shipments'
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
                                                <p className='mt-0.5 text-xs text-gray-500'>Total revenue</p>
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
                                    href='/dashboard/exporter/workspace/hs-codes'
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
                                                <p className='mt-0.5 text-xs text-gray-500'>Export duty</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. ESSENTIAL TOOLS */}
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

                {/* 5. UPGRADE CTA */}
                {showUpgradeCTA && (
                    <div className='mb-8 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6'>
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
                                    href='/dashboard/exporter/billing'
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
