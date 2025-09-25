import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { RoleProvider } from "@/context/RoleContext"; 
import Navbar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sealix",
  description: "A platform for issuing and verifying digital credentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* AuthProvider must wrap RoleProvider */}
        <AuthProvider>
          <RoleProvider> 
            <Navbar />
            <main className="flex-grow container mx-auto p-4 md:p-8">
              {children}
            </main>
            <Footer />
          </RoleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}