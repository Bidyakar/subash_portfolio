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
    cookies().delete(SESSION_COOKIE_NAME);
}

export async function getSession() {
    const session = cookies().get(SESSION_COOKIE_NAME);
    return !!session?.value;
}
