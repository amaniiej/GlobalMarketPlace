'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

import {
    Briefcase,
    Building,
    CheckCircle,
    Globe,
    Lock,
    Mail,
    Package,
    Phone,
    ShoppingCart,
    Target,
    User
} from 'lucide-react';

export default function ImporterSignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        // Company Information
        companyName: '',
        companyEmail: '',
        password: '',
        confirmPassword: '',
        country: '',
        companyWebsite: '',

        // Contact Information
        contactPerson: '',
        primaryPhone: '',
        secondaryPhone: '',
        additionalEmail: '',
        languages: [] as string[],

        // Import Requirements
        productCategories: [] as string[],
        annualVolume: '',

        // Business Details
        certificationRequirements: [] as string[]
    });

    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const productCategories = [
        'Coffee',
        'Tea',
        'Spices',
        'Fresh Fruits',
        'Fresh Vegetables',
        'Grains & Cereals',
        'Nuts & Seeds',
        'Herbs',
        'Floral Products',
        'Processed Foods',
        'Organic Products',
        'Specialty Items'
    ];

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

    const certificationOptions = [
        'Organic Certified',
        'Fair Trade',
        'GlobalGAP',
        'ISO Certified',
        'Halal',
        'Kosher',
        'Non-GMO',
        'Rainforest Alliance',
        'Any Certification',
        'No Certification Required'
    ];

    const handleInputChange = (field: string, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear password error when user starts typing
        if (field === 'password' || field === 'confirmPassword') {
            setPasswordError('');
        }
    };

    const toggleSelection = (field: 'productCategories' | 'languages' | 'certificationRequirements', value: string) => {
        const current = [...(formData[field] as string[])];
        if (current.includes(value)) {
            handleInputChange(
                field,
                current.filter((item) => item !== value)
            );
        } else {
            handleInputChange(field, [...current, value]);
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

            // 1. Create user account with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.companyEmail,
                password: formData.password,
                options: {
                    emailRedirectTo: `${window.location.origin}/login`,
                    data: {
                        company_name: formData.companyName,
                        role: 'importer'
                    }
                }
            });

            if (authError) {
                if (authError.message.includes('already registered')) {
                    throw new Error('This email is already registered. Please try logging in instead.');
                }
                throw new Error(`Registration error: ${authError.message}`);
            }

            // 2. Save all the form data to our profiles table
            const { error: profileError } = await supabase.from('profiles').insert({
                id: authData.user?.id,
                email: formData.companyEmail,
                role: 'importer',
                company_name: formData.companyName,
                country: formData.country,
                company_website: formData.companyWebsite || null,
                contact_person: formData.contactPerson,
                primary_phone: formData.primaryPhone,
                secondary_phone: formData.secondaryPhone || null,
                additional_email: formData.additionalEmail || null,
                languages: formData.languages,
                product_categories: formData.productCategories,
                annual_volume: formData.annualVolume || null,
                certification_requirements: formData.certificationRequirements,
                status: 'pending'
            });

            if (profileError) {
                throw new Error(`Database error: ${profileError.message}`);
            }

            // 3. Show success message
            alert('✅ Registration successful! Please check your email to verify your account.');
            alert('📋 Your application is now pending admin verification. We will contact you within 48 hours.');

            // 4. Redirect to login page
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
        <main className='min-h-screen bg-linear-to-b from-blue-50 to-white pt-14'>
            <div className='container mx-auto px-4 py-8'>
                {/* Header */}
                <div className='mb-8 text-center'>
                    <div className='mb-4 inline-flex items-center gap-3 rounded-full bg-blue-100 px-4 py-2'>
                        <ShoppingCart className='h-5 w-5 text-blue-600' />
                        <span className='text-sm font-medium text-blue-700'>Importer Registration</span>
                    </div>
                    <h1 className='mb-3 text-3xl font-bold text-gray-900 md:text-4xl'>Create Your Account</h1>
                    <p className='mx-auto max-w-2xl text-lg text-gray-600'>
                        Join our network of verified exporters and source premium agricultural products from Ethiopia
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='mx-auto max-w-4xl'>
                    <div className='space-y-6'>
                        {/* Company Information Card */}
                        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
                            <div className='border-b border-gray-100 bg-linear-to-r from-blue-50 to-cyan-50 p-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-lg bg-blue-100 p-2'>
                                        <Building className='h-6 w-6 text-blue-600' />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-bold text-gray-900'>Company Information</h2>
                                        <p className='text-sm text-gray-600'>Tell us about your business</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-6'>
                                <div className='grid gap-6 md:grid-cols-2'>
                                    {/* Company Name */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Building className='h-4 w-4' />
                                            Official Company Name *
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.companyName}
                                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50'
                                            placeholder='Your company legal name'
                                            required
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* Company Email */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Mail className='h-4 w-4' />
                                            Primary Company Email *
                                        </label>
                                        <input
                                            type='email'
                                            value={formData.companyEmail}
                                            onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50'
                                            placeholder='import@company.com'
                                            required
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* Country of Operation */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Globe className='h-4 w-4' />
                                            Country of Operation *
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.country}
                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50'
                                            placeholder='Your country'
                                            required
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* Website */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Globe className='h-4 w-4' />
                                            Company Website (Optional)
                                        </label>
                                        <input
                                            type='url'
                                            value={formData.companyWebsite}
                                            onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50'
                                            placeholder='https://yourcompany.com'
                                            disabled={loading}
                                        />
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
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50'
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
                                            className={`w-full rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none disabled:opacity-50 ${
                                                passwordError
                                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
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
                            <div className='border-b border-gray-100 bg-linear-to-r from-indigo-50 to-purple-50 p-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-lg bg-indigo-100 p-2'>
                                        <User className='h-6 w-6 text-indigo-600' />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-bold text-gray-900'>Contact Information</h2>
                                        <p className='text-sm text-gray-600'>Primary import contact details</p>
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
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50'
                                            placeholder='Manager name'
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
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50'
                                            placeholder='+1 (555) 123-4567'
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
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50'
                                            placeholder='+1 (555) 123-4567'
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
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50'
                                            placeholder='sales@company.com'
                                            disabled={loading}
                                        />
                                    </div>

                                    {/* Languages */}
                                    <div className='space-y-3 md:col-span-2'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Globe className='h-4 w-4' />
                                            Languages Spoken *
                                        </label>
                                        <div className='flex flex-wrap gap-2'>
                                            {languageOptions.map((language) => (
                                                <button
                                                    key={language}
                                                    type='button'
                                                    onClick={() => toggleSelection('languages', language)}
                                                    disabled={loading}
                                                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                                        formData.languages.includes(language)
                                                            ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-2'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    } disabled:cursor-not-allowed disabled:opacity-50`}>
                                                    {formData.languages.includes(language) && (
                                                        <CheckCircle className='h-4 w-4' />
                                                    )}
                                                    {language}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Import Requirements Card */}
                        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
                            <div className='border-b border-gray-100 bg-linear-to-r from-green-50 to-emerald-50 p-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-lg bg-green-100 p-2'>
                                        <Package className='h-6 w-6 text-green-600' />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-bold text-gray-900'>Import Requirements</h2>
                                        <p className='text-sm text-gray-600'>What products are you looking for?</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-6'>
                                <div className='space-y-6'>
                                    {/* Product Categories */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Package className='h-4 w-4' />
                                            Product Categories of Interest *
                                        </label>
                                        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
                                            {productCategories.map((product) => (
                                                <button
                                                    key={product}
                                                    type='button'
                                                    onClick={() => toggleSelection('productCategories', product)}
                                                    disabled={loading}
                                                    className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-all ${
                                                        formData.productCategories.includes(product)
                                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                                    } disabled:cursor-not-allowed disabled:opacity-50`}>
                                                    <span>{product}</span>
                                                    {formData.productCategories.includes(product) && (
                                                        <CheckCircle className='h-4 w-4' />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Annual Volume */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Target className='h-4 w-4' />
                                            Estimated Annual Import Volume
                                        </label>
                                        <select
                                            value={formData.annualVolume}
                                            onChange={(e) => handleInputChange('annualVolume', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50'
                                            disabled={loading}>
                                            <option value=''>Select volume range</option>
                                            <option value='1-10'>1-10 tons annually</option>
                                            <option value='10-50'>10-50 tons annually</option>
                                            <option value='50-100'>50-100 tons annually</option>
                                            <option value='100-500'>100-500 tons annually</option>
                                            <option value='500+'>500+ tons annually</option>
                                            <option value='negotiable'>To be negotiated</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Certification Requirements Card */}
                        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
                            <div className='border-b border-gray-100 bg-linear-to-r from-amber-50 to-orange-50 p-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-lg bg-amber-100 p-2'>
                                        <CheckCircle className='h-6 w-6 text-amber-600' />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-bold text-gray-900'>Certification Requirements</h2>
                                        <p className='text-sm text-gray-600'>What certifications do you require?</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-6'>
                                <div className='space-y-3 md:col-span-2'>
                                    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
                                        {certificationOptions.map((cert) => (
                                            <button
                                                key={cert}
                                                type='button'
                                                onClick={() => toggleSelection('certificationRequirements', cert)}
                                                disabled={loading}
                                                className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-all ${
                                                    formData.certificationRequirements.includes(cert)
                                                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                                } disabled:cursor-not-allowed disabled:opacity-50`}>
                                                <span>{cert}</span>
                                                {formData.certificationRequirements.includes(cert) && (
                                                    <CheckCircle className='h-4 w-4' />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submission */}
                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm'>
                            <div className='mb-6'>
                                <h3 className='mb-2 text-lg font-bold text-gray-900'>Join Our Network</h3>
                                <p className='text-sm text-gray-600'>
                                    Get matched with pre-verified exporters that meet your specific requirements
                                </p>
                            </div>

                            <div className='flex flex-col gap-4 sm:flex-row sm:justify-center'>
                                <button
                                    type='button'
                                    onClick={() => window.history.back()}
                                    disabled={loading}
                                    className='rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50'>
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    disabled={loading}
                                    className='rounded-lg bg-[#065b7a] px-8 py-3 font-bold text-white shadow-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50'>
                                    {loading ? (
                                        <span className='flex items-center justify-center gap-2'>
                                            <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                                            Processing...
                                        </span>
                                    ) : (
                                        'Complete Registration'
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
                    <h3 className='mb-6 text-center text-xl font-bold text-gray-900'>Why Importers Choose Us</h3>
                    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center'>
                            <div className='mb-4 inline-flex rounded-full bg-blue-100 p-3'>
                                <CheckCircle className='h-6 w-6 text-blue-600' />
                            </div>
                            <h4 className='mb-2 font-semibold text-gray-900'>Verified Exporters</h4>
                            <p className='text-sm text-gray-600'>All suppliers are pre-vetted and quality-checked</p>
                        </div>

                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center'>
                            <div className='mb-4 inline-flex rounded-full bg-indigo-100 p-3'>
                                <Target className='h-6 w-6 text-indigo-600' />
                            </div>
                            <h4 className='mb-2 font-semibold text-gray-900'>Smart Matching</h4>
                            <p className='text-sm text-gray-600'>
                                Get matched with exporters that fit your requirements
                            </p>
                        </div>

                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center'>
                            <div className='mb-4 inline-flex rounded-full bg-green-100 p-3'>
                                <ShoppingCart className='h-6 w-6 text-green-600' />
                            </div>
                            <h4 className='mb-2 font-semibold text-gray-900'>Secure Transactions</h4>
                            <p className='text-sm text-gray-600'>Escrow payment protection and logistics support</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
