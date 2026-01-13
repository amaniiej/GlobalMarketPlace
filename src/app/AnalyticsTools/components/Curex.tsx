'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { createClient } from '@supabase/supabase-js';

import { Activity, ArrowRightLeft, Calculator, DollarSign, Euro, Globe, PoundSterling, RefreshCw } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface FxRate {
    id: number;
    currency: string;
    rate: number;
    change_percentage: string;
    change_amount: number;
    last_updated: string;
    updated_at: string;
}

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

// ✅ FIXED: No emojis in object literals, proper typing
const CURRENCY_CONFIG: Currency[] = [
    {
        code: 'USD',
        name: 'US Dollar',
        symbol: '$',
        flag: 'US',
        icon: <DollarSign className='h-3.5 w-3.5' />,
        rate: 1,
        lastUpdated: 'Now',
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
        rate: 0,
        lastUpdated: 'Now',
        trend: 'stable',
        changePercent: 0,
        pair: 'USD/EUR'
    },
    {
        code: 'GBP',
        name: 'British Pound',
        symbol: '£',
        flag: 'GB',
        icon: <PoundSterling className='h-3.5 w-3.5' />,
        rate: 0,
        lastUpdated: 'Now',
        trend: 'stable',
        changePercent: 0,
        pair: 'USD/GBP'
    },
    {
        code: 'ETB',
        name: 'Ethiopian Birr',
        symbol: 'Br',
        flag: 'ET',
        icon: <span className='font-mono text-sm font-bold'>Br</span>,
        rate: 0,
        lastUpdated: 'Now',
        trend: 'stable',
        changePercent: 0,
        pair: 'USD/ETB'
    },
    {
        code: 'CNY',
        name: 'Chinese Yuan',
        symbol: '¥',
        flag: 'CN',
        icon: <span className='font-mono text-sm font-bold'>¥</span>,
        rate: 0,
        lastUpdated: 'Now',
        trend: 'stable',
        changePercent: 0,
        pair: 'USD/CNY'
    },
    {
        code: 'AED',
        name: 'UAE Dirham',
        symbol: 'د.إ',
        flag: 'AE',
        icon: <span className='font-mono text-sm font-bold'>د.إ</span>,
        rate: 0,
        lastUpdated: 'Now',
        trend: 'stable',
        changePercent: 0,
        pair: 'USD/AED'
    }
];

