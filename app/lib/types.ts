export interface BlogPost {
    id: string;
    title: string;
    category: string;
    excerpt: string;
    content: string; // Full blog content
    imageUrl?: string;
    isFeatured: boolean;
    date: string;
}

export type BlogPostInput = Omit<BlogPost, 'id' | 'date'>;
