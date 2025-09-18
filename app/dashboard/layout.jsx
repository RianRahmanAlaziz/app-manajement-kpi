import "@/style/css/app.css"
import Script from "next/script";
import Topbar from "@/components/layouts/Topbar";
import Sidebar from "../../components/layouts/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <>
            {/* Layout khusus dashboard */}
            <div className="min-h-screen py-5 md:py-5 md:pr-5">
                <Topbar />
                <div className="flex overflow-hidden">
                    <Sidebar />
                    {children}
                </div>
            </div>

            {/* Masukkan JS jika dibutuhkan */}
            <Script src="/style/js/app.js" strategy="afterInteractive" />
        </>
    );
}
