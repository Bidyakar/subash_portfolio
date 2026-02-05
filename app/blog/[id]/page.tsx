import { getBlogPosts } from '@/app/actions';
import { BlogPost } from '@/app/lib/types';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id;
    const posts = await getBlogPosts();
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return {
            title: 'Article Not Found',
        };
    }

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `${post.title} | Subash S Sapkota`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://subashssapkota.com.np/blog/${id}`,
            siteName: 'Subash S Sapkota',
            images: post.imageUrl ? [post.imageUrl, ...previousImages] : previousImages,
            locale: 'en_US',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: post.imageUrl ? [post.imageUrl] : [],
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const id = params.id;
    const posts = await getBlogPosts();
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return (
            <div className="min-h-screen bg-white flex flex-col justify-center items-center p-6">
                <h1 className="text-4xl font-playfair font-bold text-[#0A192F] mb-4">404</h1>
                <p className="text-gray-500 mb-8">Article not found.</p>
                <Link href="/blog" className="px-8 py-3 bg-[#FF4D00] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#0A192F] transition-all">
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header Image */}
            <div className="h-[40vh] md:h-[60vh] bg-gray-900 relative">
                {post.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover opacity-60" />
                ) : (
                    <div className="w-full h-full bg-[#0A192F]"></div>
                )}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-block px-3 py-1 bg-[#FF4D00] text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                            {post.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-playfair font-black text-white leading-tight mb-4">
                            {post.title}
                        </h1>
                        <p className="text-gray-300 font-bold text-xs uppercase tracking-widest">
                            {post.date}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <article className="max-w-3xl mx-auto p-6 md:p-12">
                <div className="prose prose-lg prose-slate mx-auto">
                    <p className="lead text-xl text-gray-600 font-light italic mb-8 border-l-4 border-[#FF4D00] pl-6">
                        {post.excerpt}
                    </p>
                    <div className="whitespace-pre-wrap text-[#0A192F] leading-relaxed">
                        {post.content || post.excerpt}
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
                    <Link href="/blog" className="px-8 py-3 border border-gray-200 text-gray-500 font-bold text-xs uppercase tracking-widest rounded-xl hover:border-[#FF4D00] hover:text-[#FF4D00] transition-all">
                        ← Back to all articles
                    </Link>
                </div>
            </article>
        </main>
    );
}
