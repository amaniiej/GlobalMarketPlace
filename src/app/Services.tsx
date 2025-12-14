// src/app/services-section.tsx
export function Services() {
    const services = [
        {
            title: 'Direct Farm Sourcing',
            description:
                'We work directly with Ethiopian farmers and cooperatives, cutting out middlemen to ensure better prices and quality control.',
            icon: '👨‍🌾'
        },
        {
            title: 'Quality Assurance',
            description:
                'Every batch undergoes rigorous testing for moisture, purity, and grade certification meeting international standards.',
            icon: '🔬'
        },
        {
            title: 'Export Logistics',
            description:
                'End-to-end supply chain management including warehousing, documentation, and international shipping coordination.',
            icon: '🚢'
        },
        {
            title: 'Regulatory Compliance',
            description:
                'Full handling of Ethiopian export regulations, phytosanitary certificates, and destination country requirements.',
            icon: '📑'
        }
    ];

    return (
        <section className='bg-gray-50 py-16'>
            <div className='container mx-auto px-4'>
                <div className='mb-12 text-center'>
                    <h2 className='mb-4 text-4xl font-bold text-gray-900'>Our Complete Service Package</h2>
                    <p className='mx-auto max-w-3xl text-xl text-gray-600'>
                        From farm to port, we handle every detail so you can focus on your business
                    </p>
                </div>

                <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className='rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl'>
                            <div className='mb-6 text-5xl'>{service.icon}</div>
                            <h3 className='mb-4 text-xl font-bold text-gray-900'>{service.title}</h3>
                            <p className='text-gray-600'>{service.description}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className='mt-12 text-center'>
                    <button className='rounded-lg bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700'>
                        Download Our Service Guide (PDF)
                    </button>
                </div>
            </div>
        </section>
    );
}
