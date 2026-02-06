'use client';

import { useEffect, useState } from 'react';

interface RelativeTimeProps {
    timestamp: string;
}

export default function RelativeTime({ timestamp }: RelativeTimeProps) {
    const [relativeText, setRelativeText] = useState<string>('JUST NOW');

    useEffect(() => {
        const calculateRelativeTime = () => {
            const now = new Date();
            const past = new Date(timestamp);
            const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

            if (diffInSeconds < 60) {
                setRelativeText('JUST NOW');
            } else if (diffInSeconds < 3600) {
                const minutes = Math.floor(diffInSeconds / 60);
                setRelativeText(`${minutes} MINUTE${minutes > 1 ? 'S' : ''} AGO`);
            } else if (diffInSeconds < 86400) {
                const hours = Math.floor(diffInSeconds / 3600);
                setRelativeText(`${hours} HOUR${hours > 1 ? 'S' : ''} AGO`);
            } else {
                const days = Math.floor(diffInSeconds / 86400);
                setRelativeText(`${days} DAY${days > 1 ? 'S' : ''} AGO`);
            }
        };

        calculateRelativeTime();

        // Update every minute
        const interval = setInterval(calculateRelativeTime, 60000);
        return () => clearInterval(interval);
    }, [timestamp]);

    return <>{relativeText}</>;
}