const CurrencyExchange = () => {
    const [currencies, setCurrencies] = useState<Currency[]>(CURRENCY_CONFIG);
    const [amount, setAmount] = useState('1000');
    const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCY_CONFIG[0]);
    const [toCurrency, setToCurrency] = useState<Currency>(CURRENCY_CONFIG[3]);
    const [result, setResult] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState('Just now');
    const [subscriptionStatus, setSubscriptionStatus] = useState<'connecting' | 'connected' | 'disconnected'>(
        'connecting'
    );

    // ✅ FIXED: Proper Supabase fetch for YOUR schema
    const fetchRatesFromSupabase = useCallback(async () => {
        if (!supabaseUrl || !supabaseAnonKey) {
            console.warn('Supabase env vars missing');

            return;
        }

        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('fx_rates')
                .select('currency,rate,change_percentage,last_updated')
                .in('currency', ['USD', 'EUR', 'GBP', 'ETB', 'CNY', 'AED'])
                .order('updated_at', { ascending: false });

            if (error) throw error;

            if (data && data.length > 0) {
                const ratesMap = new Map<string, FxRate>();
                data.forEach((row: FxRate) => {
                    if (
                        !ratesMap.has(row.currency) ||
                        new Date(row.updated_at) > new Date(ratesMap.get(row.currency)?.updated_at || '')
                    ) {
                        ratesMap.set(row.currency, row);
                    }
                });

                setCurrencies((prevCurrencies) =>
                    prevCurrencies.map((currency) => {
                        const supabaseRate = ratesMap.get(currency.code);
                        if (supabaseRate) {
                            const changePercent = parseFloat(supabaseRate.change_percentage.replace('%', '')) || 0;
                            const trend: 'up' | 'down' | 'stable' =
                                changePercent > 0.1 ? 'up' : changePercent < -0.1 ? 'down' : 'stable';

                            return {
                                ...currency,
                                rate: Number(supabaseRate.rate) || 0,
                                changePercent,
                                trend,
                                lastUpdated: new Date(supabaseRate.last_updated).toLocaleString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                            };
                        }

                        return currency;
                    })
                );

                setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            }
        } catch (error) {
            console.error('Supabase fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Exchange calculation
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

    // Initial load + 5hr polling ✅ FIXED useEffect
    useEffect(() => {
        fetchRatesFromSupabase();

        const interval = setInterval(
            () => {
                fetchRatesFromSupabase();
            },
            5 * 60 * 60 * 1000
        ); // 5 hours

        return () => {
            clearInterval(interval);
        };
    }, [fetchRatesFromSupabase]);

    // ✅ REALTIME SUBSCRIPTION - Updates ONLY rate + change%
    useEffect(() => {
        if (!supabaseUrl || !supabaseAnonKey) return;

        const channel = supabase
            .channel('fx_rates_live')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT,UPDATE',
                    schema: 'public',
                    table: 'fx_rates',
                    filter: 'currency=in.(USD,EUR,GBP,ETB,CNY,AED)'
                },
                (payload) => {
                    console.log('🟢 LIVE UPDATE:', payload.new);

                    // Update ONLY matching currency (rate + change%)
                    setCurrencies((prev) =>
                        prev.map((currency) => {
                            if (currency.code === payload.new.currency) {
                                const changePercent = parseFloat(payload.new.change_percentage.replace('%', '')) || 0;
                                const trend: 'up' | 'down' | 'stable' =
                                    changePercent > 0.1 ? 'up' : changePercent < -0.1 ? 'down' : 'stable';

                                return {
                                    ...currency,
                                    rate: Number(payload.new.rate),
                                    changePercent,
                                    trend,
                                    lastUpdated: 'Live'
                                };
                            }

                            return currency;
                        })
                    );
                }
            )
            .subscribe((status) => {
                setSubscriptionStatus(status === 'SUBSCRIBED' ? 'connected' : 'disconnected');
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const swapCurrencies = () => {
        if (fromCurrency && toCurrency) {
            setFromCurrency(toCurrency);
            setToCurrency(fromCurrency);
        }
    };

    const refreshRates = async () => {
        await fetchRatesFromSupabase();
    };

    return (
        <div id='currency-exchange' className='rounded-xl border border-gray-200 bg-white shadow-lg'>
            {/* Header */}
            <div className='flex items-center justify-between border-b border-gray-100 px-4 py-3'>
                <div>
                    <h2 className='text-base font-semibold text-gray-900'>Currency Exchange</h2>
                    <p className='text-xs text-gray-500'>
                        Live FX {subscriptionStatus === 'connected' ? '● Live' : '● Polling'}
                    </p>
                </div>
                <button
                    onClick={refreshRates}
                    disabled={isLoading}
                    className='flex items-center gap-1.5 rounded-lg bg-[#09704f] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#075c43] disabled:opacity-50'>
                    <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? '...' : 'Refresh'}
                </button>
            </div>

            {/* Converter - YOUR ORIGINAL JSX */}
            <div className='p-4'>
                <div className='grid gap-4 lg:grid-cols-2'>
                    {/* Left: Converter */}
                    <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
                        <div className='mb-4 flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Calculator className='h-4 w-4 text-[#09704f]' />
                                <h3 className='text-sm font-medium text-gray-900'>Converter</h3>
                            </div>
                            <div className='text-xs text-gray-500'>{lastUpdated}</div>
                        </div>
                        <div className='mb-3'>
                            <div className='flex gap-2'>
                                <input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    type='number'
                                    className='flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium focus:border-[#09704f] focus:ring-1 focus:ring-[#09704f]'
                                    placeholder='Amount'
                                />
                                <select
                                    value={fromCurrency.code}
                                    onChange={(e) => {
                                        const selected = currencies.find((c) => c.code === e.target.value);
                                        if (selected) setFromCurrency(selected);
                                    }}
                                    className='w-20 rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs font-medium focus:border-[#09704f]'>
                                    {currencies.map((currency) => (
                                        <option key={currency.code} value={currency.code}>
                                            {currency.code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='mb-3 flex justify-center'>
                            <button
                                onClick={swapCurrencies}
                                className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white hover:border-[#09704f] hover:text-[#09704f]'>
                                <ArrowRightLeft className='h-3.5 w-3.5' />
                            </button>
                        </div>
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
                                    className='w-20 rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs font-medium focus:border-[#09704f]'>
                                    {currencies.map((currency) => (
                                        <option key={currency.code} value={currency.code}>
                                            {currency.code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='rounded-lg border border-gray-200 bg-white p-3'>
                            <div className='text-center'>
                                <div className='text-[10px] text-gray-500'>Exchange Rate</div>
                                <div className='mt-1 text-base font-bold text-[#09704f]'>
                                    1 {fromCurrency.code} = {exchangeRate.toFixed(4)} {toCurrency.code}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Live Rates */}
                    <div>
                        <div className='mb-3 flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <Activity className='h-3.5 w-3.5 text-[#065b7a]' />
                                <h3 className='text-sm font-medium text-gray-900'>Live Rates</h3>
                            </div>
                            <div className='text-xs text-gray-500'>vs USD</div>
                        </div>
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
                                            <span className='text-sm font-bold'>{c.flag}</span>
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
                                            <div className='text-xs font-bold text-gray-900'>{c.rate.toFixed(4)}</div>
                                            <div
                                                className={`mt-0.5 text-[10px] ${
                                                    c.trend === 'up'
                                                        ? 'font-medium text-green-600'
                                                        : c.trend === 'down'
                                                          ? 'font-medium text-red-600'
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

                {/* Status */}
                <div className='mt-4 rounded-lg border border-green-100 bg-green-50 p-3'>
                    <div className='flex items-start gap-2'>
                        <Globe className='mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600' />
                        <div className='flex-1'>
                            <div className='text-xs font-medium text-green-900'>
                                Supabase {subscriptionStatus === 'connected' ? '✅ Live' : '🔄 Polling'}
                            </div>
                            <div className='mt-0.5 text-[11px] text-green-700'>
                                Updates rate + change% from fx_rates table
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-t border-gray-100 bg-gray-50 px-4 py-2'>
                <div className='flex items-center justify-between text-[10px] text-gray-500'>
                    <span>Auto-updates every 5hrs + realtime</span>
                    <span>Indicative rates via n8n</span>
                </div>
            </div>
        </div>
    );
};

export default CurrencyExchange;
