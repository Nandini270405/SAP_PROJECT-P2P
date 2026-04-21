import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { NotificationProvider } from "@/components/NotificationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SAP P2P Management System",
  description: "Procure-to-Pay Simulation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NotificationProvider>
          <div className="flex bg-[#f0f2f5] min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-72 p-8 pt-12">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
