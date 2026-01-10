// app/(auth)/signup/page.tsx
'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

import { Building, CheckCircle, FileText, Globe, Lock, Mail, Phone, User } from 'lucide-react';

// app/(auth)/signup/page.tsx

// app/(auth)/signup/page.tsx

export default function SignUpPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        // Required fields
        email: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        contactPerson: '',
        primaryPhone: '',

        // Role selection
        role: 'importer', // Default to importer

        // Country field
        country: '',

        // Optional fields
        secondaryPhone: '',
        additionalEmail: '',
        languages: [] as string[]
    });

    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const languageOptions = [
        'English',
        'Amharic',
        'Arabic',
        'French',
        'Spanish',
        'Chinese',
        'German',
        'Italian',
        'Portuguese'
    ];

    const countryOptions = [
        'United States',
        'United Kingdom',
        'Canada',
        'Germany',
        'France',
        'Italy',
        'Spain',
        'Netherlands',
        'United Arab Emirates',
        'Saudi Arabia',
        'China',
        'Japan',
        'South Korea',
        'India',
        'Ethiopia',
        'Kenya',
        'Nigeria',
        'South Africa',
        'Egypt',
        'Brazil',
        'Argentina',
        'Australia',
        'Other'
    ];

    const handleInputChange = (field: string, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear password error when user starts typing
        if (field === 'password' || field === 'confirmPassword') {
            setPasswordError('');
        }
    };

    const toggleLanguage = (language: string) => {
        const current = [...formData.languages];
        if (current.includes(language)) {
            handleInputChange(
                'languages',
                current.filter((item) => item !== language)
            );
        } else {
            handleInputChange('languages', [...current, language]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setPasswordError('');

        try {
            // Validate passwords match
            if (formData.password !== formData.confirmPassword) {
                throw new Error('Passwords do not match');
            }

            // Validate password strength
            if (formData.password.length < 8) {
                throw new Error('Password must be at least 8 characters');
            }

            const supabase = createClient();

            // Create auth user - profile will be auto-created by database trigger
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    emailRedirectTo: `${window.location.origin}/login`,
                    data: {
                        // Required fields for the profiles table
                        company_name: formData.companyName,
                        role: formData.role,
                        country: formData.country,
                        contact_person: formData.contactPerson,
                        primary_phone: formData.primaryPhone,
                        // Status will be set to 'pending' by database trigger

                        // Optional fields for user_meta_data
                        secondary_phone: formData.secondaryPhone || '',
                        additional_email: formData.additionalEmail || '',
                        // FIXED: Send languages as array instead of string
                        languages: formData.languages
                    }
                }
            });

            if (authError) {
                if (authError.message.includes('already registered')) {
                    throw new Error('This email is already registered. Please try logging in instead.');
                }
                throw new Error(`Registration error: ${authError.message}`);
            }

            // Show success message
            const roleMessage =
                formData.role === 'exporter'
                    ? '📋 Your exporter application is now pending admin verification. We will contact you within 48 hours.'
                    : '📋 Your importer account is now pending admin verification. We will contact you within 48 hours.';

            alert('✅ Registration successful! Please check your email to verify your account.');
            alert(roleMessage);

            // Redirect to login page
            router.push('/login');
        } catch (err: any) {
            console.error('Signup error:', err);

            if (err.message.includes('Passwords do not match')) {
                setPasswordError('Passwords do not match');
            } else if (err.message.includes('Password must be')) {
                setPasswordError(err.message);
            } else {
                alert(`❌ Error: ${err.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='min-h-screen bg-linear-to-b from-emerald-50 to-white pt-14'>
            <div className='container mx-auto px-4 py-8'>
                {/* Header */}
                <div className='mb-8 text-center'>
                    <div className='mb-4 inline-flex items-center gap-3 rounded-full bg-emerald-100 px-4 py-2'>
                        <Building className='h-5 w-5 text-emerald-600' />
                        <span className='text-sm font-medium text-emerald-700'>Join AGROSPACE</span>
                    </div>
                    <h1 className='mb-3 text-3xl font-bold text-gray-900 md:text-4xl'>Create Your Account</h1>
                    <p className='mx-auto max-w-2xl text-lg text-gray-600'>
                        Join our global platform connecting agricultural importers and exporters
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='mx-auto max-w-4xl'>
                    <div className='space-y-6'>
                        {/* Account Type Selection */}
                        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
                            <div className='border-b border-gray-100 bg-linear-to-r from-purple-50 to-indigo-50 p-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-lg bg-purple-100 p-2'>
                                        <User className='h-6 w-6 text-purple-600' />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-bold text-gray-900'>Account Type</h2>
                                        <p className='text-sm text-gray-600'>
                                            Select your primary role on the platform
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-6'>
                                <div className='grid gap-6 md:grid-cols-2'>
                                    {/* Importer Option */}
                                    <button
                                        type='button'
                                        onClick={() => handleInputChange('role', 'importer')}
                                        disabled={loading}
                                        className={`rounded-xl border-2 p-6 text-left transition-all hover:scale-[1.02] ${
                                            formData.role === 'importer'
                                                ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500 ring-offset-2'
                                                : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50'
                                        } disabled:cursor-not-allowed disabled:opacity-50`}>
                                        <div className='mb-4 flex items-center justify-between'>
                                            <div className='flex items-center gap-3'>
                                                <div
                                                    className={`rounded-lg p-2 ${
                                                        formData.role === 'importer' ? 'bg-emerald-100' : 'bg-gray-100'
                                                    }`}>
                                                    <Globe
                                                        className={`h-6 w-6 ${
                                                            formData.role === 'importer'
                                                                ? 'text-emerald-600'
                                                                : 'text-gray-600'
                                                        }`}
                                                    />
                                                </div>
                                                <span className='text-lg font-bold text-gray-900'>Importer</span>
                                            </div>
                                            {formData.role === 'importer' && (
                                                <CheckCircle className='h-6 w-6 text-emerald-600' />
                                            )}
                                        </div>
                                        <ul className='space-y-2 text-sm text-gray-600'>
                                            <li className='flex items-start gap-2'>
                                                <CheckCircle className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                                                <span>Source quality agricultural products worldwide</span>
                                            </li>
                                            <li className='flex items-start gap-2'>
                                                <CheckCircle className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                                                <span>Connect with verified exporters</span>
                                            </li>
                                            <li className='flex items-start gap-2'>
                                                <CheckCircle className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                                                <span>Get market insights and analytics</span>
                                            </li>
                                        </ul>
                                    </button>

                                    {/* Exporter Option */}
                                    <button
                                        type='button'
                                        onClick={() => handleInputChange('role', 'exporter')}
                                        disabled={loading}
                                        className={`rounded-xl border-2 p-6 text-left transition-all hover:scale-[1.02] ${
                                            formData.role === 'exporter'
                                                ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500 ring-offset-2'
                                                : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50'
                                        } disabled:cursor-not-allowed disabled:opacity-50`}>
                                        <div className='mb-4 flex items-center justify-between'>
                                            <div className='flex items-center gap-3'>
                                                <div
                                                    className={`rounded-lg p-2 ${
                                                        formData.role === 'exporter' ? 'bg-emerald-100' : 'bg-gray-100'
                                                    }`}>
                                                    <Building
                                                        className={`h-6 w-6 ${
                                                            formData.role === 'exporter'
                                                                ? 'text-emerald-600'
                                                                : 'text-gray-600'
                                                        }`}
                                                    />
                                                </div>
                                                <span className='text-lg font-bold text-gray-900'>Exporter</span>
                                            </div>
                                            {formData.role === 'exporter' && (
                                                <CheckCircle className='h-6 w-6 text-emerald-600' />
                                            )}
                                        </div>
                                        <ul className='space-y-2 text-sm text-gray-600'>
                                            <li className='flex items-start gap-2'>
                                                <CheckCircle className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                                                <span>Showcase products to global buyers</span>
                                            </li>
                                            <li className='flex items-start gap-2'>
                                                <CheckCircle className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                                                <span>Get verified Trust ID Card</span>
                                            </li>
                                            <li className='flex items-start gap-2'>
                                                <CheckCircle className='mt-0.5 h-4 w-4 shrink-0 text-emerald-500' />
                                                <span>Access premium market analytics</span>
                                            </li>
                                        </ul>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Company Information Card */}
                        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
                            <div className='border-b border-gray-100 bg-linear-to-r from-emerald-50 to-green-50 p-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-lg bg-emerald-100 p-2'>
                                        <Building className='h-6 w-6 text-emerald-600' />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-bold text-gray-900'>Company Information</h2>
                                        <p className='text-sm text-gray-600'>Login credentials and basic details</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-6'>
                                <div className='grid gap-6 md:grid-cols-2'>
                                    {/* Company Name */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <FileText className='h-4 w-4' />
                                            Official Company Name *
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.companyName}
                                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='Enter legal company name'
                                            required
                                            disabled={loading}
                                        />
                                        <p className='text-xs text-gray-500'>Must match your official registration</p>
                                    </div>

                                    {/* Country */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Globe className='h-4 w-4' />
                                            Country *
                                        </label>
                                        <select
                                            value={formData.country}
                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            required
                                            disabled={loading}>
                                            <option value=''>Select your country</option>
                                            {countryOptions.map((country) => (
                                                <option key={country} value={country}>
                                                    {country}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Email */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Mail className='h-4 w-4' />
                                            Company Email *
                                        </label>
                                        <input
                                            type='email'
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='company@email.com'
                                            required
                                            disabled={loading}
                                        />
                                        <p className='text-xs text-gray-500'>Primary company email for login</p>
                                    </div>

                                    {/* Create Password */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Lock className='h-4 w-4' />
                                            Create Password *
                                        </label>
                                        <input
                                            type='password'
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='Minimum 8 characters'
                                            required
                                            disabled={loading}
                                            minLength={8}
                                        />
                                        <p className='text-xs text-gray-500'>
                                            Minimum 8 characters with letters and numbers
                                        </p>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Lock className='h-4 w-4' />
                                            Confirm Password *
                                        </label>
                                        <input
                                            type='password'
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none ${
                                                passwordError
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                                    : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-200'
                                            }`}
                                            placeholder='Re-enter your password'
                                            required
                                            disabled={loading}
                                        />
                                        {passwordError && <p className='text-xs text-red-500'>{passwordError}</p>}
                                        <p className='text-xs text-gray-500'>Re-enter password to confirm</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Card */}
                        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
                            <div className='border-b border-gray-100 bg-linear-to-r from-blue-50 to-indigo-50 p-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-lg bg-blue-100 p-2'>
                                        <User className='h-6 w-6 text-blue-600' />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-bold text-gray-900'>Contact Information</h2>
                                        <p className='text-sm text-gray-600'>Primary contact details</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-6'>
                                <div className='grid gap-6 md:grid-cols-2'>
                                    {/* Contact Person */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <User className='h-4 w-4' />
                                            Contact Person *
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.contactPerson}
                                            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='Full name of primary contact'
                                            required
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* Primary Phone */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Phone className='h-4 w-4' />
                                            Primary Phone *
                                        </label>
                                        <input
                                            type='tel'
                                            value={formData.primaryPhone}
                                            onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='+[country code] [phone number]'
                                            required
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* Secondary Phone */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Phone className='h-4 w-4' />
                                            Secondary Phone
                                        </label>
                                        <input
                                            type='tel'
                                            value={formData.secondaryPhone}
                                            onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='+[country code] [phone number]'
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* Additional Email */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Mail className='h-4 w-4' />
                                            Additional Email
                                        </label>
                                        <input
                                            type='email'
                                            value={formData.additionalEmail}
                                            onChange={(e) => handleInputChange('additionalEmail', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='secondary@company.com'
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* Languages */}
                                    <div className='space-y-3 md:col-span-2'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Globe className='h-4 w-4' />
                                            Languages Spoken
                                        </label>
                                        <div className='flex flex-wrap gap-2'>
                                            {languageOptions.map((language) => (
                                                <button
                                                    key={language}
                                                    type='button'
                                                    onClick={() => toggleLanguage(language)}
                                                    disabled={loading}
                                                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                                        formData.languages.includes(language)
                                                            ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500 ring-offset-2'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    } disabled:cursor-not-allowed disabled:opacity-50`}>
                                                    {formData.languages.includes(language) && (
                                                        <CheckCircle className='h-4 w-4' />
                                                    )}
                                                    {language}
                                                </button>
                                            ))}
                                        </div>
                                        <p className='text-xs text-gray-500'>
                                            Select languages your team can communicate in
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submission */}
                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm'>
                            <div className='mb-6'>
                                <h3 className='mb-2 text-lg font-bold text-gray-900'>Complete Your Registration</h3>
                                <p className='text-sm text-gray-600'>
                                    Your account will be verified within 48 hours. Verified accounts get priority access
                                    to platform features.
                                </p>
                            </div>

                            <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
                                <button
                                    type='button'
                                    onClick={() => router.push('/login')}
                                    disabled={loading}
                                    className='rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'>
                                    Already have an account? Login
                                </button>
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='rounded-lg bg-[#09704f] px-8 py-3 font-bold text-white shadow-lg hover:bg-[#115140] disabled:opacity-50'>
                                    {loading ? (
                                        <span className='flex items-center justify-center gap-2'>
                                            <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                                            Processing...
                                        </span>
                                    ) : (
                                        'Submit for Verification'
                                    )}
                                </button>
                            </div>

                            <p className='mt-4 text-xs text-gray-500'>
                                By submitting, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </div>
                </form>

                {/* Benefits Section */}
                <div className='mx-auto mt-12 max-w-4xl'>
                    <h3 className='mb-6 text-center text-xl font-bold text-gray-900'>Why Join AGROSPACE?</h3>
                    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center'>
                            <div className='mb-4 inline-flex rounded-full bg-emerald-100 p-3'>
                                <CheckCircle className='h-6 w-6 text-emerald-600' />
                            </div>
                            <h4 className='mb-2 font-semibold text-gray-900'>Verified Network</h4>
                            <p className='text-sm text-gray-600'>Connect with verified businesses worldwide</p>
                        </div>

                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center'>
                            <div className='mb-4 inline-flex rounded-full bg-blue-100 p-3'>
                                <Globe className='h-6 w-6 text-blue-600' />
                            </div>
                            <h4 className='mb-2 font-semibold text-gray-900'>Market Insights</h4>
                            <p className='text-sm text-gray-600'>Access real-time prices and analytics</p>
                        </div>

                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center'>
                            <div className='mb-4 inline-flex rounded-full bg-purple-100 p-3'>
                                <Building className='h-6 w-6 text-purple-600' />
                            </div>
                            <h4 className='mb-2 font-semibold text-gray-900'>Secure Platform</h4>
                            <p className='text-sm text-gray-600'>End-to-end encrypted communication</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
