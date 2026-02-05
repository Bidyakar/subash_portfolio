import { getBlogPosts } from '@/app/actions';
import {
    LayoutDashboard,
    FileText,
    Star,
    Tag,
    Clock,
    TrendingUp,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';

export default async function DashboardPage() {
    const posts = await getBlogPosts();

    // Calculate stats
    const totalPosts = posts.length;
    const featuredPosts = posts.filter(p => p.isFeatured).length;

    // Category distribution
    const categories = posts.reduce((acc: Record<string, number>, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
    }, {});

    const categoryCount = Object.keys(categories).length;

    return (
        <div className="space-y-10 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-playfair font-black text-[#0A192F] mb-2 tracking-tight">
                        Dashboard <span className="text-[#FF4D00]">Analysis</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Real-time overview of your content performance and strategy.</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#FF4D00] bg-orange/5 px-4 py-2 rounded-full border border-orange/10">
                    <Clock size={14} />
                    UPDATED JUST NOW
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange/5 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange/5 rounded-bl-[100px] -mr-6 -mt-6 group-hover:bg-orange/10 transition-colors" />
                    <div className="w-12 h-12 bg-orange/10 rounded-2xl flex items-center justify-center text-[#FF4D00] mb-6 group-hover:scale-110 transition-transform duration-500">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Posts</h3>
                    <div className="flex items-baseline gap-2 mt-2">
                        <div className="text-4xl font-black text-[#0A192F]">{totalPosts}</div>
                        <div className="text-xs font-bold text-green-500 flex items-center gap-1">
                            <TrendingUp size={12} /> Live
                        </div>
                    </div>
                </div>

                <div className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange/5 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/5 rounded-bl-[100px] -mr-6 -mt-6 group-hover:bg-yellow-400/10 transition-colors" />
                    <div className="w-12 h-12 bg-yellow-400/10 rounded-2xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Star size={24} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Featured</h3>
                    <div className="text-4xl font-black text-[#0A192F] mt-2">{featuredPosts}</div>
                </div>

                <div className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange/5 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-[100px] -mr-6 -mt-6 group-hover:bg-blue-500/10 transition-colors" />
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                        <Tag size={24} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Categories</h3>
                    <div className="text-4xl font-black text-[#0A192F] mt-2">{categoryCount}</div>
                </div>

                <div className="group p-8 bg-[#0A192F] rounded-3xl border border-slate-800 shadow-2xl hover:shadow-orange/20 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D00]/10 to-transparent pointer-events-none" />
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Goal Status</h3>
                    <div className="text-2xl font-black text-white mt-2 italic">Active</div>
                    <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-tighter">Content Pipeline Primary</p>
                </div>
            </div>

            {/* Analysis Grid */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Category Analysis */}
                <div className="lg:col-span-2 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-playfair font-black text-[#0A192F]">Category Distribution</h3>
                            <p className="text-sm text-slate-400 font-medium">Breakdown of content by topic areas.</p>
                        </div>
                        <TrendingUp className="text-[#FF4D00]" size={20} />
                    </div>

                    <div className="space-y-6">
                        {Object.entries(categories).map(([name, count]) => {
                            const percentage = Math.round((count / totalPosts) * 100);
                            return (
                                <div key={name} className="space-y-2 group">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-bold text-[#0A192F] group-hover:text-[#FF4D00] transition-colors uppercase tracking-wider text-xs">
                                            {name}
                                        </span>
                                        <span className="font-black text-slate-400">{count} posts ({percentage}%)</span>
                                    </div>
                                    <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#FF4D00] to-orange-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,165,0,0.3)]"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}

                        {totalPosts === 0 && (
                            <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
                                <p className="text-slate-400 font-medium italic">No data available yet. Start blogging!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions / Summary Card */}
                <div className="space-y-6">
                    <div className="p-8 bg-gradient-to-br from-[#FF4D00] to-orange-600 rounded-3xl text-white shadow-xl shadow-orange/20 relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                            <ArrowUpRight size={160} />
                        </div>
                        <h3 className="text-lg font-playfair font-black mb-4">Content Strategy</h3>
                        <p className="text-orange-100 text-sm font-medium mb-8 leading-relaxed">
                            Your blog is growing! Keep up the momentum by focusing on your top-performing categories.
                        </p>
                        <button className="w-full py-4 bg-white text-[#FF4D00] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0A192F] hover:text-white transition-all transform active:scale-95 shadow-lg">
                            Analyze Performance
                        </button>
                    </div>

                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <h3 className="text-sm font-bold text-[#0A192F] uppercase tracking-widest mb-6 border-b pb-4">Recent Health</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-slate-500">DATABASE CONNECTED</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-slate-500">CLOUDINARY READY</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-slate-500">API ROUTES OPERATIONAL</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
