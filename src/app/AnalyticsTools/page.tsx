'use client';

import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnalyticsToolsPage() {
    const [activeIncoterm, setActiveIncoterm] = useState('FOB');
    const [hsCodeInput, setHsCodeInput] = useState('');

    // HS Code data
    const hsCodeExamples = [
        { code: '0901.11.00', description: 'Coffee, not roasted, not decaffeinated' },
        { code: '0901.21.00', description: 'Coffee, roasted, not decaffeinated' },
        { code: '0713.33.10', description: 'Beans (kidney, navy, etc.), dried' },
        { code: '0904.11.00', description: 'Pepper of the genus Piper, neither crushed nor ground' },
        { code: '0910.91.10', description: 'Ginger, neither crushed nor ground' }
    ];

    // Incoterms data
    const incoterms = [
        {
            code: 'EXW',
            name: 'Ex Works',
            cost: 'Buyer from Origin',
            risk: "At Seller's Premises",
            burden: 'High',
            insight: 'Maximum control for buyer, maximum responsibility.'
        },
        {
            code: 'FOB',
            name: 'Free On Board',
            cost: 'Exporter until Port',
            risk: 'At Ethiopian Port',
            burden: 'Medium',
            insight: 'You control freight, risk starts at loading.'
        },
        {
            code: 'CIF',
            name: 'Cost, Insurance & Freight',
            cost: 'Exporter arranges freight',
            risk: 'After loading on vessel',
            burden: 'Low',
            insight: 'Exporter arranges freight, you carry port risk.'
        },
        {
            code: 'DAP',
            name: 'Delivered At Place',
            cost: 'Exporter to Destination',
            risk: "At Buyer's Location",
            burden: 'Low',
            insight: 'Exporter delivers to your door, you handle import clearance.'
        },
        {
            code: 'DDP',
            name: 'Delivered Duty Paid',
            cost: 'Exporter covers all',
            risk: 'At Final Destination',
            burden: 'Very Low',
            insight: 'Simplest for you, most comprehensive for exporter.'
        }
    ];

    // Cost breakdown categories
    const costCategories = [
        {
            category: 'Origin Costs',
            includes: ['Farm gate price', 'Aggregation', 'Quality grading', 'Packaging', 'Local handling'],
            placeholder: '$$$–$$$$'
        },
        {
            category: 'Inland Logistics',
            includes: ['Trucking to port', 'Local permits', 'Port handling fees', 'Documentation'],
            placeholder: '$$–$$$'
        },
        {
            category: 'Export Handling',
            includes: ['Port charges', 'Loading', 'Export clearance', 'Customs brokerage'],
            placeholder: '$$–$$$'
        },
        {
            category: 'Ocean Freight',
            includes: ['Container shipping', 'Fuel surcharges', 'Port congestion fees', 'Insurance (if CIF)'],
            placeholder: '$$$$–$$$$$'
        },
        {
            category: 'Import & Customs',
            includes: ['Import duties', 'Destination port fees', 'Customs clearance', 'Taxes'],
            placeholder: '$$$–$$$$'
        },
        {
            category: 'Compliance & Risk',
            includes: ['Quality inspections', 'Phytosanitary certificates', 'Insurance premiums', 'Risk management'],
            placeholder: '$$–$$$'
        },
        {
            category: 'Final Delivery',
            includes: ['Destination trucking', 'Warehouse storage', 'Last-mile delivery', 'Unloading'],
            placeholder: '$$–$$$'
        }
    ];

    const handleHSCodeLookup = (e: React.FormEvent) => {
        e.preventDefault();
        // In real app, this would query an API
        console.log('Looking up HS code:', hsCodeInput);
    };

    const activeIncotermData = incoterms.find((term) => term.code === activeIncoterm);

    return (
        <div className='mx-auto max-w-6xl px-4 py-12'>
            {/* Header */}
            <div className='mb-12 text-center'>
                <h1 className='mb-4 text-4xl font-bold tracking-tight text-emerald-950'>Analytics & Tools</h1>
                <p className='mx-auto max-w-2xl text-lg text-gray-600'>
                    Educational tools to help you understand Ethiopian agricultural exports better.
                </p>
            </div>

            {/* Main Tools Tabs */}
            <Tabs defaultValue='incoterms' className='space-y-8'>
                <TabsList className='grid w-full grid-cols-4'>
                    <TabsTrigger value='incoterms'>Incoterms</TabsTrigger>
                    <TabsTrigger value='costs'>Cost Breakdown</TabsTrigger>
                    <TabsTrigger value='prices'>Price Trends</TabsTrigger>
                    <TabsTrigger value='hscode'>HS Code Lookup</TabsTrigger>
                </TabsList>

                {/* Tab 1: Incoterm Explainer */}
                <TabsContent value='incoterms'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Incoterm Explainer</CardTitle>
                            <CardDescription>
                                Understand responsibility, risk, and cost allocation for different shipping terms.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Incoterm Selector */}
                            <div className='mb-8 flex flex-wrap gap-2'>
                                {incoterms.map((term) => (
                                    <button
                                        key={term.code}
                                        onClick={() => setActiveIncoterm(term.code)}
                                        className={`rounded-full px-4 py-2 font-medium transition-colors ${activeIncoterm === term.code ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                        {term.code}
                                    </button>
                                ))}
                            </div>

                            {/* Active Incoterm Display */}
                            {activeIncotermData && (
                                <div className='space-y-8'>
                                    {/* Responsibility Flow */}
                                    <div className='rounded-lg border border-gray-200 p-6'>
                                        <h3 className='mb-4 text-lg font-semibold text-gray-900'>
                                            Responsibility Flow: {activeIncotermData.name}
                                        </h3>
                                        <div className='relative h-2 w-full overflow-hidden rounded-full bg-gray-200'>
                                            <div className='absolute left-0 h-full w-1/2 bg-emerald-500'></div>
                                            <div className='absolute right-0 h-full w-1/2 bg-gray-400'></div>
                                        </div>
                                        <div className='mt-2 flex justify-between text-sm text-gray-600'>
                                            <span>Exporter Responsibility</span>
                                            <span>Buyer Responsibility</span>
                                        </div>
                                    </div>

                                    {/* Three Fixed Labels */}
                                    <div className='grid gap-4 md:grid-cols-3'>
                                        <div className='rounded-lg border border-gray-200 p-4'>
                                            <h4 className='mb-2 font-medium text-gray-900'>Cost Responsibility</h4>
                                            <p className='text-emerald-600'>{activeIncotermData.cost}</p>
                                        </div>
                                        <div className='rounded-lg border border-gray-200 p-4'>
                                            <h4 className='mb-2 font-medium text-gray-900'>Risk Transfer Point</h4>
                                            <p className='text-emerald-600'>{activeIncotermData.risk}</p>
                                        </div>
                                        <div className='rounded-lg border border-gray-200 p-4'>
                                            <h4 className='mb-2 font-medium text-gray-900'>Operational Burden</h4>
                                            <p className='text-emerald-600'>{activeIncotermData.burden}</p>
                                        </div>
                                    </div>

                                    {/* One-sentence Insight */}
                                    <div className='rounded-lg bg-emerald-50 p-6'>
                                        <h4 className='mb-2 font-medium text-emerald-900'>Key Insight</h4>
                                        <p className='text-emerald-700'>{activeIncotermData.insight}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 2: Cost Breakdown */}
                <TabsContent value='costs'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Import Cost Structure</CardTitle>
                            <CardDescription>
                                Typical cost categories involved in Ethiopian agricultural exports.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-6'>
                                {costCategories.map((category, index) => (
                                    <div
                                        key={index}
                                        className='group rounded-lg border border-gray-200 p-6 transition-all hover:border-emerald-300 hover:shadow-md'>
                                        <div className='flex items-center justify-between'>
                                            <h3 className='text-lg font-medium text-gray-900'>{category.category}</h3>
                                            <span className='text-xl font-bold text-gray-400'>
                                                {category.placeholder}
                                            </span>
                                        </div>

                                        <div className='mt-4'>
                                            <div className='h-2 w-full overflow-hidden rounded-full bg-gray-200'>
                                                <div className='h-full w-3/4 bg-linear-to-r from-emerald-400 to-emerald-600 opacity-70'></div>
                                            </div>
                                        </div>

                                        <div className='mt-4'>
                                            <p className='text-sm text-gray-600'>Includes:</p>
                                            <ul className='mt-2 space-y-1'>
                                                {category.includes.map((item, idx) => (
                                                    <li key={idx} className='text-sm text-gray-500'>
                                                        • {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='mt-8 rounded-lg bg-gray-50 p-4 text-center'>
                                <p className='text-sm text-gray-600'>
                                    Actual costs depend on Incoterm, volume, timing, and destination.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 3: Price Trends */}
                <TabsContent value='prices'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Commodity Price Trends</CardTitle>
                            <CardDescription>
                                Simplified market overview for major Ethiopian agricultural products.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-8'>
                                {/* Simplified Chart */}
                                <div className='h-64 rounded-lg border border-gray-200 p-4'>
                                    <div className='flex h-full items-end justify-between'>
                                        {[30, 45, 60, 75, 90, 65, 50, 55, 70, 85, 80, 75].map((height, index) => (
                                            <div
                                                key={index}
                                                className='w-8 rounded-t bg-linear-to-t from-emerald-500 to-emerald-300'
                                                style={{ height: `${height}%` }}
                                            />
                                        ))}
                                    </div>
                                    <div className='mt-4 flex justify-between text-sm text-gray-500'>
                                        <span>Jan</span>
                                        <span>Dec</span>
                                    </div>
                                </div>

                                {/* Product Cards */}
                                <div className='grid gap-4 md:grid-cols-2'>
                                    {[
                                        { name: 'Coffee', trend: '↑ 5.2%', color: 'bg-amber-100 text-amber-800' },
                                        {
                                            name: 'Sesame Seeds',
                                            trend: '↑ 2.8%',
                                            color: 'bg-emerald-100 text-emerald-800'
                                        },
                                        { name: 'Spices', trend: '↑ 4.1%', color: 'bg-red-100 text-red-800' },
                                        { name: 'Tea', trend: '↓ 1.3%', color: 'bg-blue-100 text-blue-800' }
                                    ].map((product, index) => (
                                        <div key={index} className='rounded-lg border border-gray-200 p-4'>
                                            <div className='flex items-center justify-between'>
                                                <span className='font-medium'>{product.name}</span>
                                                <span className={`rounded-full px-3 py-1 text-sm ${product.color}`}>
                                                    {product.trend}
                                                </span>
                                            </div>
                                            <p className='mt-2 text-sm text-gray-600'>
                                                12-month price movement overview
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className='rounded-lg bg-emerald-50 p-4'>
                                    <p className='text-sm text-emerald-700'>
                                        Note: These are simplified trends for educational purposes. Actual prices vary
                                        by quality, volume, and contract terms.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Tab 4: HS Code Lookup */}
                <TabsContent value='hscode'>
                    <Card>
                        <CardHeader>
                            <CardTitle>HS Code Lookup</CardTitle>
                            <CardDescription>
                                Find Harmonized System codes for Ethiopian agricultural products.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='space-y-8'>
                                {/* Input Form */}
                                <form onSubmit={handleHSCodeLookup} className='space-y-4'>
                                    <div>
                                        <label
                                            htmlFor='product'
                                            className='mb-2 block text-sm font-medium text-gray-700'>
                                            Enter Product Name
                                        </label>
                                        <div className='flex gap-2'>
                                            <input
                                                type='text'
                                                id='product'
                                                value={hsCodeInput}
                                                onChange={(e) => setHsCodeInput(e.target.value)}
                                                placeholder='e.g., coffee, sesame, spices'
                                                className='flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            />
                                            <button
                                                type='submit'
                                                className='rounded-lg bg-[#0F3D2E] px-6 py-3 font-medium text-white hover:bg-[#115140]'>
                                                Lookup
                                            </button>
                                        </div>
                                        <p className='mt-2 text-xs text-gray-500'>
                                            Rate limited to 10 searches per hour
                                        </p>
                                    </div>
                                </form>

                                {/* Example Results */}
                                <div>
                                    <h3 className='mb-4 text-lg font-medium text-gray-900'>Example HS Codes</h3>
                                    <div className='space-y-3'>
                                        {hsCodeExamples.map((example, index) => (
                                            <div
                                                key={index}
                                                className='rounded-lg border border-gray-200 p-4 hover:border-emerald-300'>
                                                <div className='flex items-center justify-between'>
                                                    <span className='font-mono font-medium text-emerald-700'>
                                                        {example.code}
                                                    </span>
                                                    <span className='text-sm text-gray-500'>Ethiopia Export</span>
                                                </div>
                                                <p className='mt-2 text-gray-700'>{example.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className='rounded-lg bg-gray-50 p-4'>
                                    <p className='text-sm text-gray-600'>
                                        HS codes are standardized worldwide. This tool helps identify the correct code
                                        for your product research.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Footer Note */}
            <div className='mt-12 text-center'>
                <p className='text-sm text-gray-500'>
                    These tools are for educational purposes. For accurate calculations and personalized insights,
                    please{' '}
                    <a href='/signup/importer' className='text-emerald-600 hover:underline'>
                        create an account
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
