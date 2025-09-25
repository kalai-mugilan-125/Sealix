"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRole } from "@/hooks/useRole";
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/lib/constants";
import { UserRole } from "@/types/user";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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

// Icon component with color overlay
const IconWithOverlay = ({ 
  src, 
  alt, 
  className = "", 
  size = "w-5 h-5" 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  size?: string; 
}) => {
  return (
    <div className={`${size} ${className} relative`}>
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-contain"
        style={{
          filter: 'brightness(0) saturate(100%) invert(100%)', // Makes any color white
        }}
        aria-hidden="true"
      />
    </div>
  );
};

// Alternative CSS-based approach using mask
const IconWithMask = ({ 
  src, 
  alt, 
  className = "", 
  size = "w-5 h-5" 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  size?: string; 
}) => {
  return (
    <div 
      className={`${size} ${className} bg-current`}
      style={{
        maskImage: `url(${src})`,
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
      }}
      aria-hidden="true"
    />
  );
};

// Icon styles with transitions
const iconStyle = "text-white transition-colors duration-150 group-hover:text-gray-300";
const subItemIconStyle = "text-white/80 transition-colors duration-150 group-hover:text-white";

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
  const router = useRouter();
  const { role } = useRole();
  const { user } = useAuth();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (!user || !role) {
      router.push('/auth/login');
      return;
    }
    router.push(href);
    onClose();
  };

  if (!role) return null;

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
                  <div className="flex items-center p-2 text-white group">
                    {/* Using CSS filter approach */}
                    <IconWithOverlay 
                      src={link.icon} 
                      alt="" 
                      className={`mr-3 ${iconStyle}`}
                    />
                    {/* Alternative: Using mask approach - uncomment to use this instead
                    <IconWithMask 
                      src={link.icon} 
                      alt="" 
                      className={`mr-3 ${iconStyle}`}
                    />
                    */}
                    <span className="font-medium">{link.label}</span>
                  </div>
                  <ul className="ml-6 space-y-1">
                    {link.subItems.map((subItem) => (
                      <li key={subItem.href}>
                        <a 
                          href={subItem.href}
                          onClick={(e) => handleNavigation(e, subItem.href)}
                          className="flex items-center p-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors duration-150 group"
                        >
                          {/* Using CSS filter approach */}
                          <IconWithOverlay 
                            src={subItem.icon} 
                            alt="" 
                            className={`mr-3 ${subItemIconStyle}`}
                            size="w-4 h-4"
                          />
                          {/* Alternative: Using mask approach - uncomment to use this instead
                          <IconWithMask 
                            src={subItem.icon} 
                            alt="" 
                            className={`mr-3 ${subItemIconStyle}`}
                            size="w-4 h-4"
                          />
                          */}
                          <span>{subItem.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <a
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className="flex items-center px-6 py-3 hover:bg-gray-700 transition-colors duration-150 group"
                >
                  {/* Using CSS filter approach */}
                  <IconWithOverlay 
                    src={link.icon} 
                    alt="" 
                    className={`mr-3 ${iconStyle}`}
                  />
                  {/* Alternative: Using mask approach - uncomment to use this instead
                  <IconWithMask 
                    src={link.icon} 
                    alt="" 
                    className={`mr-3 ${iconStyle}`}
                  />
                  */}
                  <span>{link.label}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}