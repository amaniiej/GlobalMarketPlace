'use client';

import { Card, CardContent } from '@/components/ui/card';

import { motion } from 'framer-motion';

// Simple TypewriterHeading fallback
function TypewriterHeading({ text, className = '' }: { text: string; className?: string }) {
    return <h2 className={className}>{text}</h2>;
}

const steps = [
    {
        title: 'Requirement Intake',
        desc: 'Buyer submits product needs or exporter submits capacity.'
    },
    {
        title: 'Verification & Matching',
        desc: 'Exporters vetted. Products and requirements aligned.'
    },
    {
        title: 'Quality & Compliance Review',
        desc: 'Samples, specs, and documentation checked.'
    },
    {
        title: 'Pre-Shipment Coordination',
        desc: 'Packaging, labeling, and timelines confirmed.'
    },
    {
        title: 'Secure Deal Progression',
        desc: 'Parties move forward with clarity and confidence.'
    }
];

export function HowItWorks() {
    return (
        <section className='bg-emerald-50/40 py-24'>
            <div className='mx-auto max-w-6xl px-4'>
                {/* Heading */}
                <div className='mb-16 text-center'>
                    <TypewriterHeading
                        text='How It Works'
                        className='text-4xl font-semibold tracking-tight text-emerald-950'
                    />
                </div>

                {/* Steps */}
                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.12,
                                ease: 'easeOut'
                            }}
                            viewport={{ once: true }}>
                            <Card className='rounded-2xl border-emerald-100 bg-white shadow-sm transition-shadow hover:shadow-md'>
                                <CardContent className='p-6'>
                                    <h3 className='mb-2 text-lg font-semibold text-emerald-900'>
                                        {index + 1}. {step.title}
                                    </h3>
                                    <p className='text-sm text-gray-700'>{step.desc}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
