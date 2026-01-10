// app/dashboard/page.tsx
'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

// app/dashboard/page.tsx

// app/dashboard/page.tsx

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        const redirectToRoleDashboard = async () => {
            const supabase = createClient();
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!user) {
                router.push('/login');

                return;
            }

            const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

            if (!profile) {
                router.push('/login');

                return;
            }

            // Redirect based on role
            if (profile.role === 'exporter') {
                router.push('/dashboard/exporter');
            } else if (profile.role === 'importer') {
                router.push('/dashboard/buyer');
            }
        };

        redirectToRoleDashboard();
    }, [router]);

    return (
        <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-emerald-50 to-white'>
            <div className='text-center'>
                <div className='mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-emerald-600'></div>
                <p className='mt-4 text-emerald-700'>Redirecting to your dashboard...</p>
            </div>
        </div>
    );
}
