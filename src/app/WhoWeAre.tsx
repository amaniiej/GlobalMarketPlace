// src/app/who-we-are.tsx
export function WhoWeAre() {
    return (
        <section className='bg-white py-16'>
            <div className='container mx-auto px-4'>
                {/* Header */}
                <div className='mb-12 text-center'>
                    <h2 className='mb-4 text-4xl font-bold text-gray-900'>Who We Are</h2>
                    <p className='mx-auto max-w-3xl text-xl text-gray-600'>
                        Your trusted partner in Ethiopian agricultural exports
                    </p>
                </div>

                {/* Mission & Vision Cards */}
                <div className='mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2'>
                    {/* Mission */}
                    <div className='rounded-2xl border border-green-100 bg-green-50 p-8'>
                        <div className='mb-4 text-3xl text-green-600'>🎯</div>
                        <h3 className='mb-4 text-2xl font-bold text-gray-900'>Our Mission</h3>
                        <p className='text-lg text-gray-700'>
                            To bridge the gap between Ethiopia's rich agricultural heritage and global markets, ensuring
                            fair trade for farmers while delivering exceptional quality to buyers worldwide.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className='rounded-2xl border border-amber-100 bg-amber-50 p-8'>
                        <div className='mb-4 text-3xl text-amber-600'>🌟</div>
                        <h3 className='mb-4 text-2xl font-bold text-gray-900'>Our Vision</h3>
                        <p className='text-lg text-gray-700'>
                            To become Africa's most trusted agricultural export platform, transforming how the world
                            sources premium Ethiopian commodities with transparency and integrity.
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className='mt-12 grid grid-cols-2 gap-6 md:grid-cols-4'>
                    <div className='text-center'>
                        <div className='text-3xl font-bold text-green-600'>50+</div>
                        <div className='text-gray-600'>Farm Partners</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-3xl font-bold text-green-600'>15</div>
                        <div className='text-gray-600'>Countries Served</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-3xl font-bold text-green-600'>500+</div>
                        <div className='text-gray-600'>Successful Shipments</div>
                    </div>
                    <div className='text-center'>
                        <div className='text-3xl font-bold text-green-600'>100%</div>
                        <div className='text-gray-600'>Compliance Rate</div>
                    </div>
                </div>

                {/* Trust Signals */}
                <div className='mt-16 border-t pt-12'>
                    <h3 className='mb-8 text-center text-2xl font-bold'>Trusted By</h3>
                    <div className='flex flex-wrap items-center justify-center gap-8 opacity-60 md:gap-16'>
                        <div className='h-12 w-32 rounded bg-gray-200'></div>
                        <div className='h-12 w-32 rounded bg-gray-200'></div>
                        <div className='h-12 w-32 rounded bg-gray-200'></div>
                        <div className='h-12 w-32 rounded bg-gray-200'></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
