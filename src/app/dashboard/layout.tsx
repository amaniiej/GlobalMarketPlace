// app/dashboard/layout.tsx
'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

import { Loader2 } from 'lucide-react';

// app/dashboard/layout.tsx

// app/dashboard/layout.tsx

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient();

            // Check if user is authenticated
            const {
                data: { user },
                error
            } = await supabase.auth.getUser();

            if (error || !user) {
                router.push('/login');

                return;
            }

            // Get user profile to check status
            const { data: profile } = await supabase.from('profiles').select('status').eq('id', user.id).single();

            if (!profile) {
                router.push('/login');

                return;
            }

            // Check account status
            if (profile.status === 'pending') {
                router.push('/pending-verification');

                return;
            }

            if (profile.status === 'rejected') {
                router.push('/account-rejected');

                return;
            }

            setLoading(false);
        };

        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className='flex min-h-screen items-center justify-center bg-linear-to-br from-emerald-50 to-white'>
                <div className='text-center'>
                    <Loader2 className='mx-auto mb-4 h-8 w-8 animate-spin text-emerald-600' />
                    <p className='text-emerald-700'>Verifying your session...</p>
                </div>
            </div>
        );
    }

    // Just render children - the nested layouts will handle the sidebars
    return <>{children}</>;
}
