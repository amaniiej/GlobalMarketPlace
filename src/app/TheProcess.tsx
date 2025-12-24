'use client';

import { useEffect, useState } from 'react';

export function TheProcess() {
    const [displayedTitle, setDisplayedTitle] = useState('');
    const title = 'The Process';

    // Fix: Continuous typewriter effect
    useEffect(() => {
        let i = 0;

        const typeWriter = () => {
            if (i < title.length) {
                setDisplayedTitle((prev) => prev + title.charAt(i));
                i++;
                setTimeout(typeWriter, 80);
            } else {
                // Restart after 3 seconds
                setTimeout(() => {
                    setDisplayedTitle('');
                    i = 0;
                    typeWriter();
                }, 3000);
            }
        };

        typeWriter();

        return () => setDisplayedTitle('');
    }, []);

    return (
        <section className='mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-4 py-20'>
            {/* Title with REAL Typewriter Effect */}
            <div className='mb-12 text-center'>
                <h2 className='mb-4 text-4xl font-bold tracking-tight text-emerald-950 md:text-5xl'>
                    {displayedTitle}
                    <span className='ml-1 animate-pulse text-emerald-600'>|</span>
                </h2>
                <p className='mx-auto max-w-xl text-lg text-gray-600'>
                    Your clear path from inquiry to delivery — simplified in four straightforward steps.
                </p>
            </div>

            {/* SINGLE CARD with all 4 steps */}
            <div className='rounded-2xl border border-emerald-100 bg-white p-8 shadow-xl'>
                <div className='grid gap-8 md:grid-cols-4'>
                    {/* Step 1 */}
                    <div className='text-center'>
                        <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700'>
                            1
                        </div>
                        <h3 className='mb-3 text-xl font-semibold text-gray-900'>Submit Request</h3>
                        <p className='text-gray-600'>Share your product needs and specifications.</p>
                    </div>

                    {/* Step 2 */}
                    <div className='text-center'>
                        <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700'>
                            2
                        </div>
                        <h3 className='mb-3 text-xl font-semibold text-gray-900'>We Source & Verify</h3>
                        <p className='text-gray-600'>We vet exporters and validate quality.</p>
                    </div>

                    {/* Step 3 */}
                    <div className='text-center'>
                        <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700'>
                            3
                        </div>
                        <h3 className='mb-3 text-xl font-semibold text-gray-900'>Deal & Logistics</h3>
                        <p className='text-gray-600'>We handle contracts and shipping arrangements.</p>
                    </div>

                    {/* Step 4 */}
                    <div className='text-center'>
                        <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700'>
                            4
                        </div>
                        <h3 className='mb-3 text-xl font-semibold text-gray-900'>Delivery & Support</h3>
                        <p className='text-gray-600'>Real-time tracking and ongoing assistance.</p>
                    </div>
                </div>

                {/* Timeline Visualization */}
                <div className='mt-10 hidden md:block'>
                    <div className='relative'>
                        <div className='absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 bg-linear-to-r from-emerald-200 via-emerald-300 to-emerald-200' />
                        <div className='relative flex justify-between'>
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className='relative'>
                                    <div className='h-6 w-6 rounded-full bg-emerald-600' />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className='mt-12 text-center'>
                <a
                    href='#book-meeting'
                    className='inline-flex items-center rounded-full bg-[#0F3D2E] px-10 py-4 text-lg font-medium text-white transition-transform duration-200 hover:scale-105 hover:bg-[#115140]'>
                    Start Step 1 Today →
                </a>
                <p className='mt-4 text-sm text-gray-500'>Complete process typically takes 15-30 days</p>
            </div>
        </section>
    );
}
