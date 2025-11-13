'use client';
import "@/style/css/app.css"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify' // ✅ Tambahkan ini
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS

function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // ✅ Cek apakah sudah login
    useEffect(() => {
        document.title = "Login | Sistem Management KPI";
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            toast.info('Anda sudah login.');
            router.push('/dashboard');
        }
    }, [router]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const text = await res.text();
            const data = JSON.parse(text);

            if (res.ok) {
                toast.success('Login berhasil!');
                if (rememberMe) {
                    localStorage.setItem('token', data.access_token);
                } else {
                    sessionStorage.setItem('token', data.access_token);
                }
                // Tunggu sedikit biar toast tampil dulu
                setTimeout(() => {
                    router.push('/dashboard');
                }, 800);
            } else {
                toast.error(data.error || 'Login gagal. Periksa kembali email dan password Anda.');
            }
        } catch (err) {
            console.error('Error:', err);
            toast.error('Terjadi kesalahan pada server');
        }
    };

    return (
        <div className="login">
            <div className='container sm:px-10'>
                <div className="block xl:grid grid-cols-2 gap-4">
                    <div className="hidden xl:flex flex-col min-h-screen">

                    </div>
                    <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
                        <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                            <form onSubmit={handleLogin} >
                                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                                    Sign In
                                </h2>
                                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                                <div className="intro-x mt-8">
                                    <input
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="intro-x login__input form-control py-3 px-4 block"
                                        placeholder="Email" />
                                    <input
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="intro-x login__input form-control py-3 px-4 block mt-4"
                                        placeholder="Password" />
                                </div>
                                <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                                    <div className="flex items-center mr-auto">
                                        <input
                                            id="remember-me"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="form-check-input border mr-2"
                                        />
                                        <label className="cursor-pointer select-none" htmlFor="remember-me">Remember me</label>
                                    </div>
                                </div>
                                <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                                    <button type="submit" className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage