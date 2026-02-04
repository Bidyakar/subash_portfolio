import Link from "next/link"
import { getBlogPosts, deleteBlogPost } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default async function PostsPage() {
    const posts = await getBlogPosts()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#0A192F]">Articles</h1>
                    <p className="text-slate-500">Manage your blog content.</p>
                </div>
                <Link href="/admin/dashboard/posts/new">
                    <Button className="bg-[#FF4D00] hover:bg-[#FF4D00]/90">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create Article
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Posts</CardTitle>
                    <CardDescription>List of all published articles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell className="font-medium max-w-[300px] truncate">{post.title}</TableCell>
                                    <TableCell>{post.category}</TableCell>
                                    <TableCell>{post.date}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Link href={`/admin/dashboard/posts/${post.id}/edit`}>
                                            <Button variant="ghost" size="icon">
                                                <Pencil className="h-4 w-4 text-slate-500" />
                                            </Button>
                                        </Link>

                                        {/* 
                            For delete, we need a client component or form action. 
                            To keep it simple in this server component, let's wrap a small form. 
                        */}
                                        <form action={async () => {
                                            "use server"
                                            await deleteBlogPost(post.id)
                                        }} className="inline-block">
                                            <Button variant="ghost" size="icon" type="submit" className="text-red-400 hover:text-red-500 hover:bg-red-50">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </form>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {posts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-10 text-slate-500">No posts found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
