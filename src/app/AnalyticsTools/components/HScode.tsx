// /home/amanuel/Documents/AGROSPACE Site/src/app/AnalyticsTools/components/HSCodeLookup.tsx
'use client';

import React, { useState } from 'react';

import { AlertCircle, ExternalLink, FileText, Loader2, Search } from 'lucide-react';

// /home/amanuel/Documents/AGROSPACE Site/src/app/AnalyticsTools/components/HSCodeLookup.tsx

// HS code database (simplified for Ethiopian commodities)
const hsCodeDatabase = [
    { code: '0901.11', name: 'Coffee, not roasted', description: 'Arabica coffee beans, not roasted' },
    { code: '0901.12', name: 'Coffee, roasted', description: 'Arabica coffee beans, roasted' },
    { code: '1207.40', name: 'Sesame seeds', description: 'Sesamum seeds, whether or not broken' },
    { code: '1201.90', name: 'Soybeans', description: 'Soybeans, whether or not broken' },
    { code: '1006.30', name: 'Milled rice', description: 'Rice, semi-milled or wholly milled' },
    { code: '0713.31', name: 'Beans', description: 'Beans of the species Vigna, dried, shelled' },
    { code: '0802.11', name: 'Almonds', description: 'Almonds, fresh or dried, shelled' },
    { code: '0709.60', name: 'Chillies & peppers', description: 'Fruits of genus Capsicum, dried' },
    { code: '1211.90', name: 'Spices nesoi', description: 'Spices not elsewhere specified' },
    { code: '0802.32', name: 'Walnuts', description: 'Walnuts, fresh or dried, shelled' },
    { code: '0904.11', name: 'Black pepper', description: 'Pepper of the genus Piper, dried' },
    { code: '0703.10', name: 'Onions', description: 'Onions and shallots, fresh' },
    { code: '0709.51', name: 'Mushrooms', description: 'Mushrooms of the genus Agaricus' },
    { code: '0805.10', name: 'Oranges', description: 'Oranges, fresh or dried' },
    { code: '0810.90', name: 'Fresh fruits', description: 'Other fresh fruits' }
];

interface HSCodeResult {
    code: string;
    name: string;
    description: string;
    category?: string;
    dutyRate?: string;
}

