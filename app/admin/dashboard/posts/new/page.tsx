import { ArticleForm } from "@/components/admin/ArticleForm"

export default function NewPostPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#0A192F]">Create New Article</h1>
                <p className="text-slate-500">Add a new insight to your blog.</p>
            </div>
            <ArticleForm />
        </div>
    )
}
