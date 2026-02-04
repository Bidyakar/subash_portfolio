import { Sidebar } from "@/components/ui/sidebar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen">
            <div className="hidden border-r bg-[#0A192F] lg:block lg:w-64 fixed h-full z-50">
                <Sidebar className="h-full" />
            </div>
            <div className="flex-1 lg:pl-64">
                <div className="h-full px-4 py-6 lg:px-8 bg-slate-50 min-h-screen">
                    {children}
                </div>
            </div>
        </div>
    )
}
