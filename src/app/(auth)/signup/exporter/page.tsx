'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

import { Building, CheckCircle, FileText, Globe, Lock, Mail, Phone, User } from 'lucide-react';

export default function ExporterSignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        // Company Information
        companyName: '',
        companyEmail: '',
        password: '',
        confirmPassword: '',

        // Contact Information
        contactPerson: '',
        primaryPhone: '',
        secondaryPhone: '',
        additionalEmail: '',
        languages: [] as string[],

        // Export Information
        certifications: [] as string[],
        otherCertifications: [{ name: '', description: '' }] as { name: string; description: string }[],
        exportHistory: '',
        exportCapacity: ''
    });

    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const certificationOptions = [
        'EU Organic',
        'GlobalGAP',
        'Fair Trade',
        'ISO 22000',
        'HACCP',
        'Halal',
        'Organic Ethiopia',
        'Rainforest Alliance'
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

    const handleInputChange = (field: string, value: string | string[] | { name: string; description: string }[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear password error when user starts typing
        if (field === 'password' || field === 'confirmPassword') {
            setPasswordError('');
        }
    };

    const toggleSelection = (field: 'certifications' | 'languages', value: string) => {
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

    const handleOtherCertChange = (index: number, field: 'name' | 'description', value: string) => {
        const updated = [...formData.otherCertifications];
        updated[index] = { ...updated[index], [field]: value };
        handleInputChange('otherCertifications', updated);
    };

    const addOtherCert = () => {
        const newCert = { name: '', description: '' };
        handleInputChange('otherCertifications', [...formData.otherCertifications, newCert]);
    };

    const removeOtherCert = (index: number) => {
        const updated = formData.otherCertifications.filter((_, i) => i !== index);
        handleInputChange('otherCertifications', updated.length ? updated : [{ name: '', description: '' }]);
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
                        role: 'exporter'
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
                role: 'exporter',
                company_name: formData.companyName,
                contact_person: formData.contactPerson,
                primary_phone: formData.primaryPhone,
                secondary_phone: formData.secondaryPhone || null,
                additional_email: formData.additionalEmail || null,
                languages: formData.languages,
                certifications: formData.certifications,
                other_certifications: formData.otherCertifications,
                export_history: formData.exportHistory || null,
                export_capacity: formData.exportCapacity,
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
        <main className='min-h-screen bg-linear-to-b from-emerald-50 to-white pt-14'>
            <div className='container mx-auto px-4 py-8'>
                {/* Header */}
                <div className='mb-8 text-center'>
                    <div className='mb-4 inline-flex items-center gap-3 rounded-full bg-emerald-100 px-4 py-2'>
                        <Building className='h-5 w-5 text-emerald-600' />
                        <span className='text-sm font-medium text-emerald-700'>Exporter Registration</span>
                    </div>
                    <h1 className='mb-3 text-3xl font-bold text-gray-900 md:text-4xl'>
                        Create Your Exporter Account Profile
                    </h1>
                    <p className='mx-auto max-w-2xl text-lg text-gray-600'>
                        Complete your Trust ID Card and connect with verified importers worldwide
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='mx-auto max-w-4xl'>
                    <div className='space-y-6'>
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

                                    {/* Company Email (Login Email) */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Mail className='h-4 w-4' />
                                            Company Email *
                                        </label>
                                        <input
                                            type='email'
                                            value={formData.companyEmail}
                                            onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='export@company.com'
                                            required
                                            disabled={loading}
                                        />
                                        <p className='text-xs text-gray-500'>Primary company email</p>
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
                                        <p className='text-sm text-gray-600'>Primary export contact details</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-6'>
                                <div className='grid gap-6 md:grid-cols-2'>
                                    {/* Contact Person */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <User className='h-4 w-4' />
                                            Export Contact Person *
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.contactPerson}
                                            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='Export sales manager name'
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
                                            placeholder='+251 9XX XXX XXX'
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
                                            placeholder='+251 9XX XXX XXX'
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Export Information Card */}
                        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
                            <div className='border-b border-gray-100 bg-linear-to-r from-purple-50 to-pink-50 p-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-lg bg-purple-100 p-2'>
                                        <Globe className='h-6 w-6 text-purple-600' />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-bold text-gray-900'>Export Information</h2>
                                        <p className='text-sm text-gray-600'>Business capabilities and experience</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-6'>
                                <div className='space-y-6'>
                                    {/* Certifications */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <CheckCircle className='h-4 w-4' />
                                            International Certifications
                                        </label>
                                        <p className='text-sm text-gray-600'>
                                            Select all certifications your company holds. This significantly increases
                                            buyer trust.
                                        </p>
                                        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
                                            {certificationOptions.map((cert) => (
                                                <button
                                                    key={cert}
                                                    type='button'
                                                    onClick={() => toggleSelection('certifications', cert)}
                                                    disabled={loading}
                                                    className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-all ${
                                                        formData.certifications.includes(cert)
                                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                                    } disabled:cursor-not-allowed disabled:opacity-50`}>
                                                    <span>{cert}</span>
                                                    {formData.certifications.includes(cert) && (
                                                        <CheckCircle className='h-4 w-4' />
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Other Certifications - Unlimited */}
                                        <div className='space-y-3 pt-4'>
                                            <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                                Other Certifications
                                            </label>
                                            <p className='text-xs text-gray-500'>
                                                Add any additional certifications not listed above
                                            </p>
                                            <div className='space-y-3'>
                                                {formData.otherCertifications.map((cert, index) => (
                                                    <div
                                                        key={index}
                                                        className='flex items-end gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4'>
                                                        <div className='flex-1 space-y-2'>
                                                            <input
                                                                type='text'
                                                                value={cert.name}
                                                                onChange={(e) =>
                                                                    handleOtherCertChange(index, 'name', e.target.value)
                                                                }
                                                                className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 disabled:opacity-50'
                                                                placeholder='Certification name (e.g., Ethiopia Quality Mark)'
                                                                disabled={loading}
                                                            />
                                                        </div>
                                                        <div className='flex-1 space-y-2'>
                                                            <input
                                                                type='text'
                                                                value={cert.description}
                                                                onChange={(e) =>
                                                                    handleOtherCertChange(
                                                                        index,
                                                                        'description',
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 disabled:opacity-50'
                                                                placeholder='Brief description (50 chars)'
                                                                maxLength={50}
                                                                disabled={loading}
                                                            />
                                                        </div>
                                                        <button
                                                            type='button'
                                                            onClick={() => removeOtherCert(index)}
                                                            disabled={loading}
                                                            className='flex h-10 items-center justify-center rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200 disabled:opacity-50'>
                                                            ×
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                type='button'
                                                onClick={addOtherCert}
                                                disabled={loading}
                                                className='flex items-center gap-2 rounded-lg border-2 border-dashed border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 transition-all hover:border-emerald-400 hover:bg-emerald-50 disabled:opacity-50'>
                                                ➕ Add Another Certification
                                            </button>
                                        </div>
                                    </div>

                                    {/* Export History - Optional */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Globe className='h-4 w-4' />
                                            Export History (Optional)
                                        </label>
                                        <textarea
                                            value={formData.exportHistory}
                                            onChange={(e) => handleInputChange('exportHistory', e.target.value)}
                                            className='min-h-25 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none disabled:opacity-50'
                                            placeholder='Countries exported to, key buyers, annual volumes, years of experience...'
                                            rows={3}
                                            disabled={loading}
                                        />
                                        <p className='text-xs text-gray-500'>
                                            Helps buyers understand your experience (optional)
                                        </p>
                                    </div>

                                    {/* Export Capacity */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Building className='h-4 w-4' />
                                            Export Capacity per Month *
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.exportCapacity}
                                            onChange={(e) => handleInputChange('exportCapacity', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none disabled:opacity-50'
                                            placeholder='Example: 100 tons, 5000 cartons, 2x40ft containers'
                                            required
                                            disabled={loading}
                                        />
                                        <p className='text-xs text-gray-500'>
                                            Specify unit (tons, kg, containers, cartons, etc.)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submission */}
                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm'>
                            <div className='mb-6'>
                                <h3 className='mb-2 text-lg font-bold text-gray-900'>Complete Your Trust ID Card</h3>
                                <p className='text-sm text-gray-600'>
                                    Your profile will be verified within 48 hours. Verified exporters receive 3x more
                                    inquiries.
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
                    <h3 className='mb-6 text-center text-xl font-bold text-gray-900'>Benefits of Verification</h3>
                    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center'>
                            <div className='mb-4 inline-flex rounded-full bg-emerald-100 p-3'>
                                <CheckCircle className='h-6 w-6 text-emerald-600' />
                            </div>
                            <h4 className='mb-2 font-semibold text-gray-900'>Trust Badge</h4>
                            <p className='text-sm text-gray-600'>Get verified badge that increases buyer confidence</p>
                        </div>

                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center'>
                            <div className='mb-4 inline-flex rounded-full bg-blue-100 p-3'>
                                <Globe className='h-6 w-6 text-blue-600' />
                            </div>
                            <h4 className='mb-2 font-semibold text-gray-900'>Global Exposure</h4>
                            <p className='text-sm text-gray-600'>Featured to importers from 50+ countries</p>
                        </div>

                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center'>
                            <div className='mb-4 inline-flex rounded-full bg-purple-100 p-3'>
                                <Building className='h-6 w-6 text-purple-600' />
                            </div>
                            <h4 className='mb-2 font-semibold text-gray-900'>Priority Support</h4>
                            <p className='text-sm text-gray-600'>Dedicated account manager for verified exporters</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
