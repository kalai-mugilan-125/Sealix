"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const getDashboardPath = (userRole: string) => {
    switch (userRole) {
      case "issuer": return "/issuer";
      case "verifier": return "/verifier";
      case "admin": return "/admin";
      default: return "/user";
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-xl font-bold text-gray-800">Sealix</span>
        </Link>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href={getDashboardPath(user.role)} className="text-gray-600 hover:text-green-600 font-medium">
                Dashboard
              </Link>
              <span className="text-gray-800 hidden md:block">Hi, {user.name}</span>
              <Button onClick={logout} variant="secondary">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-600 hover:text-green-600">
                Login
              </Link>
              <Link href="/auth/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}