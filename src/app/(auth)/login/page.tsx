// app/(auth)/login/page.tsx
'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

// app/(auth)/login/page.tsx

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Sign in with Supabase
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (authError) throw authError;

            // 2. Get user profile with role
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', authData.user.id)
                .single();

            if (profileError) throw profileError;

            // 3. Redirect based on role
            if (profile.role === 'importer') {
                router.push('/dashboard/importer');
            } else if (profile.role === 'exporter') {
                router.push('/dashboard/exporter');
            } else {
                throw new Error('User role not found');
            }
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center bg-gray-50'>
            <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-lg'>
                <h1 className='mb-6 text-center text-2xl font-bold'>Login to AGROSPACE</h1>
                <form onSubmit={handleLogin} className='space-y-4'>
                    <div>
                        <label className='mb-1 block text-sm font-medium'>Company Email</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full rounded-lg border px-3 py-2'
                            required
                        />
                    </div>
                    <div>
                        <label className='mb-1 block text-sm font-medium'>Password</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.value)}
                            className='w-full rounded-lg border px-3 py-2'
                            required
                        />
                    </div>
                    {error && <p className='text-sm text-red-500'>{error}</p>}
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full rounded-lg bg-emerald-600 py-2 text-white hover:bg-emerald-700 disabled:opacity-50'>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
