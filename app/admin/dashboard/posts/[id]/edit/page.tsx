import { ArticleForm } from "@/components/admin/ArticleForm"
import { getBlogPosts } from "@/app/actions"
import { notFound } from "next/navigation"

export default async function EditPostPage({ params }: { params: { id: string } }) {
    // Ideally we should have getBlogPostById. 
    // For now I will fetch all and find one, or update actions to support getById.
    // Assuming getBlogPosts returns everything for now.
    const posts = await getBlogPosts()
    const post = posts.find(p => p.id === params.id)

    if (!post) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#0A192F]">Edit Article</h1>
                <p className="text-slate-500">Make changes to your content.</p>
            </div>
            <ArticleForm initialData={post} isEdit={true} />
        </div>
    )
}
