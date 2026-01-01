'use client';

import React, { useState } from 'react';

import { AlertCircle, ArrowRight, CheckCircle, DollarSign, Shield, Truck } from 'lucide-react';

interface IncotermData {
    id: string;
    name: string;
    description: string;
    costResponsibility: string;
    riskTransferPoint: string;
    operationalBurden: 'Low' | 'Medium' | 'High';
    insight: string;
    sellerStages: string[];
    buyerStages: string[];
}

const incotermsData: IncotermData[] = [
    {
        id: 'EXW',
        name: 'EXW – Ex Works',
        description: 'Goods made available at seller premises.',
        costResponsibility: 'Buyer from Origin',
        riskTransferPoint: 'Seller Premises',
        operationalBurden: 'Low',
        insight: 'Maximum control for buyer, minimal seller involvement.',
        sellerStages: ['Farm'],
        buyerStages: ['Warehouse', 'Port (ET)', 'Ocean', 'Port (Destination)', 'Buyer Warehouse']
    },
    {
        id: 'FOB',
        name: 'FOB – Free On Board',
        description: 'Seller loads goods on vessel at origin port.',
        costResponsibility: 'Exporter until Loading',
        riskTransferPoint: 'On Vessel at Ethiopian Port',
        operationalBurden: 'Medium',
        insight: 'Buyer controls freight. Risk transfers at loading.',
        sellerStages: ['Farm', 'Warehouse', 'Port (ET)'],
        buyerStages: ['Ocean', 'Port (Destination)', 'Buyer Warehouse']
    },
    {
        id: 'CIF',
        name: 'CIF – Cost, Insurance & Freight',
        description: 'Seller pays freight & insurance to destination port.',
        costResponsibility: 'Exporter until Destination Port',
        riskTransferPoint: 'After Vessel Loading',
        operationalBurden: 'Medium',
        insight: 'Seller arranges freight, buyer assumes destination-side risk.',
        sellerStages: ['Farm', 'Warehouse', 'Port (ET)', 'Ocean'],
        buyerStages: ['Port (Destination)', 'Buyer Warehouse']
    },
    {
        id: 'DAP',
        name: 'DAP – Delivered At Place',
        description: 'Goods delivered to buyer location.',
        costResponsibility: 'Exporter until Delivery',
        riskTransferPoint: 'Buyer Premises',
        operationalBurden: 'High',
        insight: 'Exporter controls logistics. Buyer handles customs.',
        sellerStages: ['Farm', 'Warehouse', 'Port (ET)', 'Ocean', 'Port (Destination)'],
        buyerStages: ['Buyer Warehouse']
    },
    {
        id: 'DDP',
        name: 'DDP – Delivered Duty Paid',
        description: 'Seller handles everything including duties.',
        costResponsibility: 'Exporter Complete',
        riskTransferPoint: 'Final Destination',
        operationalBurden: 'High',
        insight: 'Simplest for buyer. Highest cost and opacity.',
        sellerStages: ['Farm', 'Warehouse', 'Port (ET)', 'Ocean', 'Port (Destination)', 'Buyer Warehouse'],
        buyerStages: []
    }
];

const supplyChainStages = [
    { id: 'farm', name: 'Farm', icon: '🌱' },
    { id: 'warehouse', name: 'Warehouse', icon: '🏭' },
    { id: 'port-et', name: 'Port (ET)', icon: '⚓' },
    { id: 'ocean', name: 'Ocean', icon: '🚢' },
    { id: 'port-dest', name: 'Port (Destination)', icon: '🌍' },
    { id: 'buyer-warehouse', name: 'Buyer Warehouse', icon: '🏢' }
];

