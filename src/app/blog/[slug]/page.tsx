import Link from 'next/link';

// This data would normally come from a database
// For now, we'll define it here
const ALL_BLOG_POSTS = [
    {
        slug: 'coffee-exports',
        title: 'Ethiopian Coffee Exports Hit Record High in Q4 2024',
        author: 'Market Research Team',
        date: 'Dec 12, 2024',
        readTime: '5 min read',
        category: 'Market Trends',
        excerpt: 'Coffee exports reached unprecedented levels in the final quarter of 2024.',
        content: `Ethiopian coffee exports reached unprecedented levels in the final quarter of 2024, driven by increased global demand and improved logistics infrastructure.

## Market Performance Overview
According to data from the Ethiopian Coffee and Tea Authority, coffee exports increased by 18% compared to the same period last year, reaching a total value of $450 million.

## Regional Analysis
The Sidamo and Yirgacheffe regions showed the highest growth, with premium specialty coffees commanding prices up to 25% higher than conventional varieties.

## Future Outlook
Industry experts project continued growth in 2025, with particular emphasis on expansion of organic and fair-trade certified production.`
    },
    {
        slug: 'export-regulations',
        title: 'Navigating Ethiopian Export Regulations: A Complete Guide',
        author: 'Legal Team',
        date: 'Dec 5, 2024',
        readTime: '8 min read',
        category: 'Compliance',
        excerpt: 'Everything you need to know about compliance, documentation, and customs procedures.',
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
        slug: 'organic-farming',
        title: 'The Rise of Organic Farming in Ethiopia',
        author: 'Sustainability Team',
        date: 'Nov 28, 2024',
        readTime: '6 min read',
        category: 'Sustainability',
        excerpt: 'How sustainable practices are transforming agricultural exports.',
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
European and North American markets show strong demand for certified organic Ethiopian products.`
    }
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const { slug } = params;

    // Find the blog post with this slug
    const post = ALL_BLOG_POSTS.find((p) => p.slug === slug);

    // If post not found, show 404
    if (!post) {
        return (
            <div className='flex min-h-screen items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-4xl font-bold'>Post Not Found</h1>
                    <Link href='/Blog' className='mt-4 inline-block text-green-600 hover:underline'>
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className='container mx-auto px-4 py-12'>
                {/* Back Button */}
                <div className='mb-8'>
                    <Link href='/Blog' className='inline-flex items-center gap-2 text-green-600 hover:text-green-700'>
                        ← Back to Blog
                    </Link>
                </div>

                {/* Article Header */}
                <div className='mx-auto max-w-4xl'>
                    <div className='mb-6'>
                        <span className='rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800'>
                            {post.category}
                        </span>
                    </div>
                    <h1 className='mb-6 text-4xl font-bold text-gray-900 md:text-5xl'>{post.title}</h1>
                    <div className='mb-8 flex items-center gap-4'>
                        <div className='h-10 w-10 rounded-full bg-gray-200'></div>
                        <div>
                            <div className='font-medium text-gray-900'>{post.author}</div>
                            <div className='text-gray-500'>
                                {post.date} • {post.readTime}
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className='mb-8 h-64 w-full rounded-2xl bg-linear-to-r from-amber-900 to-amber-700 md:h-96'></div>

                    {/* Article Content */}
                    <article className='prose prose-lg mx-auto max-w-none'>
                        {/* Convert markdown-like content to HTML */}
                        {post.content.split('\n\n').map((paragraph, index) => {
                            if (paragraph.startsWith('## ')) {
                                return (
                                    <h2 key={index} className='mt-8 mb-4 text-2xl font-bold text-gray-900'>
                                        {paragraph.replace('## ', '')}
                                    </h2>
                                );
                            } else if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                                const items = paragraph.split('\n');

                                return (
                                    <ul key={index} className='my-4 list-disc pl-6'>
                                        {items.map((item, i) => (
                                            <li key={i} className='mb-2 text-gray-700'>
                                                {item.replace(/^[-1-9.]+\s*/, '')}
                                            </li>
                                        ))}
                                    </ul>
                                );
                            } else {
                                return (
                                    <p key={index} className='my-4 leading-relaxed text-gray-700'>
                                        {paragraph}
                                    </p>
                                );
                            }
                        })}
                    </article>

                    {/* Article Footer */}
                    <div className='mt-12 border-t border-gray-200 pt-8'>
                        <div className='flex flex-wrap items-center justify-between gap-4'>
                            <div className='flex gap-2'>
                                <button className='rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200'>
                                    ♡ 42
                                </button>
                                <button className='rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200'>
                                    ↗ Share
                                </button>
                            </div>
                            <div className='text-sm text-gray-500'>Last updated: {post.date}</div>
                        </div>

                        {/* Author Bio */}
                        <div className='mt-8 rounded-2xl bg-gray-50 p-6'>
                            <div className='flex items-start gap-4'>
                                <div className='h-16 w-16 rounded-full bg-gray-200'></div>
                                <div>
                                    <h3 className='text-lg font-semibold text-gray-900'>About the Author</h3>
                                    <p className='mt-2 text-gray-600'>
                                        {post.author} consists of agricultural economists and industry analysts with
                                        decades of combined experience in Ethiopian commodity markets.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Related Articles */}
                        <div className='mt-12'>
                            <h3 className='mb-6 text-xl font-bold text-gray-900'>Related Articles</h3>
                            <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                                {ALL_BLOG_POSTS.filter((p) => p.slug !== slug)
                                    .slice(0, 3)
                                    .map((relatedPost) => (
                                        <Link
                                            key={relatedPost.slug}
                                            href={`/Blog/${relatedPost.slug}`}
                                            className='block rounded-xl border border-gray-200 p-4 hover:border-green-300 hover:bg-white'>
                                            <h4 className='font-medium text-gray-900'>{relatedPost.title}</h4>
                                            <p className='mt-2 text-sm text-gray-600'>{relatedPost.readTime}</p>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
