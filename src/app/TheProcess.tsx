'use client';

import { useEffect, useRef, useState } from 'react';

export function TheProcess() {
    const fullTitle = 'The Process';
    const [displayedTitle, setDisplayedTitle] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const indexRef = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Infinite typewriter: type -> pause -> delete -> pause -> repeat
    useEffect(() => {
        const type = () => {
            const i = indexRef.current;

            if (!isDeleting) {
                if (i < fullTitle.length) {
                    setDisplayedTitle((prev) => prev + fullTitle.charAt(i));
                    indexRef.current = i + 1;
                    timeoutRef.current = setTimeout(type, 90);
                } else {
                    timeoutRef.current = setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                if (i > 0) {
                    setDisplayedTitle(fullTitle.substring(0, i - 1));
                    indexRef.current = i - 1;
                    timeoutRef.current = setTimeout(type, 60);
                } else {
                    setIsDeleting(false);
                    timeoutRef.current = setTimeout(type, 800);
                }
            }
        };

        type();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isDeleting, fullTitle]);

    const steps = [
        {
            number: 1,
            title: 'Submit Request',
            text: 'Share your product needs, specs, and target delivery window.'
        },
        {
            number: 2,
            title: 'We Source & Verify',
            text: 'We match you with vetted exporters and verify quality & certifications.'
        },
        {
            number: 3,
            title: 'Deal & Logistics',
            text: 'We coordinate pricing, contracts, and logistics through a single point of contact.'
        },
        {
            number: 4,
            title: 'Delivery & Support',
            text: 'You receive shipments with tracking, documents, and ongoing support for next orders.'
        }
    ];

    return (
        <section className='mx-auto max-w-6xl px-4 py-20'>
            {/* Title with looping typewriter */}
            <div className='mb-12 text-center'>
                <h2 className='mb-4 text-3xl font-bold tracking-tight text-emerald-950 md:text-4xl'>
                    {displayedTitle}
                    <span className='ml-1 inline-block h-8 w-0.5 translate-y-1 animate-pulse bg-emerald-600' />
                </h2>
                <p className='mx-auto max-w-xl text-base text-gray-600 md:text-lg'>
                    Your clear path from first inquiry to delivered shipment, explained in four simple steps.
                </p>
            </div>

            {/* Background wrapper (for optional image later) */}
            <div className='relative'>
                {/* Optional background image/GIF
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-15"
          style={{
            backgroundImage: "url('/process-bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        */}

                {/* Main card */}
                <div className='relative rounded-2xl border border-emerald-100 bg-white/95 p-6 shadow-lg md:p-8'>
                    {/* Steps + timeline in one grid so centers line up */}
                    <div className='grid gap-6 md:grid-cols-4'>
                        {steps.map((step) => (
                            <div key={step.number} className='flex flex-col items-center'>
                                {/* Step content */}
                                <div className='group rounded-xl p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:bg-emerald-50/40 hover:shadow-md'>
                                    <div
                                        className='mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700 shadow-sm transition-transform duration-200 group-hover:scale-105'
                                        aria-hidden='true'>
                                        {step.number}
                                    </div>
                                    <h3 className='mb-2 text-lg font-semibold text-gray-900'>{step.title}</h3>
                                    <p className='text-sm text-gray-600'>{step.text}</p>
                                </div>

                                {/* Dot directly under this step */}
                                <div className='mt-6 flex w-full items-center justify-center'>
                                    <div className='h-4 w-4 rounded-full bg-emerald-600 shadow-sm shadow-emerald-500/40' />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Connecting line behind dots (desktop only) */}
                    <div className='relative -mt-4.5 hidden md:block'>
                        <div className='absolute top-1/2 right-8 left-8 h-px -translate-y-1/2 bg-linear-to-r from-emerald-200 via-emerald-300 to-emerald-200' />
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className='mt-10 text-center'>
                <a
                    href='#book-meeting'
                    className='inline-flex items-center rounded-full bg-[#0F3D2E] px-10 py-3 text-base font-medium text-white transition-transform duration-200 hover:scale-105 hover:bg-[#115140]'>
                    Start Step 1 Today →
                </a>
                <p className='mt-3 text-xs text-gray-500 md:text-sm'>
                    Typical end‑to‑end delivery window: 15–30 days, depending on product and route.
                </p>
            </div>
        </section>
    );
}
