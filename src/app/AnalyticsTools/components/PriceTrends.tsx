// /home/amanuel/Documents/AGROSPACE Site/src/app/AnalyticsTools/page.tsx
import React from 'react';

import { BarChart3, Download, Info, LineChart, TrendingUp } from 'lucide-react';

const AnalyticsToolsPage = () => {
    return (
        <div className='min-h-screen bg-linear-to-b from-gray-50 to-white'>
            {/* Header Section */}
            <div className='border-b border-gray-200 bg-white shadow-sm'>
                <div className='container mx-auto px-4 py-8'>
                    <div className='flex items-start justify-between'>
                        <div>
                            <h1 className='mb-2 text-4xl font-bold text-gray-900'>Analytics & Market Intelligence</h1>
                            <p className='max-w-3xl text-gray-600'>
                                Advanced tools for Ethiopian commodity exporters and international buyers. Real-time
                                price tracking, trend analysis, and market insights to optimize your trading decisions.
                            </p>
                        </div>
                        <div className='flex space-x-3'>
                            <button className='flex items-center space-x-2 rounded-lg bg-[#09704f] px-4 py-2 text-white transition-colors hover:bg-[#075c43]'>
                                <Download className='h-4 w-4' />
                                <span>Export Report</span>
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-4'>
                        <div className='rounded-xl bg-linear-to-r from-[#09704f] to-[#0a8560] p-4 text-white shadow'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm opacity-90'>Active Markets</p>
                                    <p className='mt-1 text-2xl font-bold'>8</p>
                                </div>
                                <BarChart3 className='h-8 w-8 opacity-80' />
                            </div>
                        </div>

                        <div className='rounded-xl bg-linear-to-r from-[#065b7a] to-[#08719a] p-4 text-white shadow'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm opacity-90'>Today's Volume</p>
                                    <p className='mt-1 text-2xl font-bold'>13,407</p>
                                </div>
                                <TrendingUp className='h-8 w-8 opacity-80' />
                            </div>
                            <p className='mt-2 text-xs opacity-80'>Feresulla traded</p>
                        </div>

                        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm text-gray-600'>Avg Price Change</p>
                                    <p className='mt-1 text-2xl font-bold text-green-600'>+2.1%</p>
                                </div>
                                <LineChart className='h-8 w-8 text-gray-500' />
                            </div>
                        </div>

                        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <p className='text-sm text-gray-600'>Total Stock</p>
                                    <p className='mt-1 text-2xl font-bold'>349,708</p>
                                </div>
                                <div className='text-right'>
                                    <p className='text-xs text-gray-500'>Feresulla available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='container mx-auto px-4 py-8'>
                <div className='mb-6'>
                    <h2 className='mb-2 text-2xl font-bold text-gray-800'>Price Trends Dashboard</h2>
                    <p className='text-gray-600'>
                        Monitor real-time commodity prices with exporter and buyer-specific metrics.
                    </p>
                </div>

                {/* Price Trends Table */}
                <div className='rounded-3xl border border-gray-200 bg-white p-8 shadow-xl'>
                    <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
                        <div>
                            <h3 className='mb-4 text-xl font-bold text-gray-900'>Feresulla Price Trend</h3>
                            <div className='flex h-80 animate-pulse items-center justify-center rounded-2xl bg-linear-to-br from-[#09704f]/10 to-[#0a8560]/10'>
                                <div className='text-6xl'>📈</div>
                            </div>
                        </div>
                        <div className='space-y-6'>
                            <div className='space-y-2'>
                                <div className='flex justify-between'>
                                    <span className='text-sm font-medium text-gray-600'>Current Price</span>
                                    <span className='text-2xl font-bold text-[#09704f]'>ETB 45.2/kg</span>
                                </div>
                                <div className='h-2 w-full rounded-full bg-gray-200'>
                                    <div className='h-2 w-4/5 rounded-full bg-[#09704f]'></div>
                                </div>
                            </div>
                            <div className='space-y-2'>
                                <div className='flex justify-between'>
                                    <span className='text-sm font-medium text-gray-600'>24h Change</span>
                                    <span className='text-lg font-bold text-green-600'>+2.1%</span>
                                </div>
                                <div className='h-2 w-full rounded-full bg-gray-200'>
                                    <div className='h-2 w-3/4 rounded-full bg-green-500'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
                    {/* Key Insights */}
                    <div className='rounded-xl border border-gray-100 bg-white p-6 shadow'>
                        <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-800'>
                            <Info className='mr-2 h-5 w-5 text-[#09704f]' />
                            Key Insights
                        </h3>
                        <ul className='space-y-3'>
                            <li className='flex items-start'>
                                <div className='mt-2 mr-3 h-2 w-2 rounded-full bg-[#09704f]'></div>
                                <span className='text-gray-700'>Sesame shows strongest momentum at +4.8%</span>
                            </li>
                            <li className='flex items-start'>
                                <div className='mt-2 mr-3 h-2 w-2 rounded-full bg-[#065b7a]'></div>
                                <span className='text-gray-700'>High liquidity in Wheat market</span>
                            </li>
                            <li className='flex items-start'>
                                <div className='mt-2 mr-3 h-2 w-2 rounded-full bg-[#09704f]'></div>
                                <span className='text-gray-700'>Coffee Grade 1 supply tightening</span>
                            </li>
                        </ul>
                    </div>

                    {/* Market Status */}
                    <div className='rounded-xl border border-gray-100 bg-white p-6 shadow'>
                        <h3 className='mb-4 text-lg font-semibold text-gray-800'>Market Status</h3>
                        <div className='space-y-4'>
                            <div>
                                <div className='mb-1 flex justify-between'>
                                    <span className='text-sm text-gray-600'>ECX Markets</span>
                                    <span className='text-sm font-semibold text-[#09704f]'>Active</span>
                                </div>
                                <div className='h-2 w-full rounded-full bg-gray-200'>
                                    <div className='h-2 w-3/4 rounded-full bg-[#09704f]'></div>
                                </div>
                            </div>
                            <div>
                                <div className='mb-1 flex justify-between'>
                                    <span className='text-sm text-gray-600'>Local Markets</span>
                                    <span className='text-sm font-semibold text-[#065b7a]'>Trading</span>
                                </div>
                                <div className='h-2 w-full rounded-full bg-gray-200'>
                                    <div className='h-2 w-5/6 rounded-full bg-[#065b7a]'></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className='rounded-xl border border-gray-100 bg-white p-6 shadow'>
                        <h3 className='mb-4 text-lg font-semibold text-gray-800'>Quick Actions</h3>
                        <div className='space-y-3'>
                            <button className='w-full rounded-lg border border-[#09704f] px-4 py-3 text-left text-[#09704f] transition-colors hover:bg-[#09704f] hover:text-white'>
                                Set Price Alert
                            </button>
                            <button className='w-full rounded-lg border border-[#065b7a] px-4 py-3 text-left text-[#065b7a] transition-colors hover:bg-[#065b7a] hover:text-white'>
                                Calculate Freight Cost
                            </button>
                            <button className='w-full rounded-lg bg-gray-100 px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-200'>
                                View Historical Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsToolsPage;
