"use client";

import { DashboardNavItem } from "./dashboard-nav-item";
import Logo from "@/components/logo";
import { Avatar } from "@/components/avatar";
import { MdVideoCall, MdSmartToy, MdUpgrade } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string;
  };
  onSignOut: () => void;
}

const navigationItems = [
  {
    id: "meetings",
    label: "Meetings",
    href: "/meetings",
    icon: <MdVideoCall className="h-5 w-5" />,
    isActive: true,
  },
  {
    id: "agents",
    label: "Agents",
    href: "/agents",
    icon: <MdSmartToy className="h-5 w-5" />,
  },
  {
    id: "upgrade",
    label: "Upgrade",
    href: "/upgrade",
    icon: <MdUpgrade className="h-5 w-5" />,
  },
];

export function DashboardSidebar({ isOpen, onClose, user, onSignOut }: DashboardSidebarProps) {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        dropdownRef.current.open = false;
        setIsDropdownOpen(false);
      }
    };

    const handleToggle = () => {
      if (dropdownRef.current) {
        setIsDropdownOpen(dropdownRef.current.open);
      }
    };

    const dropdown = dropdownRef.current;
    if (dropdown) {
      dropdown.addEventListener('toggle', handleToggle);
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdown) {
        dropdown.removeEventListener('toggle', handleToggle);
      }
    };
  }, []);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 h-screen bg-gradient-to-b from-primary/95 to-secondary/95 backdrop-blur-lg
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
            <div className="flex items-center justify-center space-x-3">
              <Logo variant="auth" className="h-[5rem] w-[15rem] text-white" />
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-white/70 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            {navigationItems.map((item, index) => (
              <div key={item.id} className={index > 0 ? "mt-2" : ""}>
                <DashboardNavItem
                  {...item}
                />
              </div>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="p-6 border-t border-white/10">
            <details ref={dropdownRef} className="dropdown dropdown-top w-full [&>summary]:list-none [&>summary::-webkit-details-marker]:hidden">
              <summary className="w-full justify-start bg-transparent hover:bg-white/10 border-none p-3 h-auto cursor-pointer focus:outline-none rounded-lg">
                <div className="flex items-center space-x-3 w-full">
                  <Avatar user={user} size="md" />
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-white font-medium text-sm truncate">{user.name}</p>
                    <p className="text-white/70 text-xs truncate">{user.email}</p>
                  </div>
                  <svg 
                    className={`h-4 w-4 text-white/70 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <ul className="dropdown-content menu bg-white/95 backdrop-blur-sm rounded-box w-52 p-2 shadow-lg border border-white/20">
                <li>
                  <button
                    onClick={() => {
                      // TODO: Navigate to billing page
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary hover:bg-primary/10"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span className="text-sm font-medium">Billing</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={onSignOut}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 hover:bg-red-50"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </>
  );
}
