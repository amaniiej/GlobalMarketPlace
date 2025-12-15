import Link from 'next/link';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    slug: string;
}

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/Blog/${post.slug}`}>
            <div className='group h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl'>
                {/* Category Badge */}
                <div className='px-6 pt-6'>
                    <span className='inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800'>
                        {post.category}
                    </span>
                </div>

                {/* Content */}
                <div className='p-6'>
                    <h3 className='mb-3 text-xl font-bold text-gray-900 group-hover:text-green-600'>{post.title}</h3>
                    <p className='mb-4 text-gray-600'>{post.excerpt}</p>

                    {/* Meta Info */}
                    <div className='flex items-center justify-between text-sm text-gray-500'>
                        <div className='flex items-center gap-3'>
                            <div className='h-8 w-8 rounded-full bg-gray-200'></div>
                            <span>{post.author}</span>
                        </div>
                        <div className='text-right'>
                            <div>{post.date}</div>
                            <div>{post.readTime}</div>
                        </div>
                    </div>
                </div>

                {/* Read More */}
                <div className='border-t border-gray-100 px-6 py-4'>
                    <div className='flex items-center justify-between'>
                        <span className='font-medium text-green-600 group-hover:text-green-700'>Read Article →</span>
                        <div className='flex gap-2'>
                            <span className='cursor-pointer text-gray-400 hover:text-green-600'>♡</span>
                            <span className='cursor-pointer text-gray-400 hover:text-green-600'>↗</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
