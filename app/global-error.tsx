'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body className="font-sans antialiased text-slate-900 bg-white">
                <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                    <h1 className="text-4xl font-playfair font-bold text-[#0A192F] mb-4">Critical Error</h1>
                    <p className="text-gray-500 mb-8">A critical error occurred in the application base.</p>
                    <button
                        onClick={() => reset()}
                        className="px-8 py-3 bg-[#FF4D00] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#0A192F] transition-all"
                    >
                        Reload Application
                    </button>
                </div>
            </body>
        </html>
    );
}
