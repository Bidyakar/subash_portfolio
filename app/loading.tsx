import Image from 'next/image';

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white">
            <div className="relative">
                {/* Slow spinning logo */}
                <div className="animate-slow-spin">
                    <Image
                        src="/images/sss.svg"
                        alt="Loading..."
                        width={120}
                        height={120}
                        className="opacity-90"
                    />
                </div>

                {/* Optional: subtler outer glow/pulse */}
                <div className="absolute inset-0 rounded-full bg-orange/10 blur-xl animate-pulse -z-10" />
            </div>
        </div>
    );
}
