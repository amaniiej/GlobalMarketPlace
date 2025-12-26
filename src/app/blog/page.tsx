import BlogCard from './BlogCard';

export default function BlogPage() {
    const blogPosts = [
        {
            id: 1,
            slug: 'coffee-exports',
            title: 'Ethiopian Coffee Exports Hit Record High in Q4 2024',
            excerpt:
                'Coffee exports reached unprecedented levels in the final quarter of 2024, driven by increased global demand and improved logistics infrastructure.',
            author: 'Market Research Team',
            date: 'Dec 12, 2024',
            readTime: '5 min read',
            category: 'Market Trends',
            content: `Ethiopian coffee exports reached unprecedented levels in the final quarter of 2024, driven by increased global demand and improved logistics infrastructure.

## Market Performance Overview
According to data from the Ethiopian Coffee and Tea Authority, coffee exports increased by 18% compared to the same period last year, reaching a total value of $450 million.

## Regional Analysis
The Sidamo and Yirgacheffe regions showed the highest growth, with premium specialty coffees commanding prices up to 25% higher than conventional varieties.

## Future Outlook
Industry experts project continued growth in 2025, with particular emphasis on expansion of organic and fair-trade certified production.`
        },
        {
            id: 2,
            slug: 'export-regulations',
            title: 'Navigating Ethiopian Export Regulations: A Complete Guide',
            excerpt:
                'Everything you need to know about compliance, documentation, and customs procedures for agricultural exports from Ethiopia.',
            author: 'Legal Team',
            date: 'Dec 5, 2024',
            readTime: '8 min read',
            category: 'Compliance',
            content: `Exporting agricultural products from Ethiopia requires careful attention to regulatory requirements and documentation.

## Key Regulations
1. **Export License**: All exporters must obtain a license from the Ministry of Trade and Industry.
2. **Phytosanitary Certificate**: Mandatory for all plant-based products.
3. **Certificate of Origin**: Required for preferential trade agreements.

## Documentation Checklist
- Commercial invoice
- Packing list
- Bill of lading/Airway bill
- Insurance certificate
- Export declaration form

## Common Pitfalls
Many exporters face delays due to incomplete documentation or lack of pre-shipment inspection. Planning ahead is crucial.`
        },
        {
            id: 3,
            slug: 'organic-farming',
            title: 'The Rise of Organic Farming in Ethiopia',
            excerpt:
                'How sustainable practices are transforming agricultural exports and creating new opportunities for Ethiopian farmers.',
            author: 'Sustainability Team',
            date: 'Nov 28, 2024',
            readTime: '6 min read',
            category: 'Sustainability',
            content: `Organic farming is gaining momentum in Ethiopia, driven by both domestic initiatives and international market demand.

## Growth Statistics
- Organic farmland increased by 35% in 2024
- 500+ farms now certified organic
- Export value of organic products: $120 million annually

## Certification Process
To obtain organic certification, farms must:
1. Implement sustainable practices for 3 years
2. Avoid synthetic pesticides and fertilizers
3. Maintain detailed production records
4. Undergo annual inspections

## Market Opportunities
European and North American markets show strong demand for certified organic Ethiopian products, particularly coffee, spices, and pulses.`
        }
    ];

    const categories = [
        'All',
        'Market Trends',
        'Compliance',
        'Sustainability',
        'Product Focus',
        'Logistics',
        'Quality'
    ];

    return (
        <main className='pt-14'>
            <div className='container mx-auto px-4 py-4'>
                {' '}
                {/* Reduced from py-8 to py-4 */}
                {/* Header */}
                <div className='mb-4 text-center'>
                    {' '}
                    {/* Reduced from mb-8 to mb-4 */}
                    <h1 className='mb-1 text-2xl font-bold text-gray-900 md:text-3xl'>
                        {' '}
                        {/* Reduced text size further */}
                        AgriMarket Insights
                    </h1>
                    <p className='mx-auto max-w-3xl text-base text-gray-600'>
                        {' '}
                        {/* Reduced to text-base */}
                        Expert analysis, market trends, and insights for agricultural exporters and buyers.
                    </p>
                </div>
                {/* Category Filter */}
                <div className='mb-3 flex flex-wrap justify-center gap-1.5'>
                    {' '}
                    {/* Reduced gap further */}
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${category === 'All' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                            {category}
                        </button>
                    ))}
                </div>
                {/* Featured Post */}
                <div className='mb-4 overflow-hidden rounded-lg bg-linear-to-r from-green-900 to-green-700'>
                    {' '}
                    {/* Changed to rounded-lg */}
                    <div className='p-4 text-white md:p-6'>
                        {' '}
                        {/* Reduced padding further */}
                        <div className='max-w-2xl'>
                            <span className='mb-2 inline-block rounded-full bg-green-500/20 px-2 py-0.5 text-xs'>
                                {' '}
                                {/* Reduced */}
                                Featured Post
                            </span>
                            <h2 className='mb-2 text-xl font-bold md:text-2xl'>
                                {' '}
                                {/* Reduced text size */}
                                2025 Agricultural Export Outlook for Ethiopia
                            </h2>
                            <p className='mb-3 text-sm text-green-100'>
                                {' '}
                                {/* Reduced to text-sm */}
                                Comprehensive analysis of market projections, emerging opportunities, and strategic
                                recommendations for exporters.
                            </p>
                            <div className='flex flex-wrap items-center gap-1.5 text-xs text-green-200'>
                                {' '}
                                {/* Reduced to text-xs */}
                                <span>Market Research Team</span>
                                <span>•</span>
                                <span>Jan 2, 2025</span>
                                <span>•</span>
                                <span>10 min read</span>
                            </div>
                            <button className='mt-3 rounded-md bg-white px-4 py-1.5 text-xs font-semibold text-green-700 hover:bg-gray-100'>
                                {' '}
                                {/* Reduced padding further */}
                                Read Full Report →
                            </button>
                        </div>
                    </div>
                </div>
                {/* Blog Grid */}
                <div className='mb-4'>
                    {' '}
                    {/* Reduced from mb-8 to mb-4 */}
                    <h2 className='mb-2 text-lg font-bold text-gray-900'>
                        {' '}
                        {/* Reduced text size */}
                        Latest Insights
                    </h2>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {' '}
                        {/* Reduced gap to 4 */}
                        {blogPosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
                {/* Newsletter */}
                <div className='mx-auto max-w-2xl rounded-lg bg-gray-50 p-4 shadow-sm'>
                    {' '}
                    {/* Reduced padding and shadow */}
                    <div className='text-center'>
                        <h3 className='mb-2 text-lg font-bold text-gray-900'>
                            {' '}
                            {/* Reduced text size */}
                            Stay Updated
                        </h3>
                        <p className='mb-3 text-sm text-gray-600'>
                            {' '}
                            {/* Reduced to text-sm */}
                            Get the latest market insights and agricultural export trends directly in your inbox.
                        </p>
                        <div className='flex flex-col gap-2 sm:flex-row'>
                            {' '}
                            {/* Reduced gap to 2 */}
                            <input
                                type='email'
                                placeholder='Your email address'
                                className='grow rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:ring-1 focus:ring-green-500 focus:outline-none' // Reduced padding
                            />
                            <button className='rounded-md bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700'>
                                {' '}
                                {/* Reduced padding */}
                                Subscribe
                            </button>
                        </div>
                        <p className='mt-2 text-xs text-gray-500'>No spam. Unsubscribe anytime.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
