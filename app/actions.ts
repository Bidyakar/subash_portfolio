'use server'

import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/db';
import Article, { IArticle } from '@/models/Article';
import User from '@/models/User';
import { BlogPost, BlogPostInput } from '@/app/lib/types'; // We might need to map types or update types
import { createSession, deleteSession } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';

// Map Mongoose document to frontend type
function mapArticle(doc: any): BlogPost {
    return {
        id: doc._id.toString(), // Mongoose ID is usually string on client
        title: doc.title,
        category: doc.category,
        excerpt: doc.excerpt,
        content: doc.content,
        imageUrl: doc.imageUrl || '',
        isFeatured: doc.isFeatured,
        date: new Date(doc.createdAt).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        }),
    };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        await connectToDatabase();
        const articles = await Article.find({}).sort({ createdAt: -1 }).lean();
        return articles.map(mapArticle);
    } catch (error) {
        console.error("Error reading blog posts from DB:", error);
        return [];
    }
}

export async function saveBlogPost(data: BlogPostInput) {
    try {
        await connectToDatabase();

        // Check if slug exists, if not generate from title
        const slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        // Simple creation for now. In real app, might want update logic if ID provided.
        // Assuming this is always "create" based on previous code. 
        // If we want update, we need to pass ID. The previous mock DB generated ID.
        // Let's rely on Mongoose ID.

        await Article.create({
            title: data.title,
            slug: slug + '-' + Date.now(), // Ensure uniqueness
            category: data.category,
            excerpt: data.excerpt,
            content: data.content,
            imageUrl: data.imageUrl,
            isFeatured: data.isFeatured,
        });

        revalidatePath('/blog');
        return { success: true };
    } catch (error: any) {
        console.error("Failed to save blog post to DB:", error);
        return { success: false, error: error.message || "Failed to save post" };
    }
}

export async function deleteBlogPost(id: string | number) {
    try {
        await connectToDatabase();
        await Article.findByIdAndDelete(id);
        revalidatePath('/blog');
        return { success: true };
    } catch (error) {
        console.error("Failed to delete post:", error);
        return { success: false };
    }
}

export async function login(prevState: any, formData: FormData) {
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;

    try {
        await connectToDatabase();

        console.log("Login attempt for:", username);

        // Find user by email (assuming username field is actually email or we map it)
        // Or if we use username, ensure User model has username. 
        // Model has 'name' and 'email'. Let's assume input 'username' matches 'email' for now 
        // or we check both? Most admin panels use email.
        // Let's try to match email first.

        const user = await User.findOne({ email: username }).select('+password');

        if (!user) {
            console.log('Login failed: User not found for email', username);
            // Fallback: Check if it's the old hardcoded admin just in case they haven't seeded yet? 
            // No, let's force them to use DB.
            return { error: 'Invalid credentials (User not found)' };
        }

        console.log("User found, verifying password...");
        const isValid = await bcrypt.compare(password, user.password!);

        if (!isValid) {
            console.log('Login failed: Invalid password for user', username);
            return { error: 'Invalid credentials (Password mismatch)' };
        }

        console.log('Login successful, creating session...');
        await createSession(); // You might want to pass user ID payload here eventually
        redirect('/admin/dashboard');

    } catch (error) {
        if ((error as any).message === "NEXT_REDIRECT") throw error;
        console.error("Login fatal error:", error);
        return { error: 'Authentication failed: ' + (error as any).message };
    }
}

export async function logout() {
    await deleteSession();
    revalidatePath('/', 'layout');
    redirect('/admin');
}

// Temporary Action to Seed Admin
export async function seedAdmin() {
    const email = process.env.ADMIN_USERNAME || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'password123';

    try {
        await connectToDatabase();
        const existing = await User.findOne({ email });
        if (existing) {
            return { success: false, message: 'Admin already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name: 'Admin',
            email,
            password: hashedPassword,
        });

        return { success: true, message: 'Admin created' };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}