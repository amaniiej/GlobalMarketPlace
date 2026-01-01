'use client';

import React, { useEffect, useState } from 'react';

import {
    Activity,
    ArrowRightLeft,
    Calculator,
    DollarSign,
    Euro,
    Globe,
    PoundSterling,
    RefreshCw,
    TrendingDown,
    TrendingUp
} from 'lucide-react';

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
}

const initialCurrencies: Currency[] = [
    {
        code: 'USD',
        name: 'US Dollar',
        symbol: '$',
        icon: <DollarSign className='h-3.5 w-3.5' />,
        flag: '🇺🇸',
        rate: 1,
        lastUpdated: 'Now',
        trend: 'up',
        changePercent: 0.12
    },
    {
        code: 'EUR',
        name: 'Euro',
        symbol: '€',
        icon: <Euro className='h-3.5 w-3.5' />,
        flag: '🇪🇺',
        rate: 0.9215,
        lastUpdated: '2 min',
        trend: 'down',
        changePercent: -0.25
    },
    {
        code: 'GBP',
        name: 'British Pound',
        symbol: '£',
        icon: <PoundSterling className='h-3.5 w-3.5' />,
        flag: '🇬🇧',
        rate: 0.789,
        lastUpdated: '5 min',
        trend: 'stable',
        changePercent: 0.05
    },
    {
        code: 'ETB',
        name: 'Ethiopian Birr',
        symbol: 'ETB',
        icon: <span className='font-mono text-sm font-bold'>Br</span>,
        flag: '🇪🇹',
        rate: 56.5,
        lastUpdated: '10 min',
        trend: 'up',
        changePercent: 0.35
    },
    {
        code: 'CNY',
        name: 'Chinese Yuan',
        symbol: 'CNY',
        icon: <span className='font-mono text-sm font-bold'>¥</span>,
        flag: '🇨🇳',
        rate: 7.23,
        lastUpdated: '8 min',
        trend: 'up',
        changePercent: 0.22
    },
    {
        code: 'AED',
        name: 'UAE Dirham',
        symbol: 'AED',
        icon: <span className='font-mono text-sm font-bold'>د.إ</span>,
        flag: '🇦🇪',
        rate: 3.6725,
        lastUpdated: '15 min',
        trend: 'stable',
        changePercent: 0
    }
];

