'use client';
import { useEffect } from 'react';
export default function DashboardIndexPage() {
    useEffect(() => {
        document.title = "Dashboard | Sistem Management KPI";
    }, []);
    return (
        <>
            <h2 className="intro-y text-lg font-medium pt-8 sm:pt-24">
                Sistem Management KPI
            </h2>
        </>
    );
}
