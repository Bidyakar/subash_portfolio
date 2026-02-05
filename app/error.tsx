'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
            <div className="mb-8">
                <h1 className="text-6xl font-playfair font-black text-[#0A192F] mb-4">Oops!</h1>
                <h2 className="text-2xl font-bold text-[#FF4D00] mb-6">Something went wrong</h2>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                    We apologize for the inconvenience. An unexpected error has occurred while processing your request.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => reset()}
                    className="px-8 py-3 bg-[#FF4D00] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#0A192F] transition-all"
                >
                    Try again
                </button>
                <Link
                    href="/"
                    className="px-8 py-3 bg-[#0A192F] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:opacity-90 transition-all"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
