'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { motion } from 'framer-motion';

function SimpleHeading({ text, className = '' }: { text: string; className?: string }) {
    return <h2 className={className}>{text}</h2>;
}

export function WhoWeWorkWith() {
    return (
        <section className='mx-auto max-w-5xl px-4 py-12 md:py-16'>
            {' '}
            {/* Reduced padding */}
            {/* Heading */}
            <div className='mb-10 text-center'>
                {' '}
                {/* Reduced margin */}
                <SimpleHeading
                    text='Who We Work With'
                    className='text-3xl font-semibold tracking-tight text-emerald-950 md:text-4xl' /* Adjusted sizes */
                />
            </div>
            {/* Cards */}
            <div className='grid gap-6 md:grid-cols-2'>
                {' '}
                {/* Reduced gap */}
                {/* International Buyers */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    viewport={{ once: true }}>
                    <Card className='h-full rounded-xl border-emerald-100 shadow-sm transition-shadow hover:shadow-md'>
                        {' '}
                        {/* Rounded-xl */}
                        <CardHeader>
                            <CardTitle className='text-lg font-semibold text-emerald-900 md:text-xl'>
                                {' '}
                                {/* Smaller */}
                                International Buyers
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4 text-gray-700'>
                            <p className='font-medium text-gray-800'>
                                Source Ethiopian agricultural products with confidence.
                            </p>
                            <p className='text-sm text-gray-600'>
                                We remove the uncertainty from cross-border sourcing by managing verification, quality
                                checks, and coordination on your behalf.
                            </p>

                            <div className='pt-2'>
                                <h4 className='mb-3 text-sm font-semibold text-emerald-800'>What Buyers Get</h4>
                                <ul className='space-y-2.5 text-sm text-gray-700'>
                                    <li className='flex items-start'>
                                        <span className='mr-2 text-emerald-600'>✓</span>
                                        <span>
                                            <strong>Verified Exporters Only</strong> – We work only with licensed
                                            exporters with proven export capacity.
                                        </span>
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-2 text-emerald-600'>✓</span>
                                        <span>
                                            <strong>Quality Checked Before Commitment</strong> – Product inspection,
                                            sample validation, and spec alignment before bulk sourcing.
                                        </span>
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-2 text-emerald-600'>✓</span>
                                        <span>
                                            <strong>Clear Documentation & Compliance Guidance</strong> – Export
                                            paperwork and destination requirements explained upfront.
                                        </span>
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-2 text-emerald-600'>✓</span>
                                        <span>
                                            <strong>Human Oversight, Not Automation</strong> – Every deal is reviewed
                                            and coordinated by real professionals.
                                        </span>
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-2 text-emerald-600'>✓</span>
                                        <span>
                                            <strong>Private & Secure Sourcing</strong> – No public listings. No
                                            intermediaries. No noise.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
                {/* Ethiopian Exporters */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}>
                    <Card className='h-full rounded-xl border-emerald-100 shadow-sm transition-shadow hover:shadow-md'>
                        <CardHeader>
                            <CardTitle className='text-lg font-semibold text-emerald-900 md:text-xl'>
                                Ethiopian Exporters
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4 text-gray-700'>
                            <p className='font-medium text-gray-800'>Get introduced to serious international buyers.</p>
                            <p className='text-sm text-gray-600'>
                                Focus on production while we handle buyer qualification, requirement alignment, and deal
                                coordination.
                            </p>

                            <div className='pt-2'>
                                <h4 className='mb-3 text-sm font-semibold text-emerald-800'>What Exporters Get</h4>
                                <ul className='space-y-2.5 text-sm text-gray-700'>
                                    <li className='flex items-start'>
                                        <span className='mr-2 text-emerald-600'>✓</span>
                                        <span>
                                            <strong>Qualified Buyer Introductions</strong> – Only serious buyers with
                                            verified requirements and capacity.
                                        </span>
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-2 text-emerald-600'>✓</span>
                                        <span>
                                            <strong>Clear Buyer Requirements Upfront</strong> – No guesswork. Know
                                            exactly what buyers need before engagement.
                                        </span>
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-2 text-emerald-600'>✓</span>
                                        <span>
                                            <strong>Export Process & Compliance Support</strong> – Guidance on
                                            documentation, labeling, and shipping requirements.
                                        </span>
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-2 text-emerald-600'>✓</span>
                                        <span>
                                            <strong>Built for Long-Term Trade</strong> – We prioritize sustainable
                                            relationships over one-time transactions.
                                        </span>
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-2 text-emerald-600'>✓</span>
                                        <span>
                                            <strong>No Commission on Future Deals</strong> – After the first successful
                                            introduction, you own the relationship.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
