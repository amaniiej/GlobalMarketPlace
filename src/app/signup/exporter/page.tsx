// app/signup/exporter/page.tsx
'use client';

import { useState } from 'react';

import { Building, CheckCircle, FileText, Globe, Upload, User } from 'lucide-react';

// app/signup/exporter/page.tsx

// app/signup/exporter/page.tsx

export default function ExporterSignupPage() {
    const [formData, setFormData] = useState({
        // Company Information
        companyName: '',
        exportLicenseNumber: '',
        registrationDocument: null as File | null,

        // Contact Information
        contactPerson: '',
        languages: [] as string[],

        // Export Information
        certifications: [] as string[],
        exportHistory: '',
        exportCapacity: ''
    });

    const certificationOptions = [
        'GlobalGAP',
        'EU Organic',
        'Fair Trade',
        'ISO 22000',
        'HACCP',
        'Kosher',
        'Halal',
        'Rainforest Alliance',
        'UTZ Certified',
        'Organic',
        'Non-GMO',
        'BRCGS'
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

    const handleInputChange = (field: string, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, registrationDocument: file }));
    };

    const toggleSelection = (field: 'certifications' | 'languages', value: string) => {
        const current = [...formData[field]];
        if (current.includes(value)) {
            handleInputChange(
                field,
                current.filter((item) => item !== value)
            );
        } else {
            handleInputChange(field, [...current, value]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add your form submission logic here
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
                    <h1 className='mb-3 text-3xl font-bold text-gray-900 md:text-4xl'>Create Your Exporter Profile</h1>
                    <p className='mx-auto max-w-2xl text-lg text-gray-600'>
                        Complete your Trust ID Card to connect with verified importers worldwide
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
                                        <p className='text-sm text-gray-600'>Legal verification details</p>
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
                                        />
                                        <p className='text-xs text-gray-500'>Must match your registration documents</p>
                                    </div>

                                    {/* Export License */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <FileText className='h-4 w-4' />
                                            Export License Number *
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.exportLicenseNumber}
                                            onChange={(e) => handleInputChange('exportLicenseNumber', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='ET-EXPORT-XXXXX'
                                            required
                                        />
                                        <p className='text-xs text-gray-500'>Issued by Ethiopian authorities</p>
                                    </div>

                                    {/* Registration Document */}
                                    <div className='space-y-3 md:col-span-2'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Upload className='h-4 w-4' />
                                            Company Registration Document *
                                        </label>
                                        <div className='relative'>
                                            <input
                                                type='file'
                                                onChange={handleFileChange}
                                                accept='.pdf,.jpg,.png'
                                                className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                                                required
                                            />
                                            <div className='flex cursor-pointer items-center justify-between rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 hover:border-emerald-400 hover:bg-emerald-50'>
                                                <div className='text-center'>
                                                    <Upload className='mx-auto mb-2 h-8 w-8 text-gray-400' />
                                                    <p className='text-sm font-medium text-gray-700'>
                                                        {formData.registrationDocument
                                                            ? formData.registrationDocument.name
                                                            : 'Upload registration certificate'}
                                                    </p>
                                                    <p className='mt-1 text-xs text-gray-500'>
                                                        PDF, JPG or PNG up to 5MB
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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
                                        />
                                    </div>

                                    {/* Languages */}
                                    <div className='space-y-3'>
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
                                                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                                        formData.languages.includes(language)
                                                            ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500 ring-offset-2'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}>
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
                                                    className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-all ${
                                                        formData.certifications.includes(cert)
                                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}>
                                                    <span>{cert}</span>
                                                    {formData.certifications.includes(cert) && (
                                                        <CheckCircle className='h-4 w-4' />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Export History */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Globe className='h-4 w-4' />
                                            Export History
                                        </label>
                                        <textarea
                                            value={formData.exportHistory}
                                            onChange={(e) => handleInputChange('exportHistory', e.target.value)}
                                            className='min-h-25 w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='Example: Exported to USA, Germany, UAE. Annual volume: 500 tons. Previously worked with major buyers...'
                                            rows={3}
                                        />
                                        <p className='text-xs text-gray-500'>
                                            Mention countries exported to, annual volumes, and notable buyers
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
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none'
                                            placeholder='Example: 100 tons, 5000 cartons, etc.'
                                            required
                                        />
                                        <p className='text-xs text-gray-500'>
                                            Specify unit (tons, kg, containers, etc.)
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
                                    className='rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50'>
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='rounded-lg bg-linear-to-r from-emerald-600 to-green-600 px-8 py-3 font-bold text-white shadow-lg hover:from-emerald-700 hover:to-green-700'>
                                    Submit for Verification
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
