"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { ArticleSchema } from "@/lib/schemas"
import { saveBlogPost, uploadImage } from "@/app/actions"
import { BlogPost } from "@/app/lib/types"

// Temporary minimalist Form components wrapper since Shadcn Form components are many files
// I will assume standard HTML or basic customization if `shadcn-ui form` wasn't run fully.
// Wait, user asked for Shadcn. The best approach is to use the installed components manually wired to hook form
// OR assume the user has run `npx shadcn-ui@latest add form`. 
// Since I cannot run interactive commands easily, I will implement a custom form wrapper 
// using the Input/Label I already have, to avoid "Missing component" errors.

type ArticleFormProps = {
    initialData?: BlogPost
    isEdit?: boolean
}

export function ArticleForm({ initialData, isEdit = false }: ArticleFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)

    const form = useForm<z.infer<typeof ArticleSchema>>({
        resolver: zodResolver(ArticleSchema),
        defaultValues: {
            title: initialData?.title || "",
            category: initialData?.category || "",
            content: initialData?.content || "",
            excerpt: initialData?.excerpt || "",
            imageUrl: initialData?.imageUrl || "",
            isFeatured: initialData?.isFeatured || false,
        },
    })

    async function onSubmit(values: z.infer<typeof ArticleSchema>) {
        setLoading(true)
        try {
            const payload = {
                ...values,
                id: initialData?.id
            };

            const result = await saveBlogPost(payload)

            if (result.success) {
                router.push("/admin/dashboard/posts")
                router.refresh()
            } else {
                alert("Error: " + result.error)
            }
        } catch (error) {
            console.error(error)
            alert("Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-xl border shadow-sm max-w-3xl">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Article Title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Leadership" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Input
                                            placeholder="https://... or upload file"
                                            {...field}
                                            className="flex-1"
                                            disabled={uploadingImage || loading} // Disable while uploading or form submitting
                                        />
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                disabled={uploadingImage || loading} // Disable while uploading or form submitting
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setUploadingImage(true); // Start image upload loading
                                                        const formData = new FormData();
                                                        formData.append('file', file);

                                                        try {
                                                            const result = await uploadImage(formData) as any;
                                                            if (result.success && result.url) {
                                                                field.onChange(result.url);
                                                            } else {
                                                                alert("Upload failed: " + result.error);
                                                            }
                                                        } catch (err) {
                                                            console.error(err);
                                                            alert("Upload failed");
                                                        } finally {
                                                            setUploadingImage(false); // End image upload loading
                                                        }
                                                    }
                                                }}
                                            />
                                            <Button type="button" variant="outline" className="w-full">
                                                {uploadingImage ? "Uploading..." : "Upload Device File"}
                                            </Button>
                                        </div>
                                    </div>
                                    {field.value && (
                                        <div className="relative w-full h-48 bg-slate-100 rounded-md overflow-hidden border">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={field.value}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Excerpt</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Brief summary..." rows={3} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Full content..." rows={10} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Feature this post
                                </FormLabel>
                                <FormDescription>
                                    This will display the post at the top of the blog.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" disabled={loading} className="bg-[#FF4D00] hover:bg-[#FF4D00]/90">
                        {loading ? "Saving..." : (isEdit ? "Update Article" : "Create Article")}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
