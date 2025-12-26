// app/login/page.tsx
'use client';

import { useState } from 'react';

import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';

// app/login/page.tsx

// app/login/page.tsx

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Add your login API call here
            console.log('Login attempt:', formData);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // For now, just redirect to home
            window.location.href = '/';
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='min-h-screen bg-linear-to-b from-gray-50 to-white pt-14'>
            <div className='container mx-auto px-4 py-8'>
                {/* Header */}
                <div className='mb-8 text-center'>
                    <div className='mb-4 inline-flex items-center gap-3 rounded-full bg-gray-100 px-4 py-2'>
                        <Mail className='h-5 w-5 text-gray-600' />
                        <span className='text-sm font-medium text-gray-700'>Sign In</span>
                    </div>
                    <h1 className='mb-3 text-3xl font-bold text-gray-900 md:text-4xl'>Welcome Back to AGROSPACE</h1>
                    <p className='mx-auto max-w-md text-lg text-gray-600'>
                        Access your account to manage your agricultural trade activities
                    </p>
                </div>

                <div className='mx-auto max-w-md'>
                    {/* Login Form */}
                    <form
                        onSubmit={handleSubmit}
                        className='mb-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
                        <div className='border-b border-gray-100 bg-linear-to-r from-gray-50 to-gray-100 p-6'>
                            <h2 className='text-xl font-bold text-gray-900'>Account Login</h2>
                            <p className='text-sm text-gray-600'>Enter your credentials to continue</p>
                        </div>

                        <div className='p-6'>
                            {error && <div className='mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600'>{error}</div>}

                            <div className='space-y-6'>
                                {/* Email Field */}
                                <div className='space-y-3'>
                                    <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                        <Mail className='h-4 w-4' />
                                        Email Address *
                                    </label>
                                    <div className='relative'>
                                        <Mail className='absolute top-3.5 left-4 h-5 w-5 text-gray-400' />
                                        <input
                                            type='email'
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className='w-full rounded-lg border border-gray-300 py-3 pr-4 pl-12 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='your@email.com'
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className='space-y-3'>
                                    <div className='flex items-center justify-between'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Lock className='h-4 w-4' />
                                            Password *
                                        </label>
                                        <a
                                            href='/forgot-password'
                                            className='text-sm text-emerald-600 hover:text-emerald-700 hover:underline'>
                                            Forgot password?
                                        </a>
                                    </div>
                                    <div className='relative'>
                                        <Lock className='absolute top-3.5 left-4 h-5 w-5 text-gray-400' />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className='w-full rounded-lg border border-gray-300 py-3 pr-12 pl-12 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='Enter your password'
                                            required
                                            disabled={loading}
                                        />
                                        <button
                                            type='button'
                                            onClick={() => setShowPassword(!showPassword)}
                                            className='absolute top-3.5 right-4 text-gray-400 hover:text-gray-600'>
                                            {showPassword ? (
                                                <EyeOff className='h-5 w-5' />
                                            ) : (
                                                <Eye className='h-5 w-5' />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me */}
                                <div className='flex items-center space-x-2'>
                                    <input
                                        type='checkbox'
                                        id='remember'
                                        className='h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500'
                                    />
                                    <label htmlFor='remember' className='text-sm text-gray-600'>
                                        Remember me on this device
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='w-full rounded-lg bg-linear-to-r from-emerald-600 to-green-600 px-6 py-3 font-bold text-white shadow-lg hover:from-emerald-700 hover:to-green-700 disabled:opacity-50'>
                                    {loading ? (
                                        <span className='flex items-center justify-center gap-2'>
                                            <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                                            Signing in...
                                        </span>
                                    ) : (
                                        <span className='flex items-center justify-center gap-2'>
                                            Sign In
                                            <ArrowRight className='h-5 w-5' />
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className='border-t border-gray-100 p-6'>
                            <div className='text-center'>
                                <p className='text-sm text-gray-600'>
                                    Don't have an account?{' '}
                                    <a
                                        href='/'
                                        className='font-semibold text-emerald-600 hover:text-emerald-700 hover:underline'>
                                        Explore our services
                                    </a>
                                </p>
                            </div>
                        </div>
                    </form>

                    {/* Quick Links */}
                    <div className='rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
                        <h3 className='mb-4 text-lg font-bold text-gray-900'>Need an Account?</h3>
                        <div className='space-y-4'>
                            <div className='flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 hover:border-emerald-300 hover:bg-emerald-50'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-lg bg-emerald-100 p-2'>
                                        <Lock className='h-5 w-5 text-emerald-600' />
                                    </div>
                                    <div>
                                        <h4 className='font-medium text-gray-900'>I am an Exporter</h4>
                                        <p className='text-sm text-gray-600'>Sell agricultural products globally</p>
                                    </div>
                                </div>
                                <a
                                    href='/signup/exporter'
                                    className='rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700'>
                                    Sign Up
                                </a>
                            </div>

                            <div className='flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 hover:border-blue-300 hover:bg-blue-50'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-lg bg-blue-100 p-2'>
                                        <Lock className='h-5 w-5 text-blue-600' />
                                    </div>
                                    <div>
                                        <h4 className='font-medium text-gray-900'>I am an Importer</h4>
                                        <p className='text-sm text-gray-600'>Source quality products worldwide</p>
                                    </div>
                                </div>
                                <a
                                    href='/signup/importer'
                                    className='rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'>
                                    Sign Up
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Security Note */}
                    <div className='mt-6 rounded-lg bg-gray-50 p-4 text-center'>
                        <p className='text-xs text-gray-500'>🔒 Your data is protected with 256-bit SSL encryption</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
