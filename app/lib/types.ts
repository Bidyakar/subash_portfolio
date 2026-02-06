export interface BlogPost {
    id: string;
    title: string;
    category: string;
    excerpt: string;
    content: string; // Full blog content
    imageUrl?: string;
    isFeatured: boolean;
    date: string;
    updatedAt: string;
}

export interface BlogPostInput {
    id?: string; // Optional for updates
    title: string;
    category: string;
    excerpt: string;
    content: string;
    imageUrl?: string;
    isFeatured?: boolean;
}
