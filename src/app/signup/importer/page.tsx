// app/signup/importer/page.tsx
'use client';

import { useState } from 'react';

import { Briefcase, Building, CheckCircle, Globe, Package, ShoppingCart, Target, User } from 'lucide-react';

// app/signup/importer/page.tsx

// app/signup/importer/page.tsx

// app/signup/importer/page.tsx

// app/signup/importer/page.tsx

export default function ImporterSignupPage() {
    const [formData, setFormData] = useState({
        // Company Information
        companyName: '',
        country: '',
        businessRegistration: '',
        companyWebsite: '',

        // Contact Information
        contactPerson: '',
        email: '',
        phone: '',

        // Import Requirements
        productCategories: [] as string[],
        annualVolume: '',
        preferredRegions: [] as string[],

        // Business Details
        businessType: '',
        yearsInBusiness: '',
        certificationRequirements: [] as string[]
    });

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

    const regionOptions = [
        'Ethiopia',
        'East Africa',
        'North Africa',
        'West Africa',
        'Southern Africa',
        'Middle East',
        'Europe',
        'North America',
        'Asia',
        'Global'
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

    const businessTypes = [
        'Wholesaler',
        'Retail Chain',
        'Food Manufacturer',
        'Restaurant/Hotel Chain',
        'Trading Company',
        'Distributor',
        'Online Retailer',
        'Other'
    ];

    const handleInputChange = (field: string, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleSelection = (
        field: 'productCategories' | 'preferredRegions' | 'certificationRequirements',
        value: string
    ) => {
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
        <main className='min-h-screen bg-linear-to-b from-blue-50 to-white pt-14'>
            <div className='container mx-auto px-4 py-8'>
                {/* Header */}
                <div className='mb-8 text-center'>
                    <div className='mb-4 inline-flex items-center gap-3 rounded-full bg-blue-100 px-4 py-2'>
                        <ShoppingCart className='h-5 w-5 text-blue-600' />
                        <span className='text-sm font-medium text-blue-700'>Importer Registration</span>
                    </div>
                    <h1 className='mb-3 text-3xl font-bold text-gray-900 md:text-4xl'>
                        Connect with Quality Exporters
                    </h1>
                    <p className='mx-auto max-w-2xl text-lg text-gray-600'>
                        Join our network of verified importers and source premium agricultural products from Ethiopia
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
                                            Company Name *
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.companyName}
                                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
                                            placeholder='Your company legal name'
                                            required
                                        />
                                    </div>

                                    {/* Country */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Globe className='h-4 w-4' />
                                            Country of Operation *
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.country}
                                            onChange={(e) => handleInputChange('country', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
                                            placeholder='Your country'
                                            required
                                        />
                                    </div>

                                    {/* Business Registration */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Briefcase className='h-4 w-4' />
                                            Business Registration Number
                                        </label>
                                        <input
                                            type='text'
                                            value={formData.businessRegistration}
                                            onChange={(e) => handleInputChange('businessRegistration', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
                                            placeholder='Registration number (optional)'
                                        />
                                    </div>

                                    {/* Website */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Globe className='h-4 w-4' />
                                            Company Website
                                        </label>
                                        <input
                                            type='url'
                                            value={formData.companyWebsite}
                                            onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
                                            placeholder='https://yourcompany.com'
                                        />
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
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
                                            placeholder='Your full name'
                                            required
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Briefcase className='h-4 w-4' />
                                            Email Address *
                                        </label>
                                        <input
                                            type='email'
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
                                            placeholder='contact@company.com'
                                            required
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div className='space-y-3 md:col-span-2'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Briefcase className='h-4 w-4' />
                                            Phone Number *
                                        </label>
                                        <input
                                            type='tel'
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
                                            placeholder='+1 (555) 123-4567'
                                            required
                                        />
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
                                                    className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-all ${
                                                        formData.productCategories.includes(product)
                                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}>
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
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'>
                                            <option value=''>Select volume range</option>
                                            <option value='1-10'>1-10 tons annually</option>
                                            <option value='10-50'>10-50 tons annually</option>
                                            <option value='50-100'>50-100 tons annually</option>
                                            <option value='100-500'>100-500 tons annually</option>
                                            <option value='500+'>500+ tons annually</option>
                                            <option value='negotiable'>To be negotiated</option>
                                        </select>
                                    </div>

                                    {/* Preferred Regions */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Globe className='h-4 w-4' />
                                            Preferred Sourcing Regions
                                        </label>
                                        <div className='flex flex-wrap gap-2'>
                                            {regionOptions.map((region) => (
                                                <button
                                                    key={region}
                                                    type='button'
                                                    onClick={() => toggleSelection('preferredRegions', region)}
                                                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                                        formData.preferredRegions.includes(region)
                                                            ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-2'
                                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}>
                                                    {formData.preferredRegions.includes(region) && (
                                                        <CheckCircle className='h-4 w-4' />
                                                    )}
                                                    {region}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Details Card */}
                        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
                            <div className='border-b border-gray-100 bg-linear-to-r from-amber-50 to-orange-50 p-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-lg bg-amber-100 p-2'>
                                        <Briefcase className='h-6 w-6 text-amber-600' />
                                    </div>
                                    <div>
                                        <h2 className='text-xl font-bold text-gray-900'>Business Details</h2>
                                        <p className='text-sm text-gray-600'>Additional business information</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-6'>
                                <div className='grid gap-6 md:grid-cols-2'>
                                    {/* Business Type */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Briefcase className='h-4 w-4' />
                                            Business Type *
                                        </label>
                                        <select
                                            value={formData.businessType}
                                            onChange={(e) => handleInputChange('businessType', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'
                                            required>
                                            <option value=''>Select business type</option>
                                            {businessTypes.map((type) => (
                                                <option key={type} value={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Years in Business */}
                                    <div className='space-y-3'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <Target className='h-4 w-4' />
                                            Years in Business
                                        </label>
                                        <select
                                            value={formData.yearsInBusiness}
                                            onChange={(e) => handleInputChange('yearsInBusiness', e.target.value)}
                                            className='w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none'>
                                            <option value=''>Select experience</option>
                                            <option value='0-1'>0-1 years</option>
                                            <option value='1-3'>1-3 years</option>
                                            <option value='3-5'>3-5 years</option>
                                            <option value='5-10'>5-10 years</option>
                                            <option value='10+'>10+ years</option>
                                        </select>
                                    </div>

                                    {/* Certification Requirements */}
                                    <div className='space-y-3 md:col-span-2'>
                                        <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                                            <CheckCircle className='h-4 w-4' />
                                            Certification Requirements
                                        </label>
                                        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4'>
                                            {certificationOptions.map((cert) => (
                                                <button
                                                    key={cert}
                                                    type='button'
                                                    onClick={() => toggleSelection('certificationRequirements', cert)}
                                                    className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-all ${
                                                        formData.certificationRequirements.includes(cert)
                                                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                                                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}>
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
                        </div>

                        {/* Submission */}
                        <div className='rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm'>
                            <div className='mb-6'>
                                <h3 className='mb-2 text-lg font-bold text-gray-900'>Join Our Network of Importers</h3>
                                <p className='text-sm text-gray-600'>
                                    Get matched with pre-verified exporters that meet your specific requirements
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
                                    className='rounded-lg bg-linear-to-r from-blue-600 to-cyan-600 px-8 py-3 font-bold text-white shadow-lg hover:from-blue-700 hover:to-cyan-700'>
                                    Complete Registration
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
