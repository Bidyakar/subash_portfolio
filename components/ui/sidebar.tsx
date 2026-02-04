"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, PlusCircle, LogOut, ExternalLink } from "lucide-react"
import { logout } from "@/app/actions"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    return (
        <div className={cn("pb-12 min-h-screen bg-[#0A192F] text-white", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="mb-8 px-4">
                        <h2 className="text-2xl font-black italic font-playfair tracking-tight">
                            SS<span className="text-[#FF4D00]">.</span>Admin
                        </h2>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Management Portal</p>
                    </div>
                    <div className="space-y-1">
                        <Link href="/admin/dashboard" passHref>
                            <Button variant="ghost" className={cn("w-full justify-start text-zinc-300 hover:text-white hover:bg-white/10", pathname === "/admin/dashboard" && "bg-white/10 text-white")}>
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Overview
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-zinc-500 uppercase">
                        Content
                    </h2>
                    <div className="space-y-1">
                        <Link href="/admin/dashboard/posts" passHref>
                            <Button variant="ghost" className={cn("w-full justify-start text-zinc-300 hover:text-white hover:bg-white/10", pathname === "/admin/dashboard/posts" && "bg-white/10 text-white")}>
                                <FileText className="mr-2 h-4 w-4" />
                                All Posts
                            </Button>
                        </Link>
                        <Link href="/admin/dashboard/posts/new" passHref>
                            <Button variant="ghost" className={cn("w-full justify-start text-zinc-300 hover:text-white hover:bg-white/10", pathname === "/admin/dashboard/posts/new" && "bg-white/10 text-white")}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Create New
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-zinc-500 uppercase">
                        System
                    </h2>
                    <div className="space-y-1">
                        <Link href="/blog" target="_blank" passHref>
                            <Button variant="ghost" className="w-full justify-start text-zinc-300 hover:text-white hover:bg-white/10">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Live Site
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/10"
                            onClick={async () => {
                                await logout();
                                window.location.href = '/admin';
                            }}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
