// src/app/test-supabase/page.tsx
'use client';

import { useEffect, useState } from 'react';

import { createClient } from '@/lib/supabase/client';

// src/app/test-supabase/page.tsx

// src/app/test-supabase/page.tsx

// src/app/test-supabase/page.tsx

export default function TestSupabasePage() {
    const [status, setStatus] = useState('Testing...');
    const supabase = createClient();

    useEffect(() => {
        const testConnection = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    setStatus(`Error: ${error.message}`);
                } else {
                    setStatus('Supabase connected WagWan successfully!');
                }
            } catch (err) {
                setStatus(`Exception: ${err}`);
            }
        };

        testConnection();
    }, []);

    return (
        <div className='flex min-h-screen items-center justify-center'>
            <div className='rounded-lg bg-white p-8 shadow-lg'>
                <h1 className='mb-4 text-2xl font-bold'>Supabase Test</h1>
                <p className='text-gray-700'>{status}</p>
                <p className='mt-4 text-sm text-gray-500'>URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}</p>
            </div>
        </div>
    );
}
