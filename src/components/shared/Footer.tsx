import Link from 'next/link';

export function Footer() {
    return (
        <footer className='bg-gray-900 text-white'>
            <div className='container mx-auto px-4 py-12'>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5'>
                    {/* Column 1: Logo & Description */}
                    <div className='lg:col-span-1'>
                        <div className='mb-4 flex items-center gap-3'>
                            <div className='h-10 w-10 rounded-lg bg-green-600' />
                            <div className='text-xl font-bold'>AGROSPACE</div>
                        </div>
                        <p className='text-gray-400'>Your trusted partner for Ethiopian agricultural exports.</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className='mb-4 text-lg font-semibold'>Quick Links</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link href='/' className='text-gray-400 hover:text-white'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href='#services' className='text-gray-400 hover:text-white'>
                                    What We Do
                                </Link>
                            </li>
                            <li>
                                <Link href='/prices' className='text-gray-400 hover:text-white'>
                                    Price Updates
                                </Link>
                            </li>
                            <li>
                                <Link href='/blog' className='text-gray-400 hover:text-white'>
                                    Blog Posts
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h3 className='mb-4 text-lg font-semibold'>Our Services</h3>
                        <ul className='space-y-2'>
                            <li className='text-gray-400'>Direct Farm Sourcing</li>
                            <li className='text-gray-400'>Quality Assurance</li>
                            <li className='text-gray-400'>Export Logistics</li>
                            <li className='text-gray-400'>Regulatory Compliance</li>
                        </ul>
                    </div>

                    {/* Column 4: Legal */}
                    <div>
                        <h3 className='mb-4 text-lg font-semibold'>Legal</h3>
                        <ul className='space-y-2'>
                            <li>
                                <a href='#' className='text-gray-400 hover:text-white'>
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-gray-400 hover:text-white'>
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-gray-400 hover:text-white'>
                                    Export Compliance
                                </a>
                            </li>
                            <li>
                                <a href='#' className='text-gray-400 hover:text-white'>
                                    Code of Conduct
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 5: Contact Info (Dedicated Column) */}
                    <div>
                        <h3 className='mb-4 text-lg font-semibold'>Contact Us</h3>
                        <div className='space-y-4'>
                            <div className='flex items-start gap-3'>
                                <div className='mt-1 text-gray-400'>📧</div>
                                <div>
                                    <div className='font-medium'>Email</div>
                                    <div className='text-gray-300'>contact@agrimarket.et</div>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div className='mt-1 text-gray-400'>📱</div>
                                <div>
                                    <div className='font-medium'>Phone</div>
                                    <div className='text-gray-300'>+251 911 234 567</div>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div className='mt-1 text-gray-400'>🏢</div>
                                <div>
                                    <div className='font-medium'>Location</div>
                                    <div className='text-gray-300'>Addis Ababa, Ethiopia</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright - Full width below all columns */}
                <div className='mt-12 border-t border-gray-800 pt-8 text-center text-gray-500'>
                    <p>© {new Date().getFullYear()} AGROSPACE. All rights reserved.</p>
                    <p className='mt-2 text-sm'>Ethiopian Agricultural Export Platform</p>
                </div>
            </div>
        </footer>
    );
}
