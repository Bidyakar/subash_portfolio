'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBlogPosts } from '@/app/actions';
import { BlogPost } from '@/app/lib/types';
import Hero from '@/app/components/Hero'; // Assuming you might want a hero here, or we can just use a header.

const BlogPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getBlogPosts();
                if (Array.isArray(data)) {
                    setPosts(data);
                } else {
                    setPosts([]);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <main className="min-h-screen bg-white">

            {/* Header / Hero Section */}
            <section className="relative bg-[#0A192F] text-white py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-playfair font-black mb-6 italic">
                        The <span className="text-[#FF4D00]">Blog</span>.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl font-light">
                        Thoughts on leadership, community, and technology.
                    </p>
                </div>
            </section>

            {/* Blog List */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF4D00]"></div>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <article key={post.id} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all border border-gray-100">
                                    {/* Image Placeholder - functionality ready for real images */}
                                    <div className="h-48 bg-gray-100 relative overflow-hidden">
                                        {post.imageUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-300">
                                                <span className="text-4xl font-playfair italic">Img</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 bg-[#FF4D00] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                            {post.category}
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-1">
                                        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">
                                            {post.date}
                                        </div>
                                        <h2 className="text-2xl font-playfair font-bold text-[#0A192F] mb-4 group-hover:text-[#FF4D00] transition-colors leading-tight">
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
                    )}

                    {!loading && posts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No posts published yet. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default BlogPage;