'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveBlogPost, getBlogPosts, deleteBlogPost, logout } from '@/app/actions';
import { BlogPost } from '@/app/lib/types';
import { LogOut, LayoutDashboard, ExternalLink, Trash2 } from 'lucide-react';

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

    // Load posts
    const loadPosts = async () => {
        try {
            const data = await getBlogPosts();
            if (Array.isArray(data)) {
                setPosts(data); // Server sorts
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

        try {
            const result = await saveBlogPost({ title, category, excerpt, content, imageUrl, isFeatured });

            if (result.success) {
                setTitle(''); setExcerpt(''); setContent(''); setImageUrl(''); setIsFeatured(false);
                await loadPosts();
                alert("Article published successfully!");
            } else {
                alert("Error saving the post: " + (result.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Client submission error:", error);
            alert("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
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
                    <Link href="/blog" target="_blank" className="flex items-center gap-3 text-gray-400 hover:text-[#FF4D00] transition-colors font-bold text-xs uppercase tracking-widest">
                        <ExternalLink size={16} />
                        <span>VIEW BLOG</span>
                    </Link>
                    <Link href="/" target="_blank" className="flex items-center gap-3 text-gray-400 hover:text-[#FF4D00] transition-colors font-bold text-xs uppercase tracking-widest">
                        <LayoutDashboard size={16} />
                        <span>PORTFOLIO</span>
                    </Link>
                    <button
                        onClick={async () => {
                            await logout();
                            window.location.href = '/admin'; // Force full refresh to clear any client state
                        }}
                        className="flex items-center gap-3 text-red-400 hover:text-red-500 transition-colors font-bold text-xs uppercase tracking-widest text-left w-full mt-8"
                    >
                        <LogOut size={16} />
                        <span>LOGOUT</span>
                    </button>
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
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF4D00]/10 border border-transparent focus:border-[#FF4D00]/20 transition-all font-medium text-[#0A192F]"
                                            placeholder="Article Title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Category</label>
                                        <select
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-transparent font-medium text-[#0A192F]"
                                        >
                                            <option>Leadership</option><option>Community</option><option>Marketing</option><option>Events</option><option>Personal Growth</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Image URL (Optional)</label>
                                    <input
                                        type="text"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="/images/blog-1.jpg"
                                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF4D00]/10 border border-transparent focus:border-[#FF4D00]/20 transition-all font-medium text-[#0A192F]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Excerpt</label>
                                    <textarea
                                        rows={4}
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                        required
                                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none resize-none focus:ring-2 focus:ring-[#FF4D00]/10 border border-transparent focus:border-[#FF4D00]/20 transition-all font-medium text-[#0A192F]"
                                        placeholder="Brief summary..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Full Content</label>
                                    <textarea
                                        rows={8}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none resize-none focus:ring-2 focus:ring-[#FF4D00]/10 border border-transparent focus:border-[#FF4D00]/20 transition-all font-medium text-[#0A192F]"
                                        placeholder="Write your full article here..."
                                    />
                                </div>
                                <div className="flex items-center gap-3 py-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={isFeatured}
                                        onChange={(e) => setIsFeatured(e.target.checked)}
                                        className="w-5 h-5 accent-[#FF4D00] cursor-pointer"
                                    />
                                    <label htmlFor="featured" className="text-sm font-bold text-[#0A192F] cursor-pointer">Feature this post at the top</label>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-5 bg-[#FF4D00] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#0A192F] transition-all shadow-lg shadow-[#FF4D00]/20 disabled:opacity-50"
                                >
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
                            <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
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
                                            <Trash2 size={18} />
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