const IncotermExplainer = () => {
    const [selected, setSelected] = useState(incotermsData[1]);

    const burdenStyle = {
        Low: 'bg-emerald-50 text-emerald-700',
        Medium: 'bg-amber-50 text-amber-700',
        High: 'bg-red-50 text-red-700'
    };

    return (
        <section className='rounded-2xl border border-gray-200 bg-white shadow-xl'>
            {/* Header */}
            <div className='border-b bg-linear-to-r from-gray-50 via-white to-gray-50 px-6 py-6'>
                <h2 className='text-2xl font-semibold text-gray-900'>Incoterm Responsibility Map</h2>
                <p className='mt-1 text-sm text-gray-600'>
                    See exactly who pays, who controls, and where risk transfers.
                </p>
            </div>

            <div className='space-y-10 p-6'>
                {/* Selector */}
                <div>
                    <div className='flex flex-wrap gap-2'>
                        {incotermsData.map((term) => (
                            <button
                                key={term.id}
                                onClick={() => setSelected(term)}
                                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                                    selected.id === term.id
                                        ? 'bg-[#09704f] text-white shadow'
                                        : 'border border-gray-200 text-gray-700 hover:border-[#09704f] hover:text-[#09704f]'
                                }`}>
                                {term.id}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Insight */}
                <div className='rounded-xl border bg-gray-50 p-5'>
                    <h3 className='font-semibold text-gray-900'>{selected.name}</h3>
                    <p className='mt-1 text-sm text-gray-600'>{selected.description}</p>
                    <p className='mt-3 text-sm font-medium text-[#065b7a]'>{selected.insight}</p>
                </div>

                {/* Responsibility Flow */}
                <div>
                    <h4 className='mb-4 text-sm font-semibold tracking-wide text-gray-700 uppercase'>
                        Responsibility Flow
                    </h4>

                    <div className='relative grid grid-cols-2 gap-6 md:grid-cols-6'>
                        {supplyChainStages.map((stage, idx) => {
                            const seller = selected.sellerStages.includes(stage.name);
                            const buyer = selected.buyerStages.includes(stage.name);

                            const bg = seller
                                ? buyer
                                    ? 'bg-gradient-to-br from-[#09704f] to-[#065b7a]'
                                    : 'bg-[#09704f]'
                                : 'bg-[#065b7a]';

                            return (
                                <div key={stage.id} className='relative flex flex-col items-center'>
                                    <div
                                        className={`flex h-16 w-16 items-center justify-center rounded-full text-white shadow ${bg}`}>
                                        <span className='text-xl'>{stage.icon}</span>
                                    </div>

                                    <span className='mt-2 text-xs font-medium text-gray-800'>{stage.name}</span>
                                    <span
                                        className={`text-xs font-semibold ${
                                            seller ? 'text-[#09704f]' : 'text-[#065b7a]'
                                        }`}>
                                        {seller && buyer ? 'Shared' : seller ? 'Exporter' : 'Buyer'}
                                    </span>

                                    {idx < supplyChainStages.length - 1 && (
                                        <ArrowRight className='absolute top-8 -right-5.5 hidden text-gray-300 md:block' />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Summary Cards */}
                <div className='grid gap-4 md:grid-cols-3'>
                    <div className='rounded-xl border p-4'>
                        <div className='flex items-center gap-2 text-sm font-semibold text-gray-600'>
                            <DollarSign className='h-4 w-4' />
                            Cost Responsibility
                        </div>
                        <p className='mt-1 font-medium text-gray-900'>{selected.costResponsibility}</p>
                    </div>

                    <div className='rounded-xl border p-4'>
                        <div className='flex items-center gap-2 text-sm font-semibold text-gray-600'>
                            <Shield className='h-4 w-4' />
                            Risk Transfer
                        </div>
                        <p className='mt-1 font-medium text-gray-900'>{selected.riskTransferPoint}</p>
                    </div>

                    <div className='rounded-xl border p-4'>
                        <div className='flex items-center gap-2 text-sm font-semibold text-gray-600'>
                            <Truck className='h-4 w-4' />
                            Operational Burden
                        </div>
                        <span
                            className={`mt-1 inline-block rounded-full px-3 py-1 text-sm ${burdenStyle[selected.operationalBurden]}`}>
                            {selected.operationalBurden}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IncotermExplainer;
