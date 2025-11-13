import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouteLoader from "@/components/layouts/RouteLoader";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"
      suppressHydrationWarning
      className={`${inter.className} light`}
    >
      <body>
        <RouteLoader />
        {children}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
        <div id="modal-root" />
      </body>
    </html>
  );
}
