'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveBlogPost, getBlogPosts, deleteBlogPost, logout } from '@/app/actions';
import { BlogPost } from '@/app/lib/types';

const AdminBlog = () => {
    // Form States
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Leadership');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);

    // UI States
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load posts from JSON
    const loadPosts = async () => {
        try {
            const data = await getBlogPosts();
            // Sort by ID descending so newest is at the top
            if (Array.isArray(data)) {
                setPosts(data.sort((a, b) => b.id - a.id));
            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error("Failed to load posts:", error);
            setPosts([]);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await saveBlogPost({ title, category, excerpt, content, imageUrl, isFeatured });

        if (result.success) {
            setTitle(''); setExcerpt(''); setContent(''); setImageUrl(''); setIsFeatured(false);
            await loadPosts(); // Refresh the list
            alert("Article published successfully!");
        } else {
            alert("Error saving the post.");
        }
        setIsSubmitting(false);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this article?")) {
            const result = await deleteBlogPost(id);
            if (result.success) {
                await loadPosts();
            } else {
                alert("Could not delete the post.");
            }
        }
    };

    return (
        <main className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-72 bg-[#0A192F] text-white p-10 flex flex-col">
                <div className="font-playfair font-black text-3xl mb-12 italic">
                    SS<span className="text-[#FF4D00]">.</span>Admin
                </div>
                <nav className="flex-1 space-y-4">
                    <Link href="/blog" className="flex items-center gap-3 text-gray-400 hover:text-[#FF4D00] transition-colors font-bold text-xs uppercase tracking-widest">
                        <span>VIEW BLOG</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-3 text-gray-400 hover:text-[#FF4D00] transition-colors font-bold text-xs uppercase tracking-widest">
                        <span>PORTFOLIO</span>
                    </Link>
                    <form action={logout}>
                        <button type="submit" className="flex items-center gap-3 text-red-400 hover:text-red-500 transition-colors font-bold text-xs uppercase tracking-widest text-left w-full">
                            <span>LOGOUT</span>
                        </button>
                    </form>
                </nav>
            </aside>

            {/* Main Area */}
            <section className="flex-1 p-6 lg:p-16 max-w-6xl mx-auto w-full">
                <div className="flex flex-col gap-12">

                    {/* Header */}
                    <div>
                        <h1 className="text-4xl font-playfair font-bold text-[#0A192F]">Management Dashboard</h1>
                        <p className="text-gray-500 mt-2">Create and organize your insights.</p>
                    </div>

                    <div className="grid xl:grid-cols-5 gap-12 items-start">

                        {/* Form: Left Side */}
                        <div className="xl:col-span-3 bg-white p-8 lg:p-10 rounded-[2rem] shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-[#0A192F] mb-8 flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#FF4D00] rounded-full"></span>
                                New Article
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Title</label>
                                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF4D00]/10 border border-transparent focus:border-[#FF4D00]/20 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Category</label>
                                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent">
                                            <option>Leadership</option><option>Community</option><option>Marketing</option><option>Events</option><option>Personal Growth</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Image URL (Optional)</label>
                                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="/images/blog-1.jpg" className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Excerpt</label>
                                    <textarea rows={4} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} required className="w-full p-4 bg-gray-50 rounded-2xl outline-none resize-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Full Content</label>
                                    <textarea rows={8} value={content} onChange={(e) => setContent(e.target.value)} required className="w-full p-4 bg-gray-50 rounded-2xl outline-none resize-none" placeholder="Write your full article here..." />
                                </div>
                                <div className="flex items-center gap-3 py-2">
                                    <input type="checkbox" id="feature" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="w-5 h-5 accent-[#FF4D00] cursor-pointer" />
                                    <label htmlFor="feature" className="text-sm font-bold text-[#0A192F] cursor-pointer">Feature this post at the top</label>
                                </div>
                                <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-[#FF4D00] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#0A192F] transition-all shadow-lg shadow-[#FF4D00]/20 disabled:opacity-50">
                                    {isSubmitting ? "Publishing..." : "Publish Insight"}
                                </button>
                            </form>
                        </div>

                        {/* List: Right Side */}
                        <div className="xl:col-span-2 space-y-6">
                            <h2 className="text-xl font-bold text-[#0A192F] flex items-center gap-2">
                                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                                Existing Posts ({posts.length})
                            </h2>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                {posts.map((post) => (
                                    <div key={post.id} className="group bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-[#FF4D00]/30 transition-all shadow-sm">
                                        <div className="overflow-hidden">
                                            <h4 className="font-bold text-[#0A192F] truncate text-sm">{post.title}</h4>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{post.category} • {post.date}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                {posts.length === 0 && (
                                    <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-[2rem]">
                                        <p className="text-gray-400 text-sm font-medium">No articles yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
};

export default AdminBlog;
