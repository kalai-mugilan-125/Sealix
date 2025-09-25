"use client";

import Link from "next/link";
import { useRole } from "@/hooks/useRole";
import { ROLES } from "@/lib/constants";
import { UserRole } from "@/types/user";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Navigation item interfaces
interface NavSubItem {
  label: string;
  href: string;
  icon: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: string;
  subItems?: NavSubItem[];
}

const navLinks: Record<UserRole, NavItem[]> = {
  [ROLES.ISSUER]: [
    { label: "Dashboard", href: "/issuer", icon: "/icons/dashboard.svg" },
    { 
      label: "Documents", 
      href: "/issuer/documents", 
      icon: "/icons/document.svg",
      subItems: [
        { label: "Issue New", href: "/issuer/documents/issue", icon: "/icons/issue.svg" },
        { label: "Manage", href: "/issuer/documents/manage", icon: "/icons/manage.svg" },
      ]
    },
    { label: "Analytics", href: "/issuer/analytics", icon: "/icons/analytics.svg" },
    { label: "Settings", href: "/issuer/settings", icon: "/icons/settings.svg" },
  ],
  [ROLES.VERIFIER]: [
    { label: "Dashboard", href: "/verifier", icon: "/icons/dashboard.svg" },
    { label: "Verify Document", href: "/verifier/verify", icon: "/icons/verify.svg" },
    { label: "Verification History", href: "/verifier/history", icon: "/icons/history.svg" },
    { label: "Reports", href: "/verifier/reports", icon: "/icons/report.svg" },
    { label: "Settings", href: "/verifier/settings", icon: "/icons/settings.svg" },
  ],
  [ROLES.USER]: [
    { label: "Dashboard", href: "/user", icon: "/icons/dashboard.svg" },
    { 
      label: "Documents", 
      href: "/user/documents", 
      icon: "/icons/document.svg",
      subItems: [
        { label: "My Documents", href: "/user/documents/my", icon: "/icons/folder.svg" },
        { label: "Upload New", href: "/user/documents/upload", icon: "/icons/upload.svg" },
        { label: "Shared With Me", href: "/user/documents/shared", icon: "/icons/share.svg" },
      ]
    },
    { label: "Notifications", href: "/user/notifications", icon: "/icons/bell.svg" },
    { label: "Settings", href: "/user/settings", icon: "/icons/settings.svg" },
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
        <h2 className="text-2xl font-bold">Sealix</h2>
        <button 
          onClick={onClose} 
          className="md:hidden text-white text-2xl hover:text-gray-300"
          aria-label="Close menu"
        >
          &times;
        </button>
      </div>

      <nav className="mt-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              {link.subItems ? (
                <div className="px-4">
                  <div className="flex items-center p-2 text-gray-300">
                    <img 
                      src={link.icon} 
                      alt="" 
                      className="w-5 h-5 mr-3"
                      aria-hidden="true"
                    />
                    <span className="font-medium">{link.label}</span>
                  </div>
                  <ul className="ml-6 space-y-1">
                    {link.subItems.map((subItem) => (
                      <li key={subItem.href}>
                        <Link 
                          href={subItem.href} 
                          onClick={onClose} 
                          className="flex items-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-150"
                        >
                          <img 
                            src={subItem.icon} 
                            alt="" 
                            className="w-4 h-4 mr-3"
                            aria-hidden="true"
                          />
                          <span>{subItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link 
                  href={link.href} 
                  onClick={onClose} 
                  className="flex items-center px-6 py-3 hover:bg-gray-700 transition-colors duration-150"
                >
                  <img 
                    src={link.icon} 
                    alt="" 
                    className="w-5 h-5 mr-3"
                    aria-hidden="true"
                  />
                  <span>{link.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}