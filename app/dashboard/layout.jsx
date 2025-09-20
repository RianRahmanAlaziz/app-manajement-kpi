import "@/style/css/app.css"
import Script from "next/script";
import Topbar from "@/components/layouts/Topbar";
import Sidebar from "../../components/layouts/Sidebar";
import Switcher from "../../components/layouts/Switcher";
import Menumobile from "../../components/layouts/Menumobile";

export default function DashboardLayout({ children }) {
    return (
        <>
            {/* Layout khusus dashboard */}
            <div className="min-h-screen py-5 md:py-5 md:pr-5">
                <Menumobile />
                <Topbar />
                <div className="flex overflow-hidden">
                    <Sidebar />
                    {children}
                </div>
                <Switcher />
            </div>

        </>
    );
}
