'use client';

import { useEffect, useState } from 'react';

interface PriceData {
    id: number;
    commodity: string;
    grade: string;
    unit: string;
    price: number;
    change: number;
    market: string;
    lastUpdated: string;
}

export default function PriceTable() {
    const [prices, setPrices] = useState<PriceData[]>([
        {
            id: 1,
            commodity: 'Coffee (Arabica)',
            grade: 'Grade 1',
            unit: 'kg',
            price: 245,
            change: 2.5,
            market: 'ECX',
            lastUpdated: '2 hours ago'
        },
        {
            id: 2,
            commodity: 'Teff (White)',
            grade: 'Premium',
            unit: 'kg',
            price: 85,
            change: -1.2,
            market: 'Local',
            lastUpdated: '1 hour ago'
        },
        {
            id: 3,
            commodity: 'Sesame (Hulled)',
            grade: 'Grade A',
            unit: 'kg',
            price: 112,
            change: 4.8,
            market: 'ECX',
            lastUpdated: '3 hours ago'
        },
        {
            id: 4,
            commodity: 'Chickpeas',
            grade: 'Desi',
            unit: 'kg',
            price: 68,
            change: 0.5,
            market: 'Local',
            lastUpdated: '4 hours ago'
        },
        {
            id: 5,
            commodity: 'Green Mung Beans',
            grade: 'Grade 1',
            unit: 'kg',
            price: 92,
            change: -0.8,
            market: 'ECX',
            lastUpdated: '2 hours ago'
        },
        {
            id: 6,
            commodity: 'Red Kidney Beans',
            grade: 'Export',
            unit: 'kg',
            price: 78,
            change: 3.2,
            market: 'Local',
            lastUpdated: '5 hours ago'
        },
        {
            id: 7,
            commodity: 'White Haricot Beans',
            grade: 'Grade 1',
            unit: 'kg',
            price: 74,
            change: 1.5,
            market: 'ECX',
            lastUpdated: '1 hour ago'
        },
        {
            id: 8,
            commodity: 'Cardamom',
            grade: 'Green',
            unit: 'kg',
            price: 320,
            change: 5.2,
            market: 'Local',
            lastUpdated: '6 hours ago'
        }
    ]);

    const [lastUpdated, setLastUpdated] = useState<string>('Just now');
    const [isLoading, setIsLoading] = useState(false);

    // Auto-refresh simulation
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }, 60000); // Every minute

        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            const updatedPrices = prices.map((price) => ({
                ...price,
                price: price.price + (Math.random() > 0.5 ? 1 : -1) * Math.random() * 5,
                change: parseFloat((Math.random() * 10 - 5).toFixed(1))
            }));
            setPrices(updatedPrices);
            setIsLoading(false);
            setLastUpdated('Just now');
        }, 1000);
    };

    return (
        <div className='overflow-hidden rounded-2xl bg-white shadow-xl'>
            {/* Table Header */}
            <div className='flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4'>
                <div>
                    <h2 className='text-xl font-bold text-gray-900'>Current Market Prices</h2>
                    <p className='text-sm text-gray-600'>
                        Last updated: <span className='font-semibold'>{lastUpdated}</span>
                    </p>
                </div>
                <div className='flex items-center gap-4'>
                    <select className='rounded-lg border border-gray-300 px-4 py-2 text-sm'>
                        <option>All Markets</option>
                        <option>ECX Only</option>
                        <option>Local Markets</option>
                    </select>
                    <button
                        onClick={handleRefresh}
                        disabled={isLoading}
                        className='flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50'>
                        {isLoading ? (
                            <>
                                <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                                Refreshing...
                            </>
                        ) : (
                            <>🔄 Refresh Prices</>
                        )}
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Commodity</th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Grade</th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Market</th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Price (ETB)</th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>24h Change</th>
                            <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {prices.map((item) => (
                            <tr key={item.id} className='hover:bg-gray-50'>
                                <td className='px-6 py-4'>
                                    <div className='font-medium text-gray-900'>{item.commodity}</div>
                                </td>
                                <td className='px-6 py-4'>
                                    <span className='rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800'>
                                        {item.grade}
                                    </span>
                                </td>
                                <td className='px-6 py-4 text-gray-600'>{item.market}</td>
                                <td className='px-6 py-4'>
                                    <div className='font-bold text-gray-900'>
                                        {item.price.toFixed(2)}{' '}
                                        <span className='text-sm text-gray-500'>/{item.unit}</span>
                                    </div>
                                </td>
                                <td className='px-6 py-4'>
                                    <div
                                        className={`flex items-center gap-2 ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {item.change >= 0 ? '↗' : '↘'}
                                        <span className='font-semibold'>
                                            {item.change >= 0 ? '+' : ''}
                                            {item.change}%
                                        </span>
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-gray-500'>{item.lastUpdated}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table Footer */}
            <div className='border-t border-gray-200 bg-gray-50 px-6 py-4'>
                <div className='flex items-center justify-between text-sm text-gray-600'>
                    <div>Showing {prices.length} commodities</div>
                    <div className='flex items-center gap-4'>
                        <span className='cursor-pointer hover:text-green-600'>Export to Excel</span>
                        <span className='cursor-pointer hover:text-green-600'>Subscribe to Updates</span>
                        <span className='cursor-pointer hover:text-green-600'>API Access</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
