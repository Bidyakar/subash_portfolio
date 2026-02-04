import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 60 * 60 * 24 * 7; // 1 week

export async function createSession() {
    cookies().set(SESSION_COOKIE_NAME, 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: SESSION_DURATION,
        path: '/',
    });
}

export async function deleteSession() {
    cookies().delete(SESSION_COOKIE_NAME); // Next.js delete() should handle it, but sometimes explicit options help if it persists.
    // Actually, cookies().delete(name) is standard. 
    // Let's try passing the name string only first as per docs, but if it fails, we might need to overwrite it.
    // Better yet, let's just set it to expire immediately.
    cookies().set(SESSION_COOKIE_NAME, '', { maxAge: 0, path: '/' });
}

export async function getSession() {
    const session = cookies().get(SESSION_COOKIE_NAME);
    return !!session?.value;
}
