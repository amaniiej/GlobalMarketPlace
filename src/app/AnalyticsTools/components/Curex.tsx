'use client';

import React, { useEffect, useState } from 'react';

import { Activity, ArrowRightLeft, Calculator, DollarSign, Euro, Globe, PoundSterling, RefreshCw } from 'lucide-react';

interface Currency {
    code: string;
    name: string;
    symbol: string;
    icon: React.ReactNode;
    flag: string;
    rate: number;
    lastUpdated: string;
    trend: 'up' | 'down' | 'stable';
    changePercent: number;
    pair: string;
}

const CURRENCY_CONFIG: Currency[] = [
    {
        code: 'USD',
        name: 'US Dollar',
        symbol: '$',
        flag: 'US',
        icon: <DollarSign className='h-3.5 w-3.5' />,
        rate: 1,
        lastUpdated: 'Static',
        trend: 'stable',
        changePercent: 0,
        pair: 'USD/USD'
    },
    {
        code: 'EUR',
        name: 'Euro',
        symbol: '€',
        flag: 'EU',
        icon: <Euro className='h-3.5 w-3.5' />,
        rate: 0.92,
        lastUpdated: 'Static',
        trend: 'up',
        changePercent: 0.4,
        pair: 'USD/EUR'
    },
    {
        code: 'GBP',
        name: 'British Pound',
        symbol: '£',
        flag: 'GB',
        icon: <PoundSterling className='h-3.5 w-3.5' />,
        rate: 0.79,
        lastUpdated: 'Static',
        trend: 'down',
        changePercent: -0.2,
        pair: 'USD/GBP'
    },
    {
        code: 'ETB',
        name: 'Ethiopian Birr',
        symbol: 'Br',
        flag: 'ET',
        icon: <span className='font-mono text-sm font-bold'>Br</span>,
        rate: 56.3,
        lastUpdated: 'Static',
        trend: 'up',
        changePercent: 0.8,
        pair: 'USD/ETB'
    },
    {
        code: 'CNY',
        name: 'Chinese Yuan',
        symbol: '¥',
        flag: 'CN',
        icon: <span className='font-mono text-sm font-bold'>¥</span>,
        rate: 7.19,
        lastUpdated: 'Static',
        trend: 'stable',
        changePercent: 0.0,
        pair: 'USD/CNY'
    },
    {
        code: 'AED',
        name: 'UAE Dirham',
        symbol: 'د.إ',
        flag: 'AE',
        icon: <span className='font-mono text-sm font-bold'>د.إ</span>,
        rate: 3.67,
        lastUpdated: 'Static',
        trend: 'stable',
        changePercent: 0.0,
        pair: 'USD/AED'
    }
];

