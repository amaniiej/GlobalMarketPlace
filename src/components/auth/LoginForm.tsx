'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // TODO: Add Supabase login logic here
        console.log('Login attempt:', { email, password });

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push('/dashboard');
        }, 1000);
    };

    return (
        <Card className='w-full max-w-md'>
            <CardHeader className='text-center'>
                <CardTitle className='text-2xl'>Welcome Back</CardTitle>
                <CardDescription>Sign in to your AGROSPACE account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            type='email'
                            placeholder='you@example.com'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input
                            id='password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className='text-sm text-red-600'>{error}</div>}

                    <Button type='submit' className='w-full bg-[#0F3D2E] hover:bg-[#115140]' disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <div className='text-center text-sm text-gray-600'>
                        Don&apos;t have an account?{' '}
                        <a href='/register' className='text-[#0F3D2E] hover:underline'>
                            Sign up
                        </a>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
