// In your AnalyticsTools/page.tsx
import React from 'react';

import Incoterms from './components/Incoterms';
import PriceTrends from './components/PriceTrends';

const AnalyticsToolsPage = () => {
    return (
        <div className='min-h-screen bg-linear-to-b from-gray-50 to-white'>
            {/* Header Section */}
            <div className='bg-white pt-8'>
                <div className='container mx-auto px-4'>
                    <div className='mb-6 text-center'>
                        <h1 className='mb-2 text-2xl font-bold text-gray-900 md:text-3xl'>
                            Analytics & Market Intelligence
                        </h1>
                        <p className='mx-auto max-w-3xl text-base text-gray-600'>
                            Advanced tools for Ethiopian commodity exporters and international buyers.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className='container mx-auto space-y-8 px-4 py-6'>
                <PriceTrends />
                <Incoterms />
                {/* Add more components here */}
            </div>
        </div>
    );
};

export default AnalyticsToolsPage;
