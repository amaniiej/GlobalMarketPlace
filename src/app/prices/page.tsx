import PriceTable from './PriceTable';

export default function PricesPage() {
    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='container mx-auto px-4 py-12'>
                {/* Header */}
                <div className='mb-12 text-center'>
                    <h1 className='mb-4 text-4xl font-bold text-gray-900 md:text-5xl'>
                        Live Agricultural Market Prices
                    </h1>
                    <p className='mx-auto max-w-3xl text-xl text-gray-600'>
                        Real-time commodity prices from Ethiopian markets. Updated hourly from ECX and local exchanges.
                    </p>
                    <div className='mt-4 flex items-center justify-center gap-4 text-sm text-gray-500'>
                        <div className='flex items-center gap-2'>
                            <div className='h-2 w-2 rounded-full bg-green-500'></div>
                            <span>Live Prices</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='h-2 w-2 rounded-full bg-blue-500'></div>
                            <span>Auto-refresh every 60s</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div className='h-2 w-2 rounded-full bg-amber-500'></div>
                            <span>Source: ECX & Local Markets</span>
                        </div>
                    </div>
                </div>

                {/* Price Table */}
                <div className='mb-12'>
                    <PriceTable />
                </div>

                {/* Info Section */}
                <div className='mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg'>
                    <h2 className='mb-6 text-2xl font-bold text-gray-900'>About Our Price Data</h2>
                    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                        <div>
                            <h3 className='mb-3 font-semibold text-gray-800'>📊 Data Sources</h3>
                            <p className='text-gray-600'>
                                Prices are aggregated from Ethiopian Commodity Exchange (ECX), regional markets, and
                                direct farm-gate reports.
                            </p>
                        </div>
                        <div>
                            <h3 className='mb-3 font-semibold text-gray-800'>🔄 Update Frequency</h3>
                            <p className='text-gray-600'>
                                Prices update automatically every hour. Timestamps show the latest verified market data.
                            </p>
                        </div>
                        <div>
                            <h3 className='mb-3 font-semibold text-gray-800'>💡 How to Use</h3>
                            <p className='text-gray-600'>
                                Use these prices for market analysis, procurement planning, and export pricing
                                strategies.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className='mt-12 text-center'>
                    <button className='rounded-lg bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700'>
                        Download Price History (CSV)
                    </button>
                    <p className='mt-4 text-sm text-gray-500'>
                        Need custom price reports or historical data? Contact our data team.
                    </p>
                </div>
            </div>
        </div>
    );
}