const CurrencyExchange = () => {
    const [currencies] = useState<Currency[]>(CURRENCY_CONFIG);
    const [amount, setAmount] = useState('1000');
    const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCY_CONFIG[0]);
    const [toCurrency, setToCurrency] = useState<Currency>(CURRENCY_CONFIG[3]);
    const [result, setResult] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const numericAmount = parseFloat(amount) || 0;

        if (fromCurrency.code === toCurrency.code) {
            setExchangeRate(1);
            setResult(numericAmount);

            return;
        }

        const rate = toCurrency.rate / fromCurrency.rate;
        setExchangeRate(rate);
        setResult(numericAmount * rate);
    }, [amount, fromCurrency, toCurrency]);

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const refreshRates = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 600);
    };

    return (
        <div className='rounded-xl border border-gray-200 bg-white shadow-lg'>
            {/* Header */}
            <div className='flex items-center justify-between border-b px-4 py-3'>
                <div>
                    <h2 className='text-base font-semibold'>Currency Exchange</h2>
                    <p className='text-xs text-gray-500'>Static preview</p>
                </div>
                <button
                    onClick={refreshRates}
                    disabled={isLoading}
                    className='flex items-center gap-1.5 rounded-lg bg-[#09704f] px-3 py-1.5 text-xs text-white'>
                    <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            {/* Main layout */}
            <div className='grid grid-cols-1 gap-4 p-4 lg:grid-cols-[3fr_2fr]'>
                {/* LEFT – LIVE RATES (60%) */}
                <div>
                    <div className='mb-3 flex items-center gap-2'>
                        <Activity className='h-4 w-4 text-[#065b7a]' />
                        <h3 className='text-sm font-medium'>Live Rates (vs USD)</h3>
                    </div>

                    <div className='overflow-hidden rounded-lg border'>
                        <table className='w-full text-xs'>
                            <thead className='bg-gray-50'>
                                <tr className='text-left text-gray-600'>
                                    <th className='px-3 py-2'>Currency</th>
                                    <th className='px-3 py-2 text-right'>Rate</th>
                                    <th className='px-3 py-2 text-right'>Change %</th>
                                    <th className='px-3 py-2 text-right'>Change Amt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currencies.map((c) => {
                                    const changeAmount = (c.rate * c.changePercent) / 100;

                                    return (
                                        <tr key={c.code} className='border-t'>
                                            <td className='px-3 py-2 font-medium'>
                                                {c.code}
                                                <div className='text-[10px] text-gray-500'>{c.name}</div>
                                            </td>
                                            <td className='px-3 py-2 text-right font-semibold'>{c.rate.toFixed(4)}</td>
                                            <td
                                                className={`px-3 py-2 text-right ${
                                                    c.trend === 'up'
                                                        ? 'text-green-600'
                                                        : c.trend === 'down'
                                                          ? 'text-red-600'
                                                          : 'text-gray-500'
                                                }`}>
                                                {c.changePercent >= 0 ? '+' : ''}
                                                {c.changePercent.toFixed(2)}%
                                            </td>
                                            <td className='px-3 py-2 text-right text-gray-700'>
                                                {changeAmount >= 0 ? '+' : ''}
                                                {changeAmount.toFixed(4)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* RIGHT – CONVERTER (40%) */}
                <div className='rounded-lg border bg-gray-50 p-4'>
                    <div className='mb-4 flex items-center gap-2'>
                        <Calculator className='h-4 w-4 text-[#09704f]' />
                        <h3 className='text-sm font-medium'>Converter</h3>
                    </div>

                    <div className='mb-3 flex gap-2'>
                        <input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type='number'
                            className='flex-1 rounded-lg border px-3 py-2 text-sm'
                        />
                        <select
                            value={fromCurrency.code}
                            onChange={(e) => setFromCurrency(currencies.find((c) => c.code === e.target.value)!)}
                            className='w-20 rounded-lg border px-2 py-2 text-xs'>
                            {currencies.map((c) => (
                                <option key={c.code}>{c.code}</option>
                            ))}
                        </select>
                    </div>

                    <div className='mb-3 flex justify-center'>
                        <button onClick={swapCurrencies} className='rounded-full border p-2'>
                            <ArrowRightLeft className='h-3.5 w-3.5' />
                        </button>
                    </div>

                    <div className='mb-3 flex gap-2'>
                        <div className='flex-1 rounded-lg border bg-gray-100 px-3 py-2 text-sm'>
                            {result.toFixed(2)}
                        </div>
                        <select
                            value={toCurrency.code}
                            onChange={(e) => setToCurrency(currencies.find((c) => c.code === e.target.value)!)}
                            className='w-20 rounded-lg border px-2 py-2 text-xs'>
                            {currencies.map((c) => (
                                <option key={c.code}>{c.code}</option>
                            ))}
                        </select>
                    </div>

                    <div className='rounded-lg border bg-white p-3 text-center'>
                        <div className='text-[10px] text-gray-500'>Exchange Rate</div>
                        <div className='mt-1 font-bold text-[#09704f]'>
                            1 {fromCurrency.code} = {exchangeRate.toFixed(4)} {toCurrency.code}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className='border-t bg-gray-50 px-4 py-2'>
                <div className='flex items-center gap-2 text-[10px] text-gray-500'>
                    <Globe className='h-3.5 w-3.5' />
                    Backend disconnected (frontend-only preview)
                </div>
            </div>
        </div>
    );
};

export default CurrencyExchange;
