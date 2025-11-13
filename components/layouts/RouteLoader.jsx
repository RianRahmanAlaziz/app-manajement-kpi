'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RouteLoader() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Next.js app router belum punya event router.start seperti di pages router,
        // jadi kita bisa simulasikan manual jika pakai push.
        const handleStart = () => setLoading(true);
        const handleComplete = () => setLoading(false);

        // Tambahkan listener ke global push/replace
        router.push = ((original) => (...args) => {
            handleStart();
            const result = original(...args);
            setTimeout(handleComplete, 800); // delay kecil biar kelihatan
            return result;
        })(router.push);

        return () => handleComplete();
    }, [router]);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-900 border-t-transparent"></div>
        </div>
    );
}
