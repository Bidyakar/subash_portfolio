'use client';

import React, { useState, useEffect } from 'react';
import { getBlogPosts } from '@/app/actions';
import { BlogPost } from '@/app/lib/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const BlogPostPage = () => {
    const params = useParams();
    const id = params.id as string;

    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const posts = await getBlogPosts();
                const foundPost = posts.find((p) => p.id === id);
                setPost(foundPost || null);
            } catch (error) {
                console.error("Failed to fetch post:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4D00]"></div>
            </div>
        );
    }

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
};

export default BlogPostPage;
