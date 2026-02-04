export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#0A192F]">Dashboard Analysis</h1>
                <p className="text-slate-500">Welcome to your blog management overview.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Placeholder for future stats */}
                <div className="p-6 bg-white rounded-xl border shadow-sm">
                    <h3 className="text-sm font-medium text-slate-500">Total Posts</h3>
                    <div className="text-2xl font-bold mt-2">--</div>
                </div>
            </div>
        </div>
    )
}
