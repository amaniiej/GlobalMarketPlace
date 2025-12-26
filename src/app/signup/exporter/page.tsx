// app/signup/exporter/page.tsx
'use client';

export default function ExporterSignupPage() {
    return (
        <main className='pt-14'>
            {' '}
            {/* Changed to main with pt-14 */}
            <div className='container mx-auto px-4 py-4'>
                {' '}
                {/* Added container, reduced padding */}
                {/* Header */}
                <div className='mb-4 text-center'>
                    {' '}
                    {/* Reduced margin, added text-center */}
                    <h1 className='mb-1 text-2xl font-bold text-gray-900 md:text-3xl'>
                        {' '}
                        {/* Reduced text size */}
                        Exporter Sign Up
                    </h1>
                    <p className='text-base text-gray-600'>
                        {' '}
                        {/* Reduced text size */}
                        Create your exporter account to start selling agricultural products
                    </p>
                </div>
                {/* Main form content will go here */}
                <div className='mx-auto max-w-2xl'>
                    <div className='rounded-lg border border-gray-200 p-6'>
                        {' '}
                        {/* Reduced padding */}
                        <h2 className='mb-4 text-lg font-semibold'>
                            {' '}
                            {/* Reduced text size and margin */}
                            Exporter Registration Form
                        </h2>
                        <p className='text-sm text-gray-600'>Form fields will go here...</p> {/* Reduced text size */}
                    </div>
                </div>
            </div>
        </main>
    );
}
