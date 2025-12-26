// app/login/page.tsx
'use client';

export default function LoginPage() {
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
                        Log In to AGROSPACE
                    </h1>
                    <p className='text-base text-gray-600'>
                        {' '}
                        {/* Reduced text size */}
                        Access your account to manage your agricultural trade
                    </p>
                </div>
                {/* Main form content */}
                <div className='mx-auto max-w-md'>
                    <div className='rounded-lg border border-gray-200 p-6'>
                        {' '}
                        {/* Reduced padding */}
                        <h2 className='mb-4 text-lg font-semibold'>
                            {' '}
                            {/* Reduced text size and margin */}
                            Login Form
                        </h2>
                        <p className='mb-6 text-sm text-gray-600'>Email and password fields will go here...</p>{' '}
                        {/* Reduced text size and margin */}
                        {/* Simple link back to home for now */}
                        <div className='text-center'>
                            <a
                                href='/'
                                className='inline-block rounded-full bg-emerald-600 px-5 py-2 text-sm text-white hover:bg-emerald-700'>
                                {' '}
                                {/* Reduced padding and text size */}
                                Back to Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
