import Image from 'next/image';

export function HeroSection() {
    return (
        <section className='relative min-h-[85vh] overflow-hidden'>
            {/* BACKGROUND IMAGE */}
            <div className='absolute inset-0 z-0'>
                <Image
                    src='/images/hero-sec.jpg' // Path to your image
                    alt='Ethiopian agricultural exports'
                    fill
                    className='object-cover'
                    priority
                    quality={85}
                    sizes='100vw'
                />

                {/* Dark overlay for text readability */}
                <div className='absolute inset-0 bg-black/40' />
            </div>

            {/* CONTENT */}
            <div className='relative z-10 mx-auto max-w-6xl px-4 pt-28 text-white'>
                {/* Headline */}
                <h1 className='max-w-3xl text-4xl leading-tight font-semibold md:text-5xl'>
                    Connecting Global Buyers with
                    <br />
                    <span className='text-lime-300'>Trusted Ethiopian Exporters - for stupid habeshas</span>
                </h1>

                {/* Sub-headline */}
                <p className='mt-6 max-w-2xl text-lg leading-relaxed text-white/90'>
                    We source, verify, and personally match agricultural demand with active exporters — securely,
                    transparently, and professionally.
                </p>

                {/* CTA */}
                <div className='mt-10'>
                    <a
                        href='#book-meeting'
                        className='inline-flex items-center rounded-full bg-[#0F3D2E] px-8 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-105 hover:bg-[#115140]'>
                        Book a Meeting
                    </a>
                </div>
            </div>

            {/* Bottom fade */}
            <div className='absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t from-white to-transparent' />
        </section>
    );
}
