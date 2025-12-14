export function HeroSection() {
    return (
        <section className='relative min-h-150 overflow-hidden'>
            {/* Background Image with Overlay */}
            <div className='absolute inset-0 z-0'>
                {/* For now: green gradient (we'll add real image later) */}
                <div className='h-full w-full bg-linear-to-br from-green-900 via-green-800 to-amber-600' />

                {/* Sunrise effect */}
                <div className='absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t from-amber-200/20 to-transparent' />
            </div>

            {/* Content */}
            <div className='relative z-10 mx-auto max-w-6xl px-4 pt-20 text-white'>
                {/* Headline */}
                <h1 className='text-5xl leading-tight font-bold md:text-6xl'>
                    Direct From Ethiopian Farms
                    <br />
                    <span className='text-amber-300'>To Global Markets</span>
                </h1>

                {/* Description */}
                <p className='mt-6 max-w-2xl text-xl leading-relaxed'>
                    We bridge the gap between Ethiopia's richest agricultural lands and international buyers. Get
                    premium coffee, teff, spices, and more—sourced, quality-checked, and shipped with complete
                    transparency.
                </p>

                {/* Mission Statement */}
                <div className='mt-8 rounded-lg bg-black/30 p-6 backdrop-blur-sm'>
                    <p className='text-lg italic'>
                        "Our mission: Empower Ethiopian farmers through fair trade while delivering exceptional quality
                        to global markets. We handle sourcing, compliance, and logistics so you can focus on growing
                        your business."
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className='mt-10 flex flex-col gap-4 sm:flex-row'>
                    <button className='rounded-lg bg-amber-500 px-8 py-3 text-lg font-semibold text-white hover:bg-amber-600'>
                        View Live Market Prices →
                    </button>
                    <button className='rounded-lg border-2 border-white px-8 py-3 text-lg font-semibold text-white hover:bg-white/10'>
                        Start Your Order
                    </button>
                </div>
            </div>

            {/* Decorative elements */}
            <div className='absolute right-0 bottom-0 left-0 h-20 bg-linear-to-t from-white to-transparent' />
        </section>
    );
}
