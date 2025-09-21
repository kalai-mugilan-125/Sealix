"use client";

import Link from "next/link";
import { useRole } from "@/hooks/useRole";
import { ROLES } from "@/lib/constants";
import { UserRole } from "@/types/user";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks: Record<UserRole, { label: string; href: string; icon: string }[]> = {
  [ROLES.ISSUER]: [
    { label: "Dashboard", href: "/issuer", icon: "/icons/issue.svg" },
    { label: "Issue Document", href: "/issuer/documents/issue", icon: "/icons/issue.svg" },
    { label: "Manage Documents", href: "/issuer/documents/manage", icon: "/icons/issue.svg" },
    { label: "Profile", href: "/issuer/profile", icon: "/icons/user.svg" },
  ],
  [ROLES.VERIFIER]: [
    { label: "Dashboard", href: "/verifier", icon: "/icons/verify.svg" },
    { label: "Verify Document", href: "/verifier/verify", icon: "/icons/verify.svg" },
    { label: "History", href: "/verifier/history", icon: "/icons/verify.svg" },
    { label: "Profile", href: "/verifier/profile", icon: "/icons/user.svg" },
  ],
  [ROLES.USER]: [
    { label: "Dashboard", href: "/user", icon: "/icons/user.svg" },
    { label: "My Documents", href: "/user/my-documents", icon: "/icons/user.svg" },
    { label: "Upload Document", href: "/user/upload", icon: "/icons/user.svg" },
    { label: "Profile", href: "/user/profile", icon: "/icons/user.svg" },
  ],
  [ROLES.ADMIN]: [
    { label: "Dashboard", href: "/admin", icon: "/icons/user.svg" },
    { label: "Manage Users", href: "/admin/manage-users", icon: "/icons/user.svg" },
  ],
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { role } = useRole();

  if (!role) {
    return null;
  }
  
  const links = navLinks[role];

  return (
    <aside
      className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:relative md:translate-x-0 md:flex-shrink-0 z-50`}
    >
      <div className="p-4 flex items-center justify-between md:justify-center">
        <h2 className="text-2xl font-bold">Menu</h2>
        <button onClick={onClose} className="md:hidden text-white text-2xl">&times;</button>
      </div>
      <nav className="mt-4">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose} className="flex items-center p-4 hover:bg-gray-700">
                <img src={link.icon} alt={link.label} className="w-5 h-5 mr-3" />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}