// src/app/layout.tsx
import { Footer } from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en' className='scroll-smooth'>
            <head>
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes'
                />
                <title>AGROSPACE | Ethiopian Agricultural Export</title>
                <meta
                    name='description'
                    content='Connecting global buyers with trusted Ethiopian exporters for premium agricultural products.'
                />
            </head>
            <body className='overflow-x-hidden'>
                <Navbar />
                <main className='min-h-screen'>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
