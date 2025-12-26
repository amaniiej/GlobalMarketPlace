import PriceTable from './PriceTable';

export default function PricesPage() {
    return (
        <main className='pt-14'>
            <div className='container mx-auto px-4 py-4'>
                {' '}
                {/* Changed py-12 to py-4 */}
                {/* Header */}
                <div className='mb-6 text-center'>
                    {' '}
                    {/* Changed mb-12 to mb-6 */}
                    <h1 className='mb-2 text-3xl font-bold text-gray-900 md:text-4xl'>
                        {' '}
                        {/* Changed from text-4xl/5xl to 3xl/4xl */}
                        Live Agricultural Market Prices
                    </h1>
                    <p className='mx-auto max-w-3xl text-lg text-gray-600'>
                        {' '}
                        {/* Changed from text-xl to text-lg */}
                        Real-time commodity prices from Ethiopian markets. Updated hourly from ECX and local exchanges.
                    </p>
                    <div className='mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500'>
                        {' '}
                        {/* Changed mt-4 to mt-2, text-sm to text-xs, gap-4 to gap-2 */}
                        <div className='flex items-center gap-1'>
                            <div className='h-1.5 w-1.5 rounded-full bg-green-500'></div> {/* Smaller dot */}
                            <span>Live Prices</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <div className='h-1.5 w-1.5 rounded-full bg-blue-500'></div>
                            <span>Auto-refresh every 60s</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <div className='h-1.5 w-1.5 rounded-full bg-amber-500'></div>
                            <span>Source: ECX & Local Markets</span>
                        </div>
                    </div>
                </div>
                {/* Price Table */}
                <div className='mb-6'>
                    {' '}
                    {/* Changed mb-12 to mb-6 */}
                    <PriceTable />
                </div>
                {/* Info Section */}
                <div className='mx-auto max-w-4xl rounded-xl bg-gray-50 p-6 shadow'>
                    {' '}
                    {/* Changed rounded-2xl to rounded-xl, p-8 to p-6, shadow-lg to shadow */}
                    <h2 className='mb-4 text-xl font-bold text-gray-900'>
                        {' '}
                        {/* Changed mb-6 to mb-4, text-2xl to text-xl */}
                        About Our Price Data
                    </h2>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                        {' '}
                        {/* Changed gap-6 to gap-4 */}
                        <div>
                            <h3 className='mb-2 text-sm font-semibold text-gray-800'>
                                {' '}
                                {/* Changed mb-3 to mb-2 */}
                                📊 Data Sources
                            </h3>
                            <p className='text-sm text-gray-600'>
                                {' '}
                                {/* Added text-sm */}
                                Prices are aggregated from Ethiopian Commodity Exchange (ECX), regional markets, and
                                direct farm-gate reports.
                            </p>
                        </div>
                        <div>
                            <h3 className='mb-2 text-sm font-semibold text-gray-800'>🔄 Update Frequency</h3>
                            <p className='text-sm text-gray-600'>
                                Prices update automatically every hour. Timestamps show the latest verified market data.
                            </p>
                        </div>
                        <div>
                            <h3 className='mb-2 text-sm font-semibold text-gray-800'>💡 How to Use</h3>
                            <p className='text-sm text-gray-600'>
                                Use these prices for market analysis, procurement planning, and export pricing
                                strategies.
                            </p>
                        </div>
                    </div>
                </div>
                {/* CTA */}
                <div className='mt-6 text-center'>
                    {' '}
                    {/* Changed mt-12 to mt-6 */}
                    <button className='rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700'>
                        {' '}
                        {/* Changed px-8 to px-6, py-3 to py-2, added text-sm */}
                        Download Price History (CSV)
                    </button>
                    <p className='mt-2 text-xs text-gray-500'>
                        {' '}
                        {/* Changed mt-4 to mt-2 */}
                        Need custom price reports or historical data? Contact our data team.
                    </p>
                </div>
            </div>
        </main>
    );
}
