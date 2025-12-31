// /home/amanuel/Documents/AGROSPACE Site/src/app/AnalyticsTools/page.tsx
import React from 'react';

import PriceTrends from './components/PriceTrends';
// Change this import
import { BarChart3, Download, Info, LineChart, TrendingUp } from 'lucide-react';

const AnalyticsToolsPage = () => {
    return (
        <div className='container mx-auto min-h-screen bg-linear-to-b from-gray-50 to-white px-4 py-10'>
            {/* Header Section */}
            <div className='border-b border-gray-200 bg-white shadow-sm'>
                <div className='container mx-auto px-4 py-8'>
                    <div className='mb-4 text-center'>
                        <h1 className='mb-1 text-2xl font-bold text-gray-900 md:text-3xl'>
                            Analytics & Market Intelligence
                        </h1>
                        <p className='mx-auto max-w-3xl text-base text-gray-600'>
                            Advanced tools for Ethiopian commodity exporters and international buyers. Real-time price
                            tracking, trend analysis, and market insights to optimize your trading decisions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='container mx-auto px-4 py-8'>
                <div className='mb-6'>
                    <h2 className='mb-2 text-2xl font-bold text-gray-800'>Price Trends Dashboard</h2>
                    <p className='text-gray-600'>
                        Monitor real-time commodity prices with exporter and buyer-specific metrics.
                    </p>
                </div>

                {/* Price Trends Table */}
                <PriceTrends />
            </div>
        </div>
    );
};

export default AnalyticsToolsPage;
