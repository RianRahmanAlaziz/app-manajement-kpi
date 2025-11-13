'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "@/style/css/app.css"
import Script from "next/script";
import Topbar from "@/components/layouts/Topbar";
import Sidebar from "../../components/layouts/Sidebar";
import Switcher from "../../components/layouts/Switcher";
import Menumobile from "../../components/layouts/Menumobile";

export default function DashboardLayout({ children }) {

    const router = useRouter();
    useEffect(() => {
        // ✅ Ambil token dari localStorage atau sessionStorage
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (!token) {
            toast.error('Silakan login terlebih dahulu!');
            router.push('/login');
            return;
        }

        // ✅ Fungsi untuk refresh token
        const refreshToken = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/auth/refresh', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    },
                });

                if (res.ok) {
                    const data = await res.json();

                    // ✅ Simpan ke storage yang sama dengan token lama
                    if (localStorage.getItem('token')) {
                        localStorage.setItem('token', data.access_token);
                    } else {
                        sessionStorage.setItem('token', data.access_token);
                    }

                    toast.success('Token berhasil diperbarui 🔄');
                } else {
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    toast.error('Sesi habis, silakan login ulang.');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error refresh token:', error);
                toast.error('Gagal memperbarui token.');
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                router.push('/login');
            }
        };

        // ✅ Cek token saat halaman dibuka
        const checkAuth = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    },
                });

                if (!res.ok) {
                    // Jika token invalid, coba refresh token
                    await refreshToken();
                }
            } catch (error) {
                console.error('Error verifying login:', error);
                await refreshToken();
            }
        };

        checkAuth();

        // Auto refresh token setiap 55 menit (3300 detik)
        const interval = setInterval(() => {
            refreshToken();
        }, 55 * 60 * 1000);

        return () => clearInterval(interval);
    }, [router]);

    return (
        <>
            {/* Layout khusus dashboard */}
            <div className="min-h-screen py-5 md:py-5 md:pr-5">
                <Menumobile />
                <Topbar />
                <div className="flex overflow-hidden">
                    <Sidebar />
                    <div className="content">
                        {children}
                    </div>
                </div>
                <Switcher />
            </div>

        </>
    );
}
