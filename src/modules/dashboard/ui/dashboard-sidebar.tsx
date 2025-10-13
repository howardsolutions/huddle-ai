"use client";

import { DashboardNavItem } from "./dashboard-nav-item";
import Logo from "@/components/logo";
import { Avatar } from "@/components/avatar";
import { MdVideoCall, MdSmartToy, MdUpgrade } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface DashboardSidebarProps {
  isOpen: boolean;
  isCollapsed?: boolean;
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

export function DashboardSidebar({ isOpen, isCollapsed = false, onClose, user, onSignOut }: DashboardSidebarProps) {
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

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
        fixed inset-y-0 left-0 z-50 h-screen bg-gradient-to-b from-primary/95 to-secondary/95 backdrop-blur-lg
        transform transition-all duration-300 ease-in-out
        lg:translate-x-0 lg:fixed lg:inset-y-0 lg:left-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`flex items-center justify-between border-b border-white/10 ${
            isCollapsed ? 'px-2 py-4' : 'px-6 py-6'
          }`}>
            <div className="flex items-center justify-center">
              {isCollapsed ? (
                <Logo variant="mark" className="text-white" />
              ) : (
                <Logo variant="auth" className="h-[5rem] w-[15rem] text-white" />
              )}
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm lg:hidden text-white/70 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className={`flex-1 py-6 ${isCollapsed ? 'px-2' : 'px-4'}`}>
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <div key={item.id} className={index > 0 ? "mt-2" : ""}>
                  <DashboardNavItem
                    {...item}
                    isActive={isActive}
                    isCollapsed={isCollapsed}
                  />
                </div>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className={`border-t border-white/10 ${isCollapsed ? 'p-2' : 'p-6'}`}>
            {isCollapsed ? (
              <div className="flex justify-center">
                <Avatar user={user} size="sm" />
              </div>
            ) : (
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
                <div className="dropdown-content bg-white rounded-lg shadow-xl border border-gray-200 w-64 p-0 mt-2 sm:w-72">
                  {/* User Info Header */}
                  <div className="px-4 py-4 border-b border-gray-100 sm:px-6">
                    <p className="font-semibold text-gray-900 text-base sm:text-lg">{user.name}</p>
                    <p className="text-gray-600 text-sm mt-1">{user.email}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        // TODO: Navigate to billing page
                      }}
                      className="btn btn-ghost w-full justify-start gap-3"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-medium">Billing</span>
                    </button>
                    
                    <button
                      onClick={onSignOut}
                      className="btn btn-ghost w-full justify-start gap-3 text-error hover:bg-error/10 hover:text-error"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
