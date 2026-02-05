'use server'

import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/db';
import Article, { IArticle } from '@/models/Article';
import User from '@/models/User';
import { BlogPost, BlogPostInput } from '@/app/lib/types'; // We might need to map types or update types
import { createSession, deleteSession } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

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

        if (data.id) {
            // Update existing
            await Article.findByIdAndUpdate(data.id, {
                title: data.title,
                // Do not update slug usually to preserve SEO, or update if desired. 
                // Let's keep slug stable for now unless explicitly requested.
                category: data.category,
                excerpt: data.excerpt,
                content: data.content,
                imageUrl: data.imageUrl,
                isFeatured: data.isFeatured,
            });
        } else {
            // Create new
            await Article.create({
                title: data.title,
                slug: slug + '-' + Date.now(), // Ensure uniqueness
                category: data.category,
                excerpt: data.excerpt,
                content: data.content,
                imageUrl: data.imageUrl,
                isFeatured: data.isFeatured,
            });
        }

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

// Cloudinary Config
import { v2 as cloudinary } from 'cloudinary';

export async function uploadImage(formData: FormData) {
    // TEMPORARY: Hardcoded for debugging
    const cloudName = 'drh4sirjt';
    const apiKey = '869838243928481';
    const apiSecret = 'mu7e0LIu6rbRyqrV_1zEmh5P9pI';

    console.log("--- Cloudinary Config Debug ---");
    console.log(`Cloud Name: ${cloudName ? cloudName : 'MISSING'}`);
    console.log(`API Key: ${apiKey ? apiKey : 'MISSING'}`);
    console.log(`API Secret: ${apiSecret ? (apiSecret.length + ' chars') : 'MISSING'}`);

    if (!cloudName || !apiKey || !apiSecret) {
        console.error("Cloudinary keys missing!");
        return { success: false, error: 'Server Config Error: Missing Cloudinary Keys' };
    }

    // Configure Cloudinary for this request (or check if already configured)
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    });

    const file = formData.get('file') as File;

    if (!file) {
        return { success: false, error: 'No file provided' };
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return new Promise<{ success: boolean; url?: string; error?: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'blog_images' }, // Optional folder in Cloudinary
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        resolve({ success: false, error: error.message });
                    } else {
                        resolve({ success: true, url: result?.secure_url });
                    }
                }
            ).end(buffer);
        });
    } catch (error: any) {
        console.error("Upload Action Error:", error);
        return { success: false, error: error.message };
    }
}

export async function sendEmail(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { success: false, error: 'Missing required fields' };
    }

    try {
        // Use environment variables for SMTP configuration
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Verify transporter configuration
        await transporter.verify();

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.CONTACT_EMAIL || 'subashssapkota@gmail.com', // Recipient email
            subject: `New Contact Form Message from ${name}`,
            text: message,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1:px solid #eee; border-radius: 10px;">
                    <h2 style="color: #FF4D00;">New Contact Form Submission</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        return { success: true };
    } catch (error: any) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message || 'Failed to send email' };
    }
}