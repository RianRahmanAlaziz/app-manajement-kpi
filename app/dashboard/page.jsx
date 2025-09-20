import Image from "next/image";

export default function DashboardPage({ children }) {
    return (
        <div className="content">
            {children}
        </div>
    );
}
