'use client';

import { ArrowDown, ArrowUp, Clock, MapPin, TrendingUp } from 'lucide-react';

const PriceTrends = () => {
    return (
        <div className='rounded-3xl border border-gray-200 bg-white shadow-xl'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-gray-100 bg-linear-to-r from-gray-50 to-white p-6'>
                <div className='flex items-center gap-3'>
                    <div className='rounded-xl bg-[#09704f]/10 p-2'>
                        <TrendingUp className='h-6 w-6 text-[#09704f]' />
                    </div>
                    <div>
                        <h3 className='text-xl font-bold text-gray-900'>Current Market Prices</h3>
                        <p className='text-sm text-gray-500'>Updated every 15 minutes</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <span>All Markets</span>
                    <Clock className='h-4 w-4' />
                    <span>2 min ago</span>
                </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='border-b border-gray-200 bg-gray-50'>
                            <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase'>
                                Commodity
                            </th>
                            <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase'>
                                Grade
                            </th>
                            <th className='px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase'>
                                Market
                            </th>
                            <th className='px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-600 uppercase'>
                                Price (ETB)
                            </th>
                            <th className='px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-600 uppercase'>
                                24h Change
                            </th>
                            <th className='px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-600 uppercase'>
                                Last Updated
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100'>
                        {/* Teff */}
                        <tr className='transition-colors hover:bg-gray-50'>
                            <td className='px-6 py-4 font-medium text-gray-900'>Teff (Ankober)</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>Grade 2</td>
                            <td className='px-6 py-4'>
                                <span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'>
                                    ECX
                                </span>
                            </td>
                            <td className='px-6 py-4 text-right text-lg font-bold text-[#09704f]'>45/kg</td>
                            <td className='flex items-center justify-end px-6 py-4 text-right font-semibold text-green-600'>
                                <ArrowUp className='mr-1 h-4 w-4' /> +2.4%
                            </td>
                            <td className='px-6 py-4 text-right text-sm text-gray-500'>2 hours ago</td>
                        </tr>

                        {/* Sesame */}
                        <tr className='transition-colors hover:bg-gray-50'>
                            <td className='px-6 py-4 font-medium text-gray-900'>Sesame (Humera)</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>Grade A</td>
                            <td className='px-6 py-4'>
                                <span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'>
                                    ECX
                                </span>
                            </td>
                            <td className='px-6 py-4 text-right text-lg font-bold text-[#09704f]'>128.5/kg</td>
                            <td className='flex items-center justify-end px-6 py-4 text-right font-semibold text-green-600'>
                                <ArrowUp className='mr-1 h-4 w-4' /> +4.8%
                            </td>
                            <td className='px-6 py-4 text-right text-sm text-gray-500'>3 hours ago</td>
                        </tr>

                        {/* Chickpeas */}
                        <tr className='transition-colors hover:bg-gray-50'>
                            <td className='px-6 py-4 font-medium text-gray-900'>Chickpeas</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>Grade 1</td>
                            <td className='px-6 py-4'>
                                <span className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800'>
                                    Local
                                </span>
                            </td>
                            <td className='px-6 py-4 text-right text-lg font-bold text-[#065b7a]'>68/kg</td>
                            <td className='flex items-center justify-end px-6 py-4 text-right font-semibold text-green-600'>
                                <ArrowUp className='mr-1 h-4 w-4' /> +3.5%
                            </td>
                            <td className='px-6 py-4 text-right text-sm text-gray-500'>4 hours ago</td>
                        </tr>

                        {/* Green Mung Beans */}
                        <tr className='transition-colors hover:bg-gray-50'>
                            <td className='px-6 py-4 font-medium text-gray-900'>Green Mung Beans</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>Export</td>
                            <td className='px-6 py-4'>
                                <span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'>
                                    ECX
                                </span>
                            </td>
                            <td className='px-6 py-4 text-right text-lg font-bold text-[#09704f]'>78/kg</td>
                            <td className='flex items-center justify-end px-6 py-4 text-right font-semibold text-red-600'>
                                <ArrowDown className='mr-1 h-4 w-4' /> -2.4%
                            </td>
                            <td className='px-6 py-4 text-right text-sm text-gray-500'>2 hours ago</td>
                        </tr>

                        {/* White Haricot */}
                        <tr className='transition-colors hover:bg-gray-50'>
                            <td className='px-6 py-4 font-medium text-gray-900'>White Haricot Beans</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>Grade 2</td>
                            <td className='px-6 py-4'>
                                <span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'>
                                    ECX
                                </span>
                            </td>
                            <td className='px-6 py-4 text-right text-lg font-bold text-[#09704f]'>74/kg</td>
                            <td className='flex items-center justify-end px-6 py-4 text-right font-semibold text-green-600'>
                                <ArrowUp className='mr-1 h-4 w-4' /> +1.5%
                            </td>
                            <td className='px-6 py-4 text-right text-sm text-gray-500'>1 hour ago</td>
                        </tr>

                        {/* Cardamom */}
                        <tr className='transition-colors hover:bg-gray-50'>
                            <td className='px-6 py-4 font-medium text-gray-900'>Cardamom</td>
                            <td className='px-6 py-4 text-sm text-gray-700'>Green</td>
                            <td className='px-6 py-4'>
                                <span className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800'>
                                    Local
                                </span>
                            </td>
                            <td className='px-6 py-4 text-right text-lg font-bold text-[#065b7a]'>320/kg</td>
                            <td className='flex items-center justify-end px-6 py-4 text-right font-semibold text-red-600'>
                                <ArrowDown className='mr-1 h-4 w-4' /> -2.7%
                            </td>
                            <td className='px-6 py-4 text-right text-sm text-gray-500'>6 hours ago</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PriceTrends;
