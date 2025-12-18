'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

export function TypewriterHeading({ text, className = '' }: { text: string; className?: string }) {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i === text.length) clearInterval(interval);
        }, 40); // smooth, not flashy

        return () => clearInterval(interval);
    }, [text]);

    return (
        <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={className}>
            {displayed}
            <span className='animate-pulse text-emerald-700'>|</span>
        </motion.h2>
    );
}
