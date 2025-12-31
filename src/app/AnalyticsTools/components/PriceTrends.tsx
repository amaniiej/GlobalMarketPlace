'use client';

import { ArrowDown, ArrowUp, Clock, RefreshCw, TrendingUp } from 'lucide-react';

const PriceTrends = () => {
    return (
        <div className='rounded-2xl border border-gray-200 bg-white shadow-lg'>
            {/* Enhanced Header */}
            <div className='rounded-t-2xl border-b border-gray-100 bg-linear-to-r from-gray-50 via-white to-gray-50 px-6 py-6'>
                <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
                    <div className='flex items-center gap-4'>
                        <div className='rounded-xl bg-linear-to-br from-[#09704f]/20 to-[#0a8560]/20 p-3'>
                            <TrendingUp className='h-7 w-7 text-[#09704f]' />
                        </div>
                        <div>
                            <h3 className='text-xl font-bold text-gray-900 md:text-2xl'>Price Trends Dashboard</h3>
                            <p className='mt-1 text-sm text-gray-500'>
                                Real-time commodity prices with exporter and buyer insights
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-wrap items-center gap-3'>
                        <div className='flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm'>
                            <div className='h-2 w-2 rounded-full bg-green-500'></div>
                            <span className='font-medium text-green-700'>Live Data</span>
                        </div>
                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                            <Clock className='h-4 w-4' />
                            <span className='font-medium'>Updated 2 min ago</span>
                        </div>
                        <button className='flex items-center gap-2 rounded-lg bg-[#09704f] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#075c43]'>
                            <RefreshCw className='h-4 w-4' />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Legend */}
                <div className='mt-4 flex flex-wrap gap-4 text-sm'>
                    <div className='flex items-center gap-2'>
                        <div className='h-3 w-3 rounded-full bg-[#09704f]'></div>
                        <span className='text-gray-700'>ECX Market</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='h-3 w-3 rounded-full bg-[#065b7a]'></div>
                        <span className='text-gray-700'>Local Market</span>
                    </div>
                </div>
            </div>

            {/* Enhanced Table */}
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='border-b border-gray-200 bg-linear-to-r from-gray-50 to-gray-100'>
                            <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase'>
                                Commodity
                            </th>
                            <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase'>
                                Grade
                            </th>
                            <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase'>
                                Market
                            </th>
                            <th className='px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-700 uppercase'>
                                Price (ETB)
                            </th>
                            <th className='px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-700 uppercase'>
                                24h Change
                            </th>
                            <th className='px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-700 uppercase'>
                                Last Updated
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {/* Coffee - ADDED AT THE TOP */}
                        <tr className='transition-all duration-200 hover:bg-gray-50/80'>
                            <td className='px-6 py-5'>
                                <div>
                                    <div className='font-semibold text-gray-900'>Coffee (Yirgacheffe)</div>
                                    <div className='mt-1 text-xs text-gray-500'>Arabica, Washed</div>
                                </div>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800'>
                                    Grade 1
                                </span>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center gap-1.5 rounded-full bg-[#09704f]/10 px-3 py-1 text-xs font-medium text-[#09704f]'>
                                    <div className='h-1.5 w-1.5 rounded-full bg-[#09704f]'></div>
                                    ECX
                                </span>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-lg font-bold text-[#09704f]'>245/kg</div>
                                <div className='text-xs text-gray-500'>Export price</div>
                            </td>
                            <td className='px-6 py-5'>
                                <div className='flex items-center justify-end gap-1.5'>
                                    <div className='flex items-center rounded-full bg-green-50 px-3 py-1'>
                                        <ArrowUp className='h-3.5 w-3.5 text-green-600' />
                                        <span className='ml-1 font-semibold text-green-700'>+5.2%</span>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-sm text-gray-700'>1 hour ago</div>
                                <div className='text-xs text-gray-500'>Morning auction</div>
                            </td>
                        </tr>

                        {/* Teff */}
                        <tr className='transition-all duration-200 hover:bg-gray-50/80'>
                            <td className='px-6 py-5'>
                                <div>
                                    <div className='font-semibold text-gray-900'>Teff (Ankober)</div>
                                    <div className='mt-1 text-xs text-gray-500'>White Teff Premium</div>
                                </div>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700'>
                                    Grade 2
                                </span>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center gap-1.5 rounded-full bg-[#09704f]/10 px-3 py-1 text-xs font-medium text-[#09704f]'>
                                    <div className='h-1.5 w-1.5 rounded-full bg-[#09704f]'></div>
                                    ECX
                                </span>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-lg font-bold text-[#09704f]'>45/kg</div>
                                <div className='text-xs text-gray-500'>Closing price</div>
                            </td>
                            <td className='px-6 py-5'>
                                <div className='flex items-center justify-end gap-1.5'>
                                    <div className='flex items-center rounded-full bg-green-50 px-3 py-1'>
                                        <ArrowUp className='h-3.5 w-3.5 text-green-600' />
                                        <span className='ml-1 font-semibold text-green-700'>+2.4%</span>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-sm text-gray-700'>2 hours ago</div>
                                <div className='text-xs text-gray-500'>ECX Trading</div>
                            </td>
                        </tr>

                        {/* Sesame */}
                        <tr className='transition-all duration-200 hover:bg-gray-50/80'>
                            <td className='px-6 py-5'>
                                <div>
                                    <div className='font-semibold text-gray-900'>Sesame (Humera)</div>
                                    <div className='mt-1 text-xs text-gray-500'>White Hulled Premium</div>
                                </div>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'>
                                    Grade A
                                </span>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center gap-1.5 rounded-full bg-[#09704f]/10 px-3 py-1 text-xs font-medium text-[#09704f]'>
                                    <div className='h-1.5 w-1.5 rounded-full bg-[#09704f]'></div>
                                    ECX
                                </span>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-lg font-bold text-[#09704f]'>128.5/kg</div>
                                <div className='text-xs text-gray-500'>High demand</div>
                            </td>
                            <td className='px-6 py-5'>
                                <div className='flex items-center justify-end gap-1.5'>
                                    <div className='flex items-center rounded-full bg-green-50 px-3 py-1'>
                                        <ArrowUp className='h-3.5 w-3.5 text-green-600' />
                                        <span className='ml-1 font-semibold text-green-700'>+4.8%</span>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-sm text-gray-700'>3 hours ago</div>
                                <div className='text-xs text-gray-500'>Export auction</div>
                            </td>
                        </tr>

                        {/* Chickpeas */}
                        <tr className='transition-all duration-200 hover:bg-gray-50/80'>
                            <td className='px-6 py-5'>
                                <div>
                                    <div className='font-semibold text-gray-900'>Chickpeas (Desi)</div>
                                    <div className='mt-1 text-xs text-gray-500'>Export quality</div>
                                </div>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700'>
                                    Grade 1
                                </span>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center gap-1.5 rounded-full bg-[#065b7a]/10 px-3 py-1 text-xs font-medium text-[#065b7a]'>
                                    <div className='h-1.5 w-1.5 rounded-full bg-[#065b7a]'></div>
                                    Local
                                </span>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-lg font-bold text-[#065b7a]'>68/kg</div>
                                <div className='text-xs text-gray-500'>Steady supply</div>
                            </td>
                            <td className='px-6 py-5'>
                                <div className='flex items-center justify-end gap-1.5'>
                                    <div className='flex items-center rounded-full bg-green-50 px-3 py-1'>
                                        <ArrowUp className='h-3.5 w-3.5 text-green-600' />
                                        <span className='ml-1 font-semibold text-green-700'>+3.5%</span>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-sm text-gray-700'>4 hours ago</div>
                                <div className='text-xs text-gray-500'>Local market</div>
                            </td>
                        </tr>

                        {/* Green Mung Beans */}
                        <tr className='transition-all duration-200 hover:bg-gray-50/80'>
                            <td className='px-6 py-5'>
                                <div>
                                    <div className='font-semibold text-gray-900'>Green Mung Beans</div>
                                    <div className='mt-1 text-xs text-gray-500'>Export quality</div>
                                </div>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700'>
                                    Export
                                </span>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center gap-1.5 rounded-full bg-[#09704f]/10 px-3 py-1 text-xs font-medium text-[#09704f]'>
                                    <div className='h-1.5 w-1.5 rounded-full bg-[#09704f]'></div>
                                    ECX
                                </span>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-lg font-bold text-[#09704f]'>78/kg</div>
                                <div className='text-xs text-gray-500'>Slight dip</div>
                            </td>
                            <td className='px-6 py-5'>
                                <div className='flex items-center justify-end gap-1.5'>
                                    <div className='flex items-center rounded-full bg-red-50 px-3 py-1'>
                                        <ArrowDown className='h-3.5 w-3.5 text-red-600' />
                                        <span className='ml-1 font-semibold text-red-700'>-2.4%</span>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-sm text-gray-700'>2 hours ago</div>
                                <div className='text-xs text-gray-500'>Morning session</div>
                            </td>
                        </tr>

                        {/* White Haricot */}
                        <tr className='transition-all duration-200 hover:bg-gray-50/80'>
                            <td className='px-6 py-5'>
                                <div>
                                    <div className='font-semibold text-gray-900'>White Haricot Beans</div>
                                    <div className='mt-1 text-xs text-gray-500'>Grade beans</div>
                                </div>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700'>
                                    Grade 2
                                </span>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center gap-1.5 rounded-full bg-[#09704f]/10 px-3 py-1 text-xs font-medium text-[#09704f]'>
                                    <div className='h-1.5 w-1.5 rounded-full bg-[#09704f]'></div>
                                    ECX
                                </span>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-lg font-bold text-[#09704f]'>74/kg</div>
                                <div className='text-xs text-gray-500'>Stable price</div>
                            </td>
                            <td className='px-6 py-5'>
                                <div className='flex items-center justify-end gap-1.5'>
                                    <div className='flex items-center rounded-full bg-green-50 px-3 py-1'>
                                        <ArrowUp className='h-3.5 w-3.5 text-green-600' />
                                        <span className='ml-1 font-semibold text-green-700'>+1.5%</span>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-sm text-gray-700'>1 hour ago</div>
                                <div className='text-xs text-gray-500'>Recent update</div>
                            </td>
                        </tr>

                        {/* Cardamom */}
                        <tr className='transition-all duration-200 hover:bg-gray-50/80'>
                            <td className='px-6 py-5'>
                                <div>
                                    <div className='font-semibold text-gray-900'>Cardamom</div>
                                    <div className='mt-1 text-xs text-gray-500'>Green premium</div>
                                </div>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center rounded-full bg-lime-50 px-3 py-1 text-xs font-medium text-lime-700'>
                                    Green
                                </span>
                            </td>
                            <td className='px-6 py-5'>
                                <span className='inline-flex items-center gap-1.5 rounded-full bg-[#065b7a]/10 px-3 py-1 text-xs font-medium text-[#065b7a]'>
                                    <div className='h-1.5 w-1.5 rounded-full bg-[#065b7a]'></div>
                                    Local
                                </span>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-lg font-bold text-[#065b7a]'>320/kg</div>
                                <div className='text-xs text-gray-500'>High value</div>
                            </td>
                            <td className='px-6 py-5'>
                                <div className='flex items-center justify-end gap-1.5'>
                                    <div className='flex items-center rounded-full bg-red-50 px-3 py-1'>
                                        <ArrowDown className='h-3.5 w-3.5 text-red-600' />
                                        <span className='ml-1 font-semibold text-red-700'>-2.7%</span>
                                    </div>
                                </div>
                            </td>
                            <td className='px-6 py-5 text-right'>
                                <div className='text-sm text-gray-700'>6 hours ago</div>
                                <div className='text-xs text-gray-500'>Morning trade</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className='rounded-b-2xl border-t border-gray-100 bg-gray-50 px-6 py-4'>
                <div className='flex flex-col items-center justify-between gap-3 text-sm text-gray-600 md:flex-row'>
                    <div className='flex items-center gap-4'>
                        <span>Showing 7 commodities</span>
                        <span className='hidden h-1 w-1 rounded-full bg-gray-400 md:inline'></span>
                        <span className='hidden md:inline'>Data sourced from ECX & Local Markets</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <span>Auto-refresh in 5:00</span>
                        <button className='ml-2 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-100'>
                            Pause updates
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceTrends;
