import Link from 'next/link';

export function Footer() {
    return (
        <footer className='bg-gray-900 text-white'>
            <div className='container mx-auto px-4 py-12'>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
                    {/* Logo & Description */}
                    <div>
                        <div className='mb-4 flex items-center gap-3'>
                            <div className='h-10 w-10 rounded-lg bg-green-600' />
                            <div className='text-xl font-bold'>AGROSPACE</div>
                        </div>
                        <p className='text-gray-400'>
                            Your trusted partner for Ethiopian agricultural exports. Connecting global buyers with
                            premium Ethiopian products.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className='mb-4 text-lg font-semibold'>Quick Links</h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link href='/' className='text-gray-400 hover:text-white'>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href='/prices' className='text-gray-400 hover:text-white'>
                                    Market Prices
                                </Link>
                            </li>
                            <li>
                                <Link href='/blog' className='text-gray-400 hover:text-white'>
                                    Blog & Insights
                                </Link>
                            </li>
                            <li>
                                <Link href='#about' className='text-gray-400 hover:text-white'>
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className='mb-4 text-lg font-semibold'>Our Services</h3>
                        <ul className='space-y-2'>
                            <li className='text-gray-400'>Direct Sourcing</li>
                            <li className='text-gray-400'>Quality Control</li>
                            <li className='text-gray-400'>Export Logistics</li>
                            <li className='text-gray-400'>Compliance</li>
                        </ul>
                    </div>

                    {/* Legal */}
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
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className='mt-8 border-t border-gray-800 pt-8 text-center text-gray-500'>
                    <p>© {new Date().getFullYear()} AGROSPACE. All rights reserved.</p>
                    <p className='mt-2 text-sm'>Ethiopian Agricultural Export Platform</p>
                </div>
            </div>
        </footer>
    );
}
