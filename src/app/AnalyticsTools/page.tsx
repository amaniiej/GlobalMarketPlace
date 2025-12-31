// /home/amanuel/Documents/AGROSPACE Site/src/app/AnalyticsTools/page.tsx
import React from 'react';

import PriceTrends from './components/PriceTrends';

const AnalyticsToolsPage = () => {
    return (
        <div className='container mx-auto min-h-screen bg-linear-to-b from-gray-50 to-white px-4 py-10'>
            {/* Header Section - Simplified without border/shadow */}
            <div className='bg-white pt-8'>
                <div className='container mx-auto px-4'>
                    <div className='mb-6 text-center'>
                        <h1 className='mb-2 text-2xl font-bold text-gray-900 md:text-3xl'>
                            Analytics & Market Intelligence
                        </h1>
                        <p className='mx-auto max-w-3xl text-base text-gray-600'>
                            Advanced tools for Ethiopian commodity exporters and international buyers. Real-time price
                            tracking, trend analysis, and market insights to optimize your trading decisions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className='container mx-auto px-4 py-6'>
                <PriceTrends />
                {/* Other components will go here in the future */}
            </div>
        </div>
    );
};

export default AnalyticsToolsPage;
