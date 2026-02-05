import Link from 'next/link';
import { getBlogPosts } from '@/app/actions';
import { BlogPost } from '@/app/lib/types';
import { Metadata } from 'next';
import Navbar from '../components/Navbar';

export const metadata: Metadata = {
    title: 'The Blog | Subash S Sapkota',
    description: 'Thoughts on leadership, community, and technology by Subash S Sapkota.',
};

export default async function BlogPage() {
    const data = await getBlogPosts();
    const posts = Array.isArray(data) ? data : [];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            {/* Header / Hero Section */}
            <section className="relative bg-navy py-20">


                <div className="max-w-6xl mx-auto py-20">
                    <h1 className="text-5xl md:text-7xl font-playfair text-white mb-6 italic">
                        The <span className="text-[#FF4D00]">Blog</span>.
                    </h1>
                    <p className="text-xl text-white max-w-2xl font-light">
                        Thoughts on leadership, community, and technology.
                    </p>
                </div>
            </section>

            {/* Blog List */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: BlogPost) => (
                            <article
                                key={post.id}
                                className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-[0_8px_20px_rgba(255,77,0,0.3)] transition-all duration-300">
                                {/* Image Placeholder - functionality ready for real images */}
                                <div className="h-64 bg-gray-100 relative overflow-hidden">
                                    {post.imageUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-300">
                                            <span className="text-4xl font-playfair italic">Img</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-[#FF4D00] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                                        {post.category}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-1 ">
                                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">
                                        {post.date}
                                    </div>
                                    <h2
                                        className="text-2xl font-playfair font-bold text-[#0A192F] mb-4 leading-tight transition-colors group-hover:text-[#FF4D00] group-hover:glow-slow" >
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-500 mb-6 flex-1 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <Link href={`/blog/${post.id}`} className="inline-flex items-center text-[#FF4D00] font-black text-xs uppercase tracking-widest hover:gap-2 transition-all">
                                        Read Article <span className="ml-1">→</span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No posts published yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}