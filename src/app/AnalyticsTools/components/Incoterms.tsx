'use client';

import React, { useState } from 'react';

import { AlertCircle, DollarSign, Info, Shield, Truck } from 'lucide-react';

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

interface SupplyChainStage {
    id: string;
    name: string;
    icon: string;
}

const supplyChainStages: SupplyChainStage[] = [
    { id: 'farm', name: 'Farm', icon: '🌱' },
    { id: 'warehouse', name: 'Warehouse', icon: '🏭' },
    { id: 'port-et', name: 'Port (ET)', icon: '⚓' },
    { id: 'ocean', name: 'Ocean', icon: '🚢' },
    { id: 'port-dest', name: 'Port (Destination)', icon: '🌍' },
    { id: 'buyer-warehouse', name: 'Buyer Warehouse', icon: '🏢' }
];

const IncotermExplainer = () => {
    const [selected, setSelected] = useState<IncotermData>(incotermsData[1]);

    const burdenStyle = {
        Low: 'bg-emerald-50 text-emerald-700',
        Medium: 'bg-amber-50 text-amber-700',
        High: 'bg-red-50 text-red-700'
    };

    return (
        <section className='rounded-xl border border-gray-200 bg-white shadow-lg'>
            <div id='incoterms' className='border-b border-gray-100 px-5 py-4'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-lg font-semibold text-gray-900'>Incoterm Responsibility Map</h2>
                        <p className='mt-0.5 text-xs text-gray-600'>Visual guide to trade responsibilities</p>
                    </div>
                    <div className='flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5'>
                        <Info className='h-3.5 w-3.5 text-blue-600' />
                        <span className='text-xs font-medium text-blue-700'>Trade Guide</span>
                    </div>
                </div>
            </div>

            <div className='p-5'>
                {/* Incoterm Selector */}
                <div className='mb-6'>
                    <div className='flex flex-wrap gap-3'>
                        {incotermsData.map((term) => (
                            <button
                                key={term.id}
                                onClick={() => setSelected(term)}
                                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                                    selected.id === term.id
                                        ? 'bg-[#09704f] text-white shadow-sm'
                                        : 'border border-gray-200 text-gray-700 hover:border-[#09704f] hover:text-[#09704f]'
                                }`}>
                                {term.id}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Summary */}
                <div className='mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3'>
                    <div className='rounded-lg border border-gray-200 p-3'>
                        <div className='mb-1 flex items-center gap-1.5'>
                            <DollarSign className='h-3.5 w-3.5 text-gray-500' />
                            <span className='text-xs font-medium text-gray-700'>Cost</span>
                        </div>
                        <p className='text-sm font-semibold text-gray-900'>{selected.costResponsibility}</p>
                    </div>

                    <div className='rounded-lg border border-gray-200 p-3'>
                        <div className='mb-1 flex items-center gap-1.5'>
                            <Shield className='h-3.5 w-3.5 text-gray-500' />
                            <span className='text-xs font-medium text-gray-700'>Risk Transfer</span>
                        </div>
                        <p className='text-sm font-semibold text-gray-900'>{selected.riskTransferPoint}</p>
                    </div>

                    <div className='rounded-lg border border-gray-200 p-3'>
                        <div className='mb-1 flex items-center gap-1.5'>
                            <Truck className='h-3.5 w-3.5 text-gray-500' />
                            <span className='text-xs font-medium text-gray-700'>Operational Burden</span>
                        </div>
                        <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${burdenStyle[selected.operationalBurden]}`}>
                            {selected.operationalBurden}
                        </span>
                    </div>
                </div>

                {/* Timeline */}
                <div className='mb-6'>
                    <div className='mb-3 flex items-center justify-between'>
                        <h4 className='text-xs font-semibold tracking-wider text-gray-700 uppercase'>
                            Responsibility Flow
                        </h4>
                        <span className='text-xs text-gray-500'>{selected.name}</span>
                    </div>

                    <div className='relative mb-4'>
                        <div className='relative h-2 overflow-hidden rounded-full bg-gray-100'>
                            {(() => {
                                const totalStages = 6;
                                let currentPosition = 0;
                                const segments: React.ReactElement[] = [];

                                supplyChainStages.forEach((stage) => {
                                    const isShared =
                                        selected.sellerStages.includes(stage.name) &&
                                        selected.buyerStages.includes(stage.name);
                                    const isExporter = selected.sellerStages.includes(stage.name) && !isShared;

                                    const width = 100 / totalStages;
                                    const color = isShared
                                        ? 'bg-[#a7b304]'
                                        : isExporter
                                          ? 'bg-[#0ad18f]'
                                          : 'bg-[#065b7a]';

                                    segments.push(
                                        <div
                                            key={`segment-${stage.id}`}
                                            className={`absolute top-0 h-full ${color}`}
                                            style={{ left: `${currentPosition}%`, width: `${width}%` }}
                                        />
                                    );

                                    currentPosition += width;
                                });

                                return segments;
                            })()}
                        </div>

                        {/* Stage Indicators */}
                        <div className='relative mt-2 grid grid-cols-6'>
                            {supplyChainStages.map((stage) => {
                                const isShared =
                                    selected.sellerStages.includes(stage.name) &&
                                    selected.buyerStages.includes(stage.name);
                                const isExporter = selected.sellerStages.includes(stage.name) && !isShared;

                                return (
                                    <div key={stage.id} className='flex flex-col items-center'>
                                        <div
                                            className={`mb-1 flex h-7 w-7 items-center justify-center rounded-md text-sm shadow-sm ${
                                                isShared
                                                    ? 'bg-[#f1f3d4] text-[#7d8500]'
                                                    : isExporter
                                                      ? 'bg-[#e6fbf3] text-[#09704f]'
                                                      : 'bg-[#e6f1f6] text-[#065b7a]'
                                            }`}>
                                            {stage.icon}
                                        </div>
                                        <div className='h-1.5 w-1.5 rounded-full bg-gray-400'></div>
                                        <div className='mt-1 text-center text-[10px] font-medium text-gray-700'>
                                            {stage.name.split(' ')[0]}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-t border-gray-100 bg-gray-50 px-5 py-3'>
                <div className='flex items-center justify-between'>
                    <div className='text-[10px] text-gray-500'>Incoterms® 2020 • International Chamber of Commerce</div>
                    <div className='text-[10px] text-gray-500'>Click terms to compare</div>
                </div>
            </div>
        </section>
    );
};

export default IncotermExplainer;
