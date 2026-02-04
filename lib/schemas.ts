import { z } from "zod";

export const ArticleSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    category: z.string().min(2, {
        message: "Category is required.",
    }),
    content: z.string().min(20, {
        message: "Content must be at least 20 characters.",
    }),
    excerpt: z.string().min(10, {
        message: "Excerpt must be at least 10 characters.",
    }),
    imageUrl: z.string().optional().or(z.literal("")),
    isFeatured: z.boolean(),
});

export type ArticleFormValues = z.infer<typeof ArticleSchema>;