const HSCodeLookup = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<HSCodeResult[]>([]);
    const [selectedCode, setSelectedCode] = useState<HSCodeResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [rateLimit, setRateLimit] = useState(5); // Rate limit counter

    // Handle search
    const handleSearch = () => {
        if (rateLimit <= 0) {
            setSearchError('Rate limit exceeded. Please try again later.');

            return;
        }

        if (!searchQuery.trim()) {
            setSearchError('Please enter a product name or HS code');

            return;
        }

        setIsLoading(true);
        setSearchError(null);

        // Simulate API call with delay
        setTimeout(() => {
            const query = searchQuery.toLowerCase().trim();

            // Filter results based on query
            const results = hsCodeDatabase.filter(
                (item) =>
                    item.name.toLowerCase().includes(query) ||
                    item.code.includes(query) ||
                    item.description.toLowerCase().includes(query)
            );

            setSearchResults(results);
            setRateLimit((prev) => prev - 1);
            setIsLoading(false);

            if (results.length === 0) {
                setSearchError('No matching HS codes found. Try a broader search.');
            } else {
                // Auto-select first result if available
                setSelectedCode(results[0]);
            }
        }, 500);
    };

    // Handle Enter key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Clear search
    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        setSelectedCode(null);
        setSearchError(null);
    };

    // Get HS code category from first 4 digits
    const getCategory = (code: string): string => {
        const firstFour = code.substring(0, 4);

        // Simplified category mapping
        const categories: Record<string, string> = {
            '0901': 'Coffee & Tea',
            '1207': 'Oil Seeds',
            '1201': 'Soybeans',
            '1006': 'Cereals',
            '0713': 'Vegetables',
            '0802': 'Nuts',
            '0709': 'Vegetables',
            '1211': 'Plants & Parts',
            '0904': 'Spices',
            '0703': 'Vegetables',
            '0805': 'Citrus Fruit',
            '0810': 'Fresh Fruit'
        };

        return categories[firstFour] || 'General Products';
    };

    // Get estimated duty rate (simplified)
    const getDutyRate = (code: string): string => {
        const firstTwo = code.substring(0, 2);

        // Simplified duty rates
        const rates: Record<string, string> = {
            '09': '0-5%', // Coffee, tea, spices
            '12': '0-3%', // Oil seeds, grains
            '07': '5-10%', // Vegetables
            '08': '3-8%', // Fruits, nuts
            '10': '0-2%', // Cereals
            '17': '15-25%' // Sugars
        };

        return rates[firstTwo] || 'Varies by country';
    };

    return (
        <div className='rounded-xl border border-gray-200 bg-white shadow-lg'>
            {/* Header */}
            <div className='border-b border-gray-100 px-5 py-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-lg font-semibold text-gray-900'>HS Code Lookup</h2>
                        <p className='mt-0.5 text-xs text-gray-600'>
                            Find Harmonized System codes for Ethiopian export commodities
                        </p>
                    </div>
                    <div className='flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5'>
                        <FileText className='h-3.5 w-3.5 text-blue-600' />
                        <span className='text-xs font-medium text-blue-700'>Trade Data</span>
                    </div>
                </div>
            </div>

            <div className='p-5'>
                {/* Search Section */}
                <div className='mb-6'>
                    <div className='mb-4'>
                        <div className='flex gap-2'>
                            <div className='relative flex-1'>
                                <input
                                    type='text'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Search by product name or HS code (e.g., 'coffee' or '0901.11')"
                                    className='w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-sm focus:border-[#09704f] focus:ring-1 focus:ring-[#09704f] focus:outline-none'
                                />
                                <Search className='absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400' />
                            </div>
                            <button
                                onClick={handleSearch}
                                disabled={isLoading || rateLimit <= 0}
                                className='flex items-center gap-2 rounded-lg bg-[#09704f] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#075c43] disabled:cursor-not-allowed disabled:opacity-50'>
                                {isLoading ? (
                                    <>
                                        <Loader2 className='h-4 w-4 animate-spin' />
                                        <span>Searching</span>
                                    </>
                                ) : (
                                    <>
                                        <Search className='h-4 w-4' />
                                        <span>Search</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Rate limit and error messages */}
                        <div className='mt-3 flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <span className='text-xs text-gray-500'>
                                    Searches remaining:{' '}
                                    <span
                                        className={`font-medium ${rateLimit <= 2 ? 'text-amber-600' : 'text-gray-700'}`}>
                                        {rateLimit}
                                    </span>
                                </span>
                                {rateLimit <= 2 && <AlertCircle className='h-3.5 w-3.5 text-amber-500' />}
                            </div>
                            {searchError && (
                                <div className='flex items-center gap-1.5 text-xs text-red-600'>
                                    <AlertCircle className='h-3.5 w-3.5' />
                                    <span>{searchError}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Search Suggestions */}
                    <div className='mb-4'>
                        <p className='mb-2 text-xs font-medium text-gray-700'>Quick search:</p>
                        <div className='flex flex-wrap gap-2'>
                            {['Coffee', 'Sesame', 'Beans', 'Spices', 'Nuts'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setSearchQuery(item);
                                        setTimeout(() => handleSearch(), 50);
                                    }}
                                    className='rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 transition hover:border-[#09704f] hover:text-[#09704f]'>
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                {selectedCode && (
                    <div className='mb-6'>
                        <div className='mb-4 flex items-center justify-between'>
                            <h3 className='text-sm font-semibold text-gray-900'>Selected HS Code</h3>
                            <div className='flex items-center gap-2'>
                                <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div>
                                <span className='text-xs text-green-600'>Verified</span>
                            </div>
                        </div>

                        {/* Selected Code Card */}
                        <div className='rounded-lg border border-gray-200 bg-gray-50 p-4'>
                            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                                {/* HS Code */}
                                <div className='rounded-lg bg-white p-4'>
                                    <div className='mb-2 flex items-center gap-2'>
                                        <FileText className='h-4 w-4 text-[#09704f]' />
                                        <span className='text-xs font-medium text-gray-700'>HS Code</span>
                                    </div>
                                    <div className='text-center'>
                                        <div className='text-2xl font-bold tracking-wider text-[#09704f]'>
                                            {selectedCode.code}
                                        </div>
                                        <div className='mt-1 text-xs text-gray-500'>6-digit Harmonized Code</div>
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className='rounded-lg bg-white p-4'>
                                    <div className='mb-2 text-xs font-medium text-gray-700'>Product Description</div>
                                    <div>
                                        <div className='text-sm font-semibold text-gray-900'>{selectedCode.name}</div>
                                        <div className='mt-1 text-xs text-gray-600'>{selectedCode.description}</div>
                                    </div>
                                </div>

                                {/* Category & Duty */}
                                <div className='rounded-lg bg-white p-4'>
                                    <div className='mb-2 text-xs font-medium text-gray-700'>Classification</div>
                                    <div className='space-y-2'>
                                        <div className='flex justify-between'>
                                            <span className='text-xs text-gray-600'>Category:</span>
                                            <span className='text-xs font-medium text-gray-900'>
                                                {getCategory(selectedCode.code)}
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-xs text-gray-600'>Estimated Duty:</span>
                                            <span className='text-xs font-medium text-gray-900'>
                                                {getDutyRate(selectedCode.code)}
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-xs text-gray-600'>Digits:</span>
                                            <span className='text-xs font-medium text-gray-900'>6-digit</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* External Links */}
                            <div className='mt-4 flex flex-wrap gap-3'>
                                <a
                                    href={`https://www.trade.gov/harmonized-system-hs-codes`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 transition hover:border-[#09704f] hover:text-[#09704f]'>
                                    <ExternalLink className='h-3 w-3' />
                                    Learn about HS Codes
                                </a>
                                <a
                                    href={`https://wits.worldbank.org/tariff/commodities-by-hs-code?hs=${selectedCode.code}`}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 transition hover:border-[#09704f] hover:text-[#09704f]'>
                                    <ExternalLink className='h-3 w-3' />
                                    Check global tariffs
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search Results List */}
                {searchResults.length > 0 && (
                    <div className='mb-6'>
                        <div className='mb-3 flex items-center justify-between'>
                            <h3 className='text-sm font-semibold text-gray-900'>
                                Search Results ({searchResults.length})
                            </h3>
                            <button onClick={clearSearch} className='text-xs text-gray-500 hover:text-gray-700'>
                                Clear all
                            </button>
                        </div>

                        <div className='space-y-2'>
                            {searchResults.map((result) => (
                                <div
                                    key={result.code}
                                    onClick={() => setSelectedCode(result)}
                                    className={`cursor-pointer rounded-lg border p-3 transition-all ${
                                        selectedCode?.code === result.code
                                            ? 'border-[#09704f] bg-[#09704f]/5'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}>
                                    <div className='flex items-start justify-between'>
                                        <div>
                                            <div className='flex items-center gap-2'>
                                                <div className='text-sm font-bold text-[#09704f]'>{result.code}</div>
                                                {selectedCode?.code === result.code && (
                                                    <div className='rounded-full bg-[#09704f] px-1.5 py-0.5 text-[10px] text-white'>
                                                        Selected
                                                    </div>
                                                )}
                                            </div>
                                            <div className='mt-1 text-sm font-medium text-gray-900'>{result.name}</div>
                                            <div className='mt-0.5 text-xs text-gray-600'>{result.description}</div>
                                        </div>
                                        <div className='text-right'>
                                            <div className='text-xs font-medium text-gray-900'>
                                                {getCategory(result.code)}
                                            </div>
                                            <div className='mt-1 text-xs text-gray-500'>
                                                Duty: {getDutyRate(result.code)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Information Section */}
                <div className='rounded-lg border border-blue-100 bg-blue-50 p-4'>
                    <div className='flex items-start gap-2'>
                        <AlertCircle className='mt-0.5 h-4 w-4 shrink-0 text-blue-600' />
                        <div>
                            <h4 className='text-xs font-semibold text-blue-900'>About HS Codes</h4>
                            <p className='mt-1 text-xs text-blue-700'>
                                The Harmonized System (HS) is an internationally standardized system for classifying
                                traded products. Ethiopian exporters use 6-digit HS codes for customs declarations.
                                Always verify codes with your freight forwarder or customs broker.
                            </p>
                            <div className='mt-2 grid grid-cols-2 gap-2 text-xs'>
                                <div className='text-blue-800'>• First 2 digits: Chapter</div>
                                <div className='text-blue-800'>• First 4 digits: Heading</div>
                                <div className='text-blue-800'>• 6 digits: Subheading</div>
                                <div className='text-blue-800'>• 8+ digits: National level</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className='border-t border-gray-100 bg-gray-50 px-5 py-3'>
                <div className='flex items-center justify-between'>
                    <div className='text-[10px] text-gray-500'>Data source: WCO Harmonized System 2022</div>
                    <div className='text-[10px] text-gray-500'>Rate limited to prevent abuse</div>
                </div>
            </div>
        </div>
    );
};

export default HSCodeLookup;
