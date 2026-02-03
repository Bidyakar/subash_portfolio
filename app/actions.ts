'use server'

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

import { BlogPost, BlogPostInput } from '@/app/lib/types';
import { createSession, deleteSession } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

const dataDir = path.join(process.cwd(), 'data');
const filePath = path.join(dataDir, 'posts.json');

// Safety function to prevent "File not found" errors
async function initializeData() {
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir);
    }
    try {
        await fs.access(filePath);
    } catch {
        await fs.writeFile(filePath, JSON.stringify([]));
    }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        await initializeData();
        const fileContent = await fs.readFile(filePath, 'utf8');
        const data = JSON.parse(fileContent);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error reading blog posts:", error);
        return [];
    }
}

export async function saveBlogPost(data: BlogPostInput) {
    await initializeData();
    const posts = await getBlogPosts();
    const newPost: BlogPost = {
        id: Date.now(),
        ...data,
        imageUrl: data.imageUrl || '', // Ensure optional field is handled
        date: new Date().toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        })
    };
    posts.push(newPost);
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2));
    revalidatePath('/blog');
    return { success: true };
}

export async function deleteBlogPost(id: number) {
    const posts = await getBlogPosts();
    const updated = posts.filter((p) => p.id !== id);
    await fs.writeFile(filePath, JSON.stringify(updated, null, 2));
    revalidatePath('/blog');
    return { success: true };
}

export async function login(prevState: any, formData: FormData) {
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;

    // Hardcoded credentials for now - replace with env vars in real app
    const validUsername = process.env.ADMIN_USERNAME || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'password123';

    if (username === validUsername && password === validPassword) {
        console.log('Login successful, creating session...');
        await createSession();
        console.log('Session created, redirecting...');
        redirect('/admin/dashboard');
    } else {
        console.log('Login failed: Invalid credentials');
        console.log('Provided:', { username, password });
        console.log('Expected:', { validUsername, validPassword });
        return { error: 'Invalid credentials' };
    }
}

export async function logout() {
    await deleteSession();
    redirect('/admin');
}