const CurrencyExchange = () => {
    const [currencies, setCurrencies] = useState(initialCurrencies);
    const [amount, setAmount] = useState('1000');
    const [fromCurrency, setFromCurrency] = useState(initialCurrencies[0]);
    const [toCurrency, setToCurrency] = useState(initialCurrencies[3]);
    const [result, setResult] = useState(56500);
    const [exchangeRate, setExchangeRate] = useState(56.5);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState('Just now');

    // Calculate exchange
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

    const fetchExchangeRates = async () => {
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 800));
        setCurrencies((prev) =>
            prev.map((c) => ({
                ...c,
                rate: c.rate * (1 + (Math.random() - 0.5) * 0.002),
                changePercent: (Math.random() - 0.5) * 0.2,
                trend: Math.random() > 0.6 ? 'up' : Math.random() < 0.4 ? 'down' : 'stable',
                lastUpdated: 'Now'
            }))
        );
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setIsLoading(false);
    };

    return (
        <div id='currency-exchange' className='rounded-xl border border-gray-200 bg-white shadow-lg'>
            {/* Header - Compact */}
            <div className='flex items-center justify-between border-b border-gray-100 px-4 py-3'>
                <div>
                    <h2 className='text-base font-semibold text-gray-900'>Currency Exchange</h2>
                    <p className='text-xs text-gray-500'>Live FX for trade</p>
                </div>
                <button
                    onClick={fetchExchangeRates}
                    disabled={isLoading}
                    className='flex items-center gap-1.5 rounded-lg bg-[#09704f] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#075c43]'>
                    <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? '...' : 'Refresh'}
                </button>
            </div>

            {/* Main Content - Compact */}
            <div className='p-4'>
                <div className='grid gap-4 lg:grid-cols-2'>
                    {/* Left Column: Converter - Compact */}
                    <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
                        <div className='mb-4 flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Calculator className='h-4 w-4 text-[#09704f]' />
                                <h3 className='text-sm font-medium text-gray-900'>Converter</h3>
                            </div>
                            <div className='text-xs text-gray-500'>{lastUpdated}</div>
                        </div>

                        {/* Amount Input - Compact */}
                        <div className='mb-3'>
                            <div className='flex gap-2'>
                                <input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    type='number'
                                    className='flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium focus:border-[#09704f] focus:ring-1 focus:ring-[#09704f] focus:outline-none'
                                    placeholder='Amount'
                                />
                                <select
                                    value={fromCurrency.code}
                                    onChange={(e) => {
                                        const selected = currencies.find((c) => c.code === e.target.value);
                                        if (selected) setFromCurrency(selected);
                                    }}
                                    className='w-20 rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs font-medium focus:border-[#09704f] focus:outline-none'>
                                    {currencies.map((currency) => (
                                        <option key={`from-${currency.code}`} value={currency.code}>
                                            {currency.code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Swap Button - Compact */}
                        <div className='mb-3 flex justify-center'>
                            <button
                                onClick={swapCurrencies}
                                className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white transition-colors hover:border-[#09704f] hover:text-[#09704f]'>
                                <ArrowRightLeft className='h-3.5 w-3.5' />
                            </button>
                        </div>

                        {/* Result - Compact */}
                        <div className='mb-3'>
                            <div className='flex gap-2'>
                                <div className='flex-1 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900'>
                                    {result.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </div>
                                <select
                                    value={toCurrency.code}
                                    onChange={(e) => {
                                        const selected = currencies.find((c) => c.code === e.target.value);
                                        if (selected) setToCurrency(selected);
                                    }}
                                    className='w-20 rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs font-medium focus:border-[#09704f] focus:outline-none'>
                                    {currencies.map((currency) => (
                                        <option key={`to-${currency.code}`} value={currency.code}>
                                            {currency.code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Exchange Rate - Compact */}
                        <div className='rounded-lg border border-gray-200 bg-white p-3'>
                            <div className='text-center'>
                                <div className='text-[10px] text-gray-500'>Exchange Rate</div>
                                <div className='mt-1 text-base font-bold text-[#09704f]'>
                                    1 {fromCurrency.code} = {exchangeRate.toFixed(4)} {toCurrency.code}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Live Rates - Compact */}
                    <div>
                        <div className='mb-3 flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Activity className='h-3.5 w-3.5 text-[#065b7a]' />
                                <h3 className='text-sm font-medium text-gray-900'>Live Rates</h3>
                            </div>
                            <div className='text-xs text-gray-500'>vs USD</div>
                        </div>

                        {/* Rates Grid - Compact */}
                        <div className='grid grid-cols-2 gap-2'>
                            {currencies.map((c) => (
                                <div
                                    key={c.code}
                                    className={`rounded-lg border p-2.5 transition-colors ${
                                        c.code === fromCurrency.code || c.code === toCurrency.code
                                            ? 'border-[#09704f] bg-[#09704f]/5'
                                            : 'border-gray-200 bg-white hover:bg-gray-50'
                                    }`}>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-1.5'>
                                            <span className='text-sm'>{c.flag}</span>
                                            <div>
                                                <div className='text-xs font-semibold text-gray-900'>{c.code}</div>
                                                <div
                                                    className='truncate text-[10px] text-gray-500'
                                                    style={{ maxWidth: '60px' }}>
                                                    {c.name}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-right'>
                                            <div className='text-xs font-bold text-gray-900'>{c.rate.toFixed(3)}</div>
                                            <div
                                                className={`mt-0.5 text-[10px] ${
                                                    c.trend === 'up'
                                                        ? 'text-green-600'
                                                        : c.trend === 'down'
                                                          ? 'text-red-600'
                                                          : 'text-gray-500'
                                                }`}>
                                                {c.changePercent >= 0 ? '+' : ''}
                                                {c.changePercent.toFixed(2)}%
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Key Info - Compact */}
                        <div className='mt-3 rounded-lg border border-blue-100 bg-blue-50 p-3'>
                            <div className='flex items-start gap-2'>
                                <div className='mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100'>
                                    <span className='text-[10px] font-bold text-blue-600'>!</span>
                                </div>
                                <div>
                                    <div className='text-xs font-medium text-blue-900'>Key Rate: USD/ETB</div>
                                    <div className='mt-0.5 text-[11px] text-blue-700'>
                                        Primary rate for export invoicing
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Note - Compact */}
                <div className='mt-4 rounded-lg border border-green-100 bg-green-50 p-3'>
                    <div className='flex items-start gap-2'>
                        <Globe className='mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600' />
                        <div className='flex-1'>
                            <div className='text-xs font-medium text-green-900'>API Ready</div>
                            <div className='mt-0.5 text-[11px] text-green-700'>Connect to live forex APIs via n8n</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer - Compact */}
            <div className='border-t border-gray-100 bg-gray-50 px-4 py-2'>
                <div className='flex items-center justify-between'>
                    <div className='text-[10px] text-gray-500'>Rates update automatically</div>
                    <div className='text-[10px] text-gray-500'>Indicative rates</div>
                </div>
            </div>
        </div>
    );
};

export default CurrencyExchange;